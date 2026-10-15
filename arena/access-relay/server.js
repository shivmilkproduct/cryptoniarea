/* Minimal, zero-dependency Node server.
   Fetches coupons.csv from a private URL (kept out of this code, set via
   a Render environment variable) and answers coupon lookups for the
   Arena website. Nothing in this folder is public except the one JSON
   endpoint below.

   Deploy on Render as a "Web Service":
     - Environment: Node
     - Build command: (leave empty)
     - Start command: node server.js
   Render sets process.env.PORT automatically.

   On the Render service, add an environment variable:
     COUPONS_URL = <the link to your coupons CSV>
   (e.g. a Google Sheet published as CSV, or any private file host link
   that returns the raw CSV text when fetched.)

   CSV columns (first row = header), one coupon per row:
     code,discount,challenge,active
     WELCOME20,20,last-login,yes
     TEAM50,50,last-login,yes

   - code      : the coupon text the student types in (case-insensitive)
   - discount  : percentage off, a plain number (20 means 20%)
   - challenge : which challenge/case this coupon applies to
                 (must match the data-challenge value sent by the site;
                 use "all" to make a coupon valid for every challenge)
   - active    : "yes" to allow it, "no" to disable it without deleting the row
*/

const http = require('http');
const https = require('https');

const COUPONS_URL = process.env.COUPONS_URL || '';
const PORT = process.env.PORT || 10000;
const CACHE_MS = 60 * 1000; /* re-fetch the CSV at most once a minute */

let cache = { text: '', at: 0 };

function fetchCsv() {
  return new Promise(function (resolve, reject) {
    if (!COUPONS_URL) { reject(new Error('COUPONS_URL is not set')); return; }
    if (Date.now() - cache.at < CACHE_MS && cache.text) { resolve(cache.text); return; }

    const lib = COUPONS_URL.startsWith('http://') ? http : https;
    lib.get(COUPONS_URL, function (resp) {
      if (resp.statusCode >= 300 && resp.statusCode < 400 && resp.headers.location) {
        /* follow a single redirect (common for shared-drive / sheet links) */
        const redirectLib = resp.headers.location.startsWith('http://') ? http : https;
        redirectLib.get(resp.headers.location, collect).on('error', reject);
        return;
      }
      collect(resp);
    }).on('error', reject);

    function collect(resp) {
      let data = '';
      resp.on('data', function (chunk) { data += chunk; });
      resp.on('end', function () {
        cache = { text: data, at: Date.now() };
        resolve(data);
      });
      resp.on('error', reject);
    }
  });
}

function parseCsv(text) {
  const rows = [];
  const lines = text.split(/\r?\n/).filter(function (l) { return l.trim().length; });
  for (let i = 1; i < lines.length; i++) { // skip header row
    const parts = lines[i].split(',').map(function (p) { return p.trim(); });
    const [code, discount, challenge, active] = parts;
    if (!code) continue;
    rows.push({
      code: code.toLowerCase(),
      discount: parseFloat(discount) || 0,
      challenge: (challenge || 'all').toLowerCase(),
      active: (active || 'yes').toLowerCase() !== 'no'
    });
  }
  return rows;
}

function send(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', /* set this to your exact site domain once it is live */
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

const server = http.createServer(function (req, res) {
  const url = new URL(req.url, 'http://x');

  if (req.method === 'OPTIONS') { send(res, 204, {}); return; }

  if (url.pathname === '/api/coupon' && req.method === 'GET') {
    const code = (url.searchParams.get('code') || '').trim().toLowerCase();
    const challenge = (url.searchParams.get('challenge') || '').trim().toLowerCase();

    if (!code) { send(res, 200, { valid: false }); return; }

    fetchCsv()
      .then(function (text) {
        const coupons = parseCsv(text);
        const match = coupons.find(function (c) {
          return c.code === code && c.active && (c.challenge === 'all' || c.challenge === challenge);
        });
        if (match) {
          send(res, 200, { valid: true, discount: match.discount, challenge: match.challenge });
        } else {
          send(res, 200, { valid: false });
        }
      })
      .catch(function (e) {
        console.error('Coupon lookup failed:', e.message);
        send(res, 200, { valid: false });
      });
    return;
  }

  send(res, 404, { error: 'Not found' });
});

server.listen(PORT, function () {
  console.log('Coupon service running on port ' + PORT);
});

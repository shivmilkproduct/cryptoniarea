/* Minimal, zero-dependency Node server.
   Fetches coupons.csv from a private URL (kept out of this code, set via
   a Render environment variable) and answers coupon lookups for the
   Arena website. Nothing in this folder is public except the one JSON
   endpoint below.

   Deploy on Render as a "Web Service":
     - Environment: Node
     - Build command: (leave empty / npm install)
     - Start command: node server.js
   Render sets process.env.PORT automatically.

   On the Render service, add an environment variable:
     COUPONS_URL = <the link to your coupons CSV>

   Google Drive "Anyone with the link" share links work directly - just
   paste the normal share link you get from Drive's Share button, e.g.
     https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   This server automatically converts it to a direct-download link.
   (A Google Sheet published as CSV, or any other link that returns the
   raw CSV text, also works as-is.)

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

   Optional environment variable:
     DEBUG_TOKEN = a secret string of your choice
   If set, GET /api/_debug?token=<DEBUG_TOKEN> shows a CSV preview for
   troubleshooting. If NOT set, /api/_debug is disabled entirely (404) -
   it is never publicly readable by default.
*/

const http = require('http');
const https = require('https');

const RAW_COUPONS_URL = process.env.COUPONS_URL || '';
const PORT = process.env.PORT || 10000;
const CACHE_MS = 60 * 1000; /* re-fetch the CSV at most once a minute */
const MAX_REDIRECTS = 5;
const DEBUG_TOKEN = process.env.DEBUG_TOKEN || '';

let cache = { text: '', at: 0 };

/* Turn a normal Google Drive share link into its direct-download form. */
function normalizeUrl(u) {
  var m = u.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (!m) m = u.match(/[?&]id=([^&]+)/);
  if (m && /drive\.google\.com/.test(u)) {
    return 'https://drive.google.com/uc?export=download&id=' + m[1];
  }
  return u;
}

function get(u, redirectsLeft) {
  return new Promise(function (resolve, reject) {
    const lib = u.startsWith('http://') ? http : https;
    lib.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (coupon-service)' } }, function (resp) {
      if (resp.statusCode >= 300 && resp.statusCode < 400 && resp.headers.location && redirectsLeft > 0) {
        resp.resume(); /* discard this response body */
        let next = resp.headers.location;
        if (!/^https?:\/\//.test(next)) {
          next = new URL(next, u).toString(); /* relative redirect */
        }
        get(next, redirectsLeft - 1).then(resolve, reject);
        return;
      }
      let data = '';
      resp.setEncoding('utf8');
      resp.on('data', function (chunk) { data += chunk; });
      resp.on('end', function () { resolve(data); });
      resp.on('error', reject);
    }).on('error', reject);
  });
}

function fetchCsv() {
  if (!RAW_COUPONS_URL) return Promise.reject(new Error('COUPONS_URL is not set'));
  if (Date.now() - cache.at < CACHE_MS && cache.text) return Promise.resolve(cache.text);

  const url = normalizeUrl(RAW_COUPONS_URL);
  return get(url, MAX_REDIRECTS).then(function (text) {
    const looksLikeHtml = /^\s*<(!doctype|html)/i.test(text);
    if (looksLikeHtml) {
      throw new Error('COUPONS_URL did not return CSV text (got an HTML page instead - check the link is a direct/share link, not a login-protected page)');
    }
    cache = { text: text, at: Date.now() };
    return text;
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

/* Simple in-memory IP rate limit: 20 requests / minute per IP.
   Higher than arena-backend's limit since this endpoint is hit live,
   once per keystroke-ish, while a student types a coupon code - but it
   still stops a script from brute-forcing codes at high speed. */
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 60 * 1000;
  const arr = (hits.get(ip) || []).filter(function (t) { return now - t < win; });
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 20;
}
setInterval(function () { hits.clear(); }, 60 * 60 * 1000).unref();

const server = http.createServer(function (req, res) {
  const url = new URL(req.url, 'http://x');
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '';

  if (req.method === 'OPTIONS') { send(res, 204, {}); return; }

  if (url.pathname === '/api/coupon' && req.method === 'GET') {
    if (limited(ip)) { send(res, 429, { valid: false, error: 'too_many_requests' }); return; }

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

  /* quick manual check: open this in a browser to see what the server is
     actually reading from COUPONS_URL - useful while debugging the link.
     Disabled by default. Only works if DEBUG_TOKEN is set as an env var,
     and only when the request supplies the same token. */
  if (url.pathname === '/api/_debug' && req.method === 'GET') {
    if (!DEBUG_TOKEN || url.searchParams.get('token') !== DEBUG_TOKEN) {
      send(res, 404, { error: 'Not found' });
      return;
    }
    fetchCsv()
      .then(function (text) { send(res, 200, { ok: true, preview: text.slice(0, 500) }); })
      .catch(function (e) { send(res, 200, { ok: false, error: e.message }); });
    return;
  }

  send(res, 404, { error: 'Not found' });
});

server.listen(PORT, function () {
  console.log('Coupon service running on port ' + PORT);
});

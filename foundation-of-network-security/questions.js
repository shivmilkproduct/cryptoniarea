/* =============================================
   CRYPTOMIC AREA - ASSESSMENT ENGINE (V2.0)
   ============================================= */

const missionData = [
    {
        id: "01",
        label: "NET-SEC-PRO-01",
        intel: "In networking, <b>Data Encapsulation</b> is the process of wrapping data in layers. As data moves from the application to the physical layer, each layer adds its own 'Header'. At the <b>Data Link Layer (Layer 2)</b>, data is called a <b>'Frame'</b>, which contains the <b>MAC Address</b> (Physical Identity). Without this, data can never reach the correct hardware port.",
        question: "A network switch receives data from Computer 'A' intended for Computer 'B'. The switch inspects the 'Frame' to ensure delivery to the correct hardware port. Which physical identity is the switch looking for inside this frame?",
        options: [
            { symbol: "IP", text: "Logical IP Address" },
            { symbol: "MAC", text: "Hardware MAC Address" },
            { symbol: "PORT", text: "Application Port Number" },
            { symbol: "TTL", text: "Time To Live (TTL) Value" }
        ],
        correct: 1
    },
    {
        id: "02",
        label: "PROT-ANALYST-02",
        intel: "The <b>ICMP (Internet Control Message Protocol)</b> is used by network devices to send error messages and operational information. The most common tool using this is <b>PING</b>. However, hackers can use ICMP for 'Reconnaissance' to check if a target server is online before launching an attack.",
        question: "You are performing a connectivity test to see if a remote server is 'Alive' and reachable across the network. Which protocol are you utilizing when you execute a 'Ping' command?",
        options: [
            { symbol: "UDP", text: "User Datagram Protocol" },
            { symbol: "TCP", text: "Transmission Control Protocol" },
            { symbol: "ICMP", text: "Internet Control Message Protocol" },
            { symbol: "DHCP", text: "Dynamic Host Configuration Protocol" }
        ],
        correct: 2
    },
    {
        id: "03",
        label: "VULN-IDENT-03",
        intel: "Unencrypted protocols like <b>Telnet (Port 23)</b> and <b>HTTP (Port 80)</b> transmit data in 'Plain Text'. This means a hacker performing a <b>Packet Sniffing</b> attack can easily read usernames and passwords. To prevent this, secure alternatives like <b>SSH (Port 22)</b> and <b>HTTPS (Port 443)</b> must be used.",
        question: "An administrator is remotely managing a server. Which secure protocol should they use to ensure that their login credentials are encrypted and safe from 'Man-in-the-Middle' sniffing attacks?",
        options: [
            { symbol: "TEL", text: "Telnet (Port 23)" },
            { symbol: "FTP", text: "File Transfer Protocol (Port 21)" },
            { symbol: "SSH", text: "Secure Shell (Port 22)" },
            { symbol: "HTTP", text: "Hypertext Transfer Protocol (Port 80)" }
        ],
        correct: 2
    }
];

let currentStep = 0;
let score = 0;
let selectedIdx = null;

function startAssessment() {
    renderMission();
}

function renderMission() {
    const data = missionData[currentStep];
    const wrapper = document.getElementById('assessment-wrapper');
    window.scrollTo(0,0);

    wrapper.innerHTML = `
        <div class="mission-viewport">
            <div class="hud-bar">
                <div class="mission-label">MISSION ID: ${data.label}</div>
                <div class="mission-label" style="color:#94a3b8;">STEP: ${currentStep + 1} / ${missionData.length}</div>
            </div>

            <div class="intel-briefing-card">
                <div class="intel-text">${data.intel}</div>
            </div>

            <div class="objective-card">
                <h2 class="objective-title">${data.question}</h2>
                <div class="options-matrix" id="opt-matrix"></div>
                
                <div style="margin-top:25px; display:flex; justify-content:flex-end;">
                    <button class="execute-btn" onclick="handleExecution()">
                        Next Task <i class="fas fa-chevron-right" style="margin-left:10px;"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    const matrix = document.getElementById('opt-matrix');
    data.options.forEach((opt, index) => {
        const node = document.createElement('div');
        node.className = 'option-node';
        node.onclick = () => {
            document.querySelectorAll('.option-node').forEach(n => n.classList.remove('selected'));
            node.classList.add('selected');
            selectedIdx = index;
        };
        node.innerHTML = `
            <div class="node-symbol">${opt.symbol}</div>
            <div class="node-text" style="font-size:14px; font-weight:600;">${opt.text}</div>
        `;
        matrix.appendChild(node);
    });
}

function handleExecution() {
    if (selectedIdx === null) {
        alert("Action Required: Select an option before proceeding.");
        return;
    }

    if (selectedIdx === missionData[currentStep].correct) {
        score++;
    }

    currentStep++;
    selectedIdx = null;

    if (currentStep < missionData.length) {
        renderMission();
    } else {
        // We will setup the final UI here later
        const wrapper = document.getElementById('assessment-wrapper');
        wrapper.innerHTML = `
            <div class="mission-viewport" style="text-align:center; padding-top:100px;">
                <h1 style="font-size:32px; font-weight:900; color:#10b981;">ALL MISSIONS COMPLETE</h1>
                <p style="color:#94a3b8; font-size:18px; margin:20px 0;">Wait for Final Result Analysis...</p>
                <button class="execute-btn" onclick="location.reload()">Back to Home</button>
            </div>
        `;
    }
               }

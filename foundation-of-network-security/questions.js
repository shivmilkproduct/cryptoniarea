/* =============================================
   CRYPTOMIC AREA - ASSESSMENT ENGINE
   ============================================= */

const missionData = [
    {
        id: "01",
        label: "NET-ARCH-01",
        intel: "The <b>OSI Model</b> is a 7-layer architecture. <b>Layer 2 (Data Link)</b> uses physical MAC addresses, while <b>Layer 3 (Network)</b> handles logical IP routing. Switches work at L2, Routers at L3.",
        question: "When a host communicates with another device in the same local network, which address is primarily used for final delivery?",
        options: [
            { symbol: "IP", text: "IP Address (Layer 3)" },
            { symbol: "MAC", text: "MAC Address (Layer 2)" },
            { symbol: "PORT", text: "Port Number (Layer 4)" },
            { symbol: "DNS", text: "Domain Name" }
        ],
        correct: 1
    },
    {
        id: "02",
        label: "TCP-HANDSHAKE-01",
        intel: "The <b>TCP 3-Way Handshake</b> is essential for connection-oriented communication. It consists of three steps: <b>SYN</b> (Synchronize), <b>SYN-ACK</b>, and <b>ACK</b> (Acknowledge).",
        question: "In the TCP 3-way handshake, what is the second packet sent back from the server to the client?",
        options: [
            { symbol: "SYN", text: "SYN Packet" },
            { symbol: "ACK", text: "ACK Packet" },
            { symbol: "S-A", text: "SYN-ACK Packet" },
            { symbol: "FIN", text: "FIN Packet" }
        ],
        correct: 2
    },
    {
        id: "03",
        label: "SEC-PORT-01",
        intel: "Common ports are targets for hackers. <b>Port 80 (HTTP)</b> is insecure, while <b>Port 443 (HTTPS)</b> uses TLS encryption to protect data in transit.",
        question: "Which of the following ports is used by default for encrypted web traffic?",
        options: [
            { symbol: "P21", text: "Port 21 (FTP)" },
            { symbol: "P22", text: "Port 22 (SSH)" },
            { symbol: "P80", text: "Port 80 (HTTP)" },
            { symbol: "P443", text: "Port 443 (HTTPS)" }
        ],
        correct: 3
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
        score += 4;
    }

    currentStep++;
    selectedIdx = null;

    if (currentStep < missionData.length) {
        renderMission();
    } else {
        finishAssessment();
    }
}

function finishAssessment() {
    const wrapper = document.getElementById('assessment-wrapper');
    wrapper.innerHTML = `
        <div class="mission-viewport" style="text-align:center; padding-top:100px;">
            <h1 style="font-size:32px; font-weight:900; color:#10b981;">MISSION COMPLETE</h1>
            <p style="color:#94a3b8; font-size:16px; margin:20px 0;">Final Analysis Score: ${score}%</p>
            <button class="execute-btn" onclick="location.reload()">Return to Briefing</button>
        </div>
    `;
   }

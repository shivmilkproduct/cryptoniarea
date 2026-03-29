/* =============================================
   CRYPTOMIC AREA - ASSESSMENT ENGINE (V1.0)
   ============================================= */

// 1. Mission Data (Yahan hum saare 25 questions add karenge)
const missionData = [
    {
        id: "01",
        label: "NET-ARCH-01",
        intel: "The <b>OSI Model</b> (Open Systems Interconnection) is the fundamental framework for networking. While <b>Layer 3 (Network)</b> handles IP routing, <b>Layer 2 (Data Link)</b> is responsible for hardware-to-hardware communication using <b>MAC Addresses</b>. Devices like <b>Switches</b> operate at this layer and use <b>ARP (Address Resolution Protocol)</b> to find the physical address of a device on a local network.",
        question: "A security investigator notices a device is sending ARP requests but receiving no replies, causing local communication to fail. At which OSI layer should the investigator focus their technical analysis?",
        options: [
            { symbol: "L1", text: "Physical Layer (Signals/Cables)" },
            { symbol: "L2", text: "Data Link Layer (MAC/Switching)" },
            { symbol: "L3", text: "Network Layer (IP/Routing)" },
            { symbol: "L4", text: "Transport Layer (TCP/UDP)" }
        ],
        correct: 1 // Layer 2 is correct
    }
    // Baaki ke 24 missions yahan niche line-wise add honge...
];

let currentStep = 0;
let score = 0;
let selectedIdx = null;

/**
 * PHASE 1: Launch Protocol
 * (Called from index.html)
 */
function startAssessment() {
    console.log("Mission Initialized...");
    renderMission();
}

/**
 * PHASE 2: UI Rendering Engine
 */
function renderMission() {
    const data = missionData[currentStep];
    const wrapper = document.getElementById('assessment-wrapper');
    
    // Smooth transition ke liye reset scroll
    window.scrollTo(0,0);

    wrapper.innerHTML = `
        <div class="mission-viewport">
            <div class="hud-bar">
                <div class="mission-label">MISSION ID: ${data.label}</div>
                <div class="mission-label" style="background:#f8fafc; color:#64748b;">
                    PROGRESS: ${currentStep + 1} / 25
                </div>
            </div>

            <div class="intel-briefing-card">
                <span class="intel-tag"><i class="fas fa-microchip"></i> STRATEGIC INTEL</span>
                <div class="intel-text">${data.intel}</div>
            </div>

            <div class="objective-card">
                <h2 class="objective-title">${data.question}</h2>
                <div class="options-matrix" id="opt-matrix"></div>
                
                <div class="mission-footer">
                    <button class="execute-btn" onclick="handleExecution()">
                        Execute Action <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Render Options dynamically
    const matrix = document.getElementById('opt-matrix');
    data.options.forEach((opt, index) => {
        const node = document.createElement('div');
        node.className = 'option-node';
        node.onclick = () => selectOption(node, index);
        node.innerHTML = `
            <div class="node-symbol">${opt.symbol}</div>
            <div class="node-text">${opt.text}</div>
        `;
        matrix.appendChild(node);
    });
}

/**
 * PHASE 3: Logic Controllers
 */
function selectOption(el, idx) {
    // Remove active state from all nodes
    document.querySelectorAll('.option-node').forEach(n => n.classList.remove('selected'));
    // Add to current
    el.classList.add('selected');
    selectedIdx = idx;
}

function handleExecution() {
    if (selectedIdx === null) {
        alert("CRITICAL ERROR: No action selected. Select a node to proceed.");
        return;
    }

    // Score Calculation (4 points per correct answer)
    if (selectedIdx === missionData[currentStep].correct) {
        score += 4;
    }

    // Advance to next mission
    currentStep++;
    selectedIdx = null; // Reset selection

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
            <h1 style="font-size:48px; font-weight:900; color:#0f172a;">MISSION ACCOMPLISHED</h1>
            <p style="color:#64748b; font-size:20px; margin-bottom:30px;">Final Score: ${score}%</p>
            <button class="execute-btn" onclick="location.reload()">Return to Base</button>
        </div>
    `;
}

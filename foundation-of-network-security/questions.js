
/* =============================================
   CRYPTOMIC AREA - ASSESSMENT ENGINE
   ============================================= */

const missionData = [
    {
        id: "01",
        label: "OSI-INFRA-01",
        intel: "The <b>OSI Model</b> (Open Systems Interconnection) is a conceptual framework used to understand network interactions. At <b>Layer 2 (Data Link Layer)</b>, communication happens using physical hardware addresses called <b>MAC Addresses</b>. Devices like <b>Switches</b> operate here and use <b>ARP</b> (Address Resolution Protocol) to discover the MAC address associated with a known IP address. If ARP fails, communication within the local subnet is impossible.",
        question: "A Network Engineer finds that a host can communicate with the Gateway but cannot reach a specific local server. Upon inspection, the ARP table shows 'Incomplete' for the server's MAC. Which layer is responsible for this failure?",
        options: [
            { symbol: "L1", text: "Physical Layer (Cabling/Signals)" },
            { symbol: "L2", text: "Data Link Layer (MAC/Switching)" },
            { symbol: "L3", text: "Network Layer (Routing/IP)" },
            { symbol: "L4", text: "Transport Layer (TCP/UDP)" }
        ],
        correct: 1 // Layer 2 is correct
    }
];

let currentStep = 0;
let score = 0;
let selectedIdx = null;

// STEP 1: Main Button Click Logic
function startAssessment() {
    // Hide everything else (Assuming your landing page has id 'landing-page')
    const landing = document.getElementById('landing-page');
    if(landing) landing.style.display = 'none';
    
    // Show Wrapper
    const wrapper = document.getElementById('assessment-wrapper');
    wrapper.style.display = 'block';
    window.scrollTo(0,0);
    
    renderMission();
}

// STEP 2: Render Mission UI
function renderMission() {
    const data = missionData[currentStep];
    const wrapper = document.getElementById('assessment-wrapper');
    
    wrapper.innerHTML = `
        <div class="mission-viewport">
            <div class="hud-bar">
                <div class="mission-label">MISSION ID: ${data.label}</div>
                <div class="mission-label" style="background:#f8fafc; color:#64748b;">PROGRESS: ${currentStep + 1} / 25</div>
            </div>

            <div class="intel-briefing-card">
                <span class="intel-tag"><i class="fas fa-microchip"></i> STRATEGIC INTEL</span>
                <div class="intel-text">${data.intel}</div>
            </div>

            <div class="objective-card">
                <h2 class="objective-title">${data.question}</h2>
                <div class="options-matrix" id="opt-matrix"></div>
                
                <div class="mission-footer">
                    <button class="execute-btn" onclick="handleExecution()">Execute Action <i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    `;

    const matrix = document.getElementById('opt-matrix');
    data.options.forEach((opt, index) => {
        const node = document.createElement('div');
        node.className = 'option-node';
        node.onclick = () => selectNode(node, index);
        node.innerHTML = `
            <div class="node-symbol">${opt.symbol}</div>
            <div class="node-text">${opt.text}</div>
        `;
        matrix.appendChild(node);
    });
}

// STEP 3: Handle Selection
function selectNode(el, idx) {
    document.querySelectorAll('.option-node').forEach(n => n.classList.remove('selected'));
    el.classList.add('selected');
    selectedIdx = idx;
}

// STEP 4: Handle Execution (Next Button)
function handleExecution() {
    if (selectedIdx === null) {
        alert("CRITICAL ERROR: No action selected. Please select a node to proceed.");
        return;
    }

    // Logic: Score Update
    if (selectedIdx === missionData[currentStep].correct) {
        score += 4;
    }

    // Next Question or Result
    currentStep++;
    selectedIdx = null;

    if (currentStep < missionData.length) {
        renderMission();
    } else {
        alert("Assessment Completed. Final Score: " + score);
        // Yahan hum Result Page load karenge baad mein
    }
}

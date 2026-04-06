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
    },
       {
        id: "04",
        label: "HANDSHAKE-04",
        intel: "The <b>TCP 3-Way Handshake</b> is the foundation of reliable communication. It uses three steps: <b>SYN</b> (Synchronize), <b>SYN-ACK</b>, and <b>ACK</b> (Acknowledge). If a hacker sends thousands of SYN packets but never sends the final ACK, it creates a <b>SYN Flood Attack</b>, which can crash a server by exhausting its resources.",
        question: "During a standard TCP connection setup, what is the specific second packet sent by the Server back to the Client to acknowledge the connection request?",
        options: [
            { symbol: "SYN", text: "Initial SYN Packet" },
            { symbol: "ACK", text: "Final ACK Packet" },
            { symbol: "S-A", text: "SYN-ACK Packet" },
            { symbol: "FIN", text: "FIN (Finish) Packet" }
        ],
        correct: 2
    },
    {
        id: "05",
        label: "PORT-SCAN-05",
        intel: "Networking services use specific <b>Ports</b> to communicate. For example, <b>DNS</b> (Domain Name System) uses <b>Port 53</b> to translate website names into IP addresses. If Port 53 is blocked or hijacked (DNS Spoofing), users might be redirected to fake phishing websites even if they type the correct URL.",
        question: "A network administrator is troubleshooting why employees cannot access websites by their domain names (e.g., google.com) but can access them via direct IP. Which port is likely being blocked by the firewall?",
        options: [
            { symbol: "P25", text: "Port 25 (SMTP)" },
            { symbol: "P53", text: "Port 53 (DNS)" },
            { symbol: "P80", text: "Port 80 (HTTP)" },
            { symbol: "P110", text: "Port 110 (POP3)" }
        ],
        correct: 1
    },
    {
        id: "06",
        label: "WIFI-CRYPTO-06",
        intel: "Wireless networks use encryption to protect data. <b>WEP</b> is the oldest and weakest (can be hacked in minutes). <b>WPA2</b> is the current standard using <b>AES encryption</b>, while <b>WPA3</b> is the newest, most secure version that protects against 'Brute Force' dictionary attacks on Wi-Fi passwords.",
        question: "Which Wi-Fi security protocol is considered the most secure today and provides the best protection against offline dictionary attacks on the network password?",
        options: [
            { symbol: "WEP", text: "WEP (Wired Equivalent Privacy)" },
            { symbol: "WPA", text: "WPA (Legacy)" },
            { symbol: "WPA2", text: "WPA2-AES" },
            { symbol: "WPA3", text: "WPA3 (Next-Gen)" }
        ],
        correct: 3
    },
       {
        id: "07",
        label: "FWL-RULE-07",
        intel: "A <b>Firewall</b> acts as a gatekeeper using an <b>ACL (Access Control List)</b>. Most enterprise firewalls follow the <b>'Implicit Deny'</b> rule, which means if a specific type of traffic isn't explicitly allowed, it is automatically blocked. To allow web browsing, an admin must specifically open <b>Port 80 (HTTP)</b> and <b>Port 443 (HTTPS)</b> for outgoing traffic.",
        question: "A company installs a new firewall and suddenly no one can visit any websites, although they can still send internal emails. What is the most likely cause of this issue?",
        options: [
            { symbol: "DB", text: "The Database server is offline" },
            { symbol: "ACL", text: "Ports 80/443 are blocked by the ACL" },
            { symbol: "NIC", text: "The Network Card is physically broken" },
            { symbol: "IP", text: "The computer lost its IP Address" }
        ],
        correct: 1
    },
    {
        id: "08",
        label: "NET-ID-08",
        intel: "Every device on a network needs a unique <b>IP Address</b>. If two devices are manually assigned the same IP, an <b>IP Address Conflict</b> occurs, and neither device will be able to communicate reliably. Most networks use <b>DHCP</b> to automatically assign unique addresses and avoid this human error.",
        question: "Two employees in the same office suddenly lose internet access. The system shows an error: 'Another device on this network has the same address.' What is this situation called?",
        options: [
            { symbol: "SUB", text: "Subnet Masking" },
            { symbol: "DYN", text: "Dynamic Routing" },
            { symbol: "CON", text: "IP Address Conflict" },
            { symbol: "GAT", text: "Default Gateway Error" }
        ],
        correct: 2
    },
    {
        id: "09",
        label: "TRANS-PROTO-09",
        intel: "<b>OSI Layer 4 (Transport)</b> uses two main protocols: <b>TCP</b> and <b>UDP</b>. TCP is 'Connection-Oriented' (slow but reliable, used for Files/Web), while UDP is 'Connectionless' (fast but loses data, used for Video Streaming/Gaming). If you are watching a Live Stream and the video glitches for a second, it's usually because a UDP packet was lost.",
        question: "You are building a Real-Time Voice Chat application where speed is more important than 100% perfect data delivery. Which Transport Layer protocol should your application use?",
        options: [
            { symbol: "TCP", text: "TCP (Reliable/Slow)" },
            { symbol: "UDP", text: "UDP (Fast/Unreliable)" },
            { symbol: "ARP", text: "ARP (Hardware Mapping)" },
            { symbol: "FTP", text: "FTP (File Transfer)" }
        ],
        correct: 1
    },
       {
        id: "10",
        label: "IP-ADDR-10",
        intel: "<b>Private IP Addresses</b> (like 192.168.x.x) are used inside a home or office network and cannot be seen directly from the internet. To communicate with the outside world, a router uses <b>NAT (Network Address Translation)</b> to map all internal private IPs to a single <b>Public IP Address</b> provided by the ISP. This acts as a basic security layer by hiding internal device identities.",
        question: "A security auditor is checking a company's web server logs and notices that 50 different internal employee computers are appearing as the 'same' IP address on the internet. What technology is making this possible?",
        options: [
            { symbol: "DNS", text: "Domain Name System" },
            { symbol: "NAT", text: "Network Address Translation" },
            { symbol: "DHCP", text: "Dynamic Configuration" },
            { symbol: "MAC", text: "MAC Filtering" }
        ],
        correct: 1
    },
    {
        id: "11",
        label: "GATEWAY-11",
        intel: "The <b>Default Gateway</b> is the 'Exit Door' of your local network. It is usually the internal IP address of your router. If a computer wants to send data to an IP address that is NOT in its own local network (like a website), it automatically sends that data to the Default Gateway to be routed out.",
        question: "An employee can print to the local office printer and share files with colleagues, but they cannot open any websites or access the internet. Which network setting is most likely misconfigured on their computer?",
        options: [
            { symbol: "SUB", text: "Subnet Mask" },
            { symbol: "IP", text: "Local IP Address" },
            { symbol: "GAT", text: "Default Gateway" },
            { symbol: "MAC", text: "Hardware Address" }
        ],
        correct: 2
    },
    {
        id: "12",
        label: "DHCP-SEC-12",
        intel: "<b>DHCP (Dynamic Host Configuration Protocol)</b> automatically assigns IP addresses, Subnet Masks, and Gateways to devices when they join a network. Without DHCP, you would have to manually type these settings into every phone and laptop. However, a 'Rogue DHCP' attack can happen if a hacker sets up a fake server to give wrong settings to users.",
        question: "When you join a coffee shop's Wi-Fi, your phone instantly gets an IP address without you doing anything. Which protocol is responsible for this automatic assignment?",
        options: [
            { symbol: "HTTP", text: "Hypertext Protocol" },
            { symbol: "DHCP", text: "Dynamic Host Configuration Protocol" },
            { symbol: "FTP", text: "File Transfer Protocol" },
            { symbol: "SNMP", text: "Simple Network Management" }
        ],
        correct: 1
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

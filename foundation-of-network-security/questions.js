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
    },
       {
        id: "13",
        label: "SEGMENT-13",
        intel: "A <b>VLAN (Virtual Local Area Network)</b> allows an administrator to divide a single physical switch into multiple logical networks. This is crucial for security; for example, you can put <b>Guest Wi-Fi</b> users on one VLAN and <b>Server Admins</b> on another. Even if they are plugged into the same switch, they cannot talk to each other unless a router specifically allows it.",
        question: "A company wants to ensure that the 'Sales' department cannot access the private 'Finance' servers, even though all computers are connected to the same physical network switch. What technology should be used to create this internal boundary?",
        options: [
            { symbol: "VPN", text: "Virtual Private Network" },
            { symbol: "VLAN", text: "Virtual Local Area Network" },
            { symbol: "WLAN", text: "Wireless Local Area Network" },
            { symbol: "ISP", text: "Internet Service Provider" }
        ],
        correct: 1
    },
    {
        id: "14",
        label: "SUBNET-14",
        intel: "The <b>Subnet Mask</b> (e.g., 255.255.255.0) tells a computer which part of its IP address belongs to the <b>Network</b> and which part belongs to the <b>Host</b> (the device). If two computers have the same network part, they can talk directly. If the network parts are different, they MUST use a router to communicate.",
        question: "Computer A has an IP of 192.168.1.5 and Computer B has 192.168.2.10. Both have a Subnet Mask of 255.255.255.0. Why can't they communicate with each other directly without a router?",
        options: [
            { symbol: "DUP", text: "They have Duplicate IP Addresses" },
            { symbol: "DIF", text: "They belong to different Subnets" },
            { symbol: "MAC", text: "Their MAC Addresses are identical" },
            { symbol: "OFF", text: "One of the computers is turned off" }
        ],
        correct: 1
    },
    {
        id: "15",
        label: "FORWARD-15",
        intel: "<b>Port Forwarding</b> is used when you want an external user on the internet to reach a specific device inside your private home network. For example, if you host a web server at home, you tell your router: 'Any traffic coming to my Public IP on <b>Port 80</b> should be sent directly to <b>192.168.1.10</b> (my internal server).'",
        question: "You have set up a security camera system at home (Private IP: 192.168.1.50). You want to view the live feed from your office using the internet. What must you configure on your home router to allow this external access?",
        options: [
            { symbol: "DHCP", text: "DHCP Reservation" },
            { symbol: "MAC", text: "MAC Address Filtering" },
            { symbol: "FWD", text: "Port Forwarding" },
            { symbol: "DNS", text: "DNS Cache Clearing" }
        ],
        correct: 2
    },
       {
        id: "16",
        label: "FIREWALL-16",
        intel: "A <b>Stateful Inspection Firewall</b> is smarter than a basic filter. It doesn't just look at one packet; it keeps track of the entire conversation (the 'State'). If it sees an incoming packet that wasn't requested by an internal user, it drops it immediately. This prevents hackers from sending unsolicited malicious data into your network.",
        question: "A hacker tries to send a malicious file to an internal computer, but the firewall blocks it because no 'Session' was ever started from the inside. What type of firewall feature is providing this protection?",
        options: [
            { symbol: "STF", text: "Stateful Inspection" },
            { symbol: "STL", text: "Stateless Filtering" },
            { symbol: "MAC", text: "MAC Address Filtering" },
            { symbol: "PRX", text: "Basic Proxy Server" }
        ],
        correct: 0
    },
    {
        id: "17",
        label: "PROXY-SEC-17",
        intel: "A <b>Proxy Server</b> acts as an intermediary. Instead of your computer connecting directly to a website, it asks the Proxy to get the data for it. This hides your internal IP address from the web server and allows the company to filter out 'bad' websites (like social media or gambling sites) at a single point.",
        question: "An organization wants to hide the internal IP addresses of all its employees while they browse the internet and also block access to non-work related websites. Which device is best suited for this?",
        options: [
            { symbol: "HUB", text: "Network Hub" },
            { symbol: "PRX", text: "Proxy Server" },
            { symbol: "MOD", text: "DSL Modem" },
            { symbol: "REP", text: "Signal Repeater" }
        ],
        correct: 1
    },
    {
        id: "18",
        label: "SNIFF-SEC-18",
        intel: "<b>Packet Sniffing</b> is a technique where a hacker captures data as it travels across a network. Tools like <b>Wireshark</b> can see everything—passwords, emails, and files—if the data is not encrypted. This is why <b>End-to-End Encryption</b> is the only way to ensure that even if a packet is captured, it cannot be read.",
        question: "A security analyst uses Wireshark to monitor network traffic and notices they can read the 'Admin' password in clear text because the login page uses HTTP. What type of attack/activity is the analyst performing?",
        options: [
            { symbol: "DOS", text: "Denial of Service" },
            { symbol: "SQL", text: "SQL Injection" },
            { symbol: "SNI", text: "Packet Sniffing" },
            { symbol: "BFA", text: "Brute Force Attack" }
        ],
        correct: 2
    },
       {
        id: "19",
        label: "VPN-TUNNEL-19",
        intel: "A <b>VPN (Virtual Private Network)</b> creates an encrypted 'Tunnel' between your device and a remote server. Even if you are using an untrusted Public Wi-Fi, anyone sniffing the packets will only see scrambled, unreadable data. It also masks your real <b>Public IP Address</b>, making it appear as if your traffic is coming from the VPN server's location.",
        question: "A journalist is working from a public coffee shop and needs to send sensitive documents to their office. Which technology should they use to ensure their ISP or a local hacker cannot see the content of their traffic?",
        options: [
            { symbol: "INC", text: "Browser Incognito Mode" },
            { symbol: "VPN", text: "VPN (Virtual Private Network)" },
            { symbol: "DNS", text: "Public DNS (8.8.8.8)" },
            { symbol: "MAC", text: "MAC Address Changer" }
        ],
        correct: 1
    },
    {
        id: "20",
        label: "DETECTION-20",
        intel: "An <b>IDS (Intrusion Detection System)</b> is like a security camera; it watches traffic and alerts you if it sees something suspicious. An <b>IPS (Intrusion Prevention System)</b> is like a security guard; it not only watches but also acts immediately to <b>Block</b> or drop the malicious packets the moment they are detected.",
        question: "Your network is under a 'Brute Force' attack. You want a system that will not just 'notify' you about the attack but will also automatically 'disconnect' the hacker's IP address. What do you need?",
        options: [
            { symbol: "IDS", text: "IDS (Detection Only)" },
            { symbol: "IPS", text: "IPS (Prevention/Blocking)" },
            { symbol: "HUB", text: "Network Hub" },
            { symbol: "AVS", text: "Standard Antivirus" }
        ],
        correct: 1
    },
    {
        id: "21",
        label: "TOPOLOGY-21",
        intel: "In a <b>Star Topology</b>, every device is connected to a central <b>Switch</b> or Hub. If one cable breaks, only that one computer loses connection. However, if the central Switch fails, the entire network goes down. This is the most common setup in modern offices and homes.",
        question: "In your home network, all laptops and phones are connected to a single central Wi-Fi Router. If one laptop's Wi-Fi fails, the others still work. But if the Router is turned off, everyone loses access. What topology is this?",
        options: [
            { symbol: "BUS", text: "Bus Topology" },
            { symbol: "RING", text: "Ring Topology" },
            { symbol: "STAR", text: "Star Topology" },
            { symbol: "MESH", text: "Mesh Topology" }
        ],
        correct: 2
    },
       {
        id: "22",
        label: "ZERO-TRUST-22",
        intel: "The <b>Zero Trust</b> model operates on the principle of <b>'Never Trust, Always Verify'</b>. In traditional security, once you were inside the office Wi-Fi, you were trusted. In Zero Trust, every single request (even from inside the office) must be authenticated and encrypted. This prevents a hacker who has stolen one password from moving freely across the entire network.",
        question: "A company decides to stop trusting devices just because they are connected to the internal office cable. Now, every user must provide a code and a fingerprint every time they access a server. What security strategy is this?",
        options: [
            { symbol: "PER", text: "Perimeter-Based Security" },
            { symbol: "ZTR", text: "Zero Trust Architecture" },
            { symbol: "WPA", text: "Standard WPA Encryption" },
            { symbol: "MAC", text: "MAC Address Cloning" }
        ],
        correct: 1
    },
    {
        id: "23",
        label: "MAC-FILTER-23",
        intel: "<b>MAC Filtering</b> is a security method where a router is given a list of 'Allowed' hardware addresses. If a device's MAC address is not on that list, the router will refuse to give it an IP address. While this is a good basic step, professional hackers can use <b>MAC Spoofing</b> to pretend their laptop is one of the allowed devices.",
        question: "An administrator wants to ensure that ONLY the 5 specific company laptops can connect to the breakroom Wi-Fi. What feature should they enable on the Wireless Access Point?",
        options: [
            { symbol: "DNS", text: "DNS Redirect" },
            { symbol: "DHCP", text: "DHCP IP Pool" },
            { symbol: "MFB", text: "MAC Address Filtering" },
            { symbol: "NAT", text: "Network Translation" }
        ],
        correct: 2
    },
    {
        id: "24",
        label: "TTL-RECON-24",
        intel: "<b>TTL (Time To Live)</b> is a value in an IP packet that tells it how many 'Hops' (routers) it can pass through before it expires. This prevents packets from looping forever if there is a mistake in the network. Interestingly, different Operating Systems use different default TTLs (e.g., <b>Linux is usually 64</b>, <b>Windows is 128</b>), which helps hackers identify the OS during a scan.",
        question: "A security investigator pings a target and notices the returned packets have a TTL value of 64. Based on common networking standards, which operating system is the target likely running?",
        options: [
            { symbol: "WIN", text: "Windows Server" },
            { symbol: "LNX", text: "Linux / Unix" },
            { symbol: "CIS", text: "Cisco Router (Legacy)" },
            { symbol: "UNK", text: "Unknown OS" }
        ],
        correct: 1
    },
       {
        id: "25",
        label: "FINAL-BOSS-25",
        intel: "In a real-world cyber attack, investigators look for the <b>'Point of Failure'</b>. If you can <b>Ping</b> a server (ICMP works), the <b>Physical and Network layers</b> are fine. If you can't access the website, the issue is at the <b>Application Layer</b> (Port 80/443). If you can access it via IP but not by Name, <b>DNS</b> is the problem. Understanding this 'Elimination Process' is the mark of a true Network Security Professional.",
        question: "A web server (192.168.1.100) is 'Up'. You can Ping it successfully. However, when you try to open the website 'http://internal.test', the browser says 'Connection Refused'. You then try 'https://internal.test' and it works perfectly. What is the most likely security configuration causing this?",
        options: [
            { symbol: "CAB", text: "The Ethernet cable is unplugged" },
            { symbol: "DNS", text: "The DNS Server is completely offline" },
            { symbol: "FWL", text: "Firewall is blocking Port 80 but allowing 443" },
            { symbol: "IPC", text: "There is an IP Address Conflict" }
        ],
        correct: 2
       },
       {
        id: "26",
        label: "NET-AUTO-26",
        intel: "<b>DHCP</b> is a service that automatically hands out IP addresses to devices when they join a network. Without it, you would have to manually type in an IP, Subnet Mask, and Gateway for every single phone or laptop. If DHCP fails, your device might show an 'Automatic Private IP' (starting with 169.254.x.x), which means it can't talk to the internet.",
        question: "When you connect your phone to a new Wi-Fi, it gets an IP address instantly without you doing anything. Which network protocol is responsible for this automatic configuration?",
        options: [
            { symbol: "HTTP", text: "Hypertext Transfer Protocol" },
            { symbol: "DHCP", text: "Dynamic Host Configuration Protocol" },
            { symbol: "FTP", text: "File Transfer Protocol" },
            { symbol: "SSH", text: "Secure Shell Protocol" }
        ],
        correct: 1
    },
    {
        id: "27",
        label: "NET-NAME-27",
        intel: "The <b>DNS (Domain Name System)</b> acts like the internet's phonebook. Computers only understand numbers (IP addresses), but humans prefer names like 'google.com'. When you type a name, DNS finds the matching IP address. If your DNS is wrong, you can't open websites by their names, even if your internet is technically 'on'.",
        question: "An employee can ping an IP address (like 8.8.8.8) successfully, but they cannot open 'google.com' in their browser. Which network service is most likely having an issue?",
        options: [
            { symbol: "NIC", text: "Network Interface Card" },
            { symbol: "ARP", text: "Address Resolution Protocol" },
            { symbol: "DNS", text: "Domain Name System" },
            { symbol: "MAC", text: "Media Access Control" }
        ],
        correct: 2
    },
    {
        id: "28",
        label: "NET-ID-28",
        intel: "Every network device has a <b>MAC Address</b>, which is a permanent hardware ID assigned by the manufacturer. While an <b>IP Address</b> changes depending on which network you join, the MAC address stays the same for the life of the device. It is used by switches to deliver data to the correct physical machine.",
        question: "Which of the following is a unique hardware identifier that is 'burned' into a network card and does not change, regardless of which network the device joins?",
        options: [
            { symbol: "MAC", text: "MAC Address" },
            { symbol: "IPV4", text: "IPv4 Address" },
            { symbol: "SUB", text: "Subnet Mask" },
            { symbol: "GAT", text: "Default Gateway" }
        ],
        correct: 0
    },
       {
        id: "29",
        label: "IP-TYPES-29",
        intel: "<b>Private IP Addresses</b> (like 192.168.x.x) are used inside your home or office. They are free and hidden from the outside world. Your <b>Public IP Address</b> is the unique ID given by your ISP (Internet Service Provider) that identifies your entire house to the rest of the internet. It's like your house number vs. the rooms inside.",
        question: "You are checking your IP address at home and it says 192.168.1.15. However, when you visit 'whatismyip.com', it shows a completely different number. What is that second number called?",
        options: [
            { symbol: "MAC", text: "MAC Address" },
            { symbol: "DYN", text: "Dynamic Internal IP" },
            { symbol: "PUB", text: "Public IP Address" },
            { symbol: "LCL", text: "Localhost Address" }
        ],
        correct: 2
    },
    {
        id: "30",
        label: "GATEWAY-30",
        intel: "The <b>Default Gateway</b> is the 'Exit Door' of your local network. It is usually the IP address of your <b>Router</b>. When your computer wants to send data to a website (which is outside your home), it sends the data to the Default Gateway first. If this address is wrong, you can talk to other PCs in your house, but you can't reach the internet.",
        question: "In a network configuration, which setting acts as the 'Exit' point that allows local devices to communicate with external networks and the internet?",
        options: [
            { symbol: "GAT", text: "Default Gateway" },
            { symbol: "SUB", text: "Subnet Mask" },
            { symbol: "DNS", text: "DNS Suffix" },
            { symbol: "LOOP", text: "Loopback Address" }
        ],
        correct: 0
    },
    {
        id: "31",
        label: "OSI-LAY-31",
        intel: "The <b>OSI Model</b> has 7 layers. The <b>Physical Layer (Layer 1)</b> is all about the actual hardware like cables, pins, and electricity. The <b>Application Layer (Layer 7)</b> is what you interact with, like your Browser or Email app. Understanding these layers helps you figure out if a problem is a 'broken cable' or a 'software bug'.",
        question: "At which layer of the OSI model do physical components like Ethernet cables, Hubs, and Fiber Optic connectors operate?",
        options: [
            { symbol: "L7", text: "Layer 7 (Application)" },
            { symbol: "L3", text: "Layer 3 (Network)" },
            { symbol: "L1", text: "Layer 1 (Physical)" },
            { symbol: "L4", text: "Layer 4 (Transport)" }
        ],
        correct: 2
           },
       {
        id: "32",
        label: "PORT-WEB-32",
        intel: "<b>Port Numbers</b> are like virtual doors on a server. <b>Port 80</b> is used for HTTP (Unsecured web traffic), and <b>Port 443</b> is used for HTTPS (Secured/Encrypted web traffic). When you see a 'Lock' icon in your browser, it means you are communicating over Port 443. This prevents hackers from reading your passwords in plain text.",
        question: "You are setting up a secure e-commerce website where customers enter credit card details. Which port must be open on your web server to allow 'HTTPS' encrypted connections?",
        options: [
            { symbol: "P21", text: "Port 21" },
            { symbol: "P80", text: "Port 80" },
            { symbol: "P443", text: "Port 443" },
            { symbol: "P53", text: "Port 53" }
        ],
        correct: 2
    },
    {
        id: "33",
        label: "FIREWALL-33",
        intel: "A <b>Firewall</b> is a security system that monitors and controls incoming and outgoing network traffic based on <b>Rules</b>. It acts as a barrier between your safe internal network and the dangerous internet. It can block specific IP addresses or entire countries from accessing your server.",
        question: "What is the primary purpose of a Network Firewall in a company's infrastructure?",
        options: [
            { symbol: "SPD", text: "To increase the internet speed" },
            { symbol: "FIL", text: "To filter and block unauthorized traffic" },
            { symbol: "STG", text: "To store large amounts of data" },
            { symbol: "PRT", text: "To print documents wirelessly" }
        ],
        correct: 1
    },
    {
        id: "34",
        label: "WIFI-SEC-34",
        intel: "Wi-Fi security has evolved over time. <b>WEP</b> is the oldest and weakest (can be hacked in minutes). <b>WPA2</b> is the current standard, and <b>WPA3</b> is the latest and most secure. For a modern office, using WPA2 or WPA3 with a strong password is the minimum requirement to prevent unauthorized access.",
        question: "You are configuring a new Wi-Fi router for a small business. Which security protocol should you choose to provide the strongest protection against modern hackers?",
        options: [
            { symbol: "WEP", text: "WEP (Wired Equivalent Privacy)" },
            { symbol: "WPA", text: "WPA2 or WPA3" },
            { symbol: "OPN", text: "Open (No Password)" },
            { symbol: "HTTP", text: "HTTP Secure" }
        ],
        correct: 1
    },
       {
        id: "35",
        label: "NAT-LOGIC-35",
        intel: "<b>NAT (Network Address Translation)</b> is a technique used by your router to allow multiple devices (phones, laptops, TVs) to share a <b>Single Public IP Address</b>. It acts like a receptionist in an office who takes all incoming mail and delivers it to the correct internal desk. Without NAT, we would have run out of IPv4 addresses many years ago.",
        question: "Your home has 10 devices connected to the Wi-Fi, but your ISP only gives you 1 Public IP address. Which technology allows all 10 devices to access the internet simultaneously using that one IP?",
        options: [
            { symbol: "DNS", text: "Domain Name System" },
            { symbol: "NAT", text: "Network Address Translation" },
            { symbol: "FTP", text: "File Transfer Protocol" },
            { symbol: "ARP", text: "Address Resolution Protocol" }
        ],
        correct: 1
    },
    {
        id: "36",
        label: "LOOP-TEST-36",
        intel: "The <b>Loopback Address (127.0.0.1)</b> is a special IP address that points back to your own computer. It is used to test if your computer's <b>Network Stack</b> (software) is working correctly. If you can 'Ping' 127.0.0.1 but cannot reach the internet, it means your computer is fine, but the problem is with the cable, router, or ISP.",
        question: "An IT technician wants to verify if the networking software on a computer is functioning correctly, regardless of any external cables or hardware. Which IP address should they 'Ping'?",
        options: [
            { symbol: "888", text: "8.8.8.8 (Google DNS)" },
            { symbol: "GTW", text: "192.168.1.1 (Gateway)" },
            { symbol: "LBP", text: "127.0.0.1 (Loopback)" },
            { symbol: "BRD", text: "255.255.255.255 (Broadcast)" }
        ],
        correct: 2
    },
    {
        id: "37",
        label: "LAYER3-RT-37",
        intel: "A <b>Router</b> operates at <b>OSI Layer 3 (Network Layer)</b>. Its main job is to find the best path for data to travel between <b>Different Networks</b> (like your home network and the internet). While a Switch connects devices *inside* a network, a Router connects *multiple networks* together using <b>IP Addresses</b>.",
        question: "Which networking device is responsible for directing data traffic between different networks and operates at Layer 3 of the OSI model?",
        options: [
            { symbol: "RTR", text: "Router" },
            { symbol: "SWI", text: "Network Switch" },
            { symbol: "HUB", text: "Hub" },
            { symbol: "NIC", text: "Network Interface Card" }
        ],
        correct: 0
               },
       {
        id: "38",
        label: "REMOTE-SEC-38",
        intel: "<b>SSH (Secure Shell)</b> and <b>Telnet</b> are both used to manage network devices (like routers) remotely. The big difference is security: <b>Telnet</b> sends everything in plain text (passwords can be seen by hackers), while <b>SSH</b> encrypts all data. In modern networking, Telnet is considered 'Dead' and SSH is the only professional choice.",
        question: "An admin needs to log into a remote router to change its settings. Which protocol should they use to ensure their login password is encrypted and safe from sniffers?",
        options: [
            { symbol: "TEL", text: "Telnet" },
            { symbol: "FTP", text: "FTP (File Transfer)" },
            { symbol: "SSH", text: "SSH (Secure Shell)" },
            { symbol: "UDP", text: "UDP Protocol" }
        ],
        correct: 2
    },
    {
        id: "39",
        label: "VLAN-LOGIC-39",
        intel: "A <b>VLAN (Virtual Local Area Network)</b> allows you to split one physical switch into multiple 'Virtual' networks. For example, you can put the 'Accounting' computers and 'Guest Wi-Fi' on the same switch but keep them completely separated so they can't talk to each other. This increases security without buying more hardware.",
        question: "A company wants to separate the 'HR' department's traffic from the 'Sales' department, even though they are plugged into the same physical switch. What technology should they use?",
        options: [
            { symbol: "VPN", text: "VPN (Virtual Private Network)" },
            { symbol: "VLA", text: "VLAN (Virtual LAN)" },
            { symbol: "NAT", text: "NAT (Address Translation)" },
            { symbol: "MAC", text: "MAC Filtering" }
        ],
        correct: 1
    },
    {
        id: "40",
        label: "SUBNET-LOG-40",
        intel: "<b>Subnetting</b> is the process of breaking a large network into smaller, manageable pieces called <b>Subnets</b>. This reduces 'Broadcast Traffic' (noise) and improves security. For example, a <b>/24 subnet</b> (255.255.255.0) allows for 254 usable IP addresses, which is the standard for most small offices.",
        question: "What is the primary reason an IT architect would use 'Subnetting' when designing a large corporate network?",
        options: [
            { symbol: "SPD", text: "To increase the physical speed of the cables" },
            { symbol: "DNC", text: "To divide a large network into smaller, efficient segments" },
            { symbol: "WEB", text: "To host more websites on a single server" },
            { symbol: "POW", text: "To reduce the power consumption of routers" }
        ],
        correct: 1
    },
       {
        id: "41",
        label: "PROXY-LOGIC-41",
        intel: "A <b>Proxy Server</b> acts as an intermediary between your computer and the internet. When you request a website, the Proxy fetches it for you. This helps in <b>Anonymity</b> (the website sees the Proxy's IP, not yours) and <b>Caching</b> (storing popular pages so they load faster for everyone in the office).",
        question: "An organization wants to hide the internal IP addresses of its employees' computers when they browse the web and also block certain unproductive websites. Which device or service should they implement?",
        options: [
            { symbol: "HUB", text: "Network Hub" },
            { symbol: "PRX", text: "Proxy Server" },
            { symbol: "MOD", text: "DSL Modem" },
            { symbol: "REP", text: "Signal Repeater" }
        ],
        correct: 1
    },
    {
        id: "42",
        label: "DHCP-RES-42",
        intel: "<b>DHCP Reservation</b> is a feature where the router is told to 'Always give THIS specific IP to THIS specific MAC address'. It's the best of both worlds: you get the stability of a <b>Static IP</b> but the ease of <b>DHCP</b> management. It's commonly used for office printers and shared file servers.",
        question: "A network admin wants a specific server to always receive the same IP address (192.168.1.50) automatically every time it reboots, without manually configuring the server's OS. What should they configure on the DHCP server?",
        options: [
            { symbol: "DNS", text: "DNS Record" },
            { symbol: "SCP", text: "DHCP Scope Delete" },
            { symbol: "RES", text: "DHCP Reservation (IP-to-MAC Binding)" },
            { symbol: "NAT", text: "NAT Forwarding" }
        ],
        correct: 2
    },
    {
        id: "43",
        label: "APIPA-LOGIC-43",
        intel: "<b>APIPA (Automatic Private IP Addressing)</b> is a backup plan. If your computer is set to get an IP automatically but the <b>DHCP Server fails</b> to respond, Windows assigns itself an address in the <b>169.254.x.x</b> range. If you see this IP, it's a 100% sign that your computer cannot talk to the Router's DHCP service.",
        question: "A user restarts their laptop and notices they cannot access the internet. You check their IP address and see it is '169.254.10.45'. What does this specific IP range indicate?",
        options: [
            { symbol: "CON", text: "The connection is perfectly fine" },
            { symbol: "DHF", text: "The device failed to reach a DHCP server" },
            { symbol: "PUB", text: "The device has a valid Public IP" },
            { symbol: "VPN", text: "The VPN is currently active" }
        ],
        correct: 1
    },
       {
        id: "44",
        label: "OSI-RECAP-44",
        intel: "The <b>OSI Model</b> is the language of networking. If a technician says 'It's a Layer 1 issue,' they mean a cable is unplugged. If they say 'Layer 3 issue,' they mean a Router or IP problem. <b>Layer 4 (Transport)</b> is where TCP and UDP live, ensuring data arrives in the right order and without errors.",
        question: "A technician is troubleshooting a connection and says, 'The hardware is fine, but the data packets are not being routed to the correct network.' Which layer of the OSI model is they referring to?",
        options: [
            { symbol: "L2", text: "Layer 2 (Data Link)" },
            { symbol: "L1", text: "Layer 1 (Physical)" },
            { symbol: "L3", text: "Layer 3 (Network)" },
            { symbol: "L7", text: "Layer 7 (Application)" }
        ],
        correct: 2
    },
    {
        id: "45",
        label: "FINAL-SCENARIO-45",
        intel: "A complete network setup requires: a <b>Modem</b> for internet, a <b>Router</b> to manage traffic (DHCP/NAT), a <b>Switch</b> to connect devices, and a <b>Firewall</b> for security. If any one of these fails, the whole chain can break. Understanding how they all work together is the true 'Foundation of Network Security'.",
        question: "FINAL CHALLENGE: You are building a secure office network. You need a device to connect to the ISP, a device to assign IPs automatically, and a device to block hackers. Which combination is correct?",
        options: [
            { symbol: "C1", text: "Hub, Repeater, and Bridge" },
            { symbol: "C2", text: "Modem, DHCP Server (Router), and Firewall" },
            { symbol: "C3", text: "Switch, Access Point, and Monitor" },
            { symbol: "C4", text: "Cable, Connector, and Battery" }
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

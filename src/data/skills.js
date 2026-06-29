export const skillCategories = [
  {
    id: "networking",
    label: "Networking",
    icon: "FaNetworkWired",
    color: "purple",
    skills: [
      { name: "LAN / WAN Design & Installation", level: 95 },
      { name: "Router & Switch Configuration", level: 93 },
      { name: "Structured Cabling (Cat5e/Cat6)", level: 96 },
      { name: "Network Troubleshooting", level: 94 },
      { name: "Wireless Network Setup (AP/SSID)", level: 90 },
      { name: "VLAN & Subnetting", level: 88 },
      { name: "Firewall & Network Security", level: 85 },
      { name: "VPN Configuration", level: 82 },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    icon: "FaMicrochip",
    color: "orange",
    skills: [
      { name: "Hardware Troubleshooting & Repair", level: 96 },
      { name: "Preventive Maintenance (PM)", level: 95 },
      { name: "Desktop & Laptop Servicing", level: 94 },
      { name: "Server Hardware Maintenance", level: 88 },
      { name: "Component Diagnostics & Replacement", level: 93 },
      { name: "Thermal Management & Cleaning", level: 95 },
      { name: "Peripheral Installation & Config", level: 92 },
      { name: "UPS & Power Systems", level: 84 },
    ],
  },
  {
    id: "monitoring",
    label: "IT Monitoring",
    icon: "FaChartLine",
    color: "rose",
    skills: [
      { name: "IT Infrastructure Monitoring", level: 92 },
      { name: "Network Performance Analysis", level: 90 },
      { name: "Uptime & Availability Tracking", level: 93 },
      { name: "Incident Detection & Response", level: 88 },
      { name: "Asset Lifecycle Management", level: 90 },
      { name: "IT Documentation & SOPs", level: 91 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "FaCode",
    color: "primary",
    skills: [
      { name: "React.js", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "HTML5 & CSS3", level: 95 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "FaServer",
    color: "secondary",
    skills: [
      { name: "Node.js & Express.js", level: 82 },
      { name: "REST API Design", level: 85 },
      { name: "MySQL & PostgreSQL", level: 80 },
      { name: "Linux / Server Admin", level: 84 },
    ],
  },
];

export const techBadges = [
  // Networking first
  "LAN / WAN", "Cisco Switches", "Router Config", "Structured Cabling",
  "VLAN", "Wireless AP", "Firewall", "VPN",
  // Hardware
  "Hardware Repair", "Preventive Maintenance", "Server Hardware", "UPS Systems",
  // Monitoring & IT
  "IT Monitoring", "Asset Management", "Network Diagnostics", "Linux",
  // Software
  "React.js", "Node.js", "MySQL", "REST API", "Git",
];

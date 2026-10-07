export const profile = {
 name: 'Rohan Mandal',
 email: 'mandalrohan798@gmail.com',
 linkedin: 'https://www.linkedin.com/in/rohan-mandal-978a1b283/',
 github: 'https://github.com/rohanmandal798',
 location: 'Kathmandu, Nepal',
 role: 'System & Network Administrator · DevOps & Cloud',
 portrait: '/images/hero-front.png',
};

export const pillars = [
 ['Cloud & hosting','Hands-on AWS, Cloudflare and container-based application hosting.'],
 ['Systems operations','Linux administration, Nginx virtual hosting, MySQL, SCP and practical troubleshooting.'],
 ['Delivery & automation','Docker, Docker Compose, Jenkins pipelines and deployment workflows.'],
 ['Monitoring & security','Zabbix monitoring, Snort IDS, secure networks and penetration-testing foundations.'],
];

export const skillGroups = [
 ['Cloud & hosting','AWS','Cloudflare','Application Hosting','Cloudflare Tunnel'],
 ['Linux & web servers','Ubuntu Server','Nginx','Virtual Hosting','MySQL','SCP'],
 ['Containers & platforms','Docker','Docker Compose','Kubernetes','Rancher','Dokku','CapRover'],
 ['CI/CD & delivery','Jenkins','CI/CD Pipelines','Webhooks','Git','GitHub'],
 ['Monitoring & security','Zabbix','Snort IDS','Network Security','Burp Suite','Wireshark'],
 ['Networking','TCP/IP','Routing & Switching','DNS','DHCP','Reverse Proxies'],
];

export const experiences = [
 {
  role:'System & Network Administrator Intern', company:'LD Cloud', period:'2024 — Present', location:'Kathmandu, Nepal', current:true,
  points:['Supporting Linux systems, server operations and infrastructure troubleshooting.','Configuring Nginx virtual hosting, application hosting and container-based deployments.','Working with Docker, Docker Compose, Jenkins pipelines and deployment webhooks.','Monitoring servers and infrastructure with Zabbix and supporting security operations with Snort IDS.','Building practical experience across Kubernetes, OpenShift, Cloudflare and cloud hosting workflows.'],
  tech:['Ubuntu Server','Nginx','Docker','Jenkins','Zabbix','Kubernetes','Cloudflare'],
 },
 {
  role:'BSc (Hons) Ethical Hacking & Cybersecurity', company:'Coventry University, United Kingdom', period:'2023 — Aug 2026', location:'Completed', current:false,
  points:['Completed a three-year undergraduate degree focused on ethical hacking and cybersecurity.','Developed foundations in penetration testing, secure networks and vulnerability assessment.','Practiced with Burp Suite, Wireshark and Kali Linux tools.','Explored OWASP vulnerabilities and ethical hacking methodologies, including AutoRecon-V2.'],
  tech:['Burp Suite','Wireshark','Kali Linux','OWASP','Python'],
 },
];

export const projects = [
 {
  title:'Automation web Application Security',category:'SECURITY × AUTOMATION',year:'01',theme:'security',icon:'⌁',headline:'Reconnaissance, streamlined.',
  description:'An automated web reconnaissance and OWASP-based vulnerability assessment framework built to streamline the reconnaissance phase of ethical hacking engagements.',
  tech:['Python','Bash','OWASP','Nmap','AI Analysis'], outcomes:['Subdomain enumeration and port scanning','AI-assisted vulnerability analysis','OWASP mapping and reporting dashboard'], url:'https://github.com/rohanmandal798',
 },
 {
  title:'AWS Cloud Labs',category:'CLOUD × INFRASTRUCTURE',year:'02',theme:'cloud',icon:'☁',headline:'Cloud foundations, practiced.',
  description:'Hands-on AWS projects covering EC2, S3, IAM and VPC setup, focused on core cloud concepts and infrastructure fundamentals.',
  tech:['AWS EC2','S3','IAM','VPC'], outcomes:['Secure VPC with public and private subnets','Least-privilege IAM roles and policies','Static S3 site with CloudWatch monitoring'], url:'https://github.com/rohanmandal798',
 },
 {
  title:'Network Security Labs',category:'NETWORKING × SECURITY',year:'03',theme:'network',icon:'◎',headline:'Networks, understood deeply.',
  description:'Packet analysis and network simulation projects using Wireshark, Cisco Packet Tracer and Kali Linux for practical networking and security skills.',
  tech:['Wireshark','Cisco Packet Tracer','Kali Linux','TCP/IP'], outcomes:['Network traffic analysis and anomaly detection','Routing and switching topology simulations','DNS, DHCP and firewall configuration practice'], url:'https://github.com/rohanmandal798',
 },
];

export const certifications = [
 {name:'AWS Cloud Practitioner Training',issuer:'Broadway Infosys',status:'Completed · Apr 2026',mark:'AWS'},
 {name:'CAPIE — Certified API Hacking Expert',issuer:'The XSS Rat',status:'Completed · Jan 2026',mark:'API'},
 {name:'Certified Cybersecurity Educator Professional',issuer:'Red Team Leaders',status:'Completed · Dec 2025',mark:'CCEP'},
 {name:'Deloitte Australia',issuer:'Forage',status:'Completed · Dec 2025',mark:'CYBER'},
];

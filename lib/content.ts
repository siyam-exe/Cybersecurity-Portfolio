export interface Project {
  slug: string
  title: string
  description: string
  tags: readonly string[]
  status: "Coming soon" | "In progress" | "Documented"
  github: string | null
  details: ProjectDetails | null
}

export interface ProjectDetails {
  overview: string
  workflow: readonly string[]
  environment: readonly { layer: string; detail: string }[]
  implementations: readonly { title: string; description: string }[]
  detections: readonly string[]
  dashboards: readonly { title: string; purpose: string }[]
  security: readonly string[]
  repository: readonly string[]
  incident: { title: string; problem: string; resolution: string; verification: string }
  lessons: readonly string[]
}

export const projects = [
  {
    slug: "cybersecurity-homelab",
    title: "Cybersecurity Homelab",
    description: "A personal SOC-style homelab that generates controlled attacks against isolated vulnerable targets such as DVWA, OWASP Juice Shop, and Metasploitable, traces the resulting telemetry through Wazuh SIEM, and turns it into a documented investigation workflow.",
    tags: ["Wazuh", "Suricata", "Docker", "Linux", "SIEM", "Detection Engineering"],
    status: "Documented",
    github: "https://github.com/siyam-exe/cybersecurity-homelab",
    details: {
      overview: "This project turns two hardware-constrained systems into a private environment for detection engineering and SOC-style investigation. It was originally built around Grafana, Loki, and Alloy, then migrated to Wazuh so the lab could move beyond raw log viewing into rules, alert correlation, File Integrity Monitoring, vulnerability context, MITRE ATT&CK mapping, and structured investigation. Controlled activity against DVWA, OWASP Juice Shop, and Metasploitable is followed from the originating workstation through application, host, container, syslog, and network telemetry into Wazuh dashboards, where each detection is validated against the underlying evidence.",
      workflow: ["Attack simulation", "Vulnerable server or application", "Logs and alerts", "Wazuh rules", "Dashboard investigation"],
      environment: [
        { layer: "Attack and analyst workstation", detail: "Acer Nitro V15 running Windows, with Kali Linux in VirtualBox for controlled testing and analyst access." },
        { layer: "Homelab server", detail: "Dell Inspiron N4030 running Ubuntu Server 22.04.5 LTS as the monitored host, subnet router, container platform, and SIEM server." },
        { layer: "Remote access", detail: "Tailscale mesh VPN between the workstation and homelab; administration does not require public router port forwarding." },
        { layer: "Firewall", detail: "UFW restricts administration to Tailscale and limits the VirtualBox forwarding path and Metasploitable syslog listener to their required interfaces." },
        { layer: "Containers", detail: "Docker hosts the Wazuh manager, indexer, and dashboard, plus DVWA and OWASP Juice Shop behind a Caddy reverse proxy that produces JSON access logs." },
        { layer: "Vulnerable machine", detail: "Metasploitable 2 runs in VirtualBox on the isolated 192.168.56.0/24 host-only network; the Dell host connects to that segment through vboxnet0." },
        { layer: "Network IDS", detail: "Suricata monitors tailscale0 and vboxnet0, writes EVE JSON, and forwards its alerts into Wazuh for network and scan visibility." },
        { layer: "Operating model", detail: "Wazuh, Suricata, vulnerable applications, and Metasploitable run only during defined testing or investigation sessions and remain stopped otherwise." },
      ],
      implementations: [
        { title: "Wazuh SIEM", description: "Deployed the official single-node Wazuh manager, indexer, and dashboard in Docker and enrolled a host-level agent on Ubuntu. Wazuh receives Ubuntu authentication and system logs, Docker lifecycle events, Caddy JSON access logs for DVWA and Juice Shop, Metasploitable syslog forwarded through rsyslog, Suricata EVE JSON alerts, FIM events, SCA results, and vulnerability or package inventory data. Built-in rules cover host and infrastructure activity; custom rules detect SQLi-like, XSS-like, traversal, command-injection, suspicious upload, reconnaissance, and brute-force patterns, then correlate repeated Suricata scan alerts into higher-confidence detections." },
        { title: "Vulnerable machine", description: "Built two types of controlled targets. DVWA and OWASP Juice Shop run in Docker behind Caddy so attack requests produce structured application telemetry. Metasploitable 2 represents a legacy vulnerable server and runs on an isolated VirtualBox host-only network. Its syslog crosses only through the Dell host's vboxnet0 interface into an interface-bound listener, while remote Acer or Kali access follows the approved Tailscale subnet route. Every vulnerable target is stopped by default and started only for an authorized test window." },
        { title: "SOC investigation", description: "Designed four final Wazuh dashboards with 52 visualizations and four raw investigation searches. The SOC overview supports initial triage with volume, severity, MITRE ATT&CK context, source breakdowns, and recent notable alerts. Dedicated dashboards then examine Caddy web telemetry, Suricata and Nmap scan evidence, Metasploitable authentication activity, and host or infrastructure events such as SSH, sudo, Docker, FIM, packages, and vulnerabilities. Each view retains the rule description and useful event fields so an alert can be traced back to its original evidence rather than treated as proof of compromise by itself." },
        { title: "Operations and documentation", description: "Implemented an on-demand operating model: start only the services required for a test, generate a controlled event, verify the raw source log, confirm Wazuh ingestion and the expected rule, check that the dashboard exposes the required fields, and stop the vulnerable environment again. The public repository documents architecture decisions, installation, start and stop procedures, health checks, backups, log rotation, troubleshooting, sanitized configuration examples, dashboard exports, detection tests, limitations, and lessons learned." },
      ],
      detections: ["SSH and sudo activity", "File Integrity Monitoring", "Docker lifecycle events", "SQL injection and XSS-like requests", "Traversal and command-injection patterns", "Nmap scans and port sweeps", "Suricata network alerts", "Metasploitable authentication and scan evidence", "Package and vulnerability posture"],
      dashboards: [
        { title: "Homelab SOC Overview — 15 panels", purpose: "The first triage screen: total and high-severity alerts, MITRE ATT&CK context, rule groups, monitored sources, detection categories, trends, and recent notable events." },
        { title: "Web Attack Lab — 16 panels", purpose: "Investigates Caddy request telemetry from DVWA and Juice Shop, including detection names, client activity, targeted applications, URIs, response context, and raw events." },
        { title: "Network IDS & Legacy Server — 12 panels", purpose: "Combines Suricata signatures, Nmap and scan-correlation alerts, interfaces, source and destination details, ports, and Metasploitable authentication or syslog evidence." },
        { title: "Host & Infrastructure Security — 13 panels", purpose: "Reviews SSH and PAM activity, sudo use, Docker lifecycle events, File Integrity Monitoring changes, package and vulnerability context, and other Ubuntu host activity." },
      ],
      security: ["Tailscale is the only remote administration path; no management interface is deliberately published to the internet.", "The Dell advertises only the 192.168.56.0/24 Metasploitable subnet and forwards it specifically between tailscale0 and vboxnet0.", "Rsyslog listens for Metasploitable only on the Dell's vboxnet0 interface and accepts UDP 514 only from the lab VM.", "Vulnerable Docker services and Metasploitable are stopped by default and run only during a defined test window.", "Wazuh manager, API, and indexer exposure is constrained to the paths required by the host agent and dashboard.", "Public documentation and configurations replace credentials, secrets, and environment-specific values with safe placeholders."],
      repository: ["Thirteen ordered documentation sections from initial architecture through operational playbooks", "Architecture, network-access, log-ingestion, and attack-to-detection diagrams", "Sanitized Wazuh, Suricata, Docker, Caddy, rsyslog, logrotate, and firewall examples", "Sanitized export for four Wazuh dashboards, 52 visualizations, and four investigation searches", "Dashboard, detection, FIM, Suricata, and supporting evidence screenshots", "Start, stop, health-check, backup, and troubleshooting command bundles", "Controlled detection tests with limitations, tradeoffs, and lessons learned"],
      incident: {
        title: "Routing failure during firewall and Tailscale cleanup",
        problem: "After local Metasploitable access and syslog forwarding were working, the Acer still could not reach 192.168.56.101. A normal UFW allow rule for the host's syslog listener did not authorize traffic being forwarded between interfaces, and advertising the subnet from the Dell did not place the route on the Acer until it was approved in the Tailscale administration console. The failed Acer test showed no active route to the target.",
        resolution: "Kept administrative services restricted to tailscale0, bound rsyslog to the Dell's vboxnet0 interface, limited UDP 514 to Metasploitable on that interface, enabled IPv4 forwarding, added bidirectional UFW route rules for tailscale0 to vboxnet0, advertised the isolated lab subnet from the Dell, and approved that subnet route in Tailscale. This preserved the host-only lab boundary while permitting one explicit remote test path.",
        verification: "Before approval, Test-NetConnection from the Acer failed and route print showed no route. After approval, the same SSH-port test succeeded with InterfaceAlias Tailscale; Dell-to-Metasploitable connectivity and forwarded syslog were also rechecked, and the VM was powered off after validation.",
      },
      lessons: ["Application and network telemetry answer different questions: Caddy preserves request and target context, while Suricata adds interfaces, endpoints, ports, and IDS signatures.", "On vboxnet0, routed traffic can appear to originate from the Dell host rather than the original client; monitoring tailscale0 as well preserves the Tailscale-side source context.", "Detection quality improved when dashboard panels used decoded event fields and readable rule descriptions instead of broad keyword filters or raw rule IDs.", "Older hardware shaped a disciplined scope: the Wazuh stack and vulnerable targets run on demand, and Windows, Sysmon, Active Directory, and other heavier additions remain future work rather than unsupported claims."],
    },
  },
  {
    slug: "next-project",
    title: "Next Project",
    description: "Another security project will appear here after it has been built, tested, documented, and published.",
    tags: [],
    status: "Coming soon",
    github: null,
    details: null,
  },
] satisfies readonly Project[]

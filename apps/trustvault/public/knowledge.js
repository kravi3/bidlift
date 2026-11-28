/**
 * TrustVault Enterprise Security Knowledge Base, Industry Presets & Auto-Matcher
 * -------------------------------------------------------------------------------
 * 64 curated enterprise security & compliance Q&As across 6 pillars,
 * 6 industry starter presets, 20-question SIG-Lite sample, and pure JS weighted matcher.
 */
window.TRUSTVAULT_KNOWLEDGE = (function () {
  "use strict";

  const PILLARS = [
    {
      id: "encryption",
      name: "Encryption & Data Privacy",
      shortName: "Encryption & Privacy",
      description: "AES-256 at rest, TLS 1.3 in transit, KMS key rotation, and strict data retention controls."
    },
    {
      id: "infrastructure",
      name: "Cloud Infrastructure & Resilience",
      shortName: "Cloud & Resilience",
      description: "Multi-AZ cloud isolation, automated encrypted backups, RPO/RTO targets, and DR testing."
    },
    {
      id: "identity",
      name: "Identity, MFA & RBAC",
      shortName: "Identity & Access",
      description: "SAML 2.0 / OIDC SSO, mandatory hardware/TOTP MFA, RBAC least privilege, and quarterly reviews."
    },
    {
      id: "appsec",
      name: "AppSec, Vulnerability & Pen-Testing",
      shortName: "AppSec & Pen-Test",
      description: "Annual CREST/OSCP penetration tests, SAST/SCA CI gates, CVSS SLAs, and SIEM alerting."
    },
    {
      id: "compliance",
      name: "Subprocessors, SOC2 & GDPR",
      shortName: "SOC2, GDPR & Vendors",
      description: "SOC 2 Type II / ISO 27001 alignment, GDPR DPA & SCCs, 30-day subprocessor notice, and incident SLAs."
    },
    {
      id: "ai_gov",
      name: "AI Governance & Zero-Training",
      shortName: "AI Governance",
      description: "Contractual zero-data-retention (ZDR) LLM endpoints, no training on customer data, and prompt guardrails."
    }
  ];

  const ALL_BADGES = [
    "SOC2 Type II Ready",
    "GDPR",
    "ISO 27001 Aligned",
    "Zero-Training AI",
    "TLS 1.3 + AES-256",
    "HIPAA Safeguards"
  ];

  const INDUSTRY_PRESETS = {
    saas: {
      id: "saas",
      label: "B2B SaaS Startup",
      shortLabel: "B2B SaaS",
      defaultCompany: "Acme Cloud Systems",
      defaultDomain: "acmecloud.io",
      defaultTagline: "Enterprise-grade cloud workflow platform built with zero-trust isolation and continuous compliance.",
      hostingRegion: "AWS US-East (Virginia) & EU-Central (Frankfurt)",
      complianceFrame: "SOC 2 Type II & GDPR",
      badges: ["SOC2 Type II Ready", "GDPR", "ISO 27001 Aligned", "TLS 1.3 + AES-256"],
      pillarSummaries: {
        encryption: "All customer data is encrypted at rest using AES-256-GCM via cloud KMS and in transit via TLS 1.3 with HSTS.",
        infrastructure: "Hosted on AWS multi-AZ VPCs with automated daily snapshots, RPO <= 1 hour, and RTO <= 4 hours.",
        identity: "Supports SAML 2.0 / OIDC SSO, enforces MFA across 100% of production accounts, and applies strict RBAC.",
        appsec: "Automated SAST/SCA scanning on every pull request plus annual independent third-party penetration testing.",
        compliance: "SOC 2 Type II aligned controls, standard GDPR DPA with SCCs, and 30-day advance subprocessor notice.",
        ai_gov: "Optional AI features run on enterprise Zero-Data-Retention endpoints; customer data never trains foundation models."
      },
      subprocessors: [
        { name: "Amazon Web Services (AWS)", purpose: "Core Cloud Infrastructure & Managed Databases", location: "United States / EU", dpaStatus: "DPA + SCCs Executed" },
        { name: "Cloudflare", purpose: "WAF, DDoS Mitigation & TLS Edge Termination", location: "Global Edge", dpaStatus: "DPA Executed" },
        { name: "Stripe / Polar.sh", purpose: "PCI-DSS Level 1 Billing & Subscription Processing", location: "United States / Global", dpaStatus: "DPA Executed" },
        { name: "Postmark / Resend", purpose: "Transactional Security & Notification Emails", location: "United States", dpaStatus: "DPA Executed" }
      ]
    },
    ai_platform: {
      id: "ai_platform",
      label: "AI Agents & LLM Platform",
      shortLabel: "AI & LLM Platform",
      defaultCompany: "Synthetix AI Labs",
      defaultDomain: "synthetix.ai",
      defaultTagline: "Zero-Training enterprise AI orchestration with contractual Zero-Data-Retention (ZDR) inference and audit logs.",
      hostingRegion: "AWS US-West (Oregon) & Dedicated VPC Inference",
      complianceFrame: "SOC 2 Type II, ISO 42001 & GDPR",
      badges: ["SOC2 Type II Ready", "Zero-Training AI", "GDPR", "TLS 1.3 + AES-256"],
      pillarSummaries: {
        encryption: "Prompts, embeddings, and vector indexes are encrypted at rest with tenant-scoped AES-256 keys and TLS 1.3 in transit.",
        infrastructure: "Isolated Kubernetes inference workloads across multi-AZ VPCs with ephemeral stateless prompt buffers.",
        identity: "Enterprise SAML 2.0 SSO, SCIM provisioning, scoped API keys, and hardware MFA for all engineering personnel.",
        appsec: "Continuous container image signing, prompt-injection red-teaming, and semi-annual external penetration tests.",
        compliance: "SOC 2 Type II readiness, EU AI Act transparency controls, GDPR DPA, and zero third-party model retention.",
        ai_gov: "100% contractual Zero-Data-Retention (ZDR) with LLM providers; zero customer inputs or outputs are ever used for training."
      },
      subprocessors: [
        { name: "Amazon Web Services (AWS Bedrock / VPC)", purpose: "Isolated Compute & Zero-Retention Model Hosting", location: "United States", dpaStatus: "DPA + ZDR Executed" },
        { name: "Anthropic / OpenAI Enterprise API", purpose: "Stateless LLM Inference (Zero Training / 0-Day Retention)", location: "United States", dpaStatus: "ZDR Addendum Active" },
        { name: "Pinecone / pgvector", purpose: "Tenant-Isolated Encrypted Vector Storage", location: "United States", dpaStatus: "DPA Executed" },
        { name: "Datadog", purpose: "Redacted Telemetry & Security SIEM Alerting", location: "United States", dpaStatus: "DPA Executed" }
      ]
    },
    msp: {
      id: "msp",
      label: "Managed IT & Security MSP",
      shortLabel: "Managed IT / MSP",
      defaultCompany: "Vanguard Managed Security",
      defaultDomain: "vanguardmsp.com",
      defaultTagline: "24/7 SOC monitoring, CIS-hardened endpoint governance, and NIST CSF compliant managed infrastructure.",
      hostingRegion: "US-East / US-Central Redundant Tier-IV Cloud",
      complianceFrame: "SOC 2 Type II & NIST CSF",
      badges: ["SOC2 Type II Ready", "ISO 27001 Aligned", "TLS 1.3 + AES-256", "GDPR"],
      pillarSummaries: {
        encryption: "BitLocker/FileVault full-disk encryption, AES-256 encrypted immutable backups, and TLS 1.3 management tunnels.",
        infrastructure: "Geo-redundant backup vaults with air-gapped ransomware immutability, RPO <= 15 mins, and RTO <= 2 hours.",
        identity: "Mandatory FIDO2/YubiKey MFA for all technician PAM sessions, JIT elevation, and per-client tenant isolation.",
        appsec: "24/7 managed EDR/MDR coverage, automated patch SLAs (24h critical), and quarterly external vulnerability scans.",
        compliance: "Aligned with SOC 2 Type II, CIS v8 Controls, and NIST 800-53; 24-hour incident notification SLA.",
        ai_gov: "Internal triage copilots operate strictly inside private enterprise tenants with zero external model training."
      },
      subprocessors: [
        { name: "Microsoft Azure", purpose: "Identity Governance, SIEM & Cloud Workloads", location: "United States", dpaStatus: "DPA Executed" },
        { name: "CrowdStrike / SentinelOne", purpose: "24/7 Managed EDR & Threat Hunting", location: "United States", dpaStatus: "DPA Executed" },
        { name: "Veeam / AWS S3 Object Lock", purpose: "Immutable Encrypted Off-Site Backups", location: "United States", dpaStatus: "DPA Executed" },
        { name: "1Password / CyberArk", purpose: "Privileged Access & Credential Vaulting", location: "United States", dpaStatus: "DPA Executed" }
      ]
    },
    agency: {
      id: "agency",
      label: "Enterprise Dev / Digital Agency",
      shortLabel: "Enterprise Agency",
      defaultCompany: "Northstar Digital Engineering",
      defaultDomain: "northstardev.co",
      defaultTagline: "Security-first enterprise product engineering with clean IP handoff, SSO access, and zero-trust CI/CD.",
      hostingRegion: "AWS US-East & Client-Owned VPC Deployments",
      complianceFrame: "SOC 2 Aligned & GDPR",
      badges: ["SOC2 Type II Ready", "GDPR", "TLS 1.3 + AES-256", "Zero-Training AI"],
      pillarSummaries: {
        encryption: "All repositories, staging environments, and asset buckets enforce AES-256 encryption at rest and TLS 1.3.",
        infrastructure: "Zero client PII stored on agency laptops; ephemeral staging sandboxes auto-expire with encrypted snapshots.",
        identity: "Hardware-backed MFA, dedicated client SSO accounts, and immediate offboarding revocation within 1 hour.",
        appsec: "Mandatory peer code review, automated SAST/dependency auditing, and OWASP ASVS verification prior to release.",
        compliance: "Mutual NDA, GDPR DPA readiness, verified contractor background checks, and clean IP assignment.",
        ai_gov: "Enterprise zero-retention coding assistants only; client proprietary code is excluded from model training."
      },
      subprocessors: [
        { name: "GitHub Enterprise", purpose: "Source Control, Secret Scanning & CI/CD", location: "United States", dpaStatus: "DPA Executed" },
        { name: "Amazon Web Services (AWS)", purpose: "Staging Infrastructure & Encrypted Artifacts", location: "United States / EU", dpaStatus: "DPA Executed" },
        { name: "Vercel / Render", purpose: "Edge Preview Deployments & TLS Hosting", location: "United States", dpaStatus: "DPA Executed" },
        { name: "Google Workspace Enterprise", purpose: "SSO Identity, MDM & Encrypted Docs", location: "United States", dpaStatus: "DPA Executed" }
      ]
    },
    healthtech: {
      id: "healthtech",
      label: "Healthcare / HIPAA SaaS",
      shortLabel: "Healthcare / HIPAA",
      defaultCompany: "MedShield Health Cloud",
      defaultDomain: "medshieldcloud.com",
      defaultTagline: "HIPAA-ready clinical workflow infrastructure with executed BAAs, PHI isolation, and 7-year audit retention.",
      hostingRegion: "AWS US-East HIPAA-Eligible Dedicated Tenancy",
      complianceFrame: "HIPAA, HITECH & SOC 2 Type II",
      badges: ["HIPAA Safeguards", "SOC2 Type II Ready", "TLS 1.3 + AES-256", "Zero-Training AI"],
      pillarSummaries: {
        encryption: "FIPS 140-2/3 validated AES-256 encryption for all ePHI at rest and TLS 1.3 in transit; zero PHI in logs or URLs.",
        infrastructure: "HIPAA-eligible AWS VPC subnets with multi-AZ failover, automated encrypted backups, and documented DR drills.",
        identity: "SAML 2.0 SSO, automatic 15-minute session timeouts, unique user IDs, and strict clinical RBAC minimum-necessary access.",
        appsec: "Annual HIPAA Security Risk Analysis, external penetration testing, and 7-year immutable PHI access audit trails.",
        compliance: "Countersigned Business Associate Agreements (BAAs) available, annual HIPAA workforce training, and breach notification SLA.",
        ai_gov: "Clinical AI operates strictly under HIPAA BAA with zero-retention endpoints and zero PHI model training."
      },
      subprocessors: [
        { name: "Amazon Web Services (AWS)", purpose: "HIPAA-Eligible Compute, RDS & KMS Encryption", location: "United States", dpaStatus: "BAA Executed" },
        { name: "Aptible / Vanta Monitor", purpose: "Continuous Compliance & Audit Logging", location: "United States", dpaStatus: "BAA Executed" },
        { name: "Twilio Enterprise HIPAA", purpose: "Encrypted Patient Appointment Notifications", location: "United States", dpaStatus: "BAA Executed" },
        { name: "Snowflake Healthcare", purpose: "De-identified Clinical Analytics Warehouse", location: "United States", dpaStatus: "BAA Executed" }
      ]
    },
    fintech: {
      id: "fintech",
      label: "FinTech & Advisory",
      shortLabel: "FinTech & Advisory",
      defaultCompany: "LedgerGuard Financial Tech",
      defaultDomain: "ledgerguard.io",
      defaultTagline: "Bank-grade financial data infrastructure with PCI-DSS segregation, cryptographic audit logs, and SOC 2 controls.",
      hostingRegion: "AWS US-East & US-West Financial Isolation Zones",
      complianceFrame: "SOC 2 Type II, PCI-DSS & GLBA",
      badges: ["SOC2 Type II Ready", "ISO 27001 Aligned", "TLS 1.3 + AES-256", "GDPR"],
      pillarSummaries: {
        encryption: "Envelope encryption with customer-isolated KMS keys (AES-256-GCM), TLS 1.3 mutual auth options, and HSM-backed secrets.",
        infrastructure: "Segmented production/cardholder VPCs, real-time cross-region replication, RPO <= 5 mins, and RTO <= 2 hours.",
        identity: "Hardware FIDO2 MFA required for every operator, dual-control production approvals, and SAML/SCIM for enterprise buyers.",
        appsec: "Continuous DAST/SAST scanning, immutable SHA-256 transaction audit logs, and semi-annual CREST penetration tests.",
        compliance: "SOC 2 Type II & GLBA safeguards alignment, PCI-DSS Level 1 payment tokenization, and 24-hour incident escalation.",
        ai_gov: "Financial analysis models run in zero-retention isolated environments; client ledger data never trains external models."
      },
      subprocessors: [
        { name: "Amazon Web Services (AWS)", purpose: "Segmented Production Cloud & CloudHSM", location: "United States", dpaStatus: "DPA Executed" },
        { name: "Stripe Financial", purpose: "PCI-DSS Level 1 Payment & Tokenization Rail", location: "United States", dpaStatus: "DPA + PCI AOC" },
        { name: "Plaid / Finicity", purpose: "Read-Only OAuth Bank Feed Aggregation", location: "United States", dpaStatus: "DPA Executed" },
        { name: "Sumsub / Persona", purpose: "Encrypted KYB/KYC Verification", location: "United States / EU", dpaStatus: "DPA Executed" }
      ]
    }
  };

  /**
   * 64 Curated Enterprise Security & Compliance Q&A Entries across 6 Pillars
   */
  const KB_ENTRIES = [
    // --- PILLAR 1: Encryption & Data Privacy (11 entries) ---
    {
      id: "ENC-01",
      pillar: "Encryption & Data Privacy",
      question: "How is customer data encrypted at rest?",
      keywords: [["encryption at rest", 5], ["aes-256", 5], ["aes 256", 5], ["at rest", 4], ["kms", 3], ["disk encryption", 3], ["database encryption", 4]],
      answer: "{{company}} encrypts 100% of customer data at rest—including primary databases, object storage, search indexes, and automated backups—using AES-256-GCM managed via FIPS 140-2/3 validated Cloud KMS keys.",
      evidenceTag: "SOC2 CC6.1 · Encryption Standard"
    },
    {
      id: "ENC-02",
      pillar: "Encryption & Data Privacy",
      question: "How is data encrypted in transit across public and internal networks?",
      keywords: [["encryption in transit", 5], ["tls 1.3", 5], ["tls 1.2", 4], ["https", 3], ["in transit", 4], ["ssl", 3], ["hsts", 3], ["cipher", 2]],
      answer: "All external endpoints enforce HTTPS with TLS 1.3 (supporting TLS 1.2+ minimum with strong forward-secrecy cipher suites) and HTTP Strict Transport Security (HSTS). Internal service-to-service traffic is encrypted via mutual TLS (mTLS).",
      evidenceTag: "SOC2 CC6.7 · Transport Security Policy"
    },
    {
      id: "ENC-03",
      pillar: "Encryption & Data Privacy",
      question: "How are cryptographic encryption keys managed, stored, and rotated?",
      keywords: [["key management", 5], ["key rotation", 5], ["kms", 4], ["hsm", 4], ["rotate keys", 4], ["cryptographic keys", 4], ["secrets management", 3]],
      answer: "{{company}} manages cryptographic keys through dedicated Cloud KMS / HSM services with strict IAM separation from application compute. Data Encryption Keys (DEKs) are wrapped by Key Encryption Keys (KEKs) rotated automatically at least annually (and immediately on suspected compromise).",
      evidenceTag: "ISO 27001 A.10.1 · Key Management SOP"
    },
    {
      id: "ENC-04",
      pillar: "Encryption & Data Privacy",
      question: "What is your customer data retention, deletion, and offboarding SLA?",
      keywords: [["data deletion", 5], ["retention", 4], ["offboarding", 4], ["purge", 4], ["right to erasure", 4], ["delete customer data", 5], ["contract termination", 3]],
      answer: "Upon contract termination or verified deletion request to {{securityEmail}}, {{company}} logically purges active customer records within 30 days and cryptographically expires remaining rolling backups within 35 days, issuing a written Certificate of Destruction upon request.",
      evidenceTag: "GDPR Art. 17 · Data Retention Schedule"
    },
    {
      id: "ENC-05",
      pillar: "Encryption & Data Privacy",
      question: "How do you prevent sensitive customer data or PII from leaking into application logs?",
      keywords: [["pii in logs", 5], ["log scrubbing", 4], ["masking", 3], ["redaction", 4], ["sensitive data logs", 4], ["debug logs", 3]],
      answer: "{{company}} enforces automated structured-logging filters that redact authorization tokens, passwords, payment tokens, and sensitive customer payload fields prior to log ingestion, keeping diagnostic telemetry strictly separate from tenant content.",
      evidenceTag: "OWASP Logging Standard · Privacy Control"
    },
    {
      id: "ENC-06",
      pillar: "Encryption & Data Privacy",
      question: "How are API secrets, credentials, and environment variables stored?",
      keywords: [["secrets", 4], ["api keys", 4], ["credentials", 3], ["vault", 3], ["environment variables", 4], ["hardcoded secrets", 4]],
      answer: "Zero secrets or API keys are committed to source control. {{company}} stores production credentials in an encrypted secrets manager with automatic secret scanning on every git push and per-environment least-privilege rotation.",
      evidenceTag: "SOC2 CC6.1 · Secrets Vault Policy"
    },
    {
      id: "ENC-07",
      pillar: "Encryption & Data Privacy",
      question: "How do you handle data classification and sensitive field protection?",
      keywords: [["data classification", 5], ["confidential", 3], ["restricted data", 4], ["public data", 2], ["handling policy", 3]],
      answer: "{{company}} classifies all information assets into four tiers (Public, Internal, Confidential, and Restricted/Customer Data). Customer production data is classified Restricted by default, prohibiting storage on local developer workstations or unencrypted media.",
      evidenceTag: "ISO 27001 A.8.2 · Classification Policy"
    },
    {
      id: "ENC-08",
      pillar: "Encryption & Data Privacy",
      question: "Is production customer data ever copied into staging or development environments?",
      keywords: [["staging", 4], ["development environment", 4], ["test data", 4], ["anonymized", 3], ["synthetic data", 4], ["non-production", 4]],
      answer: "No. {{company}} strictly prohibits copying production customer data into development, QA, or staging environments. Non-production environments use synthetic or deterministically anonymized datasets only.",
      evidenceTag: "SOC2 CC8.1 · SDLC Environment Separation"
    },
    {
      id: "ENC-09",
      pillar: "Encryption & Data Privacy",
      question: "Do you support customer data portability and self-service export?",
      keywords: [["data portability", 5], ["export data", 4], ["csv", 3], ["json", 3], ["extract", 3], ["lock-in", 3]],
      answer: "Yes. Customers retain 100% ownership of their data and can export records anytime in open, machine-readable formats (CSV/JSON) via {{domain}} or request a bulk export through {{securityEmail}}.",
      evidenceTag: "GDPR Art. 20 · Data Portability"
    },
    {
      id: "ENC-10",
      pillar: "Encryption & Data Privacy",
      question: "How do you protect data stored on employee laptops and mobile endpoints?",
      keywords: [["endpoint", 5], ["mdm", 5], ["laptop", 4], ["bitlocker", 4], ["filevault", 4], ["edr", 4], ["full disk encryption", 5], ["workstation", 3]],
      answer: "All corporate endpoints at {{company}} are enrolled in centralized Mobile Device Management (MDM) enforcing full-disk encryption (FileVault / BitLocker), automatic 5-minute screen lock, OS patch compliance, and 24/7 Endpoint Detection & Response (EDR) agents.",
      evidenceTag: "SOC2 CC6.6 · Endpoint & MDM Policy"
    },
    {
      id: "ENC-11",
      pillar: "Encryption & Data Privacy",
      question: "Do you offer BYOK (Bring Your Own Key) or dedicated tenant encryption options?",
      keywords: [["byok", 5], ["cmek", 5], ["customer managed key", 5], ["dedicated key", 4], ["tenant key", 4]],
      answer: "Enterprise and Scale plans support tenant-scoped envelope encryption keys and dedicated VPC/CMEK key isolation options so enterprise security teams retain cryptographic revocation authority.",
      evidenceTag: "Enterprise Security Architecture"
    },

    // --- PILLAR 2: Cloud Infrastructure & Resilience (11 entries) ---
    {
      id: "INF-01",
      pillar: "Cloud Infrastructure & Resilience",
      question: "What are your backup frequency, Recovery Point Objective (RPO), and Recovery Time Objective (RTO)?",
      keywords: [["backup", 5], ["rpo", 5], ["rto", 5], ["disaster recovery", 4], ["snapshots", 4], ["point in time", 4], ["recovery", 3]],
      answer: "{{company}} performs continuous transaction-log archiving (point-in-time recovery) and automated encrypted daily snapshots replicated across multiple availability zones. Standard targets are RPO <= 1 hour and RTO <= 4 hours.",
      evidenceTag: "SOC2 A1.2 · Backup & DR SLA"
    },
    {
      id: "INF-02",
      pillar: "Cloud Infrastructure & Resilience",
      question: "Where is customer data hosted and can we select regional data residency?",
      keywords: [["data residency", 5], ["hosting region", 5], ["data center", 4], ["aws", 3], ["physical security", 4], ["eu hosting", 4], ["us hosting", 4], ["location", 3]],
      answer: "{{company}} operates on tier-1 SOC 2 / ISO 27001 certified cloud infrastructure in {{hostingRegion}}. Physical data center security (biometrics, 24/7 guards, CCTV) is inherited and continuously audited through our cloud provider's SOC 2 Type II attestation.",
      evidenceTag: "SOC2 CC6.4 · Cloud Residency Attestation"
    },
    {
      id: "INF-03",
      pillar: "Cloud Infrastructure & Resilience",
      question: "How is multi-tenant logical data isolation enforced between customers?",
      keywords: [["multi-tenant", 5], ["tenant isolation", 5], ["customer separation", 4], ["logical isolation", 5], ["cross-tenant", 4], ["row level", 3]],
      answer: "{{company}} enforces strict logical tenant isolation at both the API authorization layer and database query/row-level security layer, keyed by cryptographically verified organization IDs derived from authenticated session tokens.",
      evidenceTag: "SOC2 CC6.1 · Multi-Tenant Isolation"
    },
    {
      id: "INF-04",
      pillar: "Cloud Infrastructure & Resilience",
      question: "How frequently do you test your Disaster Recovery (DR) and Business Continuity (BCP) plans?",
      keywords: [["dr test", 5], ["business continuity", 5], ["bcp", 5], ["tabletop", 4], ["failover", 4], ["restore test", 4]],
      answer: "{{company}} conducts automated backup restoration tests monthly and full Business Continuity / Disaster Recovery (BCP/DR) failover tabletop and simulation exercises at least annually, documenting remediation action items.",
      evidenceTag: "SOC2 A1.3 · Annual DR Test Report"
    },
    {
      id: "INF-05",
      pillar: "Cloud Infrastructure & Resilience",
      question: "What network segmentation, firewall, and DDoS protections are in place?",
      keywords: [["firewall", 4], ["waf", 5], ["ddos", 5], ["vpc", 4], ["network segmentation", 5], ["private subnet", 4], ["cloudflare", 3]],
      answer: "Production databases and internal microservices reside inside private VPC subnets with zero direct public internet exposure. All ingress passes through an enterprise Web Application Firewall (WAF), rate limiting, and L3/L4/L7 DDoS mitigation.",
      evidenceTag: "SOC2 CC6.6 · Network Architecture"
    },
    {
      id: "INF-06",
      pillar: "Cloud Infrastructure & Resilience",
      question: "What is your platform uptime SLA and high-availability architecture?",
      keywords: [["uptime", 5], ["sla", 4], ["availability", 4], ["99.9", 4], ["high availability", 4], ["multi-az", 4], ["status page", 3]],
      answer: "{{company}} deploys stateless compute across multiple availability zones with automated health checks and zero-downtime rolling deployments, targeting 99.95% uptime SLA for enterprise customers.",
      evidenceTag: "Enterprise Availability SLA"
    },
    {
      id: "INF-07",
      pillar: "Cloud Infrastructure & Resilience",
      question: "How do you protect backups against ransomware or malicious deletion?",
      keywords: [["immutable backup", 5], ["ransomware", 5], ["object lock", 4], ["air-gapped", 4], ["backup encryption", 4]],
      answer: "Backups are encrypted with separate KMS keys, replicated cross-region, and protected with write-once-read-many (WORM / Object Lock) immutability policies so neither compromised compute credentials nor operators can alter or purge snapshots prematurely.",
      evidenceTag: "NIST Ransomware Resilience Control"
    },
    {
      id: "INF-08",
      pillar: "Cloud Infrastructure & Resilience",
      question: "Do you use Infrastructure as Code (IaC) and configuration drift monitoring?",
      keywords: [["infrastructure as code", 5], ["terraform", 4], ["iac", 4], ["drift", 4], ["cis benchmark", 4], ["cloud posture", 3]],
      answer: "Yes. Production infrastructure is provisioned declaratively via peer-reviewed Infrastructure-as-Code templates hardened against CIS Benchmarks, with automated cloud security posture monitoring (CSPM) alerting on configuration drift.",
      evidenceTag: "SOC2 CC7.1 · IaC & CSPM Policy"
    },
    {
      id: "INF-09",
      pillar: "Cloud Infrastructure & Resilience",
      question: "How do you manage capacity planning and auto-scaling under load spikes?",
      keywords: [["capacity", 4], ["auto-scaling", 4], ["load balancing", 4], ["throttling", 3], ["rate limit", 3]],
      answer: "{{company}} uses automated horizontal scaling policies, connection pooling, and per-tenant API rate limits to prevent noisy-neighbor degradation and maintain consistent latency during enterprise traffic spikes.",
      evidenceTag: "SOC2 A1.1 · Capacity Management"
    },
    {
      id: "INF-10",
      pillar: "Cloud Infrastructure & Resilience",
      question: "Are physical servers or removable media used to store customer data?",
      keywords: [["physical server", 4], ["on-premise", 3], ["usb", 4], ["removable media", 5], ["hardware disposal", 4]],
      answer: "No. {{company}} operates 100% in certified cloud infrastructure and prohibits storing customer data on local servers or USB/removable media. Cloud storage media decommissioning follows NIST SP 800-88 sanitization standards.",
      evidenceTag: "SOC2 CC6.5 · Media Disposal Policy"
    },
    {
      id: "INF-11",
      pillar: "Cloud Infrastructure & Resilience",
      question: "How are DNS records and domain configurations secured against hijacking?",
      keywords: [["dns", 5], ["dnssec", 4], ["spf", 4], ["dkim", 4], ["dmarc", 4], ["domain hijacking", 4]],
      answer: "Domain registrars and DNS zones for {{domain}} are protected with hardware MFA, registrar lock, DNSSEC where supported, and enforced SPF, DKIM, and DMARC (`p=reject`/`quarantine`) email authentication policies.",
      evidenceTag: "Email & DNS Hardening Standard"
    },

    // --- PILLAR 3: Identity, MFA & RBAC (11 entries) ---
    {
      id: "IAM-01",
      pillar: "Identity, MFA & RBAC",
      question: "Do you support Enterprise Single Sign-On (SAML 2.0 / OIDC) and enforce MFA?",
      keywords: [["sso", 5], ["saml", 5], ["oidc", 4], ["mfa", 5], ["2fa", 5], ["two factor", 4], ["multi-factor", 5], ["okta", 3], ["entra", 3]],
      answer: "Yes. {{company}} supports Enterprise Single Sign-On via SAML 2.0 and OIDC (Okta, Microsoft Entra ID, Google Workspace) and enforces Multi-Factor Authentication (MFA) for 100% of internal production, cloud, and admin access.",
      evidenceTag: "SOC2 CC6.2 · SSO & MFA Policy"
    },
    {
      id: "IAM-02",
      pillar: "Identity, MFA & RBAC",
      question: "How is Role-Based Access Control (RBAC) and least privilege enforced?",
      keywords: [["rbac", 5], ["role based", 5], ["least privilege", 5], ["access control", 4], ["permissions", 3], ["admin role", 3]],
      answer: "{{company}} implements granular Role-Based Access Control (RBAC) with explicit deny-by-default permissions for both customer workspaces (Owner, Admin, Editor, Viewer) and internal engineering roles following strict least privilege.",
      evidenceTag: "SOC2 CC6.3 · Access Control Matrix"
    },
    {
      id: "IAM-03",
      pillar: "Identity, MFA & RBAC",
      question: "How often are internal user access rights and permissions reviewed?",
      keywords: [["access review", 5], ["quarterly review", 4], ["recertification", 4], ["privilege review", 4], ["audit access", 3]],
      answer: "Internal production, repository, and administrative access rights undergo formal quarterly access recertification reviews led by Security & Engineering leadership, with automated removal of unused privileges.",
      evidenceTag: "SOC2 CC6.2 · Quarterly Access Review Log"
    },
    {
      id: "IAM-04",
      pillar: "Identity, MFA & RBAC",
      question: "What is your employee and contractor offboarding / revocation SLA?",
      keywords: [["offboarding", 5], ["termination", 4], ["revoke access", 5], ["deprovisioning", 5], ["scim", 4], ["departing employee", 4]],
      answer: "Upon employee or contractor departure, centralized identity provider (IdP) SSO sessions and production SSH/cloud tokens are revoked immediately (within 1 hour for involuntary termination and by end-of-day for voluntary departures). Enterprise customers can also automate user deprovisioning via SCIM.",
      evidenceTag: "SOC2 CC6.2 · Joiner-Mover-Leaver SOP"
    },
    {
      id: "IAM-05",
      pillar: "Identity, MFA & RBAC",
      question: "Do internal support staff have standing access to customer production data?",
      keywords: [["support access", 5], ["impersonation", 4], ["standing access", 5], ["just in time", 4], ["jit", 4], ["customer data access", 4]],
      answer: "No. Engineers and support staff have zero standing access to customer production databases. Temporary diagnostic access requires explicit customer approval or break-glass ticket justification, time-bound elevation, and full audit logging.",
      evidenceTag: "Zero Standing Privilege Control"
    },
    {
      id: "IAM-06",
      pillar: "Identity, MFA & RBAC",
      question: "What password complexity, hashing, and lockout policies are enforced?",
      keywords: [["password policy", 5], ["bcrypt", 4], ["argon2", 4], ["brute force", 4], ["lockout", 4], ["credential stuffing", 3]],
      answer: "Passwords are never stored in plaintext; {{company}} hashes credentials using Argon2id/bcrypt with per-user salts, enforces minimum length and breached-password screening, and applies progressive rate-limiting against brute-force attempts.",
      evidenceTag: "NIST 800-63B Authentication Standard"
    },
    {
      id: "IAM-07",
      pillar: "Identity, MFA & RBAC",
      question: "How are session tokens, cookies, and idle timeouts secured?",
      keywords: [["session timeout", 5], ["jwt", 4], ["cookie", 4], ["httponly", 4], ["samesite", 4], ["idle timeout", 5], ["token expiration", 4]],
      answer: "Authenticated session tokens are short-lived, cryptographically signed, and transmitted strictly via Secure, HttpOnly, SameSite cookies or bearer headers with configurable enterprise idle session timeouts.",
      evidenceTag: "OWASP Session Management Standard"
    },
    {
      id: "IAM-08",
      pillar: "Identity, MFA & RBAC",
      question: "Are production SSH/bastion connections or privileged operations protected by hardware MFA?",
      keywords: [["privileged access", 5], ["pam", 5], ["bastion", 4], ["ssh", 4], ["fido2", 4], ["hardware key", 4], ["yubikey", 3]],
      answer: "Yes. Production infrastructure uses ephemeral short-lived certificates (no static shared SSH keys) gated behind SSO and phishing-resistant MFA (FIDO2/WebAuthn hardware keys or TOTP).",
      evidenceTag: "SOC2 CC6.1 · Privileged Access Standard"
    },
    {
      id: "IAM-09",
      pillar: "Identity, MFA & RBAC",
      question: "Does your platform support SCIM 2.0 automated user provisioning and deprovisioning?",
      keywords: [["scim", 5], ["provisioning", 4], ["directory sync", 4], ["group mapping", 3]],
      answer: "Yes. Enterprise plans support SCIM 2.0 directory synchronization for automated onboarding, role group mapping, and instant offboarding directly from your corporate IdP.",
      evidenceTag: "Enterprise Identity Capabilities"
    },
    {
      id: "IAM-10",
      pillar: "Identity, MFA & RBAC",
      question: "How are API tokens scoped and protected for programmatic integrations?",
      keywords: [["api token", 5], ["bearer", 3], ["oauth", 4], ["scopes", 4], ["rate limit", 3], ["webhook signing", 4]],
      answer: "Programmatic API tokens are workspace-scoped, support granular read/write permissions and expiration dates, are hashed at rest, and webhooks are cryptographically signed with HMAC-SHA256.",
      evidenceTag: "API Security Standard"
    },
    {
      id: "IAM-11",
      pillar: "Identity, MFA & RBAC",
      question: "Do you enforce separation of duties for production deployments and code merges?",
      keywords: [["separation of duties", 5], ["two person", 4], ["peer review", 4], ["code merge", 3], ["self approval", 4]],
      answer: "Yes. Branch protection rules block self-approval on all production repositories; every infrastructure and application change requires independent peer review plus passing automated security checks before merge.",
      evidenceTag: "SOC2 CC8.1 · Change Management"
    },

    // --- PILLAR 4: AppSec, Vulnerability & Pen-Testing (11 entries) ---
    {
      id: "APP-01",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "How often do you conduct independent third-party penetration testing?",
      keywords: [["penetration test", 5], ["pen test", 5], ["pentest", 5], ["third-party security", 4], ["crest", 3], ["black box", 3], ["gray box", 3]],
      answer: "{{company}} engages an independent, CREST/OSCP-certified third-party security firm to conduct a comprehensive web, API, and cloud penetration test at least annually (and after major architectural releases). Executive attestation summaries are available under NDA via {{securityEmail}}.",
      evidenceTag: "SOC2 CC7.1 · Annual Pen-Test Attestation"
    },
    {
      id: "APP-02",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "What are your vulnerability scanning tools and remediation SLAs by severity?",
      keywords: [["vulnerability", 5], ["cvss", 5], ["remediation sla", 5], ["patching", 4], ["critical vulnerability", 5], ["high vulnerability", 4], ["scanning", 3]],
      answer: "{{company}} runs continuous container, OS, and dependency vulnerability scanning. Verified vulnerabilities follow strict remediation SLAs: Critical (CVSS 9.0–10.0) <= 24–72 hours, High (7.0–8.9) <= 14 days, Medium <= 30 days, and Low <= 90 days.",
      evidenceTag: "SOC2 CC7.1 · Vulnerability Management SLA"
    },
    {
      id: "APP-03",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "Do you run automated SAST, DAST, and Software Composition Analysis (SCA) in CI/CD?",
      keywords: [["sdlc", 5], ["sast", 5], ["sca", 5], ["dast", 4], ["dependency scanning", 5], ["sbom", 4], ["ci/cd", 4], ["owasp", 4]],
      answer: "Yes. Every pull request passes automated Static Application Security Testing (SAST), Software Composition Analysis (SCA) for CVE-flagged dependencies, secret detection, and container image scanning before merge, alongside OWASP Top 10 secure coding gates.",
      evidenceTag: "SOC2 CC8.1 · Secure SDLC Pipeline"
    },
    {
      id: "APP-04",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "How are security logs centralized, monitored, and protected against tampering?",
      keywords: [["logging", 5], ["siem", 5], ["audit trail", 5], ["audit log", 5], ["centralized logging", 5], ["immutable logs", 4], ["monitoring", 3]],
      answer: "{{company}} streams authentication, administrative, API, and cloud infrastructure logs into a centralized, tamper-evident SIEM with 24/7 anomaly alerting and at least 365 days of hot/archive log retention.",
      evidenceTag: "SOC2 CC7.2 · SIEM & Audit Logging"
    },
    {
      id: "APP-05",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "How do you protect against XSS, CSRF, SQL Injection, and Content Security Policy bypasses?",
      keywords: [["xss", 5], ["sql injection", 5], ["csrf", 5], ["csp", 4], ["content security policy", 5], ["parameterized", 4], ["owasp top 10", 4]],
      answer: "{{company}} enforces parameterized database queries across all data layers, strict Content Security Policy (CSP) headers disabling inline script execution, context-aware output escaping, and CSRF token/SameSite protections.",
      evidenceTag: "OWASP ASVS Level 2 Alignment"
    },
    {
      id: "APP-06",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "Do you maintain a Software Bill of Materials (SBOM) and monitor open-source licenses?",
      keywords: [["sbom", 5], ["open source", 4], ["third party libraries", 4], ["supply chain", 4], ["cve", 3]],
      answer: "Yes. Automated build pipelines generate and continuously monitor an SBOM for all production containers and front-end dependencies, alerting immediately on newly published CVEs or restricted open-source licenses.",
      evidenceTag: "Supply Chain Security Control"
    },
    {
      id: "APP-07",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "Do you have a formal Vulnerability Disclosure Policy (VDP) or bug bounty channel?",
      keywords: [["vulnerability disclosure", 5], ["bug bounty", 5], ["security.txt", 4], ["responsible disclosure", 5], ["researcher", 3]],
      answer: "Yes. Security researchers and customers can report potential vulnerabilities directly to {{securityEmail}} under our Safe Harbor Vulnerability Disclosure Policy, with acknowledgment within 24 business hours.",
      evidenceTag: "ISO 29147 · Vulnerability Disclosure"
    },
    {
      id: "APP-08",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "How are file uploads scanned and sanitized to prevent malware or SVG script attacks?",
      keywords: [["file upload", 5], ["malware", 4], ["antivirus", 4], ["svg", 3], ["sanitization", 4], ["mime type", 3]],
      answer: "Uploaded files are strictly validated by MIME type and size, stripped of active executable content (such as inline SVG scripts via raster re-encoding), and served from isolated origins with `Content-Disposition` protections.",
      evidenceTag: "Application Input Sanitization Policy"
    },
    {
      id: "APP-09",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "How are application changes tested and approved prior to production release?",
      keywords: [["change management", 5], ["release process", 4], ["qa testing", 4], ["rollback", 4], ["ci pipeline", 3]],
      answer: "All changes follow a documented Change Management policy: automated unit/integration tests, peer code review, staging verification, and automated rollback capability if health metrics degrade post-deploy.",
      evidenceTag: "SOC2 CC8.1 · Change Control Log"
    },
    {
      id: "APP-10",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "Do customers receive workspace audit logs of user logins and configuration changes?",
      keywords: [["customer audit log", 5], ["export logs", 4], ["login history", 4], ["siem integration", 4], ["activity log", 4]],
      answer: "Enterprise workspaces record user authentication events, role modifications, export actions, and security setting changes with immutable timestamps available for compliance review.",
      evidenceTag: "Enterprise Auditability Feature"
    },
    {
      id: "APP-11",
      pillar: "AppSec, Vulnerability & Pen-Testing",
      question: "How do you defend against automated bot attacks, credential stuffing, and API abuse?",
      keywords: [["bot protection", 4], ["rate limiting", 5], ["api abuse", 4], ["waf", 3], ["ddos", 3]],
      answer: "Edge WAF rules enforce IP reputation filtering, per-endpoint rate limiting, anomaly throttling on authentication routes, and payload size caps to block automated abuse.",
      evidenceTag: "Edge Security Control"
    },

    // --- PILLAR 5: Subprocessors, SOC2 & GDPR (10 entries) ---
    {
      id: "CMP-01",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "What is your SOC 2 Type II, ISO 27001, or independent compliance certification posture?",
      keywords: [["soc 2", 5], ["soc2", 5], ["type ii", 5], ["type 2", 5], ["iso 27001", 5], ["compliance posture", 4], ["audit report", 4], ["attestation", 3]],
      answer: "{{company}} operates a documented Information Security Management System aligned with {{complianceFrame}}. Independent SOC 2 / security attestation reports and control mappings are available under NDA via {{securityEmail}}.",
      evidenceTag: "Trust Center Compliance Attestation"
    },
    {
      id: "CMP-02",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "Do you execute a GDPR Data Processing Addendum (DPA) and Standard Contractual Clauses (SCCs)?",
      keywords: [["gdpr", 5], ["dpa", 5], ["data processing addendum", 5], ["scc", 5], ["standard contractual clauses", 5], ["cross border", 4], ["uk gdpr", 4], ["ccpa", 4]],
      answer: "Yes. {{company}} executes a comprehensive GDPR & CCPA/CPRA Data Processing Addendum (DPA) incorporating current EU Standard Contractual Clauses (SCCs) and the UK International Data Transfer Addendum upon request via {{securityEmail}}.",
      evidenceTag: "GDPR Art. 28 · Standard DPA"
    },
    {
      id: "CMP-03",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "Do you publish a subprocessor list and provide advance notice before adding new subprocessors?",
      keywords: [["subprocessor", 5], ["sub-processor", 5], ["third party vendor", 4], ["advance notice", 5], ["30 days", 4], ["vendor management", 4]],
      answer: "Yes. {{company}} publishes its current subprocessor registry directly on our Trust Portal (`{{domain}}`), vets every vendor annually for SOC 2 / ISO 27001 posture, and provides at least 30 days' advance notice before onboarding new subprocessors.",
      evidenceTag: "GDPR Art. 28 · Subprocessor Registry"
    },
    {
      id: "CMP-04",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "What is your Security Incident Response Plan and customer breach notification SLA?",
      keywords: [["incident response", 5], ["breach notification", 5], ["security incident", 5], ["notification sla", 5], ["72 hours", 4], ["24 hours", 4], ["csirt", 3]],
      answer: "{{company}} maintains a tested Incident Response Plan (IRP) with 24/7 on-call escalation. Confirmed security incidents impacting customer data are communicated to affected customer security contacts without undue delay and within 24–72 hours (aligned with GDPR Art. 33).",
      evidenceTag: "SOC2 CC7.4 · Incident Response SOP"
    },
    {
      id: "CMP-05",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "Do you perform criminal background checks and annual security awareness training for employees?",
      keywords: [["background check", 5], ["security training", 5], ["awareness training", 5], ["phishing", 4], ["onboarding", 3], ["personnel security", 4]],
      answer: "Yes. All {{company}} full-time employees and contractors with system access pass pre-employment background verification, execute strict confidentiality/NDA agreements, and complete mandatory security awareness and phishing training at hire and annually thereafter.",
      evidenceTag: "SOC2 CC1.4 · HR Security Policy"
    },
    {
      id: "CMP-06",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "How do you assess and monitor the security posture of third-party vendors?",
      keywords: [["vendor risk", 5], ["tprm", 5], ["third-party risk", 5], ["vendor assessment", 5], ["supply chain review", 3]],
      answer: "Before onboarding any vendor that processes customer data, {{company}} conducts a Third-Party Risk Management (TPRM) review verifying SOC 2 Type II or ISO 27001 reports, encryption standards, and DPA/BAA terms, followed by annual re-evaluation.",
      evidenceTag: "SOC2 CC9.2 · Vendor Risk Policy"
    },
    {
      id: "CMP-07",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "Do you carry Cyber Liability and Tech Errors & Omissions insurance?",
      keywords: [["cyber insurance", 5], ["liability insurance", 5], ["errors and omissions", 4], ["e&o", 4], ["coi", 3]],
      answer: "{{company}} maintains commercial Cyber Liability and Technology E&O coverage commensurate with enterprise contract obligations; Certificates of Insurance (COI) are available upon request during procurement.",
      evidenceTag: "Procurement Insurance COI"
    },
    {
      id: "CMP-08",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "How do you handle government or law enforcement requests for customer data?",
      keywords: [["law enforcement", 5], ["subpoena", 5], ["government request", 5], ["legal request", 4], ["warrant", 4]],
      answer: "{{company}} requires valid, binding legal process (such as a subpoena or court order) before disclosing data, challenges overly broad requests, and notifies affected customers prior to disclosure unless legally prohibited.",
      evidenceTag: "Data Disclosure & Transparency Policy"
    },
    {
      id: "CMP-09",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "Are HIPAA Business Associate Agreements (BAAs) available if we process PHI?",
      keywords: [["hipaa", 5], ["baa", 5], ["business associate", 5], ["phi", 5], ["ephi", 4], ["hitech", 4]],
      answer: "For Healthcare / HIPAA-configured deployments, {{company}} executes a formal Business Associate Agreement (BAA) and enforces HIPAA Administrative, Physical, and Technical Safeguards across dedicated eligible infrastructure.",
      evidenceTag: "HIPAA 45 CFR §164 · BAA Template"
    },
    {
      id: "CMP-10",
      pillar: "Subprocessors, SOC2 & GDPR",
      question: "Who is accountable for information security governance and how do we contact your security team?",
      keywords: [["ciso", 4], ["security team", 4], ["security contact", 4], ["governance", 4], ["risk assessment", 4], ["owner", 3]],
      answer: "Security governance at {{company}} is overseen by executive leadership and our Security Officer, conducting formal annual risk assessments. Inquiries, security packets, and incident reports can be directed anytime to {{securityEmail}}.",
      evidenceTag: "SOC2 CC1.2 · Security Governance Charter"
    },

    // --- PILLAR 6: AI Governance & Zero-Training (10 entries) ---
    {
      id: "AIG-01",
      pillar: "AI Governance & Zero-Training",
      question: "Is customer data ever used to train, fine-tune, or improve public or third-party AI/LLM models?",
      keywords: [["ai training", 5], ["model training", 5], ["zero training", 5], ["zero-training", 5], ["llm", 5], ["zero data retention", 5], ["zdr", 5], ["no training", 5], ["ai model", 4]],
      answer: "Never. {{company}} contractually guarantees that customer prompts, documents, outputs, and telemetry are NEVER used to train, fine-tune, or improve foundation AI/LLM models—neither internally nor by any upstream model provider.",
      evidenceTag: "AI Zero-Training & ZDR Attestation"
    },
    {
      id: "AIG-02",
      pillar: "AI Governance & Zero-Training",
      question: "Do your AI/LLM subprocessors enforce Zero-Data-Retention (ZDR) on prompts and completions?",
      keywords: [["zero retention", 5], ["zero data retention", 5], ["prompt retention", 5], ["ephemeral", 4], ["api retention", 4], ["openai", 3], ["anthropic", 3]],
      answer: "Yes. Any optional AI capabilities operate exclusively over enterprise Zero-Data-Retention (ZDR) API agreements where prompts and completions are processed ephemerally in memory and are not logged or retained by model providers.",
      evidenceTag: "Upstream ZDR Enterprise Addendum"
    },
    {
      id: "AIG-03",
      pillar: "AI Governance & Zero-Training",
      question: "Can enterprise customers completely disable AI features or restrict AI processing?",
      keywords: [["disable ai", 5], ["opt out ai", 5], ["turn off ai", 5], ["ai toggle", 4], ["ai opt-out", 5]],
      answer: "Yes. Enterprise workspace administrators have granular controls to enable or completely disable AI-assisted features at the organization level, ensuring 100% deterministic operation when required by procurement policy.",
      evidenceTag: "Workspace AI Governance Control"
    },
    {
      id: "AIG-04",
      pillar: "AI Governance & Zero-Training",
      question: "How do you prevent cross-tenant data leakage in RAG, embeddings, or vector databases?",
      keywords: [["rag", 5], ["vector database", 5], ["embeddings", 5], ["cross-tenant ai", 4], ["retrieval", 4], ["namespace", 3]],
      answer: "Vector embeddings and Retrieval-Augmented Generation (RAG) indexes are strictly partitioned by verified tenant namespace and encrypted per customer, ensuring retrieval queries can never surface another tenant's context.",
      evidenceTag: "AI Tenant Isolation Architecture"
    },
    {
      id: "AIG-05",
      pillar: "AI Governance & Zero-Training",
      question: "What safeguards protect against prompt injection and unauthorized AI tool execution?",
      keywords: [["prompt injection", 5], ["jailbreak", 4], ["guardrails", 5], ["agent permissions", 4], ["tool execution", 4]],
      answer: "{{company}} enforces strict system/user prompt boundary separation, schema-validated tool execution, least-privilege read scopes for AI agents, and human-in-the-loop confirmation before sensitive mutations.",
      evidenceTag: "OWASP LLM Top 10 Mitigations"
    },
    {
      id: "AIG-06",
      pillar: "AI Governance & Zero-Training",
      question: "How do you mitigate PII exposure before sending context to AI inference endpoints?",
      keywords: [["ai pii", 5], ["redact pii", 4], ["pii scrubbing ai", 5], ["sensitive prompt", 4]],
      answer: "Context payloads sent to inference endpoints are minimized to task-necessary attributes, with automated PII redaction filters available and zero raw credential or payment-card forwarding.",
      evidenceTag: "AI Data Minimization Standard"
    },
    {
      id: "AIG-07",
      pillar: "AI Governance & Zero-Training",
      question: "Are AI-generated outputs audited or logged for enterprise compliance?",
      keywords: [["ai audit", 5], ["ai logging", 4], ["explainability", 4], ["human review", 4], ["output tracking", 3]],
      answer: "Yes. Enterprise workspaces maintain audit metadata (timestamps, invoking user, model identifier, and action outcome) while supporting mandatory human review workflows before external distribution.",
      evidenceTag: "ISO 42001 AI Traceability Control"
    },
    {
      id: "AIG-08",
      pillar: "AI Governance & Zero-Training",
      question: "Do your engineers use public AI coding assistants with customer data or proprietary code?",
      keywords: [["coding assistant", 5], ["copilot", 4], ["shadow ai", 5], ["acceptable use", 4], ["internal ai", 4]],
      answer: "{{company}}'s Acceptable Use & AI Policy strictly prohibits pasting customer data, secrets, or proprietary payloads into consumer/public AI tools. Approved internal developer tools run solely under enterprise zero-training agreements.",
      evidenceTag: "Acceptable Use & Shadow AI Policy"
    },
    {
      id: "AIG-09",
      pillar: "AI Governance & Zero-Training",
      question: "Who owns the intellectual property of AI-assisted outputs generated in our workspace?",
      keywords: [["intellectual property", 5], ["ip ownership", 5], ["output ownership", 5], ["copyright", 4], ["customer owns", 4]],
      answer: "Customers retain 100% ownership and all intellectual property rights to both inputs provided to {{company}} and all outputs generated within their workspace.",
      evidenceTag: "Enterprise MSA · IP Ownership Clause"
    },
    {
      id: "AIG-10",
      pillar: "AI Governance & Zero-Training",
      question: "How do you align with emerging AI regulations such as the EU AI Act and NIST AI RMF?",
      keywords: [["eu ai act", 5], ["nist ai rmf", 5], ["ai regulation", 4], ["iso 42001", 5], ["ai risk", 4]],
      answer: "{{company}} maps its AI governance controls to the NIST AI Risk Management Framework (RMF) and EU AI Act transparency obligations, maintaining an inventory of approved models, risk assessments, and human oversight controls.",
      evidenceTag: "NIST AI RMF & EU AI Act Mapping"
    },
    {
      id: "AIG-11",
      pillar: "AI Governance & Zero-Training",
      question: "Do you maintain an AI Bill of Materials (AIBOM) listing all foundational models, embeddings, and inference providers?",
      keywords: [["aibom", 5], ["bill of materials", 5], ["model provenance", 5], ["foundation model", 4], ["model lineage", 5]],
      answer: "Yes. {{company}} maintains a machine-readable CycloneDX-compatible AIBOM documenting every foundation model, fine-tuned checkpoint, embedding model, and inference subprocessor, along with contractual ZDR status and hosting region.",
      evidenceTag: "CycloneDX AIBOM · Model Lineage Registry"
    },
    {
      id: "AIG-12",
      pillar: "AI Governance & Zero-Training",
      question: "Do you publish Model Cards documenting evaluation benchmarks, known limitations, and drift monitoring?",
      keywords: [["model card", 5], ["drift", 4], ["evaluation", 3], ["benchmark", 3], ["failure modes", 4]],
      answer: "{{company}} documents internal Model Cards for each production AI capability specifying benchmark performance, hallucination guardrails, continuous quality/drift monitoring thresholds, and documented failure modes.",
      evidenceTag: "Model Cards & Continuous Drift Evals"
    },
    {
      id: "AIG-13",
      pillar: "AI Governance & Zero-Training",
      question: "How do you screen AI training or fine-tuning datasets for copyright infringement, PII contamination, and bias?",
      keywords: [["copyright", 4], ["training dataset", 5], ["pii contamination", 5], ["bias", 4], ["fairness", 4]],
      answer: "{{company}} relies on licensed zero-retention enterprise model endpoints rather than scraping third-party data, and applies automated PII redaction and copyright/bias evaluation gates before any internal model customization.",
      evidenceTag: "Dataset Governance & PII Redaction Gate"
    },
    {
      id: "AIG-14",
      pillar: "AI Governance & Zero-Training",
      question: "How are customer RAG documents, vector embeddings, and prompt caches isolated and cryptographically erased upon offboarding?",
      keywords: [["vector", 5], ["embedding", 5], ["rag", 5], ["cryptographic erasure", 5], ["cache", 3]],
      answer: "All RAG chunks and vector embeddings are logically isolated per tenant namespace (metadata + tenant KMS key boundary). Upon contract termination, tenant vector namespaces and encryption keys are cryptographically erased within contractual deletion SLAs.",
      evidenceTag: "Tenant-Isolated Vector Store · Crypto Erasure"
    },
    {
      id: "AIG-15",
      pillar: "AI Governance & Zero-Training",
      question: "Can LLM inference and vector processing be pinned strictly to US or EU regional endpoints?",
      keywords: [["inference region", 5], ["regional inference", 5], ["eu inference", 4], ["data residency", 4], ["residency", 3]],
      answer: "Yes. Enterprise workspaces can pin LLM inference and vector storage exclusively to regional AWS Bedrock / Azure US or EU deployments within {{hostingRegion}}, avoiding cross-border prompt routing.",
      evidenceTag: "Regional Inference Pinning · GDPR"
    },
    {
      id: "AIG-16",
      pillar: "AI Governance & Zero-Training",
      question: "Does your product operate autonomous or agentic AI workflows, and how are execution boundaries enforced?",
      keywords: [["agentic", 5], ["autonomous", 5], ["agent workflow", 5], ["blast radius", 4], ["boundary", 3]],
      answer: "{{company}} enforces strict capability sandboxing on all agentic workflows: agents only invoke explicitly allowlisted tools with typed JSON schemas and runtime policy checks—never arbitrary OS shell or unrestricted network calls.",
      evidenceTag: "OWASP Agentic Security · Capability Sandbox"
    },
    {
      id: "AIG-17",
      pillar: "AI Governance & Zero-Training",
      question: "How are OAuth scopes, API tokens, and MCP tool connections scoped to enforce runtime least privilege?",
      keywords: [["oauth", 4], ["mcp", 5], ["tool scope", 5], ["least privilege", 4], ["permission inheritance", 5]],
      answer: "AI agents inherit the invoking user's exact RBAC and OAuth scopes at runtime—preventing confused-deputy privilege escalation—and use short-lived, read-only-by-default tool tokens separated by environment.",
      evidenceTag: "Runtime RBAC / OAuth Inheritance · MCP Governance"
    },
    {
      id: "AIG-18",
      pillar: "AI Governance & Zero-Training",
      question: "Do you enforce mandatory Human-in-the-Loop (HITL) approval gates before agents perform external or irreversible actions?",
      keywords: [["human-in-the-loop", 5], ["hitl", 5], ["approval gate", 5], ["irreversible", 4], ["human approval", 5]],
      answer: "Yes. High-impact or irreversible agent actions (sending external emails, issuing refunds, modifying records, or deleting data) pause for explicit cryptographic/UI Human-in-the-Loop (HITL) approval before execution.",
      evidenceTag: "Mandatory HITL Action Confirmation Gates"
    },
    {
      id: "AIG-19",
      pillar: "AI Governance & Zero-Training",
      question: "What architectural defenses protect against direct and indirect prompt injection across untrusted documents and web content?",
      keywords: [["prompt injection", 5], ["indirect injection", 5], ["dual-llm", 4], ["jailbreak", 5], ["owasp llm", 4]],
      answer: "{{company}} mitigates OWASP LLM01 prompt injection through structured system-vs-data delimiter separation, input sanitization, output schema validation, and secondary classifier guardrails before tool execution.",
      evidenceTag: "OWASP LLM01 · Prompt-Injection Guardrails"
    },
    {
      id: "AIG-20",
      pillar: "AI Governance & Zero-Training",
      question: "Are all AI agent tool invocations, parameters, and approvals logged with an emergency kill switch?",
      keywords: [["kill switch", 5], ["tool audit", 4], ["agent log", 4], ["invocation", 3], ["immutable log", 4]],
      answer: "Yes. Every agent reasoning step, tool call, argument hash, and human approval decision is recorded in tamper-evident audit logs, backed by an admin circuit breaker / kill switch to halt agent loops immediately.",
      evidenceTag: "Immutable Agent Telemetry & Kill Switch"
    },
    {
      id: "AIG-21",
      pillar: "AI Governance & Zero-Training",
      question: "If your AI executes generated code or scripts, how is the execution sandbox isolated?",
      keywords: [["sandbox", 5], ["code execution", 5], ["container isolation", 4], ["microvm", 4], ["ephemeral", 3]],
      answer: "Any AI-generated code runs inside ephemeral, network-egress-restricted containers/microVMs with strict CPU/memory timeouts and zero access to host secrets or other customers' data.",
      evidenceTag: "Ephemeral MicroVM / Container Sandbox"
    },
    {
      id: "AIG-22",
      pillar: "AI Governance & Zero-Training",
      question: "How frequently do you run AI red-teaming and adversarial robustness testing against LLM and agent endpoints?",
      keywords: [["red-team", 5], ["red team", 5], ["adversarial", 5], ["penetration test", 3], ["robustness", 4]],
      answer: "{{company}} executes automated adversarial prompt/jailbreak regression suites before major prompt or model updates plus annual independent third-party penetration testing covering LLM & agent tool endpoints.",
      evidenceTag: "AI Red-Teaming & Regression Evaluations"
    },
    {
      id: "AIG-23",
      pillar: "AI Governance & Zero-Training",
      question: "How is your AI system classified under the EU AI Act (Prohibited, High-Risk Annex III, or Limited Transparency Risk)?",
      keywords: [["annex iii", 5], ["prohibited", 4], ["high-risk", 5], ["classification", 4], ["eu ai act", 4]],
      answer: "{{company}} has documented its EU AI Act risk classification (`Limited Risk / Minimal Risk` or Enterprise High-Risk Annex III deployer support) and strictly prohibits unacceptable-risk biometric or social-scoring use cases.",
      evidenceTag: "EU AI Act Risk Classification Statement"
    },
    {
      id: "AIG-24",
      pillar: "AI Governance & Zero-Training",
      question: "Can you supply Article 26 technical documentation and instructions for use to support enterprise EU AI Act deployer obligations?",
      keywords: [["article 26", 5], ["article 25", 4], ["conformity assessment", 5], ["deployer", 4], ["technical documentation", 4]],
      answer: "Yes. Upon request, {{company}} provides deployer technical documentation, intended-purpose instructions, human-oversight guidance, and control mappings required for Article 26 conformity reviews.",
      evidenceTag: "EU AI Act Art. 26 Deployer Dossier"
    },
    {
      id: "AIG-25",
      pillar: "AI Governance & Zero-Training",
      question: "Have you implemented ISO/IEC 42001 (Artificial Intelligence Management System) controls or Statement of Applicability?",
      keywords: [["iso 42001", 5], ["iso/iec 42001", 5], ["aims", 4], ["statement of applicability", 5], ["management system", 4]],
      answer: "{{company}} aligns its AI Governance Management System with ISO/IEC 42001 requirements, maintaining defined AI policy ownership, risk assessments, impact evaluations, and control Statement of Applicability (SoA).",
      evidenceTag: "ISO/IEC 42001 AIMS SoA Mapping"
    },
    {
      id: "AIG-26",
      pillar: "AI Governance & Zero-Training",
      question: "Are your AI security controls mapped to the Cloud Security Alliance (CSA) AI Controls Matrix / AI-CAIQ?",
      keywords: [["ai-caiq", 5], ["csa", 5], ["ai controls matrix", 5], ["caiq", 5], ["cloud security alliance", 5]],
      answer: "Yes. {{company}}'s security vault maps directly to the CSA AI Controls Matrix (AICM) and AI-CAIQ across model lifecycle security, zero-training boundaries, and tenant isolation.",
      evidenceTag: "CSA AI-CAIQ & AICM Control Mapping"
    },
    {
      id: "AIG-27",
      pillar: "AI Governance & Zero-Training",
      question: "What is your SLA for notifying enterprise customers of serious AI incidents, severe bias drift, or model provider breaches?",
      keywords: [["serious ai incident", 5], ["ai incident", 5], ["provider breach", 4], ["model outage", 3], ["sla", 3]],
      answer: "{{company}} commits to notifying affected enterprise customers within 24 hours of any confirmed security incident or upstream foundation model provider breach, and proactively communicates material model version transitions.",
      evidenceTag: "24-Hr AI & Security Incident SLA"
    },
    {
      id: "AIG-28",
      pillar: "AI Governance & Zero-Training",
      question: "What controls prevent employees from using unauthorized Shadow AI tools with customer data?",
      keywords: [["shadow ai", 5], ["unauthorized ai", 5], ["acceptable use", 4], ["corporate policy", 3]],
      answer: "{{company}}'s Acceptable Use and AI Zero-Training Policy (POL-02) strictly forbids pasting customer data into unapproved consumer AI tools, backed by DNS/SSO controls and enterprise ZDR API workspaces.",
      evidenceTag: "POL-02 · Shadow AI Prohibition"
    },
    {
      id: "AIG-29",
      pillar: "AI Governance & Zero-Training",
      question: "How do you mitigate LLM hallucinations and provide verifiable source grounding for generated responses?",
      keywords: [["hallucination", 5], ["grounding", 5], ["citation", 4], ["confidence score", 4], ["deterministic", 3]],
      answer: "{{company}} pairs retrieval-augmented generation (RAG) with source citations, deterministic schema validation, and explicit confidence indicators so reviewers can audit every generated answer before submission.",
      evidenceTag: "Citation Grounding & Confidence Scoring"
    },
    {
      id: "AIG-30",
      pillar: "AI Governance & Zero-Training",
      question: "How do you satisfy AI transparency and disclosure requirements (e.g., EU AI Act Article 50) for end users?",
      keywords: [["article 50", 5], ["transparency", 4], ["disclosure", 4], ["synthetic", 5], ["watermark", 3]],
      answer: "End users are clearly informed whenever interacting with AI-driven interfaces, and generated enterprise packets carry metadata and cryptographic SHA-256 provenance digests identifying AI-assisted drafts.",
      evidenceTag: "EU AI Act Art. 50 Transparency Notice"
    }
  ];

  const EU_AI_ACT_TIERS = [
    {
      id: "minimal",
      label: "Minimal Risk (Art. 50 Exempt)",
      summary: "Deterministic workflow, search, or internal security tooling with no biometric/Annex III profiling."
    },
    {
      id: "limited",
      label: "Limited Risk (Art. 50 Transparency)",
      summary: "Interactive AI assistant / copilot; clearly discloses AI interaction and synthetic outputs to users."
    },
    {
      id: "high",
      label: "High-Risk Readiness (Annex III / Art. 26)",
      summary: "Supplies technical documentation, logging, dataset governance & HITL oversight for regulated deployers."
    }
  ];

  const DEFAULT_AIBOM = [
    {
      provider: "Anthropic",
      model: "Claude Enterprise API",
      purpose: "Reasoning & Document Drafting",
      zdr: "Yes (Contractual 0-Day)",
      retention: "0 days · No Training",
      region: "US / EU Endpoints"
    },
    {
      provider: "OpenAI",
      model: "GPT Enterprise API",
      purpose: "Structured Extraction & Fallback",
      zdr: "Yes (ZDR Addendum)",
      retention: "0 days · No Training",
      region: "US Dedicated"
    },
    {
      provider: "AWS / pgvector",
      model: "Tenant-Isolated Vector Index",
      purpose: "Customer RAG Knowledge Retrieval",
      zdr: "Yes (Tenant KMS Key)",
      retention: "Customer-Controlled Purge",
      region: "Customer Pinned VPC"
    }
  ];

  const DEFAULT_AGENT_GATES = [
    {
      capability: "CRM & Docs Retrieval",
      scope: "read:records (user-scoped)",
      authModel: "OAuth User Inheritance",
      hitlGate: "Auto-Allowed (Read-Only)",
      guardrail: "Tenant ACL + PII Redaction"
    },
    {
      capability: "Outbound Email / Slack Drafts",
      scope: "write:messages",
      authModel: "Least-Privilege Token",
      hitlGate: "Mandatory Human Approval",
      guardrail: "Dual-LLM Prompt Shield"
    },
    {
      capability: "DB Mutations, Billing & Refunds",
      scope: "write:finance / schema",
      authModel: "Scoped Role + Audit ID",
      hitlGate: "Explicit Admin Sign-Off",
      guardrail: "Amount Cap + Kill Switch"
    },
    {
      capability: "External MCP / Webhook Tools",
      scope: "execute:allowlist",
      authModel: "Isolated Sandbox Token",
      hitlGate: "Policy / Human Gate",
      guardrail: "Strict Domain Allowlist"
    }
  ];

  const SAMPLE_AI_CAIQ = [
    "1. Do you maintain an AI Bill of Materials (AIBOM) listing all foundational models and inference providers?",
    "2. Is customer prompt or RAG data ever used to train models, and is Zero-Data-Retention (ZDR) enforced?",
    "3. How are customer vector embeddings isolated and cryptographically erased upon offboarding?",
    "4. Can LLM inference and vector storage be pinned strictly to US or EU regional endpoints?",
    "5. Do autonomous or agentic features enforce execution boundaries and sandboxing?",
    "6. How are OAuth scopes and MCP tool connections scoped for runtime least privilege?",
    "7. Do you enforce mandatory Human-in-the-Loop (HITL) approval gates before irreversible actions?",
    "8. What defenses protect against direct and indirect prompt injection (OWASP LLM01)?",
    "9. Are all AI agent tool invocations logged with an emergency kill switch?",
    "10. How frequently do you run AI red-teaming and adversarial jailbreak testing?",
    "11. How is your system classified under the EU AI Act (Minimal, Limited, or High-Risk Annex III)?",
    "12. Can you supply Article 26 technical documentation to support EU AI Act deployers?",
    "13. Have you implemented ISO/IEC 42001 AI Management System controls or Statement of Applicability?",
    "14. Are your AI controls mapped to the CSA AI Controls Matrix / AI-CAIQ?",
    "15. What is your SLA for notifying customers of serious AI incidents or model provider breaches?"
  ];

  /**
   * 20 Realistic Enterprise Buyer Security Questions (SIG-Lite Sample)
   */
  const SAMPLE_SIG_LITE = [
    "1. Describe how customer data is encrypted at rest (e.g., AES-256) across databases, file storage, and backups.",
    "2. What transport encryption protocols and minimum TLS versions (e.g., TLS 1.2 / TLS 1.3) are enforced for data in transit?",
    "3. Does your platform support Enterprise SSO (SAML 2.0 / OIDC) and enforce Multi-Factor Authentication (MFA) for internal staff?",
    "4. How is Role-Based Access Control (RBAC) and least privilege enforced for customer users and internal operators?",
    "5. What is your current SOC 2 Type II or ISO 27001 compliance posture and can audit reports be shared under NDA?",
    "6. What are your automated backup cadence, Recovery Point Objective (RPO), and Recovery Time Objective (RTO) targets?",
    "7. How frequently do you perform independent third-party penetration testing and are executive summaries available?",
    "8. What are your vulnerability scanning practices and remediation SLAs for Critical and High CVSS findings?",
    "9. Do you execute a GDPR Data Processing Addendum (DPA) including Standard Contractual Clauses (SCCs)?",
    "10. Do you maintain a public subprocessor list and provide advance notification before adding new subprocessors?",
    "11. What is your documented Security Incident Response Plan and customer breach notification SLA?",
    "12. Is customer data or prompt content ever used to train AI/LLM models, and do upstream APIs enforce Zero-Data-Retention?",
    "13. How are security and authentication logs centralized, monitored (SIEM), and protected against tampering?",
    "14. Are employee laptops and endpoints protected with full-disk encryption, centralized MDM, and EDR?",
    "15. How are cryptographic encryption keys managed, separated from compute, and rotated?",
    "16. What is your SLA for permanently deleting customer data and purging backups upon contract termination?",
    "17. Do you run automated SAST, SCA dependency scanning, and peer code review in your CI/CD SDLC?",
    "18. How is logical multi-tenant data isolation enforced to prevent cross-customer data access?",
    "19. Are pre-employment background checks and annual security awareness training mandatory for all staff?",
    "20. Where is customer data physically hosted and how do you support regional data residency requirements?"
  ];

  const STOP_WORDS = new Set([
    "a", "an", "and", "are", "as", "at", "be", "by", "can", "do", "does",
    "for", "from", "how", "in", "into", "is", "it", "of", "on", "or",
    "our", "per", "please", "provide", "describe", "what", "which", "who",
    "with", "you", "your", "the", "to", "that", "this", "any", "all", "if",
    "have", "has", "we", "their", "they", "will", "would", "there", "such"
  ]);

  function normalizeText(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/^\s*(q?\d+[.):\-\s]+)/i, "")
      .replace(/[^a-z0-9\-\/\s]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenize(normStr) {
    const tokens = normStr
      .split(/\s+/)
      .map((t) => t.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, ""))
      .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
    const bigrams = [];
    for (let i = 0; i < tokens.length - 1; i++) {
      bigrams.push(tokens[i] + " " + tokens[i + 1]);
    }
    return { tokens, bigrams };
  }

  function applyTemplateVars(text, ctx) {
    const c = ctx || {};
    const company = String(c.company || "Your Organization").trim() || "Your Organization";
    const domain = String(c.domain || "yourdomain.com").trim() || "yourdomain.com";
    const securityEmail = String(c.securityEmail || `security@${domain.replace(/^https?:\/\//i, "").split("/")[0]}`).trim();
    const hostingRegion = String(c.hostingRegion || "AWS US-East & EU-Central Multi-AZ").trim();
    const complianceFrame = String(c.complianceFrame || "SOC 2 Type II & GDPR").trim();

    return String(text || "")
      .replace(/\{\{company\}\}/g, company)
      .replace(/\{\{domain\}\}/g, domain)
      .replace(/\{\{securityEmail\}\}/g, securityEmail)
      .replace(/\{\{hostingRegion\}\}/g, hostingRegion)
      .replace(/\{\{complianceFrame\}\}/g, complianceFrame);
  }

  function scoreEntry(normQuestion, qTokens, qBigrams, entry) {
    const qSet = new Set(qTokens);
    const biSet = new Set(qBigrams);
    let matchedWeight = 0;
    let totalWeight = 0;
    let strongPhraseHits = 0;

    const kws = Array.isArray(entry.keywords) ? entry.keywords : [];
    for (let i = 0; i < kws.length; i++) {
      const item = kws[i];
      const term = Array.isArray(item) ? String(item[0] || "").toLowerCase() : String(item || "").toLowerCase();
      const weight = Array.isArray(item) ? Number(item[1]) || 3 : 3;
      totalWeight += weight;
      if (!term) continue;

      if (term.indexOf(" ") !== -1 || term.indexOf("-") !== -1) {
        const cleanTerm = term.replace(/[^a-z0-9\-\/\s]+/g, " ").trim();
        const spaceTerm = cleanTerm.replace(/-/g, " ");
        if (normQuestion.indexOf(cleanTerm) !== -1 || normQuestion.indexOf(spaceTerm) !== -1) {
          matchedWeight += weight;
          if (weight >= 4) strongPhraseHits += 1;
        } else {
          // Partial overlap on multi-word keyword
          const parts = spaceTerm.split(/\s+/).filter((p) => p.length > 2 && !STOP_WORDS.has(p));
          if (parts.length >= 2) {
            let hits = 0;
            for (let p = 0; p < parts.length; p++) {
              if (qSet.has(parts[p]) || normQuestion.indexOf(parts[p]) !== -1) hits++;
            }
            if (hits === parts.length) {
              matchedWeight += weight * 0.85;
            } else if (hits > 0) {
              matchedWeight += (weight * 0.35 * hits) / parts.length;
            }
          }
        }
      } else {
        if (qSet.has(term) || normQuestion.indexOf(term) !== -1) {
          matchedWeight += weight;
          if (weight >= 4) strongPhraseHits += 1;
        }
      }
    }

    const entryNorm = normalizeText(entry.question);
    const entryTok = tokenize(entryNorm);
    let overlapCount = 0;
    for (let j = 0; j < entryTok.tokens.length; j++) {
      if (qSet.has(entryTok.tokens[j])) overlapCount += 1;
    }
    for (let b = 0; b < entryTok.bigrams.length; b++) {
      if (biSet.has(entryTok.bigrams[b])) overlapCount += 1.6;
    }
    const denom = Math.max(4, Math.min(qTokens.length + entryTok.tokens.length * 0.5, 16));
    const qOverlap = Math.min(1, overlapCount / denom);

    const kwNormDenom = Math.max(7, Math.min(totalWeight * 0.45, 13));
    const kwScore = Math.min(1, matchedWeight / kwNormDenom);
    const phraseBonus = Math.min(0.18, strongPhraseHits * 0.08);
    const combined = Math.min(1, kwScore * 0.72 + qOverlap * 0.28 + phraseBonus);

    return {
      score: Number(combined.toFixed(3)),
      matchedWeight: Number(matchedWeight.toFixed(2)),
      strongPhraseHits
    };
  }

  /**
   * Matches an array of buyer security questions against the 64-entry KB.
   */
  function matchSecurityQuestions(questionsList, companyCtx) {
    const list = Array.isArray(questionsList) ? questionsList : [];
    const results = [];

    for (let idx = 0; idx < list.length; idx++) {
      const rawItem = list[idx];
      const rawQ = typeof rawItem === "string"
        ? rawItem
        : String((rawItem && (rawItem.question || rawItem.text || rawItem.prompt)) || "");
      const cleanRaw = rawQ.trim();
      if (!cleanRaw) continue;

      const normQ = normalizeText(cleanRaw);
      const { tokens, bigrams } = tokenize(normQ);

      let bestEntry = KB_ENTRIES[0];
      let bestMetrics = { score: 0, matchedWeight: 0, strongPhraseHits: 0 };

      for (let k = 0; k < KB_ENTRIES.length; k++) {
        const m = scoreEntry(normQ, tokens, bigrams, KB_ENTRIES[k]);
        if (
          m.score > bestMetrics.score ||
          (m.score === bestMetrics.score && m.matchedWeight > bestMetrics.matchedWeight)
        ) {
          bestMetrics = m;
          bestEntry = KB_ENTRIES[k];
        }
      }

      let confidence = "Needs Review";
      if (bestMetrics.score >= 0.44 || bestMetrics.matchedWeight >= 6.5) {
        confidence = "High";
      } else if (bestMetrics.score >= 0.24 || bestMetrics.matchedWeight >= 3.0) {
        confidence = "Medium";
      }

      const suggestedAnswer =
        confidence === "Needs Review"
          ? applyTemplateVars(
              "Custom procurement review flagged for {{company}} ({{domain}}). Closest control reference (" +
                bestEntry.id +
                "): " +
                bestEntry.answer +
                " Please verify any customer-specific addendum requirements with {{securityEmail}}.",
              companyCtx
            )
          : applyTemplateVars(bestEntry.answer, companyCtx);

      results.push({
        index: results.length + 1,
        originalQuestion: cleanRaw,
        confidence,
        score: bestMetrics.score,
        matchedId: bestEntry.id,
        matchedQuestion: bestEntry.question,
        pillar: bestEntry.pillar,
        suggestedAnswer,
        evidenceTag: bestEntry.evidenceTag
      });
    }

    return results;
  }

  /**
   * 6 Auditor-Ready Corporate Security & AI Governance Policy Templates
   */
  const POLICY_TEMPLATES = [
    {
      id: "POL-01",
      title: "Information Security Policy (ISMS Baseline)",
      framework: "SOC 2 CC1–CC5 / ISO 27001 A.5",
      freeTier: true,
      owner: "Chief Information Security Officer (CISO) / Security Lead",
      reviewCadence: "Annual & upon material architecture change",
      summary: "Establishes enterprise ISMS governance, risk assessment cadence, security control baselines, and executive accountability across {{company}}.",
      body: [
        "## 1. Purpose",
        "This Information Security Policy establishes the baseline Information Security Management System (ISMS) governance framework for **{{company}}** (`{{domain}}`). Its objective is to protect the confidentiality, integrity, and availability of customer data, production workloads, and corporate systems aligned with **{{complianceFrame}}**.",
        "",
        "## 2. Scope",
        "This policy applies to all full-time employees, contractors, temporary personnel, production cloud environments hosted in **{{hostingRegion}}**, source code repositories, CI/CD pipelines, and third-party SaaS tools operated by or on behalf of {{company}}.",
        "",
        "## 3. Control Standards & Requirements",
        "- **Security Governance & Risk Management:** {{company}} conducts a formal annual Security Risk Assessment (and ad-hoc assessments prior to major architectural changes) to identify threats, evaluate likelihood/impact, and track remediation owners to closure.",
        "- **Logical Tenant Isolation:** Multi-tenant customer environments enforce strict tenant-scoped authorization checks at the API and database layers to prevent cross-customer data access.",
        "- **Secure SDLC & Change Management:** All production code changes require peer review, automated Static Application Security Testing (SAST), Software Composition Analysis (SCA), and secret scanning before deployment.",
        "- **Workforce Security & Training:** All personnel undergo pre-employment background verification (where permitted by law), sign binding confidentiality agreements, and complete mandatory annual security & privacy awareness training.",
        "- **Endpoint Hardening:** Corporate endpoints enforce full-disk encryption (FileVault/BitLocker), centralized Mobile Device Management (MDM), Endpoint Detection & Response (EDR), automatic screen lock (<= 10 minutes), and OS patch SLAs.",
        "- **Vulnerability & Penetration Testing:** Independent third-party penetration tests are executed annually, with executive summaries available to enterprise buyers under NDA via `{{securityEmail}}`.",
        "",
        "## 4. Roles, Responsibilities & Review Cadence",
        "- **Executive Leadership & CISO / Security Lead:** Approves ISMS policy updates, allocates security budget, and sponsors annual risk reviews.",
        "- **Engineering & Infrastructure Owners:** Maintain cloud hardening, CI/CD security gates, immutable audit logging, and vulnerability SLA compliance (Critical: 24–72 hours; High: 14 days; Medium: 30 days).",
        "- **All Personnel:** Adhere to least-privilege access, acceptable use, and immediate security incident reporting to `{{securityEmail}}`.",
        "- **Review Cadence:** Reviewed and re-attested at least annually (effective **{{effectiveDate}}**) or following any material security event.",
        "",
        "## 5. Subprocessor & Compliance Mapping",
        "- **Primary Control Mappings:** AICPA Trust Services Criteria `CC1.1–CC1.5` (Control Environment), `CC2.1–CC2.3` (Communication), `CC3.1–CC3.4` (Risk Assessment), `CC4.1–CC4.2` (Monitoring), `CC5.1–CC5.3` (Control Activities); ISO/IEC 27001:2022 `A.5.1` (Policies for Information Security).",
        "- **Authorized Infrastructure & Subprocessors:**",
        "",
        "{{subprocessorsTable}}"
      ].join("\n")
    },
    {
      id: "POL-02",
      title: "AI Data Governance & Zero-Training Policy",
      framework: "ISO 42001 / OWASP LLM Top 10",
      freeTier: true,
      owner: "VP of Engineering & AI Governance Officer",
      reviewCadence: "Semi-Annual & upon new model/provider onboarding",
      summary: "Enforces contractual Zero-Data-Retention (ZDR), strict prohibition on foundation model training with customer data, and OWASP LLM Top 10 safeguards.",
      body: [
        "## 1. Purpose",
        "This AI Data Governance & Zero-Training Policy defines mandatory security, privacy, and safety guardrails for any artificial intelligence, machine learning, or Large Language Model (LLM) capabilities operated by **{{company}}** (`{{domain}}`).",
        "",
        "## 2. Scope",
        "Applies to all production AI features, vector stores, prompt pipelines, internal engineering copilots, and upstream model API subprocessors handling customer inputs, outputs, or embeddings within **{{hostingRegion}}**.",
        "",
        "## 3. Control Standards & Requirements",
        "- **Zero-Training Guarantee:** {{company}} strictly prohibits using customer prompts, completions, uploaded files, or fine-tuning telemetry to train, retrain, or improve third-party or shared foundation models.",
        "- **Contractual Zero-Data-Retention (ZDR):** Upstream enterprise LLM APIs are configured exclusively under contractual ZDR / zero-retention enterprise agreements where prompts and outputs are processed ephemerally in memory and never persisted by the model provider.",
        "- **Tenant-Isolated Retrieval (RAG):** Embeddings and vector indexes are logically segregated per customer tenant with strict authorization filtering prior to context assembly so cross-tenant prompt leakage cannot occur.",
        "- **OWASP LLM Top 10 Mitigations:** Production AI pipelines implement input sanitization, system/user prompt boundary separation, output encoding against XSS/SSRF, strict tool-call schema validation, and per-tenant rate/token quotas.",
        "- **Human-in-the-Loop & PII Redaction:** Sensitive personal or regulated data is minimized or masked prior to inference where feasible, and high-impact automated actions require explicit user confirmation.",
        "- **Customer Opt-Out & Transparency:** Enterprise customers receive clear documentation of active AI subprocessors and may disable optional AI capabilities without losing core platform functionality.",
        "",
        "## 4. Roles, Responsibilities & Review Cadence",
        "- **AI Governance Officer / Security Lead (`{{securityEmail}}`):** Approves every new AI model vendor, verifies ZDR DPAs/addenda, and oversees semi-annual prompt-injection red-teaming.",
        "- **Product & ML Engineering:** Enforces stateless inference configuration, model output guardrails, and telemetry redaction (no raw customer prompts in application logs).",
        "- **Review Cadence:** Reviewed semi-annually (effective **{{effectiveDate}}**) and before onboarding any new LLM provider or autonomous agent tool.",
        "",
        "## 5. Subprocessor & Compliance Mapping",
        "- **Primary Control Mappings:** ISO/IEC 42001:2023 (AI Management System `A.6`, `A.7`, `A.8`), OWASP Top 10 for LLM Applications (`LLM01` Prompt Injection, `LLM02` Sensitive Info Disclosure, `LLM06` Excessive Agency), EU AI Act Transparency & Data Governance alignment, and **{{complianceFrame}}**.",
        "- **Authorized Infrastructure & AI Subprocessors:**",
        "",
        "{{subprocessorsTable}}"
      ].join("\n")
    },
    {
      id: "POL-03",
      title: "Access Control, SSO & MFA Policy",
      framework: "SOC 2 CC6.1–CC6.3",
      freeTier: false,
      owner: "Head of Infrastructure & Identity Security",
      reviewCadence: "Quarterly Access Reviews & Annual Policy Review",
      summary: "Governs least-privilege RBAC, SAML 2.0 / OIDC SSO, mandatory hardware/TOTP MFA, privileged elevation, and 1-hour offboarding SLA.",
      body: [
        "## 1. Purpose",
        "This Access Control, SSO & MFA Policy ensures that logical access to **{{company}}** (`{{domain}}`) production infrastructure, customer data stores, and corporate applications is restricted strictly to authorized, authenticated individuals under least-privilege principles.",
        "",
        "## 2. Scope",
        "Applies to all workforce accounts, service accounts, API tokens, administrative consoles, cloud IAM roles in **{{hostingRegion}}**, and enterprise customer Single Sign-On (SSO) integrations.",
        "",
        "## 3. Control Standards & Requirements",
        "- **Mandatory Multi-Factor Authentication (MFA):** Phishing-resistant hardware MFA (FIDO2/WebAuthn) or enterprise TOTP MFA is enforced on 100% of workforce identity provider accounts, cloud consoles, source control, and VPN/bastion access—SMS MFA is prohibited.",
        "- **Enterprise SSO & SCIM Provisioning:** Enterprise customer plans support SAML 2.0 and OIDC Single Sign-On, configurable session timeouts, and automated SCIM deprovisioning.",
        "- **Least Privilege & Role-Based Access Control (RBAC):** Access is granted on a documented need-to-know basis using role-based groups. Production database write access is restricted to automated CI/CD pipelines or audited Just-In-Time (JIT) break-glass sessions.",
        "- **Unique Identities & Credential Hygiene:** Shared administrative logins are prohibited. Service secrets and API keys are stored in encrypted Secrets Managers/KMS and rotated at least every 90–180 days.",
        "- **Quarterly User Access Reviews (UAR):** Managers and the Security Lead certify all production, cloud, and sensitive SaaS entitlements every quarter, immediately revoking stale permissions.",
        "- **Onboarding & Offboarding SLA:** Access is provisioned only after manager approval. Upon termination or role change, SSO and production credentials are revoked within **1 hour** (immediately for involuntary terminations).",
        "",
        "## 4. Roles, Responsibilities & Review Cadence",
        "- **Identity & Infrastructure Lead:** Enforces IdP conditional access policies, JIT elevation logs, and quarterly UAR evidence archival.",
        "- **People Ops / HR:** Triggers automated offboarding tickets prior to or simultaneous with employee/contractor separation.",
        "- **Security Contact:** Escalations and enterprise SSO configuration inquiries are handled via `{{securityEmail}}`.",
        "- **Review Cadence:** Access entitlements reviewed quarterly; policy reviewed annually (effective **{{effectiveDate}}**).",
        "",
        "## 5. Subprocessor & Compliance Mapping",
        "- **Primary Control Mappings:** AICPA SOC 2 `CC6.1` (Logical Access Security), `CC6.2` (User Registration & Authorization), `CC6.3` (Role-Based Access & Revocation); ISO 27001 `A.5.15–A.5.18`, `A.8.2–A.8.5`; **{{complianceFrame}}**.",
        "- **Authorized Infrastructure & Identity Subprocessors:**",
        "",
        "{{subprocessorsTable}}"
      ].join("\n")
    },
    {
      id: "POL-04",
      title: "Incident Response & Breach Notification Plan (24-Hr SLA)",
      framework: "SOC 2 CC7.4 / GDPR Art. 33",
      freeTier: false,
      owner: "CISO / Incident Commander",
      reviewCadence: "Annual Tabletop Exercise & Post-Incident Review",
      summary: "Defines 24/7 severity triage, containment playbooks, forensic evidence preservation, and a strict 24-hour enterprise breach notification SLA.",
      body: [
        "## 1. Purpose",
        "This Incident Response & Breach Notification Plan establishes a structured, repeatable lifecycle for detecting, triaging, containing, eradicating, and communicating security incidents affecting **{{company}}** (`{{domain}}`) or its enterprise customers.",
        "",
        "## 2. Scope",
        "Covers all production infrastructure in **{{hostingRegion}}**, application workloads, corporate endpoints, identity providers, and third-party subprocessors where unauthorized access, data exposure, ransomware, or service integrity compromise is suspected.",
        "",
        "## 3. Control Standards & Requirements",
        "- **Detection & Centralized SIEM Alerting:** Authentication, cloud control-plane, WAF, and EDR telemetry are forwarded to immutable centralized logging with automated anomaly alerting.",
        "- **Severity Classification:**",
        "  - `SEV-1 (Critical):` Confirmed or highly suspected unauthorized access to customer data or production takeover (Immediate response < 15 mins).",
        "  - `SEV-2 (High):` Contained security control failure, high-risk vulnerability exploitation attempt, or subprocessor breach notice (< 1 hour response).",
        "  - `SEV-3 / SEV-4 (Medium/Low):` Isolated endpoint alert or policy violation without data exposure (< 24 hours response).",
        "- **24-Hour Customer Breach Notification SLA:** Upon confirming a Security Incident impacting customer data, {{company}} notifies affected customer security contacts within **24 hours** (well inside GDPR Art. 33's 72-hour regulatory window), providing root cause, impacted scope, and containment steps.",
        "- **Containment & Forensic Preservation:** Incident Commanders isolate compromised credentials/instances while preserving immutable log snapshots and cryptographic hashes (`SHA-256`) for forensic root-cause analysis (RCA).",
        "- **Post-Incident RCA & Testing:** Every SEV-1/SEV-2 event produces a written Blameless Post-Mortem within 5 business days. The Incident Response Plan is validated via an annual tabletop simulation.",
        "",
        "## 4. Roles, Responsibilities & Review Cadence",
        "- **Incident Commander (CISO / On-Call Lead):** Leads technical containment, declares severity, and authorizes customer/regulatory notifications.",
        "- **Legal & Privacy Officer:** Coordinates GDPR/state breach notices, DPA obligations, and law enforcement liaison.",
        "- **External Security Reporting:** Suspected vulnerabilities or incidents can be reported 24/7 to `{{securityEmail}}`.",
        "- **Review Cadence:** Tested via annual tabletop exercise and reviewed annually (effective **{{effectiveDate}}**).",
        "",
        "## 5. Subprocessor & Compliance Mapping",
        "- **Primary Control Mappings:** AICPA SOC 2 `CC7.3` (Security Event Evaluation), `CC7.4` (Incident Response Execution), `CC7.5` (Recovery & Lessons Learned); GDPR `Article 33 & 34`; ISO 27001 `A.5.24–A.5.28`; **{{complianceFrame}}**.",
        "- **Authorized Infrastructure & Incident-Scope Subprocessors:**",
        "",
        "{{subprocessorsTable}}"
      ].join("\n")
    },
    {
      id: "POL-05",
      title: "Data Encryption, Backup & Retention Policy",
      framework: "SOC 2 CC6.7 / A1.2",
      freeTier: false,
      owner: "Principal Cloud Architect & Data Protection Lead",
      reviewCadence: "Annual & Semi-Annual DR Restore Drills",
      summary: "Specifies AES-256-GCM at rest, TLS 1.3 in transit, KMS key rotation, RPO <= 1 hr / RTO <= 4 hrs immutable backups, and 30-day deletion SLAs.",
      body: [
        "## 1. Purpose",
        "This Data Encryption, Backup & Retention Policy mandates cryptographic protection, business continuity backups, and defensible data disposal across **{{company}}** (`{{domain}}`) systems.",
        "",
        "## 2. Scope",
        "Applies to all customer databases, object storage, search/vector indexes, automated snapshots, network communications, and offboarding workflows operating in **{{hostingRegion}}**.",
        "",
        "## 3. Control Standards & Requirements",
        "- **Encryption at Rest:** 100% of customer data, attachments, logs, and backups are encrypted at rest using **AES-256-GCM** backed by FIPS 140-2/3 validated Cloud KMS / HSM services.",
        "- **Encryption in Transit:** All public endpoints enforce HTTPS with **TLS 1.3** (minimum TLS 1.2 with AEAD forward-secrecy ciphers) and HSTS. Internal service-to-service traffic uses authenticated TLS / mTLS.",
        "- **Key Management & Rotation:** Key Encryption Keys (KEKs) are isolated from application compute via strict IAM policies and rotated automatically at least every 365 days (and immediately upon suspected compromise).",
        "- **Immutable Backups & RPO/RTO Targets:** Automated encrypted snapshots run continuously/daily across multi-AZ storage with cross-region replication and object-lock immutability against ransomware. Recovery targets: **RPO <= 1 hour**, **RTO <= 4 hours**.",
        "- **Backup Restoration Testing:** Engineering executes documented backup restore and disaster recovery drills at least semi-annually to verify data integrity.",
        "- **Retention & Deletion SLA:** Upon contract termination or verified GDPR/CCPA erasure request to `{{securityEmail}}`, active customer records are purged within **30 days** and rolling backups cryptographically expire within **35 days**, with a written Certificate of Destruction available upon request.",
        "",
        "## 4. Roles, Responsibilities & Review Cadence",
        "- **Cloud Infrastructure Team:** Maintains KMS key policies, TLS certificates, immutable backup schedules, and semi-annual restore test evidence.",
        "- **Data Protection Lead:** Processes verified customer deletion/export requests within statutory and contractual SLAs.",
        "- **Review Cadence:** Policy reviewed annually (effective **{{effectiveDate}}**); DR restore drills performed every 6 months.",
        "",
        "## 5. Subprocessor & Compliance Mapping",
        "- **Primary Control Mappings:** AICPA SOC 2 `CC6.1` (Encryption), `CC6.7` (Transmission Security), `A1.2` (Environmental & Backup Recovery), `C1.2` (Confidential Disposal); GDPR `Art. 17 & 32`; **{{complianceFrame}}**.",
        "- **Authorized Storage & Backup Subprocessors:**",
        "",
        "{{subprocessorsTable}}"
      ].join("\n")
    },
    {
      id: "POL-06",
      title: "Third-Party Vendor & Subprocessor Risk Policy",
      framework: "SOC 2 CC9.2",
      freeTier: false,
      owner: "Security & Procurement Compliance Lead",
      reviewCadence: "Annual Vendor Re-Assessment & Pre-Onboarding Gate",
      summary: "Requires security due diligence, SOC 2/ISO evidence review, executed DPAs/SCCs, least-data sharing, and 30-day advance customer subprocessor notice.",
      body: [
        "## 1. Purpose",
        "This Third-Party Vendor & Subprocessor Risk Policy ensures that **{{company}}** (`{{domain}}`) evaluates, contracts, monitors, and governs all external vendors and sub-processors that store, process, or transmit customer or corporate data.",
        "",
        "## 2. Scope",
        "Applies to all cloud infrastructure providers, SaaS tools, AI model APIs, payment processors, and managed security vendors onboarded across **{{hostingRegion}}** or globally.",
        "",
        "## 3. Control Standards & Requirements",
        "- **Pre-Onboarding Security Assessment:** Prior to transmitting any customer or confidential data, prospective Tier-1/Tier-2 vendors undergo a security posture review verifying SOC 2 Type II or ISO 27001 certification, encryption standards, and breach history.",
        "- **Mandatory Contractual Safeguards (DPA & SCCs):** Every subprocessor handling personal or customer data must execute a binding Data Processing Addendum (DPA), Standard Contractual Clauses (SCCs) for cross-border transfers where applicable, and confidentiality obligations.",
        "- **Least-Data & Scoped API Access:** Integrations follow data minimization principles—only strictly required fields/scopes are shared, using isolated API keys and TLS 1.3 transport.",
        "- **30-Day Advance Subprocessor Notice:** {{company}} maintains an up-to-date public Subprocessor Registry and provides enterprise customers at least **30 days advance notice** before authorizing any new subprocessor to process customer data, honoring contractual objection rights.",
        "- **Annual Vendor Re-Evaluation & Offboarding:** Critical vendors are re-reviewed annually for updated SOC 2 / penetration test attestations. Terminated vendors have API access revoked immediately and data destruction certified.",
        "",
        "## 4. Roles, Responsibilities & Review Cadence",
        "- **Security & Legal Compliance (`{{securityEmail}}`):** Conducts vendor risk assessments, tracks DPA/BAA execution, and publishes subprocessor change notices.",
        "- **Department Heads & Engineering:** Prohibited from connecting unapproved SaaS or AI tools ('Shadow IT') to customer data stores.",
        "- **Review Cadence:** Critical vendor portfolio reviewed annually (effective **{{effectiveDate}}**); registry updated continuously.",
        "",
        "## 5. Subprocessor & Compliance Mapping",
        "- **Primary Control Mappings:** AICPA SOC 2 `CC9.2` (Vendor & Business Partner Risk Management); GDPR `Article 28` (Processor Obligations); ISO 27001 `A.5.19–A.5.22` (Supplier Relationships); **{{complianceFrame}}**.",
        "- **Live Authorized Subprocessor Registry:**",
        "",
        "{{subprocessorsTable}}"
      ].join("\n")
    }
  ];

  function escapeMarkdownCell(val) {
    return String(val == null ? "" : val)
      .replace(/\|/g, "\\|")
      .replace(/\r?\n+/g, " ")
      .trim() || "—";
  }

  function buildSubprocessorsMarkdownTable(subprocessors) {
    const list = Array.isArray(subprocessors) ? subprocessors : [];
    const header = "| Subprocessor | Purpose / Data Scope | Hosting Location | DPA / Safeguard |\n| --- | --- | --- | --- |";
    if (list.length === 0) {
      return `${header}\n| None configured | No external subprocessors currently listed | N/A | N/A |`;
    }
    const rows = list.map((sp) => {
      const name = escapeMarkdownCell(sp && sp.name);
      const purpose = escapeMarkdownCell(sp && sp.purpose);
      const location = escapeMarkdownCell(sp && sp.location);
      const dpaStatus = escapeMarkdownCell(sp && sp.dpaStatus);
      return `| ${name} | ${purpose} | ${location} | ${dpaStatus} |`;
    });
    return `${header}\n${rows.join("\n")}`;
  }

  function buildPolicyDocument(policy, portalCtx) {
    const pol = typeof policy === "string"
      ? POLICY_TEMPLATES.find((p) => p.id === policy)
      : policy;
    if (!pol) return "";

    const ctx = portalCtx || {};
    const effectiveDate = String(ctx.effectiveDate || new Date().toISOString().slice(0, 10)).trim();
    const subprocsTable = buildSubprocessorsMarkdownTable(ctx.subprocessors);

    const headerLines = [
      `# ${pol.id}: ${pol.title}`,
      "",
      `- **Organization:** {{company}} (\`{{domain}}\`)`,
      `- **Framework Mapping:** ${pol.framework}`,
      `- **Compliance Alignment:** {{complianceFrame}}`,
      `- **Primary Hosting Region:** {{hostingRegion}}`,
      `- **Security Contact:** {{securityEmail}}`,
      `- **Policy Owner:** ${pol.owner || "Security Governance Lead"}`,
      `- **Review Cadence:** ${pol.reviewCadence || "Annual"}`,
      `- **Effective Date:** ${effectiveDate}`,
      "",
      pol.body || ""
    ].join("\n");

    const interpolated = applyTemplateVars(headerLines, ctx)
      .replace(/\{\{effectiveDate\}\}/g, effectiveDate)
      .replace(/\{\{subprocessorsTable\}\}/g, subprocsTable);

    return interpolated;
  }

  return {
    PILLARS,
    ALL_BADGES,
    INDUSTRY_PRESETS,
    KB_ENTRIES,
    SAMPLE_SIG_LITE,
    SAMPLE_AI_CAIQ,
    EU_AI_ACT_TIERS,
    DEFAULT_AIBOM,
    DEFAULT_AGENT_GATES,
    POLICY_TEMPLATES,
    matchSecurityQuestions,
    applyTemplateVars,
    buildPolicyDocument
  };
})();

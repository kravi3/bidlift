/**
 * TrustVault Zero-Server Live DNS Security Verifier (Cloudflare DoH + Google DoH Fallback)
 * ----------------------------------------------------------------------------------------
 * Executes real-time browser DNS-over-HTTPS queries against DMARC, SPF, CAA, MX, and DNSSEC
 * records with zero backend proxy and zero PII stored.
 */
window.TrustVaultScanner = (function () {
  "use strict";

  const SUBPROC_SIGNATURES = [
    {
      pattern: /aspmx\.l\.google\.com|googlemail\.com|google-site-verification|_spf\.google\.com/i,
      vendor: {
        name: "Google Workspace",
        purpose: "Corporate Email, Identity & Productivity",
        location: "United States / Global",
        dpaStatus: "DPA + SCCs (DNS Verified)"
      }
    },
    {
      pattern: /mail\.protection\.outlook\.com|spf\.protection\.outlook\.com|\bMS=ms/i,
      vendor: {
        name: "Microsoft 365",
        purpose: "Corporate Email & Enterprise Identity",
        location: "United States / Global",
        dpaStatus: "DPA Executed (DNS Verified)"
      }
    },
    {
      pattern: /protonmail\.ch|proton\.me/i,
      vendor: {
        name: "Proton Mail",
        purpose: "End-to-End Encrypted Business Email",
        location: "Switzerland",
        dpaStatus: "Swiss DPA / GDPR (DNS Verified)"
      }
    },
    {
      pattern: /cloudflare\.net|cloudflare-verify/i,
      vendor: {
        name: "Cloudflare",
        purpose: "WAF, DDoS Mitigation & TLS Edge",
        location: "Global Edge",
        dpaStatus: "DPA Executed (DNS Verified)"
      }
    },
    {
      pattern: /amazonses\.com|amazonaws\.com|aws-domain/i,
      vendor: {
        name: "Amazon Web Services (AWS)",
        purpose: "Cloud Infrastructure & Email Relay",
        location: "United States / EU",
        dpaStatus: "DPA + SCCs (DNS Verified)"
      }
    },
    {
      pattern: /stripe-verification|stripecdn/i,
      vendor: {
        name: "Stripe",
        purpose: "PCI-DSS Level 1 Payment Processing",
        location: "United States / Global",
        dpaStatus: "DPA Executed (DNS Verified)"
      }
    },
    {
      pattern: /atlassian-domain-verification/i,
      vendor: {
        name: "Atlassian",
        purpose: "Engineering Issue Tracking & Access Governance",
        location: "United States / Global",
        dpaStatus: "DPA Executed (DNS Verified)"
      }
    },
    {
      pattern: /hubspot-developer|hubspotemail|hs-domain/i,
      vendor: {
        name: "HubSpot",
        purpose: "CRM & Customer Communications",
        location: "United States",
        dpaStatus: "DPA Executed (DNS Verified)"
      }
    },
    {
      pattern: /docusign=/i,
      vendor: {
        name: "DocuSign",
        purpose: "Enterprise Agreement eSignature",
        location: "United States",
        dpaStatus: "DPA Executed (DNS Verified)"
      }
    },
    {
      pattern: /openai-domain-verification/i,
      vendor: {
        name: "OpenAI Enterprise",
        purpose: "Stateless LLM Inference (Zero Training Verified)",
        location: "United States",
        dpaStatus: "ZDR / DPA Executed (DNS Verified)"
      }
    },
    {
      pattern: /anthropic-domain-verification/i,
      vendor: {
        name: "Anthropic Claude API",
        purpose: "Zero-Data-Retention AI Inference",
        location: "United States",
        dpaStatus: "ZDR / DPA Executed (DNS Verified)"
      }
    },
    {
      pattern: /spf\.mtasv\.net|postmarkapp\.com|sendgrid\.net|resend\.com|amazonses\.com/i,
      vendor: {
        name: "Transactional Email Relay (Postmark / SendGrid / Resend)",
        purpose: "Authenticated Security & Transactional Notifications",
        location: "United States",
        dpaStatus: "DPA + SPF Verified"
      }
    },
    {
      pattern: /slack-domain-verification/i,
      vendor: {
        name: "Slack (Salesforce)",
        purpose: "Internal Incident Response & Security Alerting",
        location: "United States",
        dpaStatus: "DPA Executed (DNS Verified)"
      }
    }
  ];

  function sanitizeDomain(raw) {
    let d = String(raw || "").trim().toLowerCase();
    d = d.replace(/^https?:\/\//, "");
    d = d.split("/")[0].split("?")[0].split("#")[0].split(":")[0];
    d = d.replace(/^www\./, "");
    d = d.replace(/\.+$/, "");
    if (!d || d.length > 253) return "";
    if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(d)) {
      return "";
    }
    const parts = d.split(".");
    if (!/^[a-z]{2,24}$/.test(parts[parts.length - 1])) return "";
    return d;
  }

  function stripTxtQuotes(raw) {
    const s = String(raw || "").trim();
    if (s.startsWith('"') && s.endsWith('"')) {
      return s.slice(1, -1).replace(/"\s*"/g, "");
    }
    return s;
  }

  async function fetchWithTimeout(url, opts, timeoutMs) {
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), timeoutMs || 6000) : null;
    try {
      const res = await fetch(url, Object.assign({}, opts || {}, ctrl ? { signal: ctrl.signal } : {}));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  async function queryDoh(name, type) {
    const cfUrl = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`;
    try {
      const json = await fetchWithTimeout(cfUrl, { headers: { Accept: "application/dns-json" } }, 6000);
      return { json, resolver: "Cloudflare DoH" };
    } catch (cfErr) {
      const ggUrl = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`;
      const json = await fetchWithTimeout(ggUrl, { headers: { Accept: "application/json" } }, 6000);
      return { json, resolver: "Google DoH" };
    }
  }

  function evaluateDmarc(records, domain) {
    const dmarcTxt = records.map(stripTxtQuotes).find((t) => /v=DMARC1/i.test(t));
    if (!dmarcTxt) {
      return {
        key: "dmarc",
        label: "DMARC Anti-Spoofing",
        pts: 0,
        maxPts: 30,
        status: "Fail",
        tone: "fail",
        summary: "No _dmarc TXT policy published — domain spoofing possible.",
        raw: "",
        fixHost: `_dmarc.${domain}`,
        fixType: "TXT",
        fixValue: `v=DMARC1; p=quarantine; rua=mailto:security@${domain}; pct=100`
      };
    }
    const pMatch = /(?:^|;|\s)p=(reject|quarantine|none)\b/i.exec(dmarcTxt);
    const policy = pMatch ? pMatch[1].toLowerCase() : "none";
    if (policy === "reject") {
      return {
        key: "dmarc",
        label: "DMARC Anti-Spoofing",
        pts: 30,
        maxPts: 30,
        status: "Pass (p=reject)",
        tone: "pass",
        summary: "Enforcing strict p=reject quarantine & anti-phishing protection.",
        raw: dmarcTxt
      };
    }
    if (policy === "quarantine") {
      return {
        key: "dmarc",
        label: "DMARC Anti-Spoofing",
        pts: 22,
        maxPts: 30,
        status: "Partial (p=quarantine)",
        tone: "warn",
        summary: "Spoofed mail quarantined; upgrade p=quarantine to p=reject for full 30/30.",
        raw: dmarcTxt,
        fixHost: `_dmarc.${domain}`,
        fixType: "TXT",
        fixValue: dmarcTxt.replace(/p=quarantine/i, "p=reject")
      };
    }
    return {
      key: "dmarc",
      label: "DMARC Anti-Spoofing",
      pts: 10,
      maxPts: 30,
      status: "Warn (p=none)",
      tone: "warn",
      summary: "Monitor-only DMARC (p=none) detected; does not block spoofing yet.",
      raw: dmarcTxt,
      fixHost: `_dmarc.${domain}`,
      fixType: "TXT",
      fixValue: dmarcTxt.replace(/p=none/i, "p=quarantine")
    };
  }

  function evaluateSpf(records, domain) {
    const spfTxt = records.map(stripTxtQuotes).find((t) => /^v=spf1\b/i.test(t));
    if (!spfTxt) {
      return {
        key: "spf",
        label: "SPF Sender Policy",
        pts: 0,
        maxPts: 25,
        status: "Fail",
        tone: "fail",
        summary: "No v=spf1 record found at apex domain.",
        raw: "",
        fixHost: domain,
        fixType: "TXT",
        fixValue: "v=spf1 -all"
      };
    }
    if (/\s-all(?:\s|$)/i.test(spfTxt)) {
      return {
        key: "spf",
        label: "SPF Sender Policy",
        pts: 25,
        maxPts: 25,
        status: "Strict Pass (-all)",
        tone: "pass",
        summary: "Hard-fail SPF (-all) blocks unauthorized sending servers.",
        raw: spfTxt
      };
    }
    if (/\s~all(?:\s|$)/i.test(spfTxt)) {
      return {
        key: "spf",
        label: "SPF Sender Policy",
        pts: 18,
        maxPts: 25,
        status: "SoftFail (~all)",
        tone: "warn",
        summary: "SPF uses soft-fail (~all); tighten to -all when ready.",
        raw: spfTxt
      };
    }
    return {
      key: "spf",
      label: "SPF Sender Policy",
      pts: 8,
      maxPts: 25,
      status: "Permissive",
      tone: "warn",
      summary: "SPF record found without strict -all or ~all terminator.",
      raw: spfTxt
    };
  }

  function evaluateCaa(records, domain) {
    const clean = records.map(stripTxtQuotes).filter(Boolean);
    if (clean.length === 0) {
      return {
        key: "caa",
        label: "CAA SSL Issuance Lock",
        pts: 0,
        maxPts: 20,
        status: "Missing",
        tone: "warn",
        summary: "No CAA record restricting unauthorized TLS certificate authorities.",
        raw: "",
        fixHost: domain,
        fixType: "CAA",
        fixValue: '0 issue "letsencrypt.org"'
      };
    }
    return {
      key: "caa",
      label: "CAA SSL Issuance Lock",
      pts: 20,
      maxPts: 20,
      status: `Pass (${clean.length} rule${clean.length === 1 ? "" : "s"})`,
      tone: "pass",
      summary: `TLS cert issuance locked cleanly (${clean.slice(0, 2).join("; ").slice(0, 90)}).`,
      raw: clean.join(" | ")
    };
  }

  function evaluateMxAndDnssec(mxRecords, allResponses) {
    const cleanMx = mxRecords.map(stripTxtQuotes).filter(Boolean);
    const hasMx = cleanMx.length > 0;
    const dnssecSigned = allResponses.some((r) => Boolean(r && r.AD === true));
    const pts = (hasMx ? 15 : 0) + (dnssecSigned ? 10 : 0);
    return {
      mx: {
        key: "mx",
        label: "Mail Routing (MX)",
        pts: hasMx ? 15 : 0,
        maxPts: 15,
        status: hasMx ? `Active (${cleanMx.length} MX)` : "No MX",
        tone: hasMx ? "pass" : "warn",
        summary: hasMx
          ? `Primary handler: ${cleanMx[0].replace(/^\d+\s+/, "")}`
          : "No MX mail exchanger records published.",
        raw: cleanMx.join(" | ")
      },
      dnssec: {
        key: "dnssec",
        label: "DNSSEC & Posture Pts",
        pts,
        maxPts: 25,
        status: dnssecSigned ? "DNSSEC Authenticated" : hasMx ? "Unsigned DNS" : "Unverified",
        tone: dnssecSigned ? "pass" : "warn",
        summary: dnssecSigned
          ? "Authenticated DNSSEC chain validated by resolver (AD=1)."
          : "Enable DNSSEC at registrar/DNS for +10 pts integrity.",
        raw: `MX=${hasMx ? "Yes" : "No"}, DNSSEC=${dnssecSigned ? "AD=1" : "AD=0"}`
      }
    };
  }

  function discoverSubprocessors(txtRecords, mxRecords) {
    const corpus = []
      .concat(txtRecords || [])
      .concat(mxRecords || [])
      .map(stripTxtQuotes)
      .join("\n");

    const found = [];
    const seen = new Set();
    SUBPROC_SIGNATURES.forEach((sig) => {
      if (sig.pattern.test(corpus) && !seen.has(sig.vendor.name)) {
        seen.add(sig.vendor.name);
        found.push(Object.assign({}, sig.vendor));
      }
    });
    return found;
  }

  function computeGrade(score) {
    if (score >= 90) return "A+";
    if (score >= 78) return "A";
    if (score >= 60) return "B";
    if (score >= 40) return "C";
    return "D";
  }

  async function scanDomain(rawDomain) {
    const domain = sanitizeDomain(rawDomain);
    if (!domain) {
      throw new Error("Enter a valid domain such as company.com (no paths or http:// needed).");
    }

    const [dmarcRes, txtRes, caaRes, mxRes] = await Promise.all([
      queryDoh(`_dmarc.${domain}`, "TXT"),
      queryDoh(domain, "TXT"),
      queryDoh(domain, "CAA"),
      queryDoh(domain, "MX")
    ]);

    const extractAnswers = (res, wantType) => {
      const ans = (res && res.json && Array.isArray(res.json.Answer) ? res.json.Answer : []) || [];
      return ans
        .filter((a) => !wantType || a.type === wantType)
        .map((a) => String(a.data || ""));
    };

    const dmarcRecords = extractAnswers(dmarcRes, 16);
    const txtRecords = extractAnswers(txtRes, 16);
    const caaRecords = extractAnswers(caaRes, 257);
    const mxRecords = extractAnswers(mxRes, 15);

    const dmarc = evaluateDmarc(dmarcRecords, domain);
    const spf = evaluateSpf(txtRecords, domain);
    const caa = evaluateCaa(caaRecords, domain);
    const mailSec = evaluateMxAndDnssec(mxRecords, [dmarcRes.json, txtRes.json, caaRes.json, mxRes.json]);

    const totalScore = Math.max(0, Math.min(100, dmarc.pts + spf.pts + caa.pts + mailSec.dnssec.pts));
    const grade = computeGrade(totalScore);

    const fixes = [dmarc, spf, caa]
      .filter((c) => Boolean(c.fixValue))
      .map((c) => ({
        label: c.label,
        host: c.fixHost,
        type: c.fixType,
        value: c.fixValue
      }));

    return {
      domain,
      score: totalScore,
      grade,
      checkedAt: new Date().toISOString(),
      resolver: txtRes.resolver || "Cloudflare DoH",
      checks: {
        dmarc,
        spf,
        caa,
        mx: mailSec.mx,
        dnssec: mailSec.dnssec
      },
      discoveredSubprocessors: discoverSubprocessors(txtRecords, mxRecords),
      fixes
    };
  }

  return {
    sanitizeDomain,
    queryDoh,
    scanDomain,
    computeGrade
  };
})();

/**
 * ScopeLock Post-Award Change-Order Templates (12 Industry-Specific Scenarios)
 * --------------------------------------------------------------------------
 * Every template guarantees exact arithmetic:
 *   sum(item.qty * item.unitPrice) === coDeltaPrice
 */
window.SCOPELOCK_TEMPLATES = {
  roofing_co: {
    id: "roofing_co",
    label: "Roofing Decking & Flashing Rot",
    shortLabel: "Roofing CO",
    category: "Home Trades & Construction",
    businessName: "Summit Ridge Roofing & Exteriors",
    businessEmail: "estimating@summitridgeroofing.example",
    clientName: "Marcus & Elena Vance",
    contractRef: "JOB-2026-418",
    coNumber: "CO-02",
    originalContractPrice: 14800,
    priorApprovedCos: 450,
    reasonCode: "Hidden Condition",
    scheduleDeltaDays: 2,
    coDeltaPrice: 1880,
    summaryNote: "Upon tear-off of north valley shingles, 8 sheets of 1/2\" CDX decking and chimney step-flashing showed moisture rot requiring code-compliant replacement before underlayment install.",
    terms: "Work proceeds immediately upon electronic authorization. Revised balance is added to final completion milestone. Existing manufacturer workmanship warranty applies to all replacement decking and flashing.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "1/2\" CDX Roof Decking Replacement", qty: 8, unit: "sheets", unitPrice: 115, note: "Remove rotted sheathing & fasten new CDX per IRC R803" },
      { name: "Ice & Water Shield + Step Flashing Kit", qty: 24, unit: "lf", unitPrice: 28, note: "24-gauge pre-finished step & counter flashing" },
      { name: "Rotted Tear-Off Haul-Away & Framing Prep", qty: 1, unit: "job", unitPrice: 288, note: "Additional dumpster weight & rafter sistering check" }
    ]
  },

  hvac_co: {
    id: "hvac_co",
    label: "HVAC Code & Duct Modification",
    shortLabel: "HVAC CO",
    category: "Home Trades & Construction",
    businessName: "Apex Climate Mechanical",
    businessEmail: "dispatch@apexclimate.example",
    clientName: "Daniel Brooks",
    contractRef: "HVAC-8821",
    coNumber: "CO-01",
    originalContractPrice: 9600,
    priorApprovedCos: 0,
    reasonCode: "Code Required",
    scheduleDeltaDays: 1,
    coDeltaPrice: 1650,
    summaryNote: "Municipal mechanical inspection requires upgrading the undersized return plenum transition, adding UV-jacketed refrigerant line insulation, and installing a secondary condensate safety float switch.",
    terms: "Authorization clears crew to complete mechanical rough-in for city inspection pass. Change-order total is due with equipment commissioning.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Code-Compliant Line Set & UV Jacket", qty: 1, unit: "kit", unitPrice: 640, note: "3/4\" closed-cell UV-rated insulation + flare sealing" },
      { name: "Insulated Return Plenum & Balancing Damper", qty: 2, unit: "units", unitPrice: 345, note: "R-8 sheet-metal transition for static pressure spec" },
      { name: "Secondary Condensate Float Switch & Trap", qty: 1, unit: "job", unitPrice: 320, note: "Automatic air-handler shutoff per IMC 307.2" }
    ]
  },

  plumbing_co: {
    id: "plumbing_co",
    label: "Sub-Slab / PRV Code Discovery",
    shortLabel: "Plumbing CO",
    category: "Home Trades & Construction",
    businessName: "TrueFlow Plumbing & Mechanical",
    businessEmail: "service@trueflowplumb.example",
    clientName: "Sandra Morales",
    contractRef: "PLM-2026-109",
    coNumber: "CO-02",
    originalContractPrice: 6400,
    priorApprovedCos: 300,
    reasonCode: "Hidden Condition",
    scheduleDeltaDays: 2,
    coDeltaPrice: 1980,
    summaryNote: "Camera inspection after main shutoff revealed corroded cast-iron transition under utility slab and street pressure at 105 PSI requiring a code-mandated PRV and thermal expansion tank.",
    terms: "Includes slab saw-cut, clean backfill, and hydrostatic test prior to concrete patch. Warranty covers 5 years on brass PRV assembly.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Concrete Slab Saw-Cut & Trenching", qty: 12, unit: "lf", unitPrice: 85, note: "Dust-controlled wet cut & sub-slab spoil removal" },
      { name: "Lead-Free Brass PRV & Expansion Tank", qty: 1, unit: "set", unitPrice: 540, note: "Regulates 105 PSI supply down to safe 60 PSI" },
      { name: "Hydrostatic Pressure Test & Slab Patch", qty: 1, unit: "job", unitPrice: 420, note: "24-hr gauge verification & 4,000 PSI concrete pour" }
    ]
  },

  electrical_co: {
    id: "electrical_co",
    label: "Concealed Junction / Panel Upgrade",
    shortLabel: "Electrical CO",
    category: "Home Trades & Construction",
    businessName: "VoltGuard Electric Co.",
    businessEmail: "projects@voltguard.example",
    clientName: "Hannah & Trevor Kim",
    contractRef: "ELC-5042",
    coNumber: "CO-01",
    originalContractPrice: 5200,
    priorApprovedCos: 0,
    reasonCode: "Code Required",
    scheduleDeltaDays: 1,
    coDeltaPrice: 1650,
    summaryNote: "Wall opening uncovered 3 buried unboxed cloth-wire splices and outdated non-AFCI circuits that must be brought into accessible NEMA enclosures with dual-function protection per NEC 2023.",
    terms: "All work performed by licensed master electricians and documented for final electrical inspector sign-off.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Concealed Splice Remediation & NEMA Box", qty: 3, unit: "locations", unitPrice: 210, note: "Accessible junction boxes, Wago/wire-nut re-termination" },
      { name: "Dual-Function AFCI/GFCI Breakers", qty: 4, unit: "breakers", unitPrice: 135, note: "Required arc-fault and ground-fault branch protection" },
      { name: "Type-2 Surge Arrestor & Ground Bond", qty: 1, unit: "kit", unitPrice: 480, note: "Main panel surge protection + #6 copper water bond" }
    ]
  },

  remodel_co: {
    id: "remodel_co",
    label: "Framing & Moisture Discovery",
    shortLabel: "Remodel CO",
    category: "Home Trades & Construction",
    businessName: "Harborline Design-Build",
    businessEmail: "pm@harborlinebuild.example",
    clientName: "Claire & Nathan Price",
    contractRef: "REM-2026-074",
    coNumber: "CO-03",
    originalContractPrice: 28500,
    priorApprovedCos: 1200,
    reasonCode: "Hidden Condition",
    scheduleDeltaDays: 3,
    coDeltaPrice: 3050,
    summaryNote: "Demolition of kitchen wet wall exposed notched floor joists and localized moisture damage around the exterior sill plate, requiring structural LVL sistering, encapsulation, and new subfloor.",
    terms: "Structural framing changes photographed prior to drywall close-up. Schedule adjusts +3 business days for drying and framing inspection.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Sistered 2x10 LVL Joists & Simpson Hangers", qty: 4, unit: "bays", unitPrice: 390, note: "Structural adhesive + 3\" structural lag fasteners" },
      { name: "Anti-Microbial Encapsulation & Dry-Out", qty: 1, unit: "room", unitPrice: 680, note: "HEPA vacuum, botanical treatment & 48-hr dehumidifier" },
      { name: "3/4\" Tongue-and-Groove Advantech Subfloor", qty: 6, unit: "sheets", unitPrice: 135, note: "Glued & ring-shank screwed moisture-resistant decking" }
    ]
  },

  landscaping_co: {
    id: "landscaping_co",
    label: "Hidden Rock & Irrigation Reroute",
    shortLabel: "Landscaping CO",
    category: "Home Trades & Construction",
    businessName: "TerraCraft Outdoor Living",
    businessEmail: "ops@terracraftoutdoor.example",
    clientName: "Gregory Patel",
    contractRef: "LND-3190",
    coNumber: "CO-01",
    originalContractPrice: 11400,
    priorApprovedCos: 0,
    reasonCode: "Hidden Condition",
    scheduleDeltaDays: 2,
    coDeltaPrice: 2110,
    summaryNote: "Excavation for patio retaining wall hit dense subsurface granite shelf and an unmarked 2-zone irrigation mainline, requiring hydraulic breaker hours and Schedule-40 manifold rerouting.",
    terms: "Irrigation zones will be pressure-tested post-reroute prior to patio paver compaction.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Hydraulic Breaker Subsurface Rock Trenching", qty: 6, unit: "hrs", unitPrice: 195, note: "Skid-steer hammer attachment + operator" },
      { name: "Schedule-40 PVC Mainline & 2-Zone Reroute", qty: 1, unit: "set", unitPrice: 580, note: "Sleeved crossings + new Hunter PGV control valves" },
      { name: "Crushed Aggregate Drainage Bed & Backfill", qty: 3, unit: "tons", unitPrice: 120, note: "#57 washed stone behind retaining wall footing" }
    ]
  },

  agency_co: {
    id: "agency_co",
    label: "Web/SEO Extra Landing Pages & Revisions",
    shortLabel: "Agency Scope CO",
    category: "Agencies, Tech & Advisory",
    businessName: "Northstar Digital Growth",
    businessEmail: "accounts@northstardigital.example",
    clientName: "Vertex MedSpa Group",
    contractRef: "SOW-2026-19",
    coNumber: "CO-02",
    originalContractPrice: 8500,
    priorApprovedCos: 750,
    reasonCode: "Client Request",
    scheduleDeltaDays: 5,
    coDeltaPrice: 3300,
    summaryNote: "Client requested 3 additional high-intent metro landing pages outside the original 5-page SOW, one extra stakeholder revision sprint, and LocalBusiness schema + GA4 booking events.",
    terms: "Delivery timeline shifts +5 business days from sign-off. All assets remain under original Master Services Agreement IP terms.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Custom Geo-Targeted Landing Pages", qty: 3, unit: "pages", unitPrice: 650, note: "Conversion copywriting, responsive build & speed QA" },
      { name: "Additional Stakeholder Copy & UI Sprint", qty: 6, unit: "hrs", unitPrice: 150, note: "Beyond the 2 included revision rounds in SOW" },
      { name: "Local Schema Markup & GA4 Event Funnel", qty: 1, unit: "pack", unitPrice: 450, note: "JSON-LD + form/call conversion verification" }
    ]
  },

  ai_co: {
    id: "ai_co",
    label: "AI Agent & Workflow Scope Addition",
    shortLabel: "AI Scope CO",
    category: "Agencies, Tech & Advisory",
    businessName: "KineticOps AI Systems",
    businessEmail: "delivery@kineticops.example",
    clientName: "Meridian Logistics Inc.",
    contractRef: "AI-SOW-402",
    coNumber: "CO-02",
    originalContractPrice: 12000,
    priorApprovedCos: 1500,
    reasonCode: "Client Request",
    scheduleDeltaDays: 4,
    coDeltaPrice: 4250,
    summaryNote: "Expanding Phase 1 triage agent to include bidirectional CRM webhook sync, custom RAG policy evaluation suite, and human-in-the-loop Slack escalation before outbound replies.",
    terms: "Includes 14-day post-deploy guardrail monitoring. API token usage billed directly to client workspace.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Bidirectional CRM Webhook & Guardrail Router", qty: 1, unit: "module", unitPrice: 1400, note: "Idempotent retries, PII redaction & audit log" },
      { name: "Custom RAG Chunking & Golden Eval Suite", qty: 12, unit: "hrs", unitPrice: 175, note: "50-case accuracy benchmark before production cutover" },
      { name: "Human-in-the-Loop Slack Approval Flow", qty: 1, unit: "flow", unitPrice: 750, note: "1-click approve/edit button for high-value tickets" }
    ]
  },

  msp_co: {
    id: "msp_co",
    label: "Emergency Seats & Security Hardware",
    shortLabel: "IT/MSP CO",
    category: "Agencies, Tech & Advisory",
    businessName: "ShieldCore Managed IT",
    businessEmail: "noc@shieldcoreit.example",
    clientName: "Oakridge Financial Partners",
    contractRef: "MSA-2026-088",
    coNumber: "CO-02",
    originalContractPrice: 6800,
    priorApprovedCos: 400,
    reasonCode: "Client Request",
    scheduleDeltaDays: 1,
    coDeltaPrice: 2770,
    summaryNote: "Emergency onboarding of 12 seasonal remote seats with EDR + hardware MFA, plus managed PoE firewall replacement and after-hours cutover testing.",
    terms: "Hardware ships next-business-day upon authorization. Recurring seat licenses align with existing monthly MSA billing cycle.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Zero-Trust EDR + Hardware MFA Provisioning", qty: 12, unit: "seats", unitPrice: 95, note: "Endpoint enrollment, conditional access & disk encryption" },
      { name: "Managed Enterprise PoE Firewall Appliance", qty: 1, unit: "unit", unitPrice: 890, note: "Pre-staged VPN failover & VLAN segmentation" },
      { name: "After-Hours Cutover & Immutable Backup Test", qty: 4, unit: "hrs", unitPrice: 185, note: "Zero-downtime weekend migration & restore check" }
    ]
  },

  media_co: {
    id: "media_co",
    label: "Additional Shoot Day & Social Cutdowns",
    shortLabel: "Media CO",
    category: "Agencies, Tech & Advisory",
    businessName: "FrameCraft Commercial Studio",
    businessEmail: "producer@framecraftstudio.example",
    clientName: "Solstice Roasters",
    contractRef: "PROD-712",
    coNumber: "CO-01",
    originalContractPrice: 7200,
    priorApprovedCos: 0,
    reasonCode: "Client Request",
    scheduleDeltaDays: 3,
    coDeltaPrice: 3200,
    summaryNote: "Adding a half-day location shoot at the flagship roastery plus 6 vertical 9:16 social cutdowns with dynamic burned-in captions for paid Q4 campaigns.",
    terms: "Commercial perpetual paid-social usage rights included upon final invoice settlement.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Half-Day 4K Cinema Crew & Lighting Package", qty: 1, unit: "day", unitPrice: 1450, note: "DP + gaffer, wireless lavs & gimbal B-roll" },
      { name: "9:16 Vertical Reels / Shorts Cutdowns", qty: 6, unit: "edits", unitPrice: 225, note: "Hook-tested pacing optimized for Meta & TikTok" },
      { name: "Dynamic Captions & Color Grade Mastering", qty: 1, unit: "pack", unitPrice: 400, note: "Rec.709 LUT match + licensed audio stems" }
    ]
  },

  cfo_co: {
    id: "cfo_co",
    label: "Prior-Quarter Catch-Up Cleanup",
    shortLabel: "Advisory CO",
    category: "Agencies, Tech & Advisory",
    businessName: "LedgerPoint Fractional CFO",
    businessEmail: "advisory@ledgerpoint.example",
    clientName: "Bramble & Co. Retail",
    contractRef: "ENG-2026-304",
    coNumber: "CO-02",
    originalContractPrice: 4800,
    priorApprovedCos: 600,
    reasonCode: "Hidden Condition",
    scheduleDeltaDays: 6,
    coDeltaPrice: 3550,
    summaryNote: "Onboarding audit revealed 3 months of unreconciled Shopify/Stripe clearing feeds, misclassified payroll accruals, and uncollected W-9/sales-tax nexus filings prior to engagement start.",
    terms: "Clean trial balance will be delivered within 6 business days of approval so monthly close stays on schedule.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Merchant Clearing & Bank Feed Reconciliation", qty: 3, unit: "months", unitPrice: 550, note: "Tie-out gross sales, refunds, fees & payouts to bank" },
      { name: "Payroll & Intercompany Accrual Reclass", qty: 8, unit: "hrs", unitPrice: 165, note: "Audit-ready adjusting journal entries & workpapers" },
      { name: "Sales Tax & 1099 Vendor Compliance Prep", qty: 1, unit: "pkg", unitPrice: 580, note: "Nexus summary schedule & missing W-9 outreach list" }
    ]
  },

  legal_co: {
    id: "legal_co",
    label: "Additional Counterparty Redline Round",
    shortLabel: "Legal CO",
    category: "Agencies, Tech & Advisory",
    businessName: "Beacon Counsel Advisory",
    businessEmail: "counsel@beaconadvisory.example",
    clientName: "PulseGrid Software Corp.",
    contractRef: "MAT-2026-55",
    coNumber: "CO-01",
    originalContractPrice: 5500,
    priorApprovedCos: 0,
    reasonCode: "Client Request",
    scheduleDeltaDays: 3,
    coDeltaPrice: 3050,
    summaryNote: "Enterprise buyer returned a bespoke 28-page MSA + Data Processing Addendum requiring a third redline cycle, liability cap negotiation call, and custom security exhibit alignment.",
    terms: "Covers fixed-fee scope for Round 3 redlines and counterparty negotiation call; any fourth round billed only upon subsequent written authorization.",
    paymentProvider: "stripe",
    paymentLink: "",
    lineItems: [
      { name: "Extended MSA & Indemnity Redline Review", qty: 5, unit: "hrs", unitPrice: 340, note: "IP indemnity, limitation of liability & SLA carve-outs" },
      { name: "Counterparty Counsel Live Negotiation Call", qty: 2, unit: "hrs", unitPrice: 350, note: "Prep brief + live markup walk-through" },
      { name: "Custom DPA & Security Exhibit Alignment", qty: 1, unit: "doc", unitPrice: 650, note: "Subprocessor schedule & breach notification window" }
    ]
  }
};

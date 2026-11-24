/**
 * BidLift Curated Industry Templates, Itemized Services & Brand Palettes
 * Designed to maximize Average Order Value (AOV) via Good / Better / Best anchoring,
 * transparent service itemization, and interactive self-serve upsells.
 */

window.BIDLIFT_PALETTES = {
  "navy-gold": {
    id: "navy-gold",
    name: "Navy & Gold",
    brand: "#0f294a",
    brandDark: "#08172b",
    brandSoft: "#eef3f9",
    accent: "#c89d3c"
  },
  "indigo-modern": {
    id: "indigo-modern",
    name: "Indigo SaaS",
    brand: "#4338ca",
    brandDark: "#2e2494",
    brandSoft: "#eef2ff",
    accent: "#0ea5e9"
  },
  "emerald-pro": {
    id: "emerald-pro",
    name: "Emerald Craft",
    brand: "#065f46",
    brandDark: "#043f2e",
    brandSoft: "#ecfdf5",
    accent: "#10b981"
  },
  "obsidian-luxe": {
    id: "obsidian-luxe",
    name: "Obsidian Luxe",
    brand: "#18181b",
    brandDark: "#09090b",
    brandSoft: "#f4f4f5",
    accent: "#d97706"
  },
  "terracotta-warm": {
    id: "terracotta-warm",
    name: "Warm Terracotta",
    brand: "#9a3412",
    brandDark: "#6c220a",
    brandSoft: "#fff7ed",
    accent: "#ea580c"
  },
  "slate-minimal": {
    id: "slate-minimal",
    name: "Slate Executive",
    brand: "#334155",
    brandDark: "#1e293b",
    brandSoft: "#f1f5f9",
    accent: "#2563eb"
  }
};

window.BIDLIFT_STARTER_SERVICES = {
  contractor: [
    { name: "Accent Wall Geometric Trim & Paint", category: "Custom Finish", qty: 1, unit: "wall", unitPrice: 450, note: "Custom millwork batten layout + 2 coats satin finish" },
    { name: "Drywall Texture Patch & Blend", category: "Wall Prep", qty: 4, unit: "patches", unitPrice: 85, note: "Feather-sanded orange peel or smooth match + prime" },
    { name: "Cabinet Hardware Swap & Alignment", category: "Hardware", qty: 24, unit: "pulls", unitPrice: 12, note: "Precision jig drilling & soft-close hinge adjustment" },
    { name: "Interior Door Stain & Urethane Coat", category: "Doors", qty: 2, unit: "doors", unitPrice: 175, note: "Fine sand + spray satin polyurethane" }
  ],
  realestate: [
    { name: "Virtual Furniture Staging (Per Room)", category: "Virtual Media", qty: 3, unit: "photos", unitPrice: 55, note: "Photorealistic designer staging matched to room light" },
    { name: "Twilight Exterior Reshoot", category: "Dusk Stills", qty: 6, unit: "photos", unitPrice: 45, note: "Blue-hour window glow & landscape curb showcase" },
    { name: "Agent On-Camera Intro Clip", category: "Video", qty: 1, unit: "clip", unitPrice: 180, note: "Lapel mic audio + color-graded opening welcome" },
    { name: "Printable Feature Sheet Design", category: "Print Asset", qty: 1, unit: "layout", unitPrice: 140, note: "Double-sided PDF ready for open house flyers" }
  ],
  agency: [
    { name: "Monthly Speed & Security Care", category: "Retainer", qty: 1, unit: "month", unitPrice: 225, note: "Uptime alerts, Core Web Vitals checks & content edits" },
    { name: "Extra City / Service Landing Page", category: "SEO Page", qty: 1, unit: "page", unitPrice: 275, note: "Targeted local keyword copy + conversion CTA block" },
    { name: "Review Generation SMS Flow", category: "Automation", qty: 1, unit: "setup", unitPrice: 390, note: "Post-job Google review link drip for completed clients" },
    { name: "Google Ads Launch Kit", category: "Paid Search", qty: 1, unit: "kit", unitPrice: 550, note: "High-intent campaign build + negative keyword guard" }
  ],
  landscaping: [
    { name: "Sod Lawn Patch & Topdress", category: "Turf Care", qty: 250, unit: "sq ft", unitPrice: 2.2, note: "Rich compost base + rolled shade-tolerant turf" },
    { name: "Spring Aerate & Overseed", category: "Lawn Health", qty: 1, unit: "lawn", unitPrice: 240, note: "Core plug aeration + starter organic fertilizer" },
    { name: "Cedar Planter Box Build", category: "Carpentry", qty: 2, unit: "boxes", unitPrice: 310, note: "Custom kiln-dried cedar raised garden beds" },
    { name: "Pressure Wash Walkways & Patio", category: "Surface Wash", qty: 1, unit: "job", unitPrice: 220, note: "Rotary surface cleaner wash of concrete & pavers" }
  ],
  cleaning: [
    { name: "Post-Renovation Fine Dust Scrub", category: "Specialty", qty: 1, unit: "home", unitPrice: 185, note: "HEPA vacuuming on walls, vents & millwork ledges" },
    { name: "Deep Blinds & Plantation Shutter Clean", category: "Windows", qty: 10, unit: "windows", unitPrice: 14, note: "Hand-wiped slats & sanitized window sills" },
    { name: "Patio Furniture & Deck Wash", category: "Outdoor", qty: 1, unit: "set", unitPrice: 95, note: "Cushion brush-down, railing wipe & sweep" },
    { name: "Garage Oil Stain & Floor Scrub", category: "Garage", qty: 1, unit: "bay", unitPrice: 110, note: "Degreaser wash, cobweb clear & organized perimeter" }
  ],
  media: [
    { name: "Dedicated Vertical Shorts Edit Pack", category: "Social Video", qty: 4, unit: "reels", unitPrice: 95, note: "9:16 hook edits with burned-in motion captions" },
    { name: "Product White-Background Cutouts", category: "E-Commerce", qty: 15, unit: "images", unitPrice: 18, note: "Crisp PNG & Amazon/Shopify ready high-res cutouts" },
    { name: "Additional Half-Day Location Extension", category: "Production", qty: 1, unit: "session", unitPrice: 480, note: "3 extra shoot hours + 15 edited stills" },
    { name: "Voiceover Studio Narration Track", category: "Audio", qty: 1, unit: "track", unitPrice: 260, note: "Script polish + studio voice talent mix" }
  ],
  hvac: [
    { name: "Smart Wi-Fi Thermostat Install & Pairing", category: "Controls", qty: 1, unit: "unit", unitPrice: 285, note: "Programmed schedule, C-wire adapter & homeowner walkthrough" },
    { name: "Duct Static Pressure Seal & Sanitizing", category: "Airflow", qty: 1, unit: "system", unitPrice: 440, note: "Mastic trunk sealing & EPA botanical coil treatment" },
    { name: "Condenser Surge Protector (HVAC Rated)", category: "Protection", qty: 1, unit: "unit", unitPrice: 240, note: "Protects compressor & inverter boards from utility spikes" },
    { name: "4-Inch HEPA Media Filter Cabinet Upgrade", category: "IAQ", qty: 1, unit: "cabinet", unitPrice: 360, note: "Includes first MERV-13 pleated media cartridge" }
  ],
  roofing: [
    { name: "Seamless Micro-Mesh Gutter Guards", category: "Drainage", qty: 140, unit: "lin ft", unitPrice: 8, note: "Color-matched aluminum leaf protection with fasteners" },
    { name: "Solar-Powered Whisper Attic Exhaust Fan", category: "Ventilation", qty: 1, unit: "unit", unitPrice: 640, note: "Lowers peak summer attic heat by up to 25°F" },
    { name: "Velux Flashing & Curb-Mount Skylight Swap", category: "Skylight", qty: 1, unit: "opening", unitPrice: 890, note: "Pre-flashed tempered Low-E3 glass sealed to deck" },
    { name: "Fascia & Roofline Rot Decking Allowance", category: "Carpentry", qty: 3, unit: "sheets", unitPrice: 115, note: "CDX plywood swap where hidden moisture is uncovered" }
  ],
  plumbing: [
    { name: "Main Water Pressure Reducing Valve (PRV)", category: "Code & Flow", qty: 1, unit: "valve", unitPrice: 320, note: "Stabilizes home pressure at 55–65 PSI to protect fixtures" },
    { name: "Main-Line Hydro-Jetting & Camera Scan", category: "Drains", qty: 1, unit: "job", unitPrice: 480, note: "Clears grease/roots & records HD USB scope video" },
    { name: "3/4 HP Whisper Garbage Disposal Swap", category: "Kitchen", qty: 1, unit: "unit", unitPrice: 340, note: "Stainless grind chamber + braided supply lines" },
    { name: "Frost-Free Exterior Hose Bib Upgrade", category: "Exterior", qty: 1, unit: "bib", unitPrice: 265, note: "Quarter-turn ball valve & vacuum breaker installed" }
  ],
  electrical: [
    { name: "Level-2 EV Charger Hardwire & Commissioning", category: "EV Ready", qty: 1, unit: "circuit", unitPrice: 690, note: "Up to 40 ft conduit run, 60A breaker & wall mount" },
    { name: "6-Pack Gimbal LED Recessed Ceiling Lights", category: "Lighting", qty: 6, unit: "fixtures", unitPrice: 140, note: "IC-rated 2700K–5000K selectable trim + dimmer switch" },
    { name: "Whole-Home Interconnected Smoke & CO Swap", category: "Life Safety", qty: 4, unit: "alarms", unitPrice: 90, note: "Hardwired with 10-year sealed battery backup" },
    { name: "Quiet 110 CFM Humidity-Sensing Bath Fan", category: "Ventilation", qty: 1, unit: "unit", unitPrice: 420, note: "Insulated exterior vent ducting & timer switch" }
  ],
  ai_training: [
    { name: "Extra Department AI Lab (Sales / Ops / Finance)", category: "Hands-On Lab", qty: 1, unit: "session", unitPrice: 500, note: "90-minute tailored workshop using your team's real workflows" },
    { name: "Custom Role Prompt Library Pack", category: "Playbook", qty: 1, unit: "pack", unitPrice: 450, note: "25 tested prompts + guardrails formatted for Notion/Docs" },
    { name: "1-on-1 Executive AI Coaching Session", category: "Coaching", qty: 1, unit: "hour", unitPrice: 280, note: "Private screen-share build of personal productivity copilots" },
    { name: "Data Privacy & Shadow-AI Policy Brief", category: "Governance", qty: 1, unit: "doc", unitPrice: 480, note: "Employee safe-use policy & PII redaction checklist" }
  ],
  ai_automation: [
    { name: "CRM + Email AI Triage Connection", category: "Automation", qty: 1, unit: "flow", unitPrice: 850, note: "Auto-classifies inbound leads, drafts replies & logs CRM notes" },
    { name: "RAG Knowledge Base Index Setup", category: "AI Brain", qty: 1, unit: "build", unitPrice: 1400, note: "Vector indexing for internal SOPs, PDFs & product docs" },
    { name: "Slack / Teams Human Approval Bot", category: "Guardrails", qty: 1, unit: "bot", unitPrice: 650, note: "One-click approve/edit gate before customer messages send" },
    { name: "Monthly Monitoring & Prompt Tuning", category: "Retainer", qty: 1, unit: "month", unitPrice: 390, note: "Error fallback checks, latency audits & model upgrades" }
  ],
  it_msp: [
    { name: "Managed EDR + Email Security Seat", category: "Cybersecurity", qty: 5, unit: "seats", unitPrice: 55, note: "24/7 endpoint threat response + Microsoft 365 phishing filter" },
    { name: "Immutable Cloud Backup Vault", category: "Backup", qty: 1, unit: "org", unitPrice: 400, note: "Automated daily snapshots + quarterly test restore" },
    { name: "Zero-Trust Password Manager + MFA Rollout", category: "Identity", qty: 1, unit: "org", unitPrice: 250, note: "Company vault deployment & hardware/app MFA enforcement" },
    { name: "Firewall & Business Wi-Fi Segmentation", category: "Network", qty: 1, unit: "site", unitPrice: 490, note: "Separate guest/IoT VLANs + VPN remote access hardening" }
  ],
  tutoring: [
    { name: "Diagnostic Learning Assessment", category: "Assessment", qty: 1, unit: "eval", unitPrice: 90, note: "Full benchmark score report & customized study roadmap" },
    { name: "1-on-1 Focused Tutoring Hour", category: "1-on-1 Hours", qty: 4, unit: "hrs", unitPrice: 85, note: "Live interactive whiteboard instruction + recorded recap" },
    { name: "Proctored Timed Mock Exam + Review", category: "Exam Prep", qty: 1, unit: "exam", unitPrice: 80, note: "Scored test simulation with question-by-question error breakdown" },
    { name: "Async Homework Check-In Pass", category: "Support", qty: 1, unit: "month", unitPrice: 95, note: "Same-day photo/chat explanations between scheduled lessons" }
  ],
  coaching: [
    { name: "1-on-1 Executive Strategy Session", category: "Coaching", qty: 2, unit: "calls", unitPrice: 200, note: "60-minute leadership, decision, or career pivot coaching call" },
    { name: "360 Stakeholder Feedback Audit", category: "Discovery", qty: 1, unit: "audit", unitPrice: 550, note: "Structured peer/team interviews synthesized into action themes" },
    { name: "Compensation / Offer Negotiation Prep", category: "Strategy", qty: 1, unit: "pkg", unitPrice: 320, note: "Counter-offer modeling, roleplay scripts & term-sheet checklist" },
    { name: "Done-With-You Executive Bio & LinkedIn Refresh", category: "Positioning", qty: 1, unit: "pkg", unitPrice: 450, note: "Headline, about narrative & leadership authority alignment" }
  ],
  accounting: [
    { name: "Monthly Bank & Card Reconciliation", category: "Bookkeeping", qty: 1, unit: "month", unitPrice: 450, note: "Categorized transactions + clean CPA-ready monthly close" },
    { name: "Executive Cash-Flow & KPI Review Call", category: "CFO Advisory", qty: 1, unit: "call", unitPrice: 350, note: "Gross margin, burn rate & tax reserve forecast walkthrough" },
    { name: "13-Week Rolling Cash & Hiring Model", category: "Forecasting", qty: 1, unit: "model", unitPrice: 850, note: "Scenario model covering payroll, tax & AR collection timing" },
    { name: "Historical Books Cleanup (Per Quarter)", category: "Cleanup", qty: 1, unit: "qtr", unitPrice: 490, note: "Rebuilds prior-period ledger & clears uncategorized suspense" }
  ],
  legal_consulting: [
    { name: "Commercial MSA / Client Contract Redline", category: "Contract Review", qty: 1, unit: "doc", unitPrice: 650, note: "Line-by-line risk edits + plain-English negotiation memo" },
    { name: "Custom Privacy Policy & ESIGN Terms Kit", category: "Compliance", qty: 1, unit: "pkg", unitPrice: 450, note: "Tailored website terms, privacy notice & consent language" },
    { name: "IP Assignment & Contractor Agreement", category: "HR & IP", qty: 1, unit: "doc", unitPrice: 420, note: "Protects company code, brand assets & confidentiality" },
    { name: "24-Hour Express Review Upgrade", category: "Priority", qty: 1, unit: "doc", unitPrice: 350, note: "Guaranteed next-business-day redline turnaround" }
  ],
  events: [
    { name: "Minute-by-Minute Run of Show & Floorplan", category: "Planning", qty: 1, unit: "plan", unitPrice: 400, note: "Master vendor schedule, load-in cues & contingency sheet" },
    { name: "2-Speaker PA + Wireless Mic + AV Tech", category: "Audio & Mic", qty: 1, unit: "rig", unitPrice: 1150, note: "Crisp speech reinforcement for keynotes, toasts & panels" },
    { name: "16-Fixture Wireless LED Uplighting", category: "Lighting", qty: 1, unit: "pkg", unitPrice: 750, note: "Custom brand-color ambient wash synced across room zones" },
    { name: "360 Photo Booth & Instant SMS Gallery", category: "Guest Experience", qty: 1, unit: "setup", unitPrice: 690, note: "Attendant-staffed booth with custom branded frame overlay" }
  ]
};

window.BIDLIFT_TEMPLATES = {
  contractor: {
    id: "contractor",
    label: "Home Remodel",
    category: "Home Trades & Construction",
    icon: "hammer",
    businessName: "Summit Craft Remodeling",
    businessTagline: "Licensed & Insured • 5-Year Craftsmanship Warranty",
    businessEmail: "estimates@summitcraft.example",
    businessPhone: "(425) 555-0148",
    logoData: "",
    paletteId: "navy-gold",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-104",
    clientName: "Alex & Jordan Mercer",
    projectTitle: "Main Floor & Kitchen Paint + Finish Refresh",
    projectLocation: "1420 Cedar Ridge Way",
    introText: "Thank you for inviting us to walk your home. Below are three fixed-price packages with full service itemization tailored for clean prep and showroom trim finishes.",
    recommendedBadge: "Most Popular Choice",
    trustBadges: ["Licensed, Bonded & Insured", "Daily Clean-Site Guarantee", "5-Year Finish Warranty"],
    validDays: 7,
    fastActionDiscount: 150,
    fastActionHours: 48,
    depositPercent: 30,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "30% deposit locks your start date; 70% balance upon final walkthrough.",
    terms: "Includes surface protection, daily site cleanup, architectural coatings, and our 5-year peeling/blistering warranty.",
    financingEnabled: true,
    financingMonths: 36,
    financingApr: 9.99,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Essential",
        subtitle: "Clean 2-coat refresh on walls",
        price: 2400,
        timeline: "3 Days",
        autoCalcPrice: true,
        features: [
          "Floor & furniture masking protection",
          "Minor drywall nail-pop patching",
          "2 coats Sherwin-Williams SuperPaint on walls",
          "Standard flat ceiling touch-ups",
          "Final walkthrough & cleanup"
        ],
        lineItems: [
          { name: "Surface & Floor Protection", category: "Prep", qty: 1, unit: "pkg", unitPrice: 250, note: "Heavy-duty drop cloths, poly sheeting & trim masking" },
          { name: "Minor Drywall & Nail-Pop Prep", category: "Drywall Prep", qty: 1, unit: "pkg", unitPrice: 350, note: "Spot spackle, fine sanding & stain-blocking primer" },
          { name: "2-Coat Wall Refinishing", category: "Walls", qty: 1200, unit: "sq ft", unitPrice: 1.25, note: "Sherwin-Williams SuperPaint in chosen sheen" },
          { name: "Flat Ceiling Touch-Ups & Clean", category: "Finish & Clean", qty: 1, unit: "job", unitPrice: 300, note: "Spot touch-ups plus daily broom-clean walkthrough" }
        ]
      },
      {
        name: "Signature",
        subtitle: "Walls, ceilings & crisp millwork",
        price: 3850,
        timeline: "4 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Essential package",
          "Upgrade to Emerald scrubbable matte finish",
          "Full ceiling repaint across main level",
          "Doors, casings & baseboards sanded & enameled",
          "3-year priority touch-up warranty"
        ],
        lineItems: [
          { name: "Everything in Essential Scope", category: "Core Base", qty: 1, unit: "pkg", unitPrice: 2400, note: "Full prep, wall coatings & daily site protection" },
          { name: "Emerald Scrubbable Matte Upgrade", category: "Walls Upgrade", qty: 1200, unit: "sq ft", unitPrice: 0.35, note: "Ultra-washable architectural resin upgrade" },
          { name: "Full Main-Level Ceiling Repaint", category: "Ceilings", qty: 950, unit: "sq ft", unitPrice: 0.60, note: "Dead-flat stain-blocking ceiling spray & back-roll" },
          { name: "Millwork, Doors & Baseboard Enamel", category: "Trim & Doors", qty: 1, unit: "pkg", unitPrice: 460, note: "Fine sand & urethane trim enamel + 3-yr warranty" }
        ]
      },
      {
        name: "Concierge Turnkey",
        subtitle: "Zero-dust designer transformation",
        price: 5400,
        timeline: "5 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Signature package",
          "Level-4 drywall skim & caulk gap sealing",
          "HEPA Festool dustless sanding prep",
          "Dedicated color designer consultation (3 samples)",
          "5-year bumper-to-bumper finish guarantee"
        ],
        lineItems: [
          { name: "Everything in Signature Scope", category: "Signature Base", qty: 1, unit: "pkg", unitPrice: 3850, note: "All walls, ceilings & enameled trim work included" },
          { name: "Level-4 Skim Coat & Caulk Sealing", category: "Precision Prep", qty: 1, unit: "job", unitPrice: 650, note: "Knife-grade drywall skim & architectural gap caulking" },
          { name: "HEPA Festool Dustless Sanding", category: "Dust Control", qty: 1, unit: "job", unitPrice: 450, note: "Zero-mess vacuum-assisted surface sanding" },
          { name: "Color Consult + 5-Yr Guarantee", category: "Design & Care", qty: 1, unit: "pkg", unitPrice: 450, note: "3 painted sample boards & bumper-to-bumper warranty" }
        ]
      }
    ],
    addons: [
      {
        id: "cab-refinish",
        title: "Kitchen Island Cabinet Refinishing",
        description: "Factory-smooth HVLP sprayed urethane finish in your choice of tone.",
        category: "Millwork",
        qty: 1,
        unit: "island",
        price: 650,
        selected: false
      },
      {
        id: "rush-5day",
        title: "Priority 5-Day Start Guarantee",
        description: "Dedicated weekend crew allocation to finish before your event.",
        category: "Priority",
        qty: 1,
        unit: "job",
        price: 350,
        selected: false
      },
      {
        id: "trim-upgrade",
        title: "Modern Craftsman Baseboard Upgrade",
        description: "Supply & install 5.5-inch primed MDF baseboards in living & dining.",
        category: "Carpentry",
        qty: 1,
        unit: "pkg",
        price: 480,
        selected: false
      },
      {
        id: "touchup-plan",
        title: "3-Year Annual Touch-Up Protection",
        description: "Once-a-year 2-hour pro crew visit to fix scuffs, dings & trim marks.",
        category: "Protection",
        qty: 1,
        unit: "3-yr plan",
        price: 290,
        selected: false
      }
    ]
  },

  realestate: {
    id: "realestate",
    label: "Real Estate & Staging",
    category: "Creative, Real Estate & Events",
    icon: "home",
    businessName: "Apex Listing Media & Staging",
    businessTagline: "Elevated Property Presentation That Commands Top Dollar",
    businessEmail: "concierge@apexlisting.example",
    businessPhone: "(206) 555-0192",
    logoData: "",
    paletteId: "obsidian-luxe",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-218",
    clientName: "Elena Vance • Estate Seller",
    projectTitle: "Luxury Listing Launch & Staging Package",
    projectLocation: "21803 NE 154th St, Woodinville",
    introText: "First impressions drive competing offers. Choose the presentation tier below with full deliverable itemization, plus optional drone and twilight upgrades.",
    recommendedBadge: "Highest Seller ROI",
    trustBadges: ["NWMLS Rule 14 Compliant", "Next-Day Media Turnaround", "FAA Part 107 Certified"],
    validDays: 5,
    fastActionDiscount: 125,
    fastActionHours: 48,
    depositPercent: 25,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "25% retainer secures staging inventory & shoot calendar; balance due at closing or net-14.",
    terms: "Includes commercial MLS + social media licensing, unbranded NWMLS-compliant virtual tour URL, and inclement-weather reschedule protection.",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Essential",
        subtitle: "Crisp MLS-ready photo & floor plan",
        price: 1450,
        timeline: "48 Hr Delivery",
        autoCalcPrice: true,
        features: [
          "35 HDR architectural interior & exterior photos",
          "2D schematic floor plan with room dimensions",
          "Light virtual decluttering on 3 photos",
          "NWMLS Rule 14 unbranded media delivery",
          "Blue-sky exterior enhancement"
        ],
        lineItems: [
          { name: "HDR Interior & Exterior Photography", category: "Photography", qty: 35, unit: "photos", unitPrice: 24, note: "True-color bracketed HDR architectural shoot" },
          { name: "2D Schematic Floor Plan", category: "Floor Plan", qty: 1, unit: "plan", unitPrice: 210, note: "Measured room dimensions & total square footage" },
          { name: "Virtual Decluttering & Sky Edit", category: "Retouching", qty: 3, unit: "photos", unitPrice: 60, note: "Item cleanup plus bright blue-sky replacement" },
          { name: "NWMLS Rule 14 Dual Delivery", category: "Compliance", qty: 1, unit: "pkg", unitPrice: 220, note: "Web & print-res unbranded MLS gallery portal" }
        ]
      },
      {
        name: "Signature Luxury",
        subtitle: "Editorial staging + cinematic tour",
        price: 2650,
        timeline: "36 Hr Delivery",
        autoCalcPrice: true,
        features: [
          "Everything in Essential package",
          "Key-room luxury furniture & decor staging (Living, Dining, Primary)",
          "55 HDR magazine-grade photos + detail vignettes",
          "90-second stabilized 4K walkthrough film",
          "Branded + unbranded dual tour links"
        ],
        lineItems: [
          { name: "Key-Room Luxury Furniture Staging", category: "Staging", qty: 3, unit: "rooms", unitPrice: 320, note: "Living, Dining & Primary Suite curated decor install" },
          { name: "Editorial HDR Photography Suite", category: "Photography", qty: 55, unit: "photos", unitPrice: 18, note: "Wide room shots plus luxury architectural vignettes" },
          { name: "90-Second 4K Stabilized Film", category: "Cinema", qty: 1, unit: "film", unitPrice: 520, note: "Gimbal walkthrough scored, edited & color-graded" },
          { name: "Floor Plan + Dual Tour Links", category: "Delivery", qty: 1, unit: "pkg", unitPrice: 180, note: "NWMLS unbranded + branded agent social link" }
        ]
      },
      {
        name: "Premier Concierge",
        subtitle: "Full-estate showcase & buyer funnel",
        price: 4200,
        timeline: "24 Hr Express",
        autoCalcPrice: true,
        features: [
          "Everything in Signature Luxury package",
          "Full-home curated designer staging (up to 4,000 sq ft)",
          "Narrated luxury listing film + YouTube Shorts cut",
          "Custom print-ready 8-page brochure & QR flyers",
          "Targeted neighborhood launch teaser kit"
        ],
        lineItems: [
          { name: "Full-Home Designer Staging (≤4k sf)", category: "Staging", qty: 1, unit: "estate", unitPrice: 1950, note: "Full multi-level furniture, rug & art installation" },
          { name: "Magazine HDR Stills & Grounds", category: "Photography", qty: 65, unit: "photos", unitPrice: 16, note: "Interiors, architectural details & outdoor living" },
          { name: "Narrated Film + Vertical Shorts Cut", category: "Cinema", qty: 1, unit: "suite", unitPrice: 760, note: "Story-led tour + vertical IG/YouTube Reels edit" },
          { name: "8-Page Brochure & Teaser Kit", category: "Print & Launch", qty: 1, unit: "kit", unitPrice: 450, note: "Press-ready brochure PDF, QR flyers & open-house kit" }
        ]
      }
    ],
    addons: [
      {
        id: "drone-twilight",
        title: "Aerial 4K Drone + Golden-Hour Twilight",
        description: "FAA Part 107 aerial acreage stills/video plus glowing dusk exteriors.",
        category: "Aerial & Dusk",
        qty: 1,
        unit: "pkg",
        price: 450,
        selected: false
      },
      {
        id: "3d-walkthrough",
        title: "Interactive 3D Virtual Walkthrough",
        description: "Full dollhouse & room-to-room digital twin for out-of-state buyers.",
        category: "3D Twin",
        qty: 1,
        unit: "scan",
        price: 375,
        selected: false
      },
      {
        id: "prop-website",
        title: "Custom Property Site & 3 Social Reels",
        description: "Single-property showcase landing page + vertical Instagram/TikTok edits.",
        category: "Marketing",
        qty: 1,
        unit: "kit",
        price: 325,
        selected: false
      },
      {
        id: "rush-24hr",
        title: "Next-Morning 24-Hr Priority Turnaround",
        description: "Receive full edited gallery by 9:00 AM the morning after shoot.",
        category: "Priority",
        qty: 1,
        unit: "job",
        price: 250,
        selected: false
      }
    ]
  },

  agency: {
    id: "agency",
    label: "Web & SEO Agency",
    category: "AI, Tech & Digital Agencies",
    icon: "sparkles",
    businessName: "Northstar Digital Growth",
    businessTagline: "Conversion-First Websites & Local Search Dominance",
    businessEmail: "hello@northstardigital.example",
    businessPhone: "(312) 555-0164",
    logoData: "",
    paletteId: "indigo-modern",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-309",
    clientName: "Dr. Marcus Chen • Harbor Dental",
    projectTitle: "High-Converting Website Redesign & Local SEO Engine",
    projectLocation: "Chicago, IL",
    introText: "Our goal is simple: turn local searchers into booked appointments. Select the build tier with itemized scope that matches your growth target.",
    recommendedBadge: "Most Popular Choice",
    trustBadges: ["100% Asset Ownership", "95+ Core Web Vitals Target", "30-Day Launch Support"],
    validDays: 10,
    fastActionDiscount: 250,
    fastActionHours: 72,
    depositPercent: 50,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "50% project kickoff deposit; 50% upon staging approval prior to live DNS launch.",
    terms: "Client owns 100% of domain, content, and code assets upon final payment. Includes 30 days of post-launch bug & tweak support.",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Starter Site",
        subtitle: "Fast, mobile-ready credibility site",
        price: 1800,
        timeline: "10 Days",
        autoCalcPrice: true,
        features: [
          "Up to 5 custom mobile-responsive pages",
          "Click-to-call & lead capture contact forms",
          "Core Web Vitals speed & SSL setup",
          "On-page meta titles & XML sitemap",
          "1 round of visual revisions"
        ],
        lineItems: [
          { name: "Custom Responsive Web Pages", category: "Design & Dev", qty: 5, unit: "pages", unitPrice: 220, note: "Tailored UI built cleanly for mobile & desktop" },
          { name: "Lead Capture & Click-to-Call", category: "Conversion", qty: 1, unit: "system", unitPrice: 300, note: "Fast inquiry forms + instant lead routing" },
          { name: "Speed Tuning, SSL & XML Sitemap", category: "SEO & Speed", qty: 1, unit: "setup", unitPrice: 400, note: "On-page titles, Core Web Vitals & 1 revision round" }
        ]
      },
      {
        name: "Growth Engine",
        subtitle: "Designed to rank & book appointments",
        price: 3400,
        timeline: "14 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Starter Site",
          "Up to 10 high-intent service & city landing pages",
          "Local Schema markup + Google Analytics 4 conversion tracking",
          "Interactive instant quote / booking flow integration",
          "2 rounds of revisions + team training loom videos"
        ],
        lineItems: [
          { name: "High-Intent Service & City Pages", category: "Design & Dev", qty: 10, unit: "pages", unitPrice: 210, note: "Conversion-structured service & local SEO hubs" },
          { name: "Local Schema & GA4 Attribution", category: "SEO & Data", qty: 1, unit: "suite", unitPrice: 550, note: "JSON-LD markup + call/form goal tracking" },
          { name: "Interactive Quote / Booking UX", category: "Conversion", qty: 1, unit: "flow", unitPrice: 450, note: "Frictionless online patient scheduling embed" },
          { name: "2 Revision Sprints & Loom Guides", category: "Launch", qty: 1, unit: "pkg", unitPrice: 300, note: "Polished launch QA + staff video training" }
        ]
      },
      {
        name: "Full Revenue Funnel",
        subtitle: "Market leader brand & automation suite",
        price: 5900,
        timeline: "21 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Growth Engine",
          "Custom interactive ROI / estimator calculator",
          "Automated SMS/email missed-lead follow-up sequence",
          "Competitor SEO gap teardown & 4 pillar blog guides",
          "90-day priority optimization sprints"
        ],
        lineItems: [
          { name: "Growth Engine 10-Page Platform", category: "Platform Base", qty: 1, unit: "site", unitPrice: 3400, note: "Complete web build, Schema, GA4 & booking flow" },
          { name: "Custom Interactive ROI Calculator", category: "Custom Dev", qty: 1, unit: "tool", unitPrice: 950, note: "Bespoke buyer self-qualifier built into site" },
          { name: "Automated SMS/Email Follow-Up", category: "Automation", qty: 1, unit: "seq", unitPrice: 750, note: "Instant missed-lead & reminder workflows" },
          { name: "Competitor SEO Gap & Pillar Guides", category: "Content & SEO", qty: 4, unit: "guides", unitPrice: 200, note: "Keyword conquest articles + 90-day priority sprints" }
        ]
      }
    ],
    addons: [
      {
        id: "conv-copy",
        title: "Direct-Response Conversion Copywriting",
        description: "Complete interview-based sales copy written for every core page.",
        category: "Copywriting",
        qty: 1,
        unit: "site",
        price: 600,
        selected: false
      },
      {
        id: "gbp-turbo",
        title: "Google Business Profile 3-Pack Turbo",
        description: "Category audit, geo-tagged media optimization & 30 top citations.",
        category: "Local SEO",
        qty: 1,
        unit: "pkg",
        price: 450,
        selected: false
      },
      {
        id: "care-hosting",
        title: "First-Month VIP Care, Backups & Hosting",
        description: "Managed CDN hosting, uptime alerts, daily backups & text edits.",
        category: "Care Plan",
        qty: 1,
        unit: "1st mo",
        price: 195,
        selected: false
      },
      {
        id: "booking-widget",
        title: "Automated Calendar & Deposit Checkout",
        description: "Let prospects pick a slot and pay consultation fees directly online.",
        category: "Checkout",
        qty: 1,
        unit: "setup",
        price: 350,
        selected: false
      }
    ]
  },

  landscaping: {
    id: "landscaping",
    label: "Landscaping",
    category: "Home Trades & Construction",
    icon: "leaf",
    businessName: "Evergreen Outdoor Architecture",
    businessTagline: "Curb Appeal & Resort-Grade Outdoor Spaces",
    businessEmail: "designs@evergreenoutdoor.example",
    businessPhone: "(503) 555-0131",
    logoData: "",
    paletteId: "emerald-pro",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-412",
    clientName: "Sarah & David Park",
    projectTitle: "Front Curb Appeal & Backyard Living Transformation",
    projectLocation: "8840 Maplewood Terrace",
    introText: "Designed for four-season color and low weekend maintenance. Review the itemized planting & hardscape options below and add lighting if desired.",
    recommendedBadge: "Best Curb Appeal Value",
    trustBadges: ["Nursery-Grade Stock", "1-Year Plant Replacement", "Green-Waste Haul Included"],
    validDays: 7,
    fastActionDiscount: 100,
    fastActionHours: 48,
    depositPercent: 35,
    paymentProvider: "venmo",
    paymentLink: "",
    paymentNote: "35% material & plant nursery reservation deposit; balance upon completion.",
    terms: "All woody shrubs & trees carry a 1-year replacement guarantee when paired with functioning irrigation.",
    financingEnabled: true,
    financingMonths: 36,
    financingApr: 9.99,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Seasonal Refresh",
        subtitle: "Crisp cleanup, pruning & fresh bark",
        price: 850,
        timeline: "1 Day",
        autoCalcPrice: true,
        features: [
          "Full bed weeding & invasive root pull",
          "Ornamental shrub shaping & deadwooding",
          "Hand-cut natural spade bed edging",
          "3 yards dark hemlock bark mulch install",
          "Green-waste haul-away"
        ],
        lineItems: [
          { name: "Bed Weeding & Root Extraction", category: "Prep", qty: 1, unit: "yard", unitPrice: 260, note: "Full hand weeding & invasive root pull across beds" },
          { name: "Ornamental Shrub Shaping", category: "Pruning", qty: 1, unit: "job", unitPrice: 190, note: "Precision pruning & deadwood clearing" },
          { name: "Spade Edging & Dark Bark Mulch", category: "Mulch & Edge", qty: 3, unit: "yards", unitPrice: 110, note: "Crisp hand-cut bed borders + hemlock bark install" },
          { name: "Green-Waste Haul-Away", category: "Cleanup", qty: 1, unit: "load", unitPrice: 70, note: "Off-site organic green debris disposal" }
        ]
      },
      {
        name: "Complete Makeover",
        subtitle: "Layered color, texture & stone",
        price: 1950,
        timeline: "2 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Seasonal Refresh",
          "18 nursery-grade 3–5 gal four-season plants",
          "Soil amendment with organic compost blend",
          "Weed-barrier fabric in gravel walkways",
          "1-year plant health guarantee"
        ],
        lineItems: [
          { name: "Everything in Seasonal Refresh", category: "Prep Base", qty: 1, unit: "pkg", unitPrice: 850, note: "Full weeding, pruning, spade edging & fresh bark" },
          { name: "Nursery 3–5 Gal Four-Season Plants", category: "Planting", qty: 18, unit: "plants", unitPrice: 45, note: "Evergreen & perennial design installed with spacing" },
          { name: "Compost Soil & Walkway Barrier", category: "Soil Care", qty: 1, unit: "pkg", unitPrice: 290, note: "Organic compost blend + fabric + 1-yr plant warranty" }
        ]
      },
      {
        name: "Resort Backyard",
        subtitle: "Paver patio accents & focal trees",
        price: 3600,
        timeline: "4 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Complete Makeover",
          "3 mature specimen Japanese Maples or Evergreens",
          "Natural basalt boulder accent grouping",
          "Flagstone stepping path across side yard",
          "2-year priority seasonal checkups"
        ],
        lineItems: [
          { name: "Everything in Complete Makeover", category: "Landscape Base", qty: 1, unit: "pkg", unitPrice: 1950, note: "Full refresh, 18 nursery plants, soil & 1-yr warranty" },
          { name: "Specimen Maples / Focal Trees", category: "Focal Trees", qty: 3, unit: "trees", unitPrice: 280, note: "Mature focal trees installed, root-fed & staked" },
          { name: "Basalt Boulders & Flagstone Path", category: "Hardscape", qty: 1, unit: "install", unitPrice: 610, note: "Natural boulder grouping + leveled side stepping path" },
          { name: "2-Year Seasonal Checkup Plan", category: "Protection", qty: 2, unit: "yrs", unitPrice: 100, note: "Spring/fall health inspection & priority crew visits" }
        ]
      }
    ],
    addons: [
      {
        id: "low-volt-lights",
        title: "Architectural Low-Voltage LED Lighting (8 Fixtures)",
        description: "Warm 2700K brass uplights + automatic dusk-to-dawn transformer.",
        category: "Lighting",
        qty: 1,
        unit: "8 fixtures",
        price: 540,
        selected: false
      },
      {
        id: "drip-irrigation",
        title: "Smart Water-Saving Drip Irrigation Zone",
        description: "Targeted root emitters + Wi-Fi weather-aware timer setup.",
        category: "Irrigation",
        qty: 1,
        unit: "zone",
        price: 420,
        selected: false
      },
      {
        id: "biweekly-plan",
        title: "First Month Bi-Weekly Precision Maintenance",
        description: "Mowing, blowing, crisp edging & fertilizer care.",
        category: "Maintenance",
        qty: 1,
        unit: "1st mo",
        price: 180,
        selected: false
      },
      {
        id: "steel-edging",
        title: "Powder-Coated Steel Border Edging",
        description: "Permanent clean separation between turf and flower beds.",
        category: "Hardscape",
        qty: 1,
        unit: "perimeter",
        price: 310,
        selected: false
      }
    ]
  },

  cleaning: {
    id: "cleaning",
    label: "Executive Cleaning",
    category: "Home Trades & Construction",
    icon: "sparkle",
    businessName: "PureNest White-Glove Cleaning",
    businessTagline: "50-Point Checklist • Background-Checked Teams • 100% Satisfaction",
    businessEmail: "book@purenestclean.example",
    businessPhone: "(512) 555-0177",
    logoData: "",
    paletteId: "slate-minimal",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-515",
    clientName: "Taylor & Priya Kapoor",
    projectTitle: "Home Deep Reset & Move-In Preparation",
    projectLocation: "3102 Barton Creek Blvd",
    introText: "All technicians arrive with hospital-grade supplies and our 50-point inspection checklist so your home feels brand new on move-in day.",
    recommendedBadge: "Most Popular Choice",
    trustBadges: ["Background-Checked Staff", "Insured & Bonded", "24-Hr Spotless Re-Clean"],
    validDays: 5,
    fastActionDiscount: 35,
    fastActionHours: 24,
    depositPercent: 25,
    paymentProvider: "paypal",
    paymentLink: "",
    paymentNote: "25% booking hold applied toward final invoice after spotless inspection.",
    terms: "Backed by our 24-Hour Spotless Re-Clean Guarantee—if any corner is missed, our team returns next day at zero charge.",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Standard Shine",
        subtitle: "Thorough top-to-bottom tidy clean",
        price: 240,
        timeline: "3 Hours",
        autoCalcPrice: true,
        features: [
          "All kitchens, baths, bedrooms & living rooms",
          "HEPA vacuuming & streak-free floor mopping",
          "Countertop, sink & exterior appliance sanitize",
          "Mirror & chrome fixture polish",
          "Trash removal & fresh liner replacement"
        ],
        lineItems: [
          { name: "Kitchens, Baths & Living Sanitizing", category: "Sanitize", qty: 1, unit: "home", unitPrice: 130, note: "Counters, sinks, exterior appliances & tubs scrubbed" },
          { name: "HEPA Vacuum & Microfiber Mop", category: "Floors", qty: 1, unit: "home", unitPrice: 70, note: "Allergens lifted + streak-free hardwood/tile mop" },
          { name: "Mirrors, Fixtures & Trash Reset", category: "Detail", qty: 1, unit: "job", unitPrice: 40, note: "Chrome polish + empty & reline all waste bins" }
        ]
      },
      {
        name: "Deep Reset",
        subtitle: "Hand-scrubbed buildup removal",
        price: 420,
        timeline: "5 Hours",
        autoCalcPrice: true,
        features: [
          "Everything in Standard Shine",
          "Hand-wiped baseboards, door frames & light switches",
          "Tile grout & glass shower hard-water descaling",
          "Ceiling fans, vents & window sill detailing",
          "Cabinet exterior degrease & polish"
        ],
        lineItems: [
          { name: "Standard Shine Core Home Reset", category: "Core Clean", qty: 1, unit: "home", unitPrice: 240, note: "All kitchens, baths, living rooms & HEPA floors" },
          { name: "Hand-Wiped Baseboards & Millwork", category: "Detailing", qty: 1, unit: "home", unitPrice: 90, note: "Trim frames, door panels, switches & window sills" },
          { name: "Grout, Shower Descale & Cabinets", category: "Deep Scrub", qty: 1, unit: "pkg", unitPrice: 90, note: "Hard-water glass removal, vents, fans & degreasing" }
        ]
      },
      {
        name: "White-Glove Move-In",
        subtitle: "Hotel-grade sterilization top to bottom",
        price: 680,
        timeline: "Full Day Team",
        autoCalcPrice: true,
        features: [
          "Everything in Deep Reset",
          "Inside ALL kitchen & bathroom cabinets/drawers",
          "Closet shelving, pantry & laundry room detail",
          "Garage sweep & entryway cobweb clearing",
          "Final inspection walk-through with team lead"
        ],
        lineItems: [
          { name: "Deep Reset Full-Home Scope", category: "Deep Base", qty: 1, unit: "home", unitPrice: 420, note: "Full home clean, trim detail & grout descaling" },
          { name: "Inside All Cabinets & Drawers", category: "Interior Storage", qty: 1, unit: "pkg", unitPrice: 140, note: "Kitchen, bath, closet shelves & pantry wiped inside" },
          { name: "Laundry, Garage & Lead Sign-Off", category: "Move-In Ready", qty: 1, unit: "pkg", unitPrice: 120, note: "Entryway cobwebs, garage sweep & 50-pt walkthrough" }
        ]
      }
    ],
    addons: [
      {
        id: "oven-fridge",
        title: "Inside Oven & Refrigerator Deep Clean",
        description: "Racks soaked, degreased & interior shelves sanitized.",
        category: "Appliances",
        qty: 1,
        unit: "pair",
        price: 75,
        selected: false
      },
      {
        id: "interior-windows",
        title: "Interior Windows, Glass Doors & Tracks",
        description: "Crystal-clear glass plus vacuumed & scrubbed sliding tracks.",
        category: "Windows",
        qty: 1,
        unit: "home",
        price: 95,
        selected: false
      },
      {
        id: "eco-botanical",
        title: "100% Fragrance-Free Botanical Upgrade",
        description: "Baby- & pet-safe plant-derived hospital-grade disinfectants.",
        category: "Eco Care",
        qty: 1,
        unit: "home",
        price: 45,
        selected: false
      },
      {
        id: "carpet-steam",
        title: "Hot-Water Carpet Steam Extraction (3 Rooms)",
        description: "Lift embedded allergens, pet dander & high-traffic spots.",
        category: "Carpet",
        qty: 1,
        unit: "3 rooms",
        price: 140,
        selected: false
      }
    ]
  },

  media: {
    id: "media",
    label: "Photo & Video",
    category: "Creative, Real Estate & Events",
    icon: "camera",
    businessName: "FrameHouse Visual Studio",
    businessTagline: "Commercial Storytelling Built for Social & Sales Conversion",
    businessEmail: "studio@framehouse.example",
    businessPhone: "(310) 555-0185",
    logoData: "",
    paletteId: "terracotta-warm",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-622",
    clientName: "Roast & Ember Coffee Co.",
    projectTitle: "Flagship Brand Film & Product Photo Library",
    projectLocation: "Studio + On-Location Shoot",
    introText: "Built to stock your website, paid ads, and retail launches for the next 6 months with cohesive color-graded visuals.",
    recommendedBadge: "Best Campaign Value",
    trustBadges: ["Full Commercial License", "4K Cinema Delivery", "Backup Cloud Vault"],
    validDays: 7,
    fastActionDiscount: 150,
    fastActionHours: 48,
    depositPercent: 50,
    paymentProvider: "square",
    paymentLink: "",
    paymentNote: "50% booking fee locks studio & crew calendar; balance prior to final master download.",
    terms: "Includes perpetual commercial web, paid ad, and social usage rights. Raw ungraded files available via add-on license.",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Half-Day Shoot",
        subtitle: "Sharp evergreen hero stills",
        price: 950,
        timeline: "5 Days",
        autoCalcPrice: true,
        features: [
          "3-hour on-location shoot with lead photographer",
          "30 color-graded high-res retouched photos",
          "Web + print optimized aspect exports",
          "Online client proofing gallery",
          "Full commercial marketing license"
        ],
        lineItems: [
          { name: "On-Location Photography Session", category: "Production", qty: 3, unit: "hrs", unitPrice: 150, note: "Lead photographer with directional lighting kit" },
          { name: "Color-Graded Retouched Stills", category: "Post-Prod", qty: 30, unit: "photos", unitPrice: 12, note: "Web & print-res crops via online gallery" },
          { name: "Perpetual Commercial License", category: "Licensing", qty: 1, unit: "license", unitPrice: 140, note: "Full web, social & paid-ad usage clearance" }
        ]
      },
      {
        name: "Full Brand Library",
        subtitle: "Signature photos + flagship brand film",
        price: 1850,
        timeline: "7 Days",
        autoCalcPrice: true,
        features: [
          "Full 6-hour production day + lighting kit",
          "60 curated lifestyle & product stills",
          "60-second 4K cinema brand story video",
          "Licensed soundtrack + custom color LUT grade",
          "2 rounds of edit revisions included"
        ],
        lineItems: [
          { name: "Full-Day Production & Lighting", category: "Production", qty: 6, unit: "hrs", unitPrice: 135, note: "Studio + lifestyle shoot with grip lighting" },
          { name: "Curated Lifestyle & Product Stills", category: "Photography", qty: 60, unit: "photos", unitPrice: 10, note: "Unified brand LUT retouching + export sets" },
          { name: "60-Sec 4K Cinema Brand Film", category: "Video", qty: 1, unit: "film", unitPrice: 440, note: "Licensed soundtrack, grade & 2 revision rounds" }
        ]
      },
      {
        name: "Cinema Campaign",
        subtitle: "Multi-channel launch powerhouse",
        price: 3200,
        timeline: "10 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Full Brand Library",
          "2-person crew (Director/DP + Gaffer/Audio)",
          "90-second hero film + 2 founder interview cutdowns",
          "100 retouched brand stills + behind-the-scenes set",
          "Paid-ad hook variations (3 opening 3-sec hooks)"
        ],
        lineItems: [
          { name: "2-Person Cinema Crew (Full Day)", category: "Crew", qty: 1, unit: "day", unitPrice: 1150, note: "Director/DP + dedicated gaffer & location audio" },
          { name: "90-Sec Film + 2 Cutdowns & Hooks", category: "Video", qty: 1, unit: "suite", unitPrice: 1050, note: "Hero brand story + 3 paid-ad opening variations" },
          { name: "100 Retouched Stills + BTS Set", category: "Photography", qty: 100, unit: "photos", unitPrice: 10, note: "Complete launch visual vault + commercial rights" }
        ]
      }
    ],
    addons: [
      {
        id: "vertical-reels",
        title: "6 Vertical 9:16 Reels / TikTok Ad Edits",
        description: "Fast-paced hook-driven cuts with animated captions included.",
        category: "Social Ads",
        qty: 1,
        unit: "6 reels",
        price: 450,
        selected: false
      },
      {
        id: "raw-archive",
        title: "Full Raw Footage & DNG Archive Drive",
        description: "Complete unedited camera originals delivered via cloud vault.",
        category: "Raw Files",
        qty: 1,
        unit: "vault",
        price: 350,
        selected: false
      },
      {
        id: "express-48",
        title: "Express 48-Hour Master Delivery",
        description: "Skip the standard editing queue for immediate campaign launch.",
        category: "Priority",
        qty: 1,
        unit: "job",
        price: 275,
        selected: false
      },
      {
        id: "styling-coord",
        title: "On-Set Prop Styling & Wardrobe Prep",
        description: "Dedicated stylist ensuring every frame matches your brand kit.",
        category: "Styling",
        qty: 1,
        unit: "day",
        price: 300,
        selected: false
      }
    ]
  },

  hvac: {
    id: "hvac",
    label: "HVAC Install",
    category: "Home Trades & Construction",
    icon: "bolt",
    businessName: "Summit Air & Heating Co.",
    businessTagline: "NATE-Certified Comfort Specialists • 10-Yr Parts Warranty",
    businessEmail: "comfort@summitair.example",
    businessPhone: "(602) 555-0184",
    logoData: "",
    paletteId: "navy-gold",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-710",
    clientName: "Morgan & Taylor Brooks",
    projectTitle: "3-Ton AC & High-Efficiency Heat Pump Replacement",
    projectLocation: "3120 Suncrest Lane",
    introText: "Following today's Manual-J load check and static pressure test, here are three turnkey system packages sized cleanly for your home's ductwork and comfort goals.",
    recommendedBadge: "Most Popular Choice",
    trustBadges: ["NATE-Certified Techs", "Load-Calc Verified Sizing", "No-Surprise Flat Pricing"],
    validDays: 10,
    fastActionDiscount: 250,
    fastActionHours: 72,
    depositPercent: 25,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "25% equipment order deposit; 75% upon startup walkthrough or monthly financing approval.",
    terms: "Includes permits, EPA refrigerant recovery, haul-away of old unit, and full manufacturer + labor coverage as itemized.",
    financingEnabled: true,
    financingMonths: 60,
    financingApr: 9.99,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Standard 14.3 SEER2",
        subtitle: "Reliable single-stage replacement",
        price: 5400,
        timeline: "1 Day",
        autoCalcPrice: true,
        features: [
          "Matched 3-ton 14.3 SEER2 condenser & indoor coil",
          "New composite pad, electrical whip & disconnect",
          "EPA recovery, nitrogen purge & vacuum startup",
          "Permits, haul-away & 1-year labor warranty"
        ],
        lineItems: [
          { name: "3-Ton 14.3 SEER2 Condenser & Matched Coil", category: "Equipment", qty: 1, unit: "system", unitPrice: 3600, note: "AHRI-matched residential outdoor condenser & cased evaporator coil" },
          { name: "Pad, Whip, Disconnect & Basic Thermostat", category: "Hardware", qty: 1, unit: "pkg", unitPrice: 550, note: "Hurricane pad, code-compliant fused disconnect & digital t-stat" },
          { name: "EPA Recovery, Brazing & Commissioning", category: "Install Labor", qty: 1, unit: "job", unitPrice: 950, note: "Nitrogen-purged copper line set braze & 500-micron pull" },
          { name: "City Permits, Disposal & 1-Yr Labor Warranty", category: "Permits & Care", qty: 1, unit: "job", unitPrice: 300, note: "Old unit recycling & 1-year workmanship guarantee" }
        ]
      },
      {
        name: "Signature 17 SEER2",
        subtitle: "2-stage humidity & bill-saving upgrade",
        price: 7200,
        timeline: "1 Day",
        autoCalcPrice: true,
        features: [
          "Everything in Standard 14.3 SEER2 package",
          "2-stage 17 SEER2 condenser & variable ECM air handler",
          "Ecobee Smart Thermostat + 4-inch media cabinet",
          "2-year seasonal tune-ups + 5-year labor warranty"
        ],
        lineItems: [
          { name: "Everything in Standard 14.3 SEER2 Scope", category: "Core System", qty: 1, unit: "system", unitPrice: 5400, note: "Full equipment, commissioning, permit & old unit haul-away" },
          { name: "2-Stage 17 SEER2 + Variable ECM Upgrade", category: "Efficiency", qty: 1, unit: "upgrade", unitPrice: 1100, note: "Lower summer humidity, quieter rooms & ~24% energy savings" },
          { name: "Ecobee Smart Thermostat + 4\" Filter Cabinet", category: "Controls & IAQ", qty: 1, unit: "pkg", unitPrice: 450, note: "Wi-Fi room sensor + MERV-13 sealed media rack" },
          { name: "2-Yr Tune-Up Plan + 5-Yr Labor Protection", category: "Warranty", qty: 1, unit: "pkg", unitPrice: 250, note: "Spring/Fall coil checkups plus 5-year labor coverage" }
        ]
      },
      {
        name: "ComfortPro Inverter",
        subtitle: "Whisper-quiet modulating comfort + IAQ",
        price: 9800,
        timeline: "1–2 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Signature 17 SEER2 package",
          "Fully modulating inverter condenser (-5°F cold climate)",
          "Whole-home UV-C coil purifier + supply duct sealing",
          "10-year bumper-to-bumper parts & labor warranty"
        ],
        lineItems: [
          { name: "Everything in Signature 17 SEER2 Scope", category: "Signature Base", qty: 1, unit: "system", unitPrice: 7200, note: "Complete high-efficiency install, smart t-stat & permit" },
          { name: "Modulating Inverter Condenser Upgrade", category: "Whisper Inverter", qty: 1, unit: "upgrade", unitPrice: 1450, note: "Variable-speed compressor holds temperature within ±0.5°F" },
          { name: "Whole-Home UV-C Purifier & Trunk Duct Seal", category: "Air Quality", qty: 1, unit: "pkg", unitPrice: 750, note: "Aero-grade mastic plenum seal + medical-grade UV-C bulb" },
          { name: "10-Year Parts & Labor Peace-of-Mind Plan", category: "Warranty", qty: 1, unit: "10-yr", unitPrice: 400, note: "Zero out-of-pocket repair bills for a full decade" }
        ]
      }
    ],
    addons: [
      { id: "hvac-duct-clean", title: "Full Supply & Return Duct Cleaning", description: "Negative-air HEPA brush sweep across all registers + botanical mist.", category: "Airflow", qty: 1, unit: "home", price: 490, selected: false },
      { id: "hvac-zoning", title: "2-Zone Motorized Damper Balancing Kit", description: "Fix hot upstairs / cold basement rooms with independent zone sensors.", category: "Comfort", qty: 1, unit: "2 zones", price: 680, selected: false },
      { id: "hvac-surge", title: "Commercial HVAC Compressor Surge Guard", description: "Hardwired surge arrestor protecting inverter control boards.", category: "Protection", qty: 1, unit: "unit", price: 240, selected: false },
      { id: "hvac-maint", title: "Priority Club VIP Response (3-Yr)", description: "Guaranteed 4-hour emergency dispatch + priority seasonal cleanings.", category: "Priority", qty: 1, unit: "3-yr", price: 295, selected: false }
    ]
  },

  roofing: {
    id: "roofing",
    label: "Roofing",
    category: "Home Trades & Construction",
    icon: "shield",
    businessName: "Crestline Roofing & Exteriors",
    businessTagline: "GAF Master Craftsmanship • Storm-Tested Warranties",
    businessEmail: "bids@crestlineroofing.example",
    businessPhone: "(720) 555-0193",
    logoData: "",
    paletteId: "obsidian-luxe",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-815",
    clientName: "Elena & Marcus Reid",
    projectTitle: "Complete Architectural Roof Replacement (24 Squares)",
    projectLocation: "450 Hawthorne Summit Dr",
    introText: "Based on today's drone & attic inspection (2,400 sq ft pitched roof), here are three weather-tight roof systems itemized cleanly down to underlayment, flashing, and ventilation.",
    recommendedBadge: "Best Storm Value",
    trustBadges: ["10-Yr Leak Workmanship", "2x Magnetic Nail Sweep", "$2M General Liability"],
    validDays: 14,
    fastActionDiscount: 400,
    fastActionHours: 72,
    depositPercent: 30,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "30% material delivery deposit; 70% upon magnetic yard sweep & photo inspection sign-off.",
    terms: "All old roofing layers torn down to bare deck, inspected, re-nailed to code, and wrapped with breathable synthetic felt.",
    financingEnabled: true,
    financingMonths: 60,
    financingApr: 9.99,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Essential 30-Yr",
        subtitle: "Dependable architectural shingle system",
        price: 9600,
        timeline: "2 Days",
        autoCalcPrice: true,
        features: [
          "Complete tear-off & dumpster haul-away (24 squares)",
          "Synthetic underlayment + eaves ice & water shield",
          "30-year architectural dimensional shingles",
          "New step/valley flashing, pipe boots & nail sweep"
        ],
        lineItems: [
          { name: "Full Tear-Off & Dumpster Disposal", category: "Tear-Off", qty: 24, unit: "squares", unitPrice: 110, note: "Strip down to deck, inspect sheathing & haul old shingles" },
          { name: "Synthetic Felt + Ice & Water Shield", category: "Dry-In", qty: 24, unit: "squares", unitPrice: 45, note: "6-ft ice barrier at eaves, valleys & wall intersections" },
          { name: "30-Yr Architectural Shingles & Ridge Cap", category: "Roofing", qty: 24, unit: "squares", unitPrice: 215, note: "High-wind 6-nail fastening pattern in chosen color" },
          { name: "New Flashing, Boots & Magnetic Sweep", category: "Metal & Clean", qty: 1, unit: "job", unitPrice: 720, note: "Silicone-sealed plumbing jacks, apron metal & lawn magnet pass" }
        ]
      },
      {
        name: "Signature StormGuard",
        subtitle: "Class-4 impact rated + balanced ventilation",
        price: 12800,
        timeline: "2 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Essential 30-Yr roof replacement",
          "UL 2218 Class-4 hail/impact shingle upgrade",
          "Continuous Cobra ridge vent & soffit intake baffles",
          "10-year non-prorated workmanship leak warranty"
        ],
        lineItems: [
          { name: "Everything in Essential 30-Yr System", category: "Core Roof", qty: 24, unit: "squares", unitPrice: 400, note: "Full tear-off, synthetic dry-in, boots & cleanup" },
          { name: "UL Class-4 SBS Hail-Resistant Shingles", category: "Storm Rating", qty: 24, unit: "squares", unitPrice: 75, note: "Qualifies for many homeowner insurance hail discounts" },
          { name: "Balanced Ridge Vent & Intake Baffles", category: "Ventilation", qty: 1, unit: "pkg", unitPrice: 850, note: "Continuous ridge airflow extends shingle & attic life" },
          { name: "10-Yr Transferable Workmanship Warranty", category: "Warranty", qty: 1, unit: "pkg", unitPrice: 550, note: "Zero-deductible leak protection backed in writing" }
        ]
      },
      {
        name: "Lifetime Fortified",
        subtitle: "Standing-seam metal accents & 50-yr shield",
        price: 16900,
        timeline: "3 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Signature StormGuard roof system",
          "24-gauge standing-seam metal porch & bay accents",
          "High-temp full-deck self-adhered ice membrane",
          "Seamless 6\" aluminum gutter apron & 50-yr transfer warranty"
        ],
        lineItems: [
          { name: "Everything in Signature StormGuard System", category: "Signature Base", qty: 1, unit: "roof", unitPrice: 12800, note: "Class-4 SBS roof, balanced ventilation & 10-yr labor" },
          { name: "24-Ga Standing-Seam Metal Porch & Dormers", category: "Metal Accent", qty: 1, unit: "pkg", unitPrice: 2450, note: "Concealed-fastener matte charcoal architectural metal" },
          { name: "Full-Deck Peel-and-Stick Ice Membrane", category: "Waterproof", qty: 1, unit: "roof", unitPrice: 950, note: "100% secondary water barrier even if shingles lift" },
          { name: "Seamless Gutter Apron + 50-Yr Transferable Warranty", category: "Trim & Care", qty: 1, unit: "pkg", unitPrice: 700, note: "Oversized heavy-gauge drip edge & lifetime coverage" }
        ]
      }
    ],
    addons: [
      { id: "roof-gutter-guards", title: "Micro-Mesh Gutter Guards (140 ft)", description: "Keep pine needles and oak leaves out of downspouts permanently.", category: "Drainage", qty: 140, unit: "lin ft", price: 1120, selected: false },
      { id: "roof-skylight", title: "Deck-Mount Low-E3 Velux Skylight Swap", description: "Replace aging dome/glass unit cleanly with new roof flashing kit.", category: "Skylight", qty: 1, unit: "unit", price: 890, selected: false },
      { id: "roof-solar-fan", title: "Solar-Powered Whisper Attic Exhaust Fan", description: "Automatic thermostatic exhaust lowering summer cooling loads.", category: "Ventilation", qty: 1, unit: "unit", price: 640, selected: false },
      { id: "roof-chimney", title: "Custom Copper / Steel Chimney Cricket & Cap", description: "Divert heavy valley runoff cleanly around chimney masonry.", category: "Flashing", qty: 1, unit: "pkg", price: 780, selected: false }
    ]
  },

  plumbing: {
    id: "plumbing",
    label: "Plumbing",
    category: "Home Trades & Construction",
    icon: "shield",
    businessName: "TrueFlow Plumbing & Mechanical",
    businessTagline: "Master Licensed Plumbers • Upfront Flat-Rate Quotes",
    businessEmail: "service@trueflowplumbing.example",
    businessPhone: "(512) 555-0166",
    logoData: "",
    paletteId: "indigo-modern",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-904",
    clientName: "Daniel & Priya Patel",
    projectTitle: "Water Heater Replacement & Whole-Home Valve Upgrade",
    projectLocation: "910 Arroyo Springs Blvd",
    introText: "Select from a dependable 50-gallon tank swap, high-efficiency endless hot water upgrade, or total flood-prevention protection—each price includes permit, haul-away, and code parts.",
    recommendedBadge: "Homeowner Favorite",
    trustBadges: ["Master Plumber #MP-4821", "Same-Day Clean Install", "Full Code Permit Included"],
    validDays: 7,
    fastActionDiscount: 125,
    fastActionHours: 48,
    depositPercent: 25,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "25% deposit schedules parts & arrival window; balance due upon hot-water pressure test.",
    terms: "Includes shoe covers, containment tarp, old tank draining/haul-away, and code thermal expansion tank compliance.",
    financingEnabled: true,
    financingMonths: 36,
    financingApr: 9.99,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Standard 50-Gal",
        subtitle: "Dependable like-for-like tank install",
        price: 2150,
        timeline: "Same Day",
        autoCalcPrice: true,
        features: [
          "Drain, disconnect & haul away old water heater",
          "Commercial-grade 50-gal high-recovery water heater",
          "New 3/4\" quarter-turn ball valve, pan & expansion tank",
          "Code leak/pressure test + 6-year tank warranty"
        ],
        lineItems: [
          { name: "Drain, Remove & Recycle Old Tank", category: "Removal", qty: 1, unit: "job", unitPrice: 250, note: "Floor protection, pump drain & eco disposal" },
          { name: "50-Gal Commercial-Grade High-Recovery Tank", category: "Equipment", qty: 1, unit: "unit", unitPrice: 1150, note: "Bradford White / Rheem Pro tank with brass drain valve" },
          { name: "Brass Shutoff, Expansion Tank & Drain Pan", category: "Code Parts", qty: 1, unit: "pkg", unitPrice: 450, note: "Full-port shutoff, flex lines & thermal relief valve" },
          { name: "Pressure Test, Permit & 6-Yr Tank Reg", category: "Commission", qty: 1, unit: "job", unitPrice: 300, note: "Combustion/gas or element safety calibration" }
        ]
      },
      {
        name: "Signature Tankless",
        subtitle: "Endless hot water + lower utility bills",
        price: 3450,
        timeline: "1 Day",
        autoCalcPrice: true,
        features: [
          "Old tank haul-away & space-saving wall mount prep",
          "High-efficiency condensing tankless water heater",
          "Service isolation flush valves & PRV protection",
          "Custom venting tie-in + 12-year heat exchanger warranty"
        ],
        lineItems: [
          { name: "Old Tank Removal, Re-Pipe & Wall Backing", category: "Prep & Haul", qty: 1, unit: "pkg", unitPrice: 650, note: "Recovers closet/garage floor space cleanly" },
          { name: "Condensing Tankless 0.96 UEF Unit", category: "Equipment", qty: 1, unit: "unit", unitPrice: 1850, note: "Continuous hot water across 3 simultaneous showers" },
          { name: "Tankless Isolation Flush Kit & Regulator", category: "Valves", qty: 1, unit: "pkg", unitPrice: 550, note: "Built-in descaling ports & brass shutoffs" },
          { name: "PVC/Gas Vent Tie-In & 12-Yr Coverage", category: "Vent & Care", qty: 1, unit: "job", unitPrice: 400, note: "Full permit test + 12-year exchanger registration" }
        ]
      },
      {
        name: "Smart Flood-Shield",
        subtitle: "Instant hot water loop + smart auto shutoff",
        price: 4950,
        timeline: "1 Day",
        autoCalcPrice: true,
        features: [
          "Everything in Signature Tankless hot water system",
          "Hot-water recirculation pump for 2-second sink heat",
          "Flo Wi-Fi smart ultrasonic automatic shutoff valve",
          "Whole-home carbon filter & 5-year labor warranty"
        ],
        lineItems: [
          { name: "Everything in Signature Tankless System", category: "Core System", qty: 1, unit: "system", unitPrice: 3450, note: "Full tankless install, isolation kit & 12-yr coverage" },
          { name: "Dedicated Hot-Water Recirculation Pump", category: "Instant Heat", qty: 1, unit: "loop", unitPrice: 650, note: "Cuts water waste waiting on master bath showers" },
          { name: "Smart Wi-Fi Ultrasonic Leak Shutoff", category: "Flood Guard", qty: 1, unit: "unit", unitPrice: 550, note: "Detects pinhole leaks & closes main line from phone" },
          { name: "Scale/Carbon Prefilter + 5-Yr Labor", category: "Water & Care", qty: 1, unit: "pkg", unitPrice: 300, note: "Protects fixtures & extends appliance lifespan" }
        ]
      }
    ],
    addons: [
      { id: "plumb-prv", title: "Main Pressure Reducing Valve (PRV) Swap", description: "Drop damaging 90+ PSI street pressure to a safe 60 PSI.", category: "Code & Flow", qty: 1, unit: "valve", price: 320, selected: false },
      { id: "plumb-jet", title: "Main Sewer Line Hydro-Jet + HD Camera", description: "High-pressure scour & recorded video proof of clean pipe.", category: "Drains", qty: 1, unit: "job", price: 480, selected: false },
      { id: "plumb-disp", title: "3/4 HP Whisper Stainless Disposal", description: "Quiet anti-jam disposal + braided faucet supply hoses.", category: "Kitchen", qty: 1, unit: "unit", price: 340, selected: false },
      { id: "plumb-flush", title: "First Annual Tankless Descale & Tune-Up", description: "Pre-paid 45-minute vinegar flush at month 12.", category: "Maintenance", qty: 1, unit: "visit", price: 185, selected: false }
    ]
  },

  electrical: {
    id: "electrical",
    label: "Electrical",
    category: "Home Trades & Construction",
    icon: "bolt",
    businessName: "Beacon Volt Electrical",
    businessTagline: "Master Electricians • Clean NEC Code Upgrades",
    businessEmail: "quotes@beaconvolt.example",
    businessPhone: "(614) 555-0155",
    logoData: "",
    paletteId: "slate-minimal",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-982",
    clientName: "Hannah & Ben Wallace",
    projectTitle: "200-Amp Main Service Panel Upgrade & EV Prep",
    projectLocation: "218 Oakmont Circle",
    introText: "Your existing 100A panel is at capacity. Below are three NEC-compliant 200-amp service packages—choose code replacement alone, EV-ready + whole-home surge, or full generator transfer protection.",
    recommendedBadge: "EV & Surge Ready",
    trustBadges: ["Master Licensed & Bonded", "Permits & Utility Coord.", "Lifetime Panel Workmanship"],
    validDays: 10,
    fastActionDiscount: 150,
    fastActionHours: 72,
    depositPercent: 30,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "30% schedules utility permit & panel reservation; balance upon final inspector green tag.",
    terms: "Includes utility shutdown coordination, new copper grounding rods, clear printed breaker directory, and municipal sign-off.",
    financingEnabled: true,
    financingMonths: 36,
    financingApr: 9.99,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Essential 200A Swap",
        subtitle: "Clean NEC-compliant capacity upgrade",
        price: 2850,
        timeline: "1 Day",
        autoCalcPrice: true,
        features: [
          "Permit pulling & electric utility shutdown scheduling",
          "200-amp 40-space copper-bus main panel & grounding",
          "All branch circuit transfers + typed breaker map",
          "Municipal electrical final inspection sign-off"
        ],
        lineItems: [
          { name: "Utility Coordination & Electrical Permit", category: "Permits", qty: 1, unit: "job", unitPrice: 450, note: "City filing, fee payment & power company meter release" },
          { name: "200A 40-Space Copper-Bus Panel & Grounding", category: "Panel Gear", qty: 1, unit: "unit", unitPrice: 1450, note: "Dual copper ground rods, cold-water bond & weatherhead" },
          { name: "Circuit Re-Termination & Code Breakers", category: "Install Labor", qty: 1, unit: "job", unitPrice: 650, note: "Neat wire dressing & laser-printed circuit directory" },
          { name: "Municipal Inspector Walkthrough", category: "Inspection", qty: 1, unit: "job", unitPrice: 300, note: "Verified NEC green-tag approval" }
        ]
      },
      {
        name: "Signature Surge + EV",
        subtitle: "200A panel + appliance surge & 50A garage circuit",
        price: 3950,
        timeline: "1 Day",
        autoCalcPrice: true,
        features: [
          "Everything in Essential 200A Panel Swap",
          "Hardwired Type-1/2 Whole-Home Surge Protection",
          "Dedicated 50A NEMA 14-50 EV outlet in garage",
          "NEC load calculation sheet + 10-yr craftsmanship care"
        ],
        lineItems: [
          { name: "Everything in Essential 200A Panel Scope", category: "Core Panel", qty: 1, unit: "pkg", unitPrice: 2850, note: "Full 200A panel, copper grounding, permit & green tag" },
          { name: "Whole-Home Type-1/2 Surge Protector", category: "Appliance Safe", qty: 1, unit: "unit", unitPrice: 350, note: "Shields HVAC, fridge, TVs & EV onboard chargers" },
          { name: "Dedicated 50A NEMA 14-50 EV Garage Circuit", category: "EV Ready", qty: 1, unit: "run", unitPrice: 550, note: "6-AWG copper wire, EV-rated receptacle & GFCI breaker" },
          { name: "NEC Load Report & 10-Yr Panel Warranty", category: "Documentation", qty: 1, unit: "pkg", unitPrice: 200, note: "Printed future-expansion headroom & priority care" }
        ]
      },
      {
        name: "Total Backup Pro",
        subtitle: "200A + Surge + EV + Generator Interlock & Monitor",
        price: 5450,
        timeline: "1–2 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Signature Surge + EV package",
          "50A manual generator interlock + exterior inlet box",
          "Smart real-time home circuit energy monitor",
          "Year 1 & Year 2 thermal infrared load scan"
        ],
        lineItems: [
          { name: "Everything in Signature Surge + EV Scope", category: "Signature Base", qty: 1, unit: "pkg", unitPrice: 3950, note: "200A panel, Type-1/2 surge & 50A EV circuit included" },
          { name: "50A Generator Interlock & Weather Inlet", category: "Backup Power", qty: 1, unit: "pkg", unitPrice: 750, note: "Run furnace, fridge, Wi-Fi & well during grid outages" },
          { name: "Whole-Home Real-Time Energy Monitor", category: "Smart Meter", qty: 1, unit: "unit", unitPrice: 450, note: "Per-circuit kWh tracking & overload alerts via phone" },
          { name: "Year 1 & Year 2 Thermal Load Torque Scan", category: "Preventive", qty: 1, unit: "pkg", unitPrice: 300, note: "IR camera hotspot inspection for lifelong safety" }
        ]
      }
    ],
    addons: [
      { id: "elec-ev-hardwire", title: "Hardwire Level-2 EV Wall Charger (48A)", description: "Install customer-supplied Tesla/Wallbox/ChargePoint unit at full speed.", category: "EV Ready", qty: 1, unit: "circuit", price: 690, selected: false },
      { id: "elec-led-6", title: "6 Gimbal Dimmable LED Recessed Lights", description: "Clean hole-saw install + Lutron smart dimmer switch included.", category: "Lighting", qty: 6, unit: "fixtures", price: 840, selected: false },
      { id: "elec-bath-fan", title: "Ultra-Quiet 110 CFM Humidity Bath Fan", description: "Replaces noisy exhaust fan with moisture-sensing switch.", category: "Ventilation", qty: 1, unit: "unit", price: 420, selected: false },
      { id: "elec-smoke", title: "4 Interconnected Smart Smoke + CO Alarms", description: "Hardwired life-safety detectors with 10-year backup battery.", category: "Life Safety", qty: 4, unit: "alarms", price: 360, selected: false }
    ]
  },

  ai_training: {
    id: "ai_training",
    label: "AI Training & Enablement",
    category: "AI, Tech & Digital Agencies",
    icon: "sparkles",
    businessName: "AppliedAI Academy & Enablement",
    businessTagline: "Practical Team AI Adoption • Safe Data Workflows",
    businessEmail: "workshops@appliedai.example",
    businessPhone: "(415) 555-0162",
    logoData: "",
    paletteId: "navy-gold",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-812",
    clientName: "Riverdale Operations Team",
    projectTitle: "Company-Wide AI Productivity & Prompt Enablement Program",
    projectLocation: "San Francisco / Remote Hybrid",
    introText: "Designed so every non-technical team member saves 4–7 hours weekly without risking proprietary company data. Pick the training depth tailored to your department rollout.",
    recommendedBadge: "Most Popular Choice",
    trustBadges: ["Custom Role Playbooks", "SOC2 Safe-Use Guidelines", "Recorded Session Library"],
    validDays: 14,
    fastActionDiscount: 300,
    fastActionHours: 72,
    depositPercent: 50,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "50% seat reservation deposit upon ESIGN approval; 50% upon final workshop delivery.",
    terms: "Client receives full internal license to recordings, prompt libraries, and policy templates across active employees.",
    financingEnabled: true,
    financingMonths: 12,
    financingApr: 0,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Workshop Essentials",
        subtitle: "Fast executive & staff kick-start",
        price: 1800,
        timeline: "1 Week",
        autoCalcPrice: true,
        features: [
          "Live 2-hour interactive team workshop + Q&A",
          "Curated Prompt Playbook PDF tailored to your roles",
          "HD session recording + 7-day async email Q&A"
        ],
        lineItems: [
          { name: "Live 2-Hr Executive & Team AI Workshop", category: "Training", qty: 1, unit: "session", unitPrice: 1100, note: "Customized demos covering writing, research, spreadsheets & SOPs" },
          { name: "Prompt Playbook & Role Templates (PDF)", category: "Playbook", qty: 1, unit: "kit", unitPrice: 450, note: "25 tested role prompts ready for immediate daily copy-paste" },
          { name: "Recording + 7-Day Q&A Support Pass", category: "Support", qty: 1, unit: "pkg", unitPrice: 250, note: "Indexed HD replay plus direct follow-up troubleshooting" }
        ]
      },
      {
        name: "Team Enablement Bootcamp",
        subtitle: "Hands-on labs + internal AI safety policy",
        price: 4200,
        timeline: "3 Weeks",
        autoCalcPrice: true,
        features: [
          "Everything in Workshop Essentials",
          "3 department-specific hands-on breakout labs",
          "Company AI safe-use policy & shared prompt vault",
          "30-day office hours & adoption scorecard"
        ],
        lineItems: [
          { name: "Everything in Workshop Essentials Scope", category: "Base Scope", qty: 1, unit: "pkg", unitPrice: 1800, note: "Live kickoff workshop, role playbook & team replay library" },
          { name: "3 Department-Specific Hands-On Labs", category: "Hands-On Labs", qty: 3, unit: "labs", unitPrice: 500, note: "Separate Sales, Ops & Support workshops using your live tasks" },
          { name: "Internal AI Policy & Shared Prompt Vault", category: "Governance", qty: 1, unit: "suite", unitPrice: 600, note: "Shadow-AI guardrails, PII redaction rules & Notion/Drive vault" },
          { name: "30-Day Office Hours & Adoption Check-In", category: "Follow-Up", qty: 1, unit: "month", unitPrice: 300, note: "Bi-weekly Q&A clinics to lock in team habits" }
        ]
      },
      {
        name: "Enterprise AI Transformation",
        subtitle: "Custom internal copilots + KPI audit",
        price: 8500,
        timeline: "6 Weeks",
        autoCalcPrice: true,
        features: [
          "Everything in Team Enablement Bootcamp",
          "Custom internal GPTs / knowledge workspace build",
          "Executive ROI scorecard & vendor security review",
          "90-day leadership coaching & refresher clinic"
        ],
        lineItems: [
          { name: "Everything in Team Enablement Bootcamp", category: "Bootcamp Base", qty: 1, unit: "pkg", unitPrice: 4200, note: "Full kickoff, 3 departmental labs, policy & 30-day office hours" },
          { name: "Custom Workspace & Internal Knowledge Copilots", category: "Custom Tools", qty: 1, unit: "build", unitPrice: 2200, note: "Private workspace configured with company SOPs & style guides" },
          { name: "Executive KPI ROI Scorecard & Security Audit", category: "Strategy", qty: 1, unit: "audit", unitPrice: 1200, note: "Time-saved telemetry benchmark & vendor privacy verification" },
          { name: "90-Day Priority Coaching & Refresher Clinic", category: "Advisory", qty: 1, unit: "pkg", unitPrice: 900, note: "Quarterly model update briefing & leadership Slack access" }
        ]
      }
    ],
    addons: [
      { id: "ai-extra-seat", title: "Additional Department Cohort (Up to 25 Staff)", description: "Dedicated 90-minute workshop tailored for Finance, HR, or Engineering.", category: "Cohort", qty: 1, unit: "session", price: 650, selected: false },
      { id: "ai-workflow", title: "1 Custom n8n / Zapier AI Workflow Build", description: "Turn your highest-volume manual copy/paste task into an automated flow.", category: "Automation", qty: 1, unit: "flow", price: 950, selected: false },
      { id: "ai-retainer", title: "Monthly AI Coach & Model Updates Retainer", description: "Ongoing team office hours as frontier models evolve.", category: "Retainer", qty: 1, unit: "month", price: 550, selected: false },
      { id: "ai-compliance", title: "GDPR / SOC2 Vendor AI Risk Policy Packet", description: "Client-ready disclosure language & internal data governance addendum.", category: "Governance", qty: 1, unit: "packet", price: 480, selected: false }
    ]
  },

  ai_automation: {
    id: "ai_automation",
    label: "AI Agents & Automation",
    category: "AI, Tech & Digital Agencies",
    icon: "bolt",
    businessName: "RelayCraft AI Systems",
    businessTagline: "Production LLM Workflows • Human-Reviewed Guardrails",
    businessEmail: "builds@relaycraft.example",
    businessPhone: "(512) 555-0197",
    logoData: "",
    paletteId: "obsidian-luxe",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-845",
    clientName: "Apex Logistics Partners",
    projectTitle: "Autonomous Lead Triage & CRM Operations Agent Suite",
    projectLocation: "Austin, TX / Cloud Infrastructure",
    introText: "Eliminate manual lead routing, proposal drafting, and CRM data entry. Every workflow deploys directly inside your own API keys with human approval checks and full error alerting.",
    recommendedBadge: "Highest ROI",
    trustBadges: ["You Own 100% Code & Prompts", "Zero Hallucination Guardrails", "14–90 Day SLA Support"],
    validDays: 14,
    fastActionDiscount: 400,
    fastActionHours: 72,
    depositPercent: 50,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "50% build sprint kickoff deposit; 50% upon production cutover & SOP sign-off.",
    terms: "Client retains 100% intellectual property over prompts, n8n/Make blueprints, and custom webhook middleware.",
    financingEnabled: true,
    financingMonths: 12,
    financingApr: 0,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Lead & Intake Bot",
        subtitle: "Single high-impact CRM workflow",
        price: 2400,
        timeline: "2 Weeks",
        autoCalcPrice: true,
        features: [
          "Workflow architecture map & CRM schema audit",
          "1 production AI qualification & enrichment flow",
          "Slack error alerting + 14-day launch hypercare"
        ],
        lineItems: [
          { name: "Workflow Mapping & CRM Data Audit", category: "Discovery", qty: 1, unit: "audit", unitPrice: 500, note: "Bottleneck teardown, webhook spec & latency budget" },
          { name: "1 Production AI Lead Qualification Workflow", category: "Automation", qty: 1, unit: "flow", unitPrice: 1400, note: "Auto-scores inbound inquiries, enriches company data & logs CRM" },
          { name: "Error Alerts, Testing & 14-Day Hypercare", category: "QA & Care", qty: 1, unit: "pkg", unitPrice: 500, note: "Dead-letter retry logic, prompt tests & rapid fixes" }
        ]
      },
      {
        name: "Multi-Agent Ops Suite",
        subtitle: "3 connected agents + approval queue",
        price: 5600,
        timeline: "4 Weeks",
        autoCalcPrice: true,
        features: [
          "Everything in Lead & Intake Bot",
          "3 connected agents: Inbox Triage, CRM Sync & Proposal Drafts",
          "Human-in-the-loop approval dashboard & Slack triggers",
          "Recorded team SOPs + 30-day accuracy tuning"
        ],
        lineItems: [
          { name: "Everything in Lead & Intake Bot Scope", category: "Core Flow", qty: 1, unit: "pkg", unitPrice: 2400, note: "Audit, lead enrichment pipeline & alerting foundation" },
          { name: "3 Connected AI Agents (Inbox, CRM, Drafts)", category: "Agent Suite", qty: 3, unit: "agents", unitPrice: 700, note: "Classifies email threads, updates deal stages & drafts summaries" },
          { name: "Human-in-the-Loop Approval Queue", category: "Guardrails", qty: 1, unit: "setup", unitPrice: 650, note: "One-click Slack/web approve before external emails fire" },
          { name: "Team SOP Video Walkthrough & 30-Day Tuning", category: "Handover", qty: 1, unit: "pkg", unitPrice: 450, note: "Loom documentation + weekly prompt calibration" }
        ]
      },
      {
        name: "Autonomous Revenue Engine",
        subtitle: "Custom RAG brain + eval harness",
        price: 11500,
        timeline: "6–8 Weeks",
        autoCalcPrice: true,
        features: [
          "Everything in Multi-Agent Ops Suite",
          "Private RAG knowledge base & custom REST API tools",
          "Automated test eval harness & token cost guardrails",
          "90-day dedicated AI engineering retainer"
        ],
        lineItems: [
          { name: "Everything in Multi-Agent Ops Suite", category: "Suite Base", qty: 1, unit: "pkg", unitPrice: 5600, note: "Complete 3-agent CRM/inbox stack + human approval layer" },
          { name: "RAG Vector Knowledge Base & API Connectors", category: "Engineering", qty: 1, unit: "build", unitPrice: 3200, note: "Chunked company docs synced securely to ERP/billing APIs" },
          { name: "Automated Eval Harness & Cost Guardrails", category: "Reliability", qty: 1, unit: "suite", unitPrice: 1500, note: "Golden dataset regression checks & fallback routing" },
          { name: "90-Day Dedicated AI Engineer Retainer", category: "Retainer", qty: 1, unit: "pkg", unitPrice: 1200, note: "Priority Slack channel & continuous model upgrades" }
        ]
      }
    ],
    addons: [
      { id: "auto-voice", title: "AI Voice Receptionist Integration", description: "24/7 natural inbound phone call screening & instant calendar booking.", category: "Voice AI", qty: 1, unit: "line", price: 1250, selected: false },
      { id: "auto-monitor", title: "Monthly Token Cost & SLA Monitoring", description: "Daily uptime checks, token cap protection & model version updates.", category: "Retainer", qty: 1, unit: "month", price: 390, selected: false },
      { id: "auto-sync", title: "QuickBooks / Xero Invoice Auto-Reconcile", description: "Extracts PDF vendor receipts & matches line items automatically.", category: "Finance Flow", qty: 1, unit: "flow", price: 750, selected: false }
    ]
  },

  it_msp: {
    id: "it_msp",
    label: "Managed IT & Security (MSP)",
    category: "AI, Tech & Digital Agencies",
    icon: "shield",
    businessName: "IronGate Managed IT & Cyber",
    businessTagline: "15-Min SLA Support • Zero-Trust Endpoint Defense",
    businessEmail: "security@irongateit.example",
    businessPhone: "(312) 555-0136",
    logoData: "",
    paletteId: "navy-gold",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-870",
    clientName: "Harborview Medical Group",
    projectTitle: "10-Seat Managed IT, Cybersecurity & Cloud Backup Coverage",
    projectLocation: "Chicago, IL • Suite 400",
    introText: "Eliminate downtime and cyber-insurance compliance gaps. All tiers include proactive endpoint patching and seamless onboarding without interrupting staff workflows.",
    recommendedBadge: "Cyber Insurance Ready",
    trustBadges: ["15-Min SLA Response", "HIPAA & SOC2 Controls", "No Long-Term Lock-In"],
    validDays: 14,
    fastActionDiscount: 150,
    fastActionHours: 72,
    depositPercent: 50,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "50% onboarding + Month 1 activation upon signing; automated monthly billing thereafter.",
    terms: "Includes silent after-hours agent rollout, legacy vendor handoff, and documented asset inventory.",
    financingEnabled: false,
    financingMonths: 12,
    financingApr: 0,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Core Helpdesk & Patch",
        subtitle: "Reliable remote IT + OS updates",
        price: 1450,
        timeline: "3–5 Days",
        autoCalcPrice: true,
        features: [
          "10-endpoint RMM deployment & hardware asset audit",
          "Automated Windows/macOS & 3rd-party app patching",
          "Business-hours US remote support desk"
        ],
        lineItems: [
          { name: "10-Endpoint RMM Agent Deployment & Audit", category: "Endpoints", qty: 10, unit: "seats", unitPrice: 65, note: "Health telemetry, disk encryption check & software inventory" },
          { name: "Automated OS & Third-Party Patching", category: "Patching", qty: 1, unit: "system", unitPrice: 450, note: "Scheduled vulnerability updates with zero workday interruptions" },
          { name: "Business-Hours US Remote Helpdesk", category: "Helpdesk", qty: 1, unit: "month", unitPrice: 350, note: "Ticket portal, phone & remote screen remediation" }
        ]
      },
      {
        name: "Shield Security & Backup",
        subtitle: "Managed EDR + MFA + immutable cloud backup",
        price: 2650,
        timeline: "5–7 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Core Helpdesk & Patch",
          "Managed EDR ransomware defense + M365 phishing guard",
          "Automated immutable Microsoft 365 / workstation backups",
          "Company password vault & hardware/app MFA rollout"
        ],
        lineItems: [
          { name: "Everything in Core Helpdesk & Patch Scope", category: "Core IT", qty: 1, unit: "pkg", unitPrice: 1450, note: "RMM monitoring, automated patching & remote support desk" },
          { name: "Managed EDR + M365 Phishing Defense (10 Seats)", category: "Cybersecurity", qty: 10, unit: "seats", unitPrice: 55, note: "Real-time behavioral threat quarantine & email link scanning" },
          { name: "Immutable Cloud Backup & Restore Drill", category: "Backup", qty: 1, unit: "setup", unitPrice: 400, note: "Air-gapped daily snapshots for SharePoint, Mail & endpoints" },
          { name: "Password Vault + MFA Enforcement", category: "Identity", qty: 1, unit: "org", unitPrice: 250, note: "Shared team vault & zero-trust conditional access rules" }
        ]
      },
      {
        name: "Zero-Trust vCIO & 24/7 SOC",
        subtitle: "24/7 threat hunting + compliance readiness",
        price: 4400,
        timeline: "2 Weeks",
        autoCalcPrice: true,
        features: [
          "Everything in Shield Security & Backup",
          "24/7/365 managed SOC threat hunting & SIEM retention",
          "Cyber insurance / HIPAA / SOC2 gap audit packet",
          "Quarterly vCIO executive hardware & budget roadmap"
        ],
        lineItems: [
          { name: "Everything in Shield Security & Backup", category: "Shield Base", qty: 1, unit: "pkg", unitPrice: 2650, note: "Helpdesk, EDR, email security, cloud backup & MFA" },
          { name: "24/7 SOC Threat Hunting & SIEM Retention", category: "24/7 SOC", qty: 1, unit: "org", unitPrice: 950, note: "Round-the-clock human security analyst escalation" },
          { name: "Compliance Readiness Audit Packet", category: "Compliance", qty: 1, unit: "audit", unitPrice: 500, note: "Questionnaire responses & policy attestation for underwriters" },
          { name: "Quarterly vCIO IT Budget Roadmap", category: "vCIO", qty: 1, unit: "review", unitPrice: 300, note: "3-year workstation refresh & cloud license savings plan" }
        ]
      }
    ],
    addons: [
      { id: "msp-seat", title: "5 Additional Managed Workstation Seats", description: "Expand full RMM, EDR & cloud backup coverage to 5 more staff.", category: "Seats", qty: 1, unit: "5-pack", price: 375, selected: false },
      { id: "msp-wifi", title: "Enterprise Mesh Wi-Fi & Firewall Hardening", description: "VLAN isolation for guest Wi-Fi, VoIP phones & IoT printers.", category: "Network", qty: 1, unit: "site", price: 490, selected: false },
      { id: "msp-phish", title: "Quarterly Phishing Simulation & Training", description: "Automated realistic spoof tests + 5-min micro-training modules.", category: "Training", qty: 1, unit: "org", price: 295, selected: false }
    ]
  },

  tutoring: {
    id: "tutoring",
    label: "Private Tutoring & Test Prep",
    category: "Education, Coaching & Advisory",
    icon: "sparkles",
    businessName: "ScholarPath Academic Coaching",
    businessTagline: "Mastery-First 1-on-1 Tutoring • Guaranteed Score Lift",
    businessEmail: "hello@scholarpath.example",
    businessPhone: "(617) 555-0142",
    logoData: "",
    paletteId: "forest-copper",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-905",
    clientName: "The Patel Family (Grade 11)",
    projectTitle: "SAT / AP Math Mastery & Academic Confidence Package",
    projectLocation: "Live Online Whiteboard / Boston",
    introText: "Following our free 20-minute academic consultation, here are three personalized 1-on-1 tutoring roadmaps designed to close foundational gaps quickly and boost exam-day confidence.",
    recommendedBadge: "Best Score Improvement",
    trustBadges: ["Vetted Top 1% Educators", "Weekly Parent Recaps", "24-Hr Free Rescheduling"],
    validDays: 10,
    fastActionDiscount: 50,
    fastActionHours: 72,
    depositPercent: 50,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "50% enrollment reserve upon acceptance; remaining 50% halfway through package.",
    terms: "Unused hours roll forward for 12 months. Parent progress summaries sent cleanly after every session.",
    financingEnabled: true,
    financingMonths: 6,
    financingApr: 0,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Foundation 6-Session Pack",
        subtitle: "Targeted skill boost & homework rhythm",
        price: 660,
        timeline: "3 Weeks",
        autoCalcPrice: true,
        features: [
          "Initial diagnostic gap assessment & study roadmap",
          "Six 60-minute live 1-on-1 tutoring sessions",
          "Weekly parent progress email & recorded whiteboard notes"
        ],
        lineItems: [
          { name: "Diagnostic Skills & Gap Assessment", category: "Assessment", qty: 1, unit: "eval", unitPrice: 90, note: "Pinpoints core concept gaps before session #1" },
          { name: "1-on-1 Live 60-Min Tutoring Sessions", category: "1-on-1 Hours", qty: 6, unit: "hrs", unitPrice: 85, note: "Interactive digital whiteboard + custom practice drills" },
          { name: "Weekly Parent Progress Digest", category: "Reporting", qty: 1, unit: "plan", unitPrice: 60, note: "Clear summary of mastered topics & next focus areas" }
        ]
      },
      {
        name: "Honor Roll 12-Session Accelerator",
        subtitle: "Steady GPA + standardized score climb",
        price: 1290,
        timeline: "6 Weeks",
        autoCalcPrice: true,
        features: [
          "Full diagnostic assessment + customized weekly syllabus",
          "Twelve 60-min 1-on-1 sessions (priority weekly slot)",
          "2 scored timed practice exams + error-log drills",
          "Mid-program parent strategy check-in + async Q&A"
        ],
        lineItems: [
          { name: "Diagnostic Assessment + Custom Study Roadmap", category: "Assessment", qty: 1, unit: "eval", unitPrice: 90, note: "Section-by-section baseline score & pacing calibration" },
          { name: "1-on-1 Live Tutoring Sessions (Priority Slot)", category: "1-on-1 Hours", qty: 12, unit: "hrs", unitPrice: 80, note: "Reserved recurring weekly time + full whiteboard PDF notes" },
          { name: "Scored Timed Practice Exams & Drills", category: "Exam Prep", qty: 2, unit: "exams", unitPrice: 75, note: "Realistic pacing check + categorized question review" },
          { name: "Mid-Program Strategy Call & Text Check-Ins", category: "Support", qty: 1, unit: "pkg", unitPrice: 90, note: "Direct quick-help pass between lessons" }
        ]
      },
      {
        name: "VIP Mastery & SAT Intensive",
        subtitle: "Maximum target score + unlimited Q&A",
        price: 2280,
        timeline: "10–12 Weeks",
        autoCalcPrice: true,
        features: [
          "Comprehensive multi-section diagnostic + study binder",
          "Twenty 60-min intensive 1-on-1 coaching sessions",
          "4 full-length proctored mock exams + video review",
          "Unlimited async homework help + bi-weekly parent calls"
        ],
        lineItems: [
          { name: "Multi-Section Diagnostic + Custom Study Binder", category: "Diagnostic", qty: 1, unit: "pkg", unitPrice: 150, note: "Custom digital workbook, formula deck & pacing schedule" },
          { name: "1-on-1 Intensive Coaching (Flexible Times)", category: "1-on-1 Hours", qty: 20, unit: "hrs", unitPrice: 78, note: "Deep mastery pacing & high-difficulty problem sets" },
          { name: "4 Proctored Mock Exams + Video Review", category: "Mock Exams", qty: 4, unit: "exams", unitPrice: 80, note: "Full timing analytics & recorded solution walkthroughs" },
          { name: "Unlimited Async Q&A & Parent Conferences", category: "VIP Access", qty: 1, unit: "term", unitPrice: 250, note: "Priority support right up through test morning" }
        ]
      }
    ],
    addons: [
      { id: "tut-sibling", title: "Sibling Shared Study Pass (4 Bonus Hrs)", description: "Allocate 4 flexible review hours for another student in your household.", category: "Family Bonus", qty: 1, unit: "4 hrs", price: 240, selected: false },
      { id: "tut-essay", title: "College Admissions Essay Polish (3 Drafts)", description: "Brainstorming, structural outline & 3 detailed line-edit rounds.", category: "Admissions", qty: 1, unit: "essay", price: 320, selected: false },
      { id: "tut-calc", title: "Executive Functioning & Test Anxiety Toolkit", description: "Planner cadence, Pomodoro pacing & calm test-day routine.", category: "Study Skills", qty: 1, unit: "kit", price: 140, selected: false }
    ]
  },

  coaching: {
    id: "coaching",
    label: "Executive & Career Coaching",
    category: "Education, Coaching & Advisory",
    icon: "sparkles",
    businessName: "Vantage Point Leadership Co.",
    businessTagline: "ICF-Certified Executive Coaches • Measurable Growth",
    businessEmail: "advisory@vantagepoint.example",
    businessPhone: "(212) 555-0155",
    logoData: "",
    paletteId: "obsidian-luxe",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-918",
    clientName: "Elena Vance — VP Product",
    projectTitle: "Executive Presence, Scope Expansion & Compensation Coaching",
    projectLocation: "New York / Confidential Zoom",
    introText: "Confidential, outcome-driven coaching designed for high-performing leaders stepping into larger mandates, board visibility, or critical career negotiations.",
    recommendedBadge: "Client Favorite",
    trustBadges: ["Strict Mutual Confidentiality", "Corporate Stipend Invoice Ready", "Between-Call Access"],
    validDays: 14,
    fastActionDiscount: 200,
    fastActionHours: 72,
    depositPercent: 50,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "50% initial commitment upon signing (corporate L&D receipts generated cleanly); 50% at midpoint.",
    terms: "All session notes and 360 interviews remain strictly confidential between coach and coachee.",
    financingEnabled: true,
    financingMonths: 12,
    financingApr: 0,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "90-Day Clarity Sprint",
        subtitle: "Focused 3-month breakthrough plan",
        price: 1800,
        timeline: "3 Months",
        autoCalcPrice: true,
        features: [
          "360° strengths & career goal alignment audit",
          "Six bi-weekly 60-min 1-on-1 coaching sessions",
          "Personalized 90-day action plan & scorecard"
        ],
        lineItems: [
          { name: "360° Strengths & Career Goal Alignment Audit", category: "Discovery", qty: 1, unit: "audit", unitPrice: 350, note: "Pinpoints high-leverage leadership blindspots & wins" },
          { name: "6 Bi-Weekly 60-Min 1-on-1 Strategy Calls", category: "Coaching", qty: 6, unit: "calls", unitPrice: 200, note: "Tactical problem-solving, framing & stakeholder calibration" },
          { name: "90-Day Action Plan & Accountability Tracker", category: "Playbook", qty: 1, unit: "plan", unitPrice: 250, note: "Weekly milestone tracker & reflection prompts" }
        ]
      },
      {
        name: "Leadership Accelerator (6-Mo)",
        subtitle: "Executive presence + promotion/comp strategy",
        price: 3600,
        timeline: "6 Months",
        autoCalcPrice: true,
        features: [
          "Stakeholder interview synthesis & positioning map",
          "Twelve bi-weekly 60-min executive coaching calls",
          "Async Slack / voice memo check-ins between sessions",
          "Promotion case & compensation negotiation prep"
        ],
        lineItems: [
          { name: "Deep-Dive 360 Feedback & Positioning Map", category: "Discovery", qty: 1, unit: "pkg", unitPrice: 600, note: "Anonymous stakeholder pulse + executive narrative positioning" },
          { name: "12 Bi-Weekly 60-Min Executive Coaching Calls", category: "Coaching", qty: 12, unit: "calls", unitPrice: 200, note: "Sustained 6-month transformation & crisis sounding board" },
          { name: "Async Voice / Slack Check-Ins (6 Months)", category: "Async Access", qty: 6, unit: "mos", unitPrice: 65, note: "Pre-meeting pep briefs & rapid decision second opinions" },
          { name: "Promotion & Compensation Script Review", category: "Prep", qty: 1, unit: "pkg", unitPrice: 210, note: "Equity, base & title negotiation modeling" }
        ]
      },
      {
        name: "VIP Boardroom Partner",
        subtitle: "Weekly priority advisory + live rehearsals",
        price: 6800,
        timeline: "6 Months",
        autoCalcPrice: true,
        features: [
          "Everything in Leadership Accelerator (6-Mo)",
          "Weekly 1-on-1 priority cadence (+12 extra calls)",
          "2 live mock board / all-hands presentation rehearsals",
          "Unlimited review of decks, memos & LinkedIn bio"
        ],
        lineItems: [
          { name: "Everything in Leadership Accelerator (6-Mo)", category: "Core Program", qty: 1, unit: "pkg", unitPrice: 3600, note: "360 synthesis, 12 base calls, async Slack & comp prep" },
          { name: "Weekly Priority Advisory (+12 Extra Calls)", category: "Weekly Cadence", qty: 12, unit: "calls", unitPrice: 180, note: "Weekly high-stakes preparation for C-suite leaders" },
          { name: "Live Mock Board / Keynote Rehearsals", category: "Rehearsal", qty: 2, unit: "labs", unitPrice: 320, note: "Line-by-line Q&A pressure testing with video playback" },
          { name: "Unlimited Executive Bio, LinkedIn & Deck Edits", category: "VIP Review", qty: 1, unit: "pkg", unitPrice: 400, note: "48-hr asynchronous redline on board & strategy memos" }
        ]
      }
    ],
    addons: [
      { id: "coach-linkedin", title: "Done-With-You Executive LinkedIn Overhaul", description: "Craft C-suite positioning headline, bio narrative & board profile.", category: "Positioning", qty: 1, unit: "pkg", price: 450, selected: false },
      { id: "coach-offsite", title: "Half-Day Direct Report Team Workshop", description: "3-hour facilitated alignment offsite for up to 12 direct reports.", category: "Team Alignment", qty: 1, unit: "session", price: 950, selected: false },
      { id: "coach-disc", title: "Team Strengths & Communication Profile", description: "Hogan / DISC executive assessment with 45-min debrief.", category: "Assessment", qty: 1, unit: "eval", price: 280, selected: false }
    ]
  },

  accounting: {
    id: "accounting",
    label: "Fractional CFO & Tax",
    category: "Education, Coaching & Advisory",
    icon: "shield",
    businessName: "LedgerCraft Advisory & CPA",
    businessTagline: "Clean Books by the 10th • Proactive Tax Strategy",
    businessEmail: "advisory@ledgercraft.example",
    businessPhone: "(206) 555-0181",
    logoData: "",
    paletteId: "navy-gold",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-934",
    clientName: "Cascade Service Co.",
    projectTitle: "Monthly Bookkeeping, Tax Planning & Fractional CFO Retainer",
    projectLocation: "Seattle, WA / QuickBooks Online",
    introText: "Always know your exact job margins, cash runway, and quarterly tax obligations without chasing receipts. Monthly books close reliably by the 10th business day.",
    recommendedBadge: "Best Tax & Margin Clarity",
    trustBadges: ["Close by 10th Business Day", "Flat Predictable Retainer", "Audit-Ready Workpapers"],
    validDays: 14,
    fastActionDiscount: 150,
    fastActionHours: 72,
    depositPercent: 100,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "Month 1 flat retainer due at kick-off; cancel anytime with 30 days' notice.",
    terms: "Includes encrypted read-only bank/QuickBooks onboarding and year-end CPA handoff package.",
    financingEnabled: false,
    financingMonths: 12,
    financingApr: 0,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Monthly Books & Close",
        subtitle: "Clean GAAP-aligned financials every month",
        price: 750,
        timeline: "Monthly",
        autoCalcPrice: true,
        features: [
          "Bank & credit card reconciliation (up to 3 accounts)",
          "Monthly P&L, Balance Sheet & Cash Flow report pack",
          "CPA-ready trial balance & organized receipt archive"
        ],
        lineItems: [
          { name: "Bank & Card Reconciliation (Up to 3 Accts)", category: "Bookkeeping", qty: 1, unit: "month", unitPrice: 450, note: "Accurate job-cost coding & rule-based categorization" },
          { name: "Monthly P&L, Balance Sheet & Cash Flow", category: "Reporting", qty: 1, unit: "pack", unitPrice: 200, note: "Executive dashboard summary delivered by the 10th" },
          { name: "CPA-Ready Workpapers & Receipt Vault", category: "Compliance", qty: 1, unit: "month", unitPrice: 100, note: "Audit-proof ledger trail for stress-free tax filing" }
        ]
      },
      {
        name: "Growth Controller + Tax",
        subtitle: "Proactive margin reviews & tax savings",
        price: 1650,
        timeline: "Monthly",
        autoCalcPrice: true,
        features: [
          "Everything in Monthly Books & Close",
          "Multi-state sales tax & nexus compliance support",
          "Monthly 45-min margin & cash-flow KPI review call",
          "Quarterly estimated tax & S-Corp optimization plan"
        ],
        lineItems: [
          { name: "Everything in Monthly Books & Close Scope", category: "Books Base", qty: 1, unit: "month", unitPrice: 750, note: "Reconciliations, financial close pack & receipt archive" },
          { name: "Sales Tax & Multi-State Nexus Filing", category: "Tax Compliance", qty: 1, unit: "month", unitPrice: 350, note: "Clean accrual tracking & state filing reconciliation" },
          { name: "Monthly 45-Min KPI Margin Review Call", category: "Advisory", qty: 1, unit: "call", unitPrice: 350, note: "Spot margin leaks, pricing gaps & overdue AR early" },
          { name: "Quarterly Estimated Tax Projection", category: "Tax Plan", qty: 1, unit: "plan", unitPrice: 200, note: "Zero April surprises with safe-harbor tax reserves" }
        ]
      },
      {
        name: "Fractional CFO Partner",
        subtitle: "13-week cash model & board-level strategy",
        price: 3400,
        timeline: "Monthly",
        autoCalcPrice: true,
        features: [
          "Everything in Growth Controller + Tax",
          "Dynamic 13-week rolling cash & hiring forecast",
          "Bi-weekly executive unit-economics strategy calls",
          "Bank credit line & investor board deck financials"
        ],
        lineItems: [
          { name: "Everything in Growth Controller + Tax", category: "Controller Base", qty: 1, unit: "month", unitPrice: 1650, note: "Full close, sales tax, monthly KPI call & tax plan" },
          { name: "13-Week Rolling Cash & Hiring Model", category: "Forecasting", qty: 1, unit: "model", unitPrice: 850, note: "Live hiring capacity, cap-ex & break-even scenario planning" },
          { name: "Bi-Weekly Executive Strategy Reviews", category: "CFO Advisory", qty: 2, unit: "calls", unitPrice: 300, note: "Pricing experiments, vendor terms & capital allocation" },
          { name: "Investor / Lender Board Deck Financials", category: "Board Prep", qty: 1, unit: "pkg", unitPrice: 300, note: "Lender covenants & investor KPI narrative" }
        ]
      }
    ],
    addons: [
      { id: "acct-catchup", title: "Historical Books Cleanup (Per Quarter)", description: "Catch up uncategorized transactions and reconcile past statements.", category: "Cleanup", qty: 1, unit: "quarter", price: 490, selected: false },
      { id: "acct-payroll", title: "Gusto / ADP Payroll Setup & W-2 Sync", description: "Clean employee/contractor onboarding & state unemployment IDs.", category: "Payroll", qty: 1, unit: "setup", price: 350, selected: false },
      { id: "acct-scorp", title: "S-Corp Tax Savings Study & Filing Packet", description: "Reasonable-comp study + Form 2553 filing readiness check.", category: "Tax Strategy", qty: 1, unit: "packet", price: 550, selected: false }
    ]
  },

  legal_consulting: {
    id: "legal_consulting",
    label: "Legal & Contract Advisory",
    category: "Education, Coaching & Advisory",
    icon: "shield",
    businessName: "Harborstone Commercial Counsel",
    businessTagline: "Transparent Flat-Fee Business Law • Fast Redlines",
    businessEmail: "counsel@harborstone.example",
    businessPhone: "(646) 555-0174",
    logoData: "",
    paletteId: "navy-gold",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-951",
    clientName: "Vertex SaaS Studios",
    projectTitle: "Commercial Client Contracts, MSA & IP Protection Suite",
    projectLocation: "Delaware / Nationwide Remote",
    introText: "Predictable flat-fee legal protection without unpredictable six-minute billing increments. Choose single-contract review or turnkey client & IP contract infrastructure.",
    recommendedBadge: "Most Popular for Founders",
    trustBadges: ["Flat-Fee Predictable Billing", "48–72 Hr Turnaround", "Plain-English Risk Memos"],
    validDays: 14,
    fastActionDiscount: 150,
    fastActionHours: 72,
    depositPercent: 50,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "50% engagement retainer upon ESIGN & conflict check; 50% upon final redline delivery.",
    terms: "Formal Attorney-Client Engagement Letter attaches post-conflict screening. Scope covers U.S. commercial law.",
    financingEnabled: false,
    financingMonths: 12,
    financingApr: 0,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Single Contract Redline",
        subtitle: "Rapid risk review on 1 active agreement",
        price: 950,
        timeline: "3–5 Days",
        autoCalcPrice: true,
        features: [
          "Clause-by-clause redline of 1 MSA, SaaS, or Vendor contract",
          "Plain-English liability, IP & indemnity risk memo",
          "30-minute attorney negotiation strategy debrief"
        ],
        lineItems: [
          { name: "Full Clause-by-Clause Agreement Redline", category: "Review", qty: 1, unit: "doc", unitPrice: 650, note: "Tracks liability caps, IP ownership, payment & termination" },
          { name: "Plain-English Risk & Negotiation Memo", category: "Memo", qty: 1, unit: "brief", unitPrice: 200, note: "Fallback clauses ready to paste back to counterparty" },
          { name: "30-Min Attorney Strategy Debrief", category: "Consult", qty: 1, unit: "call", unitPrice: 100, note: "Walkthrough of must-win vs. tradeable deal points" }
        ]
      },
      {
        name: "Startup Contract Vault",
        subtitle: "Turnkey MSA, SOW, NDA & website terms",
        price: 2450,
        timeline: "7–10 Days",
        autoCalcPrice: true,
        features: [
          "Custom Master Services Agreement (MSA), SOW & Mutual NDA",
          "Tailored Privacy Policy, SaaS Terms & ESIGN Consent kit",
          "2 rounds of revisions + team deal-desk walkthrough"
        ],
        lineItems: [
          { name: "Custom Client MSA, SOW & NDA Suite", category: "Contract Suite", qty: 3, unit: "docs", unitPrice: 550, note: "Protects IP, milestone payments, scope creep & late fees" },
          { name: "Privacy Policy, Terms & ESIGN Consent Clauses", category: "Compliance", qty: 1, unit: "pkg", unitPrice: 450, note: "CCPA/GDPR disclosures & electronic acceptance clauses" },
          { name: "2 Revision Rounds + Deal-Desk Walkthrough", category: "Advisory", qty: 1, unit: "pkg", unitPrice: 350, note: "Tailored playbook so your sales team closes faster" }
        ]
      },
      {
        name: "Fractional Outside Counsel",
        subtitle: "30-day deal desk + contractor/IP protection",
        price: 4800,
        timeline: "30 Days",
        autoCalcPrice: true,
        features: [
          "Everything in Startup Contract Vault",
          "30 days unlimited counterparty redlines & deal support",
          "Contractor + Employee PIIA / IP assignment agreements",
          "24-hour priority Slack/email turnaround SLA"
        ],
        lineItems: [
          { name: "Everything in Startup Contract Vault Scope", category: "Vault Base", qty: 1, unit: "pkg", unitPrice: 2450, note: "Complete custom MSA, SOW, NDA, privacy & ESIGN templates" },
          { name: "Unlimited Deal-Desk Redlines (30 Days)", category: "Deal Desk", qty: 1, unit: "month", unitPrice: 1400, note: "Direct redline turnaround on active customer procurement" },
          { name: "Contractor & Employee IP Assignment Kit", category: "HR & IP", qty: 1, unit: "kit", unitPrice: 650, note: "Secures clean chain-of-title on all code & creative assets" },
          { name: "24-Hr Priority Counsel Response SLA", category: "Priority", qty: 1, unit: "month", unitPrice: 300, note: "Same-day/next-day urgency for closing revenue deals" }
        ]
      }
    ],
    addons: [
      { id: "legal-tm", title: "USPTO Trademark Clearance & Filing", description: "Comprehensive brand knock-out search + federal TEAS application prep.", category: "Brand IP", qty: 1, unit: "mark", price: 790, selected: false },
      { id: "legal-entity", title: "LLC Operating Agreement / Cap-Table Audit", description: "Review founder vesting, buyout & governance protections.", category: "Corporate", qty: 1, unit: "audit", price: 650, selected: false },
      { id: "legal-rush", title: "24-Hour Express Turnaround Upgrade", description: "Priority overnight redline turnaround for urgent deal closings.", category: "Express", qty: 1, unit: "doc", price: 350, selected: false }
    ]
  },

  events: {
    id: "events",
    label: "Event Planning & AV",
    category: "Creative, Real Estate & Events",
    icon: "sparkles",
    businessName: "Marquee Event Production & AV",
    businessTagline: "Seamless Run-of-Show • Concert-Grade Sound & Lighting",
    businessEmail: "events@marqueeav.example",
    businessPhone: "(615) 555-0169",
    logoData: "",
    paletteId: "obsidian-luxe",
    customBrandColor: "",
    currency: "USD",
    taxRate: 0,
    taxLabel: "Sales Tax",
    quoteNumber: "Q-2026-980",
    clientName: "Midtown Tech Summit / Clara Chen",
    projectTitle: "Annual Leadership Summit Coordination, Staging & AV Production",
    projectLocation: "The Peabody Ballroom (220 Guests)",
    introText: "Whether you just need a battle-tested Day-Of Coordinator to run vendors smoothly or turnkey multi-screen AV + ambient lighting for a packed room, pick the production level that fits your event.",
    recommendedBadge: "Full AV + Peace of Mind",
    trustBadges: ["Dedicated On-Site Producer", "Redundant Backup Audio", "Zero Overtime Surprises"],
    validDays: 14,
    fastActionDiscount: 250,
    fastActionHours: 72,
    depositPercent: 30,
    paymentProvider: "stripe",
    paymentLink: "",
    paymentNote: "30% date-hold retainer upon ESIGN approval; 70% balance 7 days prior to load-in.",
    terms: "Locks venue dates, backup audio/power redundancy, and full breakdown after final guest departure.",
    financingEnabled: true,
    financingMonths: 12,
    financingApr: 9.99,
    financingUrl: "",
    singleTierMode: false,
    recommendedTierIndex: 1,
    tiers: [
      {
        name: "Day-Of Coordination",
        subtitle: "Flawless vendor timing & run-of-show",
        price: 1950,
        timeline: "Event Week",
        autoCalcPrice: true,
        features: [
          "Pre-event venue walkthrough & vendor cue confirmation",
          "Minute-by-minute master Run of Show & floorplan",
          "10 hrs on-site Lead Producer + 1 Operations Assistant"
        ],
        lineItems: [
          { name: "Venue Walkthrough & Vendor Confirmation", category: "Pre-Event", qty: 1, unit: "audit", unitPrice: 450, note: "Loading dock access, power drops & catering coordination" },
          { name: "Master Run of Show & Scaled Floorplan", category: "Planning", qty: 1, unit: "plan", unitPrice: 400, note: "Shared cue sheet distributed across every vendor" },
          { name: "10 Hrs Lead Producer + Assistant On-Site", category: "Event Day", qty: 1, unit: "event", unitPrice: 1100, note: "Setup oversight, speaker wrangling & smooth strike" }
        ]
      },
      {
        name: "Full Production + Sound & Light",
        subtitle: "Complete PA, wireless mics & LED wash",
        price: 4250,
        timeline: "4–6 Weeks",
        autoCalcPrice: true,
        features: [
          "Everything in Day-Of Coordination",
          "Pro PA sound array, 4 wireless mics & live AV tech",
          "16-fixture custom brand LED room uplighting + stage wash",
          "Vendor sourcing review & full rehearsal direction"
        ],
        lineItems: [
          { name: "Everything in Day-Of Coordination Scope", category: "Coordination", qty: 1, unit: "pkg", unitPrice: 1950, note: "Walkthrough, master cue sheet & 2-person event staff" },
          { name: "PA Array, 4 Wireless Mics & Dedicated AV Tech", category: "Audio & Mic", qty: 1, unit: "rig", unitPrice: 1150, note: "Zero feedback, lapel + handheld mics & walk-on music" },
          { name: "Stage Wash + 16 Wireless LED Uplights", category: "Lighting", qty: 1, unit: "pkg", unitPrice: 750, note: "Crisp speaker key lighting & custom room color atmosphere" },
          { name: "Vendor Management & Rehearsal Direction", category: "Management", qty: 1, unit: "pkg", unitPrice: 400, note: "AV tech check + speaker mic rehearsal prior to doors" }
        ]
      },
      {
        name: "VIP Gala / Conference Experience",
        subtitle: "Dual LED screens + multi-cam livestream",
        price: 7900,
        timeline: "8–12 Weeks",
        autoCalcPrice: true,
        features: [
          "Everything in Full Production + Sound & Light",
          "Dual 120\" HD projection / LED screens + confidence monitor",
          "2-camera livestream broadcast + 90-sec highlight reel",
          "VIP speaker greenroom concierge & custom signage suite"
        ],
        lineItems: [
          { name: "Everything in Full Production + Sound & Light", category: "Production Base", qty: 1, unit: "pkg", unitPrice: 4250, note: "Day-of team, concert PA, wireless mics & uplighting" },
          { name: "Dual 120\" HD Screens + Confidence Monitor", category: "Visual Display", qty: 1, unit: "pkg", unitPrice: 1650, note: "Seamless slide switcher & presenter countdown timer" },
          { name: "Multi-Cam Livestream + Highlight Sizzle Edit", category: "Livestream", qty: 1, unit: "shoot", unitPrice: 1350, note: "1080p stream + edited social recap within 72 hours" },
          { name: "VIP Greenroom Concierge & Custom Signage", category: "Hospitality", qty: 1, unit: "pkg", unitPrice: 650, note: "Branded step-and-repeat check-in & VIP speaker hospitality" }
        ]
      }
    ],
    addons: [
      { id: "evt-photo", title: "360° Glam Photo Booth + Instant SMS Sharing", description: "Attendant-staffed booth with custom branded frame overlay.", category: "Guest Fun", qty: 1, unit: "setup", price: 690, selected: false },
      { id: "evt-decor", title: "Custom Stage Backdrop & Acrylic Signage", description: "Branded 8x10 matte stage backdrop + directional easel signs.", category: "Scenic", qty: 1, unit: "set", price: 540, selected: false },
      { id: "evt-staff", title: "Additional Event Operations Coordinator (8 Hrs)", description: "Dedicated check-in & VIP seating liaison for 150+ guest events.", category: "Staffing", qty: 1, unit: "staff", price: 420, selected: false }
    ]
  }
};

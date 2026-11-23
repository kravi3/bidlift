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
  ]
};

window.BIDLIFT_TEMPLATES = {
  contractor: {
    id: "contractor",
    label: "Home Remodel",
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
  }
};

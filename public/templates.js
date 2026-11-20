/**
 * BidLift Curated Industry Templates & Brand Palettes
 * Designed to maximize Average Order Value (AOV) via Good / Better / Best anchoring + interactive upsells.
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
    introText: "Thank you for inviting us to walk your home. Below are three fixed-price options tailored for long-lasting prep, zero mess, and showroom-smooth trim finishes.",
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
        features: [
          "Floor & furniture masking protection",
          "Minor drywall nail-pop patching",
          "2 coats Sherwin-Williams SuperPaint on walls",
          "Standard flat ceiling touch-ups",
          "Final walkthrough & cleanup"
        ]
      },
      {
        name: "Signature",
        subtitle: "Walls, ceilings & crisp millwork",
        price: 3850,
        timeline: "4 Days",
        features: [
          "Everything in Essential package",
          "Upgrade to Emerald scrubbable matte finish",
          "Full ceiling repaint across main level",
          "Doors, casings & baseboards sanded & enameled",
          "3-year priority touch-up warranty"
        ]
      },
      {
        name: "Concierge Turnkey",
        subtitle: "Zero-dust designer transformation",
        price: 5400,
        timeline: "5 Days",
        features: [
          "Everything in Signature package",
          "Level-4 drywall skim & caulk gap sealing",
          "HEPA Festool dustless sanding prep",
          "Dedicated color designer consultation (3 samples)",
          "5-year bumper-to-bumper finish guarantee"
        ]
      }
    ],
    addons: [
      {
        id: "cab-refinish",
        title: "Kitchen Island Cabinet Refinishing",
        description: "Factory-smooth HVLP sprayed urethane finish in your choice of tone.",
        price: 650,
        selected: false
      },
      {
        id: "rush-5day",
        title: "Priority 5-Day Start Guarantee",
        description: "Dedicated weekend crew allocation to finish before your event.",
        price: 350,
        selected: false
      },
      {
        id: "trim-upgrade",
        title: "Modern Craftsman Baseboard Upgrade",
        description: "Supply & install 5.5-inch primed MDF baseboards in living & dining.",
        price: 480,
        selected: false
      },
      {
        id: "touchup-plan",
        title: "3-Year Annual Touch-Up Protection",
        description: "Once-a-year 2-hour pro crew visit to fix scuffs, dings & trim marks.",
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
    introText: "First impressions drive competing offers. Choose the presentation tier below that fits your launch timeline, plus optional drone and twilight upgrades.",
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
        features: [
          "35 HDR architectural interior & exterior photos",
          "2D schematic floor plan with room dimensions",
          "Light virtual decluttering on 3 photos",
          "NWMLS Rule 14 unbranded media delivery",
          "Blue-sky exterior enhancement"
        ]
      },
      {
        name: "Signature Luxury",
        subtitle: "Editorial staging + cinematic tour",
        price: 2650,
        timeline: "36 Hr Delivery",
        features: [
          "Everything in Essential package",
          "Key-room luxury furniture & decor staging (Living, Dining, Primary)",
          "55 HDR magazine-grade photos + detail vignettes",
          "90-second stabilized 4K walkthrough film",
          "Branded + unbranded dual tour links"
        ]
      },
      {
        name: "Premier Concierge",
        subtitle: "Full-estate showcase & buyer funnel",
        price: 4200,
        timeline: "24 Hr Express",
        features: [
          "Everything in Signature Luxury package",
          "Full-home curated designer staging (up to 4,000 sq ft)",
          "Narrated luxury listing film + YouTube Shorts cut",
          "Custom print-ready 8-page brochure & QR flyers",
          "Targeted neighborhood launch teaser kit"
        ]
      }
    ],
    addons: [
      {
        id: "drone-twilight",
        title: "Aerial 4K Drone + Golden-Hour Twilight",
        description: "FAA Part 107 aerial acreage stills/video plus glowing dusk exteriors.",
        price: 450,
        selected: false
      },
      {
        id: "3d-walkthrough",
        title: "Interactive 3D Virtual Walkthrough",
        description: "Full dollhouse & room-to-room digital twin for out-of-state buyers.",
        price: 375,
        selected: false
      },
      {
        id: "prop-website",
        title: "Custom Property Site & 3 Social Reels",
        description: "Single-property showcase landing page + vertical Instagram/TikTok edits.",
        price: 325,
        selected: false
      },
      {
        id: "rush-24hr",
        title: "Next-Morning 24-Hr Priority Turnaround",
        description: "Receive full edited gallery by 9:00 AM the morning after shoot.",
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
    introText: "Our goal is simple: turn local searchers into booked appointments. Select the launch scope that aligns with your Q1 patient growth goals.",
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
        features: [
          "Up to 5 custom mobile-responsive pages",
          "Click-to-call & lead capture contact forms",
          "Core Web Vitals speed & SSL setup",
          "On-page meta titles & XML sitemap",
          "1 round of visual revisions"
        ]
      },
      {
        name: "Growth Engine",
        subtitle: "Designed to rank & book appointments",
        price: 3400,
        timeline: "14 Days",
        features: [
          "Everything in Starter Site",
          "Up to 10 high-intent service & city landing pages",
          "Local Schema markup + Google Analytics 4 conversion tracking",
          "Interactive instant quote / booking flow integration",
          "2 rounds of revisions + team training loom videos"
        ]
      },
      {
        name: "Full Revenue Funnel",
        subtitle: "Market leader brand & automation suite",
        price: 5900,
        timeline: "21 Days",
        features: [
          "Everything in Growth Engine",
          "Custom interactive ROI / estimator calculator",
          "Automated SMS/email missed-lead follow-up sequence",
          "Competitor SEO gap teardown & 4 pillar blog guides",
          "90-day priority optimization sprints"
        ]
      }
    ],
    addons: [
      {
        id: "conv-copy",
        title: "Direct-Response Conversion Copywriting",
        description: "Complete interview-based sales copy written for every core page.",
        price: 600,
        selected: false
      },
      {
        id: "gbp-turbo",
        title: "Google Business Profile 3-Pack Turbo",
        description: "Category audit, geo-tagged media optimization & 30 top citations.",
        price: 450,
        selected: false
      },
      {
        id: "care-hosting",
        title: "First-Month VIP Care, Backups & Hosting",
        description: "Managed CDN hosting, uptime alerts, daily backups & text edits.",
        price: 195,
        selected: false
      },
      {
        id: "booking-widget",
        title: "Automated Calendar & Deposit Checkout",
        description: "Let prospects pick a slot and pay consultation fees directly online.",
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
    introText: "Designed for four-season color and low weekend maintenance. Pick your planting depth below and optionally add brass architectural lighting.",
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
        features: [
          "Full bed weeding & invasive root pull",
          "Ornamental shrub shaping & deadwooding",
          "Hand-cut natural spade bed edging",
          "3 yards dark hemlock bark mulch install",
          "Green-waste haul-away"
        ]
      },
      {
        name: "Complete Makeover",
        subtitle: "Layered color, texture & stone",
        price: 1950,
        timeline: "2 Days",
        features: [
          "Everything in Seasonal Refresh",
          "18 nursery-grade 3–5 gal four-season plants",
          "Soil amendment with organic compost blend",
          "Weed-barrier fabric in gravel walkways",
          "1-year plant health guarantee"
        ]
      },
      {
        name: "Resort Backyard",
        subtitle: "Paver patio accents & focal trees",
        price: 3600,
        timeline: "4 Days",
        features: [
          "Everything in Complete Makeover",
          "3 mature specimen Japanese Maples or Evergreens",
          "Natural basalt boulder accent grouping",
          "Flagstone stepping path across side yard",
          "2-year priority seasonal checkups"
        ]
      }
    ],
    addons: [
      {
        id: "low-volt-lights",
        title: "Architectural Low-Voltage LED Lighting (8 Fixtures)",
        description: "Warm 2700K brass uplights + automatic dusk-to-dawn transformer.",
        price: 540,
        selected: false
      },
      {
        id: "drip-irrigation",
        title: "Smart Water-Saving Drip Irrigation Zone",
        description: "Targeted root emitters + Wi-Fi weather-aware timer setup.",
        price: 420,
        selected: false
      },
      {
        id: "biweekly-plan",
        title: "First Month Bi-Weekly Precision Maintenance",
        description: "Mowing, blowing, crisp edging & fertilizer care.",
        price: 180,
        selected: false
      },
      {
        id: "steel-edging",
        title: "Powder-Coated Steel Border Edging",
        description: "Permanent clean separation between turf and flower beds.",
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
    introText: "All cleaning technicians arrive with hospital-grade supplies and our 50-point inspection checklist so your home feels brand new on move-in day.",
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
        features: [
          "All kitchens, baths, bedrooms & living rooms",
          "HEPA vacuuming & streak-free floor mopping",
          "Countertop, sink & exterior appliance sanitize",
          "Mirror & chrome fixture polish",
          "Trash removal & fresh liner replacement"
        ]
      },
      {
        name: "Deep Reset",
        subtitle: "Hand-scrubbed buildup removal",
        price: 420,
        timeline: "5 Hours",
        features: [
          "Everything in Standard Shine",
          "Hand-wiped baseboards, door frames & light switches",
          "Tile grout & glass shower hard-water descaling",
          "Ceiling fans, vents & window sill detailing",
          "Cabinet exterior degrease & polish"
        ]
      },
      {
        name: "White-Glove Move-In",
        subtitle: "Hotel-grade sterilization top to bottom",
        price: 680,
        timeline: "Full Day Team",
        features: [
          "Everything in Deep Reset",
          "Inside ALL kitchen & bathroom cabinets/drawers",
          "Closet shelving, pantry & laundry room detail",
          "Garage sweep & entryway cobweb clearing",
          "Final inspection walk-through with team lead"
        ]
      }
    ],
    addons: [
      {
        id: "oven-fridge",
        title: "Inside Oven & Refrigerator Deep Clean",
        description: "Racks soaked, degreased & interior shelves sanitized.",
        price: 75,
        selected: false
      },
      {
        id: "interior-windows",
        title: "Interior Windows, Glass Doors & Tracks",
        description: "Crystal-clear glass plus vacuumed & scrubbed sliding tracks.",
        price: 95,
        selected: false
      },
      {
        id: "eco-botanical",
        title: "100% Fragrance-Free Botanical Upgrade",
        description: "Baby- & pet-safe plant-derived hospital-grade disinfectants.",
        price: 45,
        selected: false
      },
      {
        id: "carpet-steam",
        title: "Hot-Water Carpet Steam Extraction (3 Rooms)",
        description: "Lift embedded allergens, pet dander & high-traffic spots.",
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
        features: [
          "3-hour on-location shoot with lead photographer",
          "30 color-graded high-res retouched photos",
          "Web + print optimized aspect exports",
          "Online client proofing gallery",
          "Full commercial marketing license"
        ]
      },
      {
        name: "Full Brand Library",
        subtitle: "Signature photos + flagship brand film",
        price: 1850,
        timeline: "7 Days",
        features: [
          "Full 6-hour production day + lighting kit",
          "60 curated lifestyle & product stills",
          "60-second 4K cinema brand story video",
          "Licensed soundtrack + custom color LUT grade",
          "2 rounds of edit revisions included"
        ]
      },
      {
        name: "Cinema Campaign",
        subtitle: "Multi-channel launch powerhouse",
        price: 3200,
        timeline: "10 Days",
        features: [
          "Everything in Full Brand Library",
          "2-person crew (Director/DP + Gaffer/Audio)",
          "90-second hero film + 2 founder interview cutdowns",
          "100 retouched brand stills + behind-the-scenes set",
          "Paid-ad hook variations (3 opening 3-sec hooks)"
        ]
      }
    ],
    addons: [
      {
        id: "vertical-reels",
        title: "6 Vertical 9:16 Reels / TikTok Ad Edits",
        description: "Fast-paced hook-driven cuts with animated captions included.",
        price: 450,
        selected: false
      },
      {
        id: "raw-archive",
        title: "Full Raw Footage & DNG Archive Drive",
        description: "Complete unedited camera originals delivered via cloud vault.",
        price: 350,
        selected: false
      },
      {
        id: "express-48",
        title: "Express 48-Hour Master Delivery",
        description: "Skip the standard editing queue for immediate campaign launch.",
        price: 275,
        selected: false
      },
      {
        id: "styling-coord",
        title: "On-Set Prop Styling & Wardrobe Prep",
        description: "Dedicated stylist ensuring every frame matches your brand kit.",
        price: 300,
        selected: false
      }
    ]
  }
};

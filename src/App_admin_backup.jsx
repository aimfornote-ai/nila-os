// ============================================================
// NILA™ HERITAGE LIVING — DESIGN OPERATING SYSTEM  v3.2
// Emerald + Antique Gold Edition · Siamese Botanica
// Pre-Launch Edition — Siamese Botanica Design Division
// All company names in CRM are fictional placeholders only.
// Legal entity registration and IP registration are PENDING.
// ============================================================

import React, { useState, useMemo, useRef, useEffect, useCallback, useImperativeHandle } from "react";


// ────────────────────────────────────────────────────────────
// TOKENS
// ────────────────────────────────────────────────────────────
const T = {
  // ── Primary palette — NILA Heritage Living (Emerald + Antique Gold)
  indigo:  "#0F4D3A",   // Emerald Green — replaces Indigo as primary
  indigoD: "#0A3528",   // Deep Emerald — dark bg (sidebar)
  indigoL: "#1A6B52",   // Mid Emerald — hover, active states
  gold:    "#C7A24D",   // Antique Gold — primary accent
  goldL:   "#D4B56A",   // Light Antique Gold
  ivory:   "#F7F4ED",   // Warm Ivory — ground/cream
  ground:  "#F0EDE4",   // Warm Ground — page background
  white:   "#FFFFFF",
  lotus:   "#B85A72",   // Lotus Rose — kept for warmth
  jade:    "#2E7D67",   // Jade — kept for success states
  crimson: "#9B2C2C",   // Crimson — kept for alerts
  ink:     "#1A1A18",   // Deep Ink — near black
  mist:    "#7A8C7E",   // Forest Mist — subdued text
  border:  "#D9D4C8",   // Warm Border
  borderL: "#EDE9E0",   // Light Warm Border
  amber:   "#C17B2A",   // Warm Amber
  emerald: "#0F4D3A",   // alias
  emeraldL:"#1A6B52",   // alias
  xs:11, sm:12, base:13, md:14, lg:16, xl:20, xxl:26, hero:34,
  radius:8, radiusL:12, radiusXL:16,
};

// ────────────────────────────────────────────────────────────
// DATA: MOTIFS
// ────────────────────────────────────────────────────────────
const MOTIFS = [
  {
    code:"NIL-KNK", name:"Kanok", thai:"กนก", tier:"Core",
    era:"Associated with Thai classical ornament",
    form:"Flame scroll / curvilinear tendril",
    meaning:"Growth, vitality, divine energy, timeless beauty — the foundational vocabulary of Thai ornamental art.",
    surfaces:"Border repeat, allover field, medallion, wallpaper, textile, packaging",
    keywords:"Thai flame scroll, Kanok motif, curvilinear tendril, classical ornament, antique gold, heritage luxury",
    do:"Use in refined textile repeat, wallpaper border, medallion layouts, and heritage packaging. Pair with emerald, antique gold, and ivory palettes.",
    dont:"Avoid cartoonish tourist-souvenir styling or generic 'Asian-inspired' shortcuts.",
  },
  {
    code:"NIL-LKG", name:"Luk Gaew", thai:"ลูกแก้ว", tier:"Core",
    era:"Inspired by Sukhothai-era decorative language",
    form:"Sacred jewel sphere / radiating gem motif",
    meaning:"Purity, spiritual aspiration, inner light, clarity of purpose.",
    surfaces:"Medallion centerpiece, scarf focal, wallpaper drop repeat, packaging seal",
    keywords:"Thai sacred jewel, Luk Gaew sphere, radiating gem, ornamental halo, warm ivory, antique gold linework",
    do:"Use as a refined medallion, seal, or focal motif. Pair with antique gold, ivory, and deep emerald palettes.",
    dont:"Do not depict sacred Buddhist objects. Avoid inappropriate surfaces or tourist-souvenir aesthetics.",
  },
  {
    code:"NIL-MNG", name:"Naga Scale", thai:"เกล็ดนาค", tier:"Core",
    era:"Linked to traditional Thai architectural and decorative arts",
    form:"Serpent scale / interlocking geometric repeat",
    meaning:"Protection, guardianship, sacred boundary, architectural strength.",
    surfaces:"Wall tile, architectural panel, wallcovering, fashion repeat, hospitality FF&E",
    keywords:"Naga serpent scale, Thai geometric repeat, interlocking pattern, architectural luxury, deep teal, heritage stone",
    do:"Use in architectural, tile, and wallcovering applications. Pair with stone, teal, and antique gold palettes.",
    dont:"Avoid sacred serpent deity depictions in commercial contexts. Keep geometric — not figurative.",
  },
  {
    code:"NIL-DKM", name:"Dok Mali", thai:"ดอกมะลิ", tier:"Core",
    era:"Commonly found in Thai temple and textile ornament",
    form:"Jasmine blossom / flowing botanical repeat",
    meaning:"Maternal devotion, purity, gentle elegance, spiritual offering.",
    surfaces:"Stationery, spa linen, packaging, textile border, gifting",
    keywords:"Thai jasmine blossom, Dok Mali botanical, flowing repeat, soft ivory, wellness luxury, botanical heritage",
    do:"Use in wellness, spa, gifting, and stationery contexts. Pair with soft lotus pink, ivory, and champagne gold.",
    dont:"Avoid overscaling or heavy distortion — keep the floral form refined and recognisable.",
  },
  {
    code:"NIL-HNT", name:"Hong Tail", thai:"หางหงส์", tier:"Extended",
    era:"Contemporary interpretation of Thai heritage form",
    form:"Flowing swan-tail scroll / elegant feather tendril",
    meaning:"Grace, nobility, fluid movement, refined beauty.",
    surfaces:"Textile repeat, wallcovering, spa linen, scarf border",
    keywords:"Thai swan tail, Hong feather, flowing scroll, Ayutthaya-inspired, luxury textile, fluid botanical repeat",
    do:"Use in flowing repeat textile and wallcovering. Pairs beautifully with soft golds and emerald palettes.",
    dont:"Avoid rigid geometric settings — this motif thrives in organic, flowing layouts.",
  },
  {
    code:"NIL-PKB", name:"Phum Khaobin", thai:"พุ่มข้าวบิณฑ์", tier:"Core",
    era:"Contemporary interpretation of Thai heritage form",
    form:"Symmetrical floral bouquet / sacred offering arrangement",
    meaning:"Abundance, gratitude, spiritual devotion, harmonious balance.",
    surfaces:"Packaging, stationery, wallcovering, gifting, textile border",
    keywords:"Thai rice bouquet, Phum Khaobin botanical, symmetrical floral, sacred offering, luxury packaging, heritage gifting",
    do:"Use in premium packaging, gifting, and stationery. Elegant as a repeat or standalone medallion.",
    dont:"Keep the arrangement symmetrical and refined — avoid loose or cartoon-like interpretations.",
  },
  {
    code:"NIL-BUA", name:"Lotus Bud", thai:"บัว", tier:"Core",
    era:"Commonly found in Thai temple and textile ornament",
    form:"Closed lotus bud / rising from water geometry",
    meaning:"Spiritual awakening, purity, resilience, new beginnings.",
    surfaces:"Allover repeat, spa linen, bedding, wallpaper, packaging",
    keywords:"Thai lotus bud, Bua motif, rising lotus, purity, spa luxury, botanical repeat, warm ivory",
    do:"Use across spa, wellness, bedding, and packaging. Versatile as allover field or medallion.",
    dont:"Do not depict sacred Buddhist lotus offerings in commercial product patterns. Keep botanical — not ritual.",
  },
  {
    code:"NIL-HSW", name:"Hong Swan", thai:"หงส์", tier:"Extended",
    era:"Linked to traditional Thai architectural and decorative arts",
    form:"Sacred swan / elegant bird silhouette in ornamental setting",
    meaning:"Nobility, divine grace, cultural refinement, auspicious beauty.",
    surfaces:"Wallcovering, textile medallion, hotel decor, fashion border",
    keywords:"Thai Hong swan, sacred bird, ornamental silhouette, heritage luxury, antique gold, ivory background",
    do:"Use as a focal or medallion motif in wallcovering and premium textile. Pair with antique gold and ivory.",
    dont:"Avoid figurative depictions that feel costume-like. Keep elegant and ornamental, not illustrative.",
  },
  {
    code:"NIL-RAC", name:"Racha", thai:"ราชา", tier:"Extended",
    era:"Inspired by Thai classical ornament",
    form:"Royal crown-inspired ornamental flourish",
    meaning:"Authority, refinement, excellence, regal presence.",
    surfaces:"Packaging crown detail, textile border, wallpaper header motif, premium gifting",
    keywords:"Thai royal ornament, Racha flourish, crown-inspired detail, heritage luxury, antique gold, refined linework",
    do:"Use as a decorative flourish or border detail. Elegant in packaging headers and textile edges.",
    dont:"Do not use as a direct depiction of Thai royal regalia. Keep as an ornamental flourish only.",
  },
  {
    code:"NIL-AUR", name:"Auspicious Radiance", thai:"รัศมีมงคล", tier:"Signature",
    era:"Contemporary NILA signature motif",
    form:"Ornamental halo / lotus geometry / gemstone-centered symmetry",
    meaning:"Protection, blessing, prosperity, inner light, quiet power.",
    surfaces:"Packaging seal, scarf medallion, wallpaper focal point, gift box, textile border, brand detail",
    keywords:"auspicious radiance, Thai ornamental halo, lotus geometry, gemstone center, antique gold linework, warm ivory background, refined Thai heritage luxury",
    do:"Use as a refined medallion, seal, or focal motif. Pair with antique gold, ivory, black gem, emerald, or champagne palettes.",
    dont:"Do not depict Buddha images, monk imagery, amulets, or sacred ritual objects. Do not use on disrespectful surfaces.",
  },
  {
    code:"NIL-GEM", name:"Nila Gem", thai:"อัญมณีนิล", tier:"Signature",
    era:"Contemporary NILA signature motif",
    form:"Black gemstone geometry / Thai ornamental framing",
    meaning:"Inner strength, elegance, clarity, hidden value.",
    surfaces:"Brand mark detail, packaging seal, scarf medallion, wallpaper focal motif",
    keywords:"black gemstone, Thai ornamental frame, refined luxury, hidden gem, warm antique gold, contemporary Thai heritage",
    do:"Use as a brand signature motif, packaging seal, or scarf medallion. Pairs beautifully with antique gold and ivory.",
    dont:"Avoid overuse — this is a signature motif, best used sparingly as a focal or seal element.",
  },
  {
    code:"NIL-NMK", name:"Nila Monogram Kanok", thai:"นิลากนกโมโนแกรม", tier:"Signature",
    era:"Contemporary NILA signature motif",
    form:"N monogram structure with Kanok-inspired flowing rhythm",
    meaning:"Brand identity, continuity, Thai craft language, cultural refinement.",
    surfaces:"Monogram repeat, jacquard textile, lining pattern, packaging tissue, ribbon, label",
    keywords:"N monogram, Thai Kanok rhythm, luxury repeat, subtle brand signature, tone-on-tone textile",
    do:"Use as a subtle tone-on-tone lining repeat, jacquard textile, or brand packaging tissue. Elegant and understated.",
    dont:"Avoid heavy contrast — this motif works best in tone-on-tone or refined gold-on-black applications.",
  },
  {
    code:"NIL-BGL", name:"Black Gem Lotus", thai:"บัวนิล", tier:"Signature",
    era:"Contemporary NILA signature motif",
    form:"Dark gem center lotus / NILA house motif",
    meaning:"Awakening, purity, resilience, quiet power.",
    surfaces:"Wallpaper medallion, silk scarf centerpiece, bedding motif, premium gift box, brand pattern",
    keywords:"black lotus gem, Thai lotus geometry, warm ivory background, antique gold linework, refined heritage luxury",
    do:"Use as a bold medallion or scarf centerpiece. Dramatic in black + antique gold on ivory.",
    dont:"Do not depict sacred Buddhist lotus offerings. Keep as a contemporary design motif — elegant and refined.",
  },
];

// ────────────────────────────────────────────────────────────
// DATA: LICENCE TIERS
// ────────────────────────────────────────────────────────────
const LICENSE_TIERS = [
  { code:"NILA-POD", tier:"POD License", color:T.jade, priceUSD:[30,120], priceTHB:[1100,4300],
    desc:"For individual sellers on print-on-demand platforms. Single design, single account, non-exclusive. No physical production rights.",
    rights:["1 design per licence","1 POD seller account","Non-exclusive","Digital fulfilment only","No sub-licensing","No white-label use"],
    ideal:"Spoonflower, Society6, Redbubble individual sellers — external platform references only, no affiliation implied", notFor:"Commercial brand production, hospitality procurement" },
  { code:"NILA-COM", tier:"Commercial Licence", color:T.goldL, priceUSD:[400,1800], priceTHB:[14000,65000],
    desc:"For small brands producing physical goods. Covers runs up to 2,000 units. Non-exclusive. Vector source file included.",
    rights:["1 design + up to 2 colorways","Up to 2,000 unit production","Non-exclusive","Single product category","Brand attribution in colophon","Vector + raster masters delivered"],
    ideal:"Independent homeware, boutique F&B, small wellness brands", notFor:"Retail chains, hospitality procurement, resale of design files" },
  { code:"NILA-BRD", tier:"Brand Collection Licence", color:T.indigoL, priceUSD:[2500,9000], priceTHB:[90000,320000],
    desc:"Season collection licensing for established surface design brands. Regional exclusivity window. Unlimited production. Multiple product categories.",
    rights:["Full collection: 6–10 designs","Unlimited production volume","6-month regional exclusivity","Up to 3 product categories","Optional co-branding credit","All formats: SVG, EPS, TIFF 300 dpi","2 rounds of art direction"],
    ideal:"Established wallcovering, textile, tile, and homewares brands", notFor:"White-label resale, sub-licensing to third parties" },
  { code:"NILA-EXC", tier:"Exclusive Commission", color:T.crimson, priceUSD:[8000,40000], priceTHB:[285000,1400000],
    desc:"Bespoke development with full territorial exclusivity. NILA removes the design from all public catalogues for the licence term. Default governing law: Singapore International Arbitration Centre (SIAC) for international contracts.",
    rights:["Bespoke custom design development","Full territorial exclusivity","12–36 month exclusivity term","Unlimited product categories","Complete licensed artwork package delivered","Quarterly strategic consultation"],
    ideal:"Luxury hotel groups, national tourism bodies, major homewares labels", notFor:"Nothing — this covers all commercial uses within agreed territory" },
];

// ────────────────────────────────────────────────────────────
// DATA: PROMPT VOCABULARY
// ────────────────────────────────────────────────────────────
const PROMPT_VOCAB = {
  styleModifiers:["Intricate and symmetrical","Refined and restrained","Maximalist sacred geometry","Deconstructed and minimal","Architectural and precise","Botanical and fluid","Ceremonial and monumental","Gossamer and delicate"],
  structures:["seamless allover repeat","half-drop repeat","mirror-tile repeat","ogee repeat","border stripe","medallion centrepiece","scattered spot motif","tossed print with directional flow","engineered panel"],
  colorways:[
    { name:"Midnight Siam — Black + Gold + Emerald", value:"Nila Black #0D0D0F base, antique gold #DAAF37 motif, deep emerald #0F3D2E accent, ivory silk #F6F3E8 highlight — flagship palette" },
    { name:"Midnight Siam — Emerald Classic",        value:"deep emerald #0F4D3A and antique gold #C7A24D on warm ivory #F7F4ED — lighter colourway" },
    { name:"Midnight Siam — Gold on Black",          value:"antique gold #DAAF37 motif on pure Nila Black #0D0D0F — most dramatic colourway" },
    { name:"Lotus Blush + Ivory",                    value:"dusty lotus #B85A72 and antique gold on warm ivory — feminine botanical" },
    { name:"Deep Jade + Botanical Ivory",            value:"deep jade #2E7D67 and linen ivory on soft warm white — nature-led" },
    { name:"Monochrome Emerald",                     value:"single emerald #0F4D3A in varying tones on linen ivory ground" },
  ],
  surfaces:["luxury wallcovering","upholstery fabric","fine woven textile","glazed ceramic wall tile","porcelain floor tile","luxury silk scarf","cushion and throw fabric","premium gift wrap paper","rigid luxury packaging box","spa linen and towelling","premium notebook cover","fine stationery set","canvas tote bag","fashion accessory fabric"],
  moods:["warm heritage luxury, liveable and beautiful","botanical grandeur — lush, layered, organic","meditative nature — Thai forest and water calm","contemporary boutique hotel — emerald, gold, warm ivory palette","editorial lifestyle — scarf, cushion, luxury home","artisanal craft heritage — handmade warmth","refined tropical — luxury resort, spa, wellness","botanical scientific illustration — precise, elegant, natural"],
  negatives:["tourist souvenir aesthetic","clip art","flat cartoon","low resolution","generic 'Asian-inspired'","fluorescent palette","photographic elements","text overlays","Western floral substitutions","oversaturated colours","watermark","3D render look"],
};

// ────────────────────────────────────────────────────────────
// DATA: PRE-LAUNCH LEGAL CHECKLIST
// ────────────────────────────────────────────────────────────
const LEGAL = [
  { id:"L01", cat:"Entity & Trading Name", priority:"Critical", item:"Choose legal entity type (Sole proprietor / Thai limited company)", action:"Research BOJ registration vs DBD incorporation — consult accountant" },
  { id:"L02", cat:"Entity & Trading Name", priority:"Critical", item:"Register business name 'NILA' or 'Siamese Botanica Design Division' with DBD", action:"Check name availability at bizportal.go.th; file online" },
  { id:"L03", cat:"Entity & Trading Name", priority:"High",     item:"Obtain tax ID and set up VAT registration (if revenue ≥ THB 1.8M/yr)", action:"Register with Revenue Department after entity is formed" },
  { id:"L04", cat:"Entity & Trading Name", priority:"High",     item:"Open dedicated business bank account for NILA transactions", action:"Required before issuing invoices or receiving licence fees" },
  { id:"L05", cat:"IP & Copyright",         priority:"Critical", item:"Conduct trademark search for 'NILA™' in Class 42 (design services) with Thai DIP", action:"Search at ipthailand.go.th; engage Thai IP lawyer if unclear" },
  { id:"L06", cat:"IP & Copyright",         priority:"Critical", item:"File trademark application for NILA™ wordmark + logo device", action:"Thai DIP application: approx. THB 1,000–3,500 per class" },
  { id:"L06b",cat:"IP & Copyright",         priority:"High",     item:"Consider Madrid System filing for key export markets (EU, US, UK, Japan)", action:"File via WIPO Madrid System after Thai trademark is registered — one application, multiple territories" },
  { id:"L07", cat:"IP & Copyright",         priority:"High",     item:"Prepare copyright registration package for Midnight Siam collection (Thai DIP Copyright Office)", action:"Prepare copyright registration package / submit only after final artwork approval" },
  { id:"L08", cat:"IP & Copyright",         priority:"High",     item:"Draft internal IP assignment clause (designs owned by legal entity, not individual)", action:"Required before first commercial licence is issued" },
  { id:"L09", cat:"Licence Agreements",     priority:"Critical", item:"Have POD Licence template reviewed and approved by Thai IP lawyer", action:"Do not use unreviewed templates for commercial licensing" },
  { id:"L10", cat:"Licence Agreements",     priority:"Critical", item:"Have Commercial and Brand Licence templates reviewed by Thai IP lawyer", action:"Engage lawyer familiar with design licensing and IP law" },
  { id:"L11", cat:"Licence Agreements",     priority:"High",     item:"Confirm jurisdiction clause in all licence agreements (Thai law preferred)", action:"Discuss with lawyer — international clients may request neutral jurisdiction" },
  { id:"L12", cat:"Licence Agreements",     priority:"Medium",   item:"Prepare short-form licensing terms for POD platforms (Spoonflower, Society6)", action:"Platform-specific addenda to standard POD Licence" },
  { id:"L13", cat:"Business Operations",    priority:"High",     item:"Register domain names: niladesign.co / niladesign.studio / niladesign.th", action:"Purchase via Namecheap, Google Domains, or .th via THNIC" },
  { id:"L14", cat:"Business Operations",    priority:"High",     item:"Draft NILA website Privacy Policy (PDPA compliant — Thailand; GDPR compliant for EU visitors)", action:"Required under PDPA for Thai operations and GDPR for any EU-resident user data collection" },
  { id:"L15", cat:"Business Operations",    priority:"Medium",   item:"Set up secure cloud archive for master design files with access controls", action:"Google Drive with 2FA + restricted sharing; or dedicated storage" },
  { id:"L16", cat:"Business Operations",    priority:"Low",      item:"Prepare standard invoice template with correct legal entity name and tax ID", action:"Required before issuing first commercial licence invoice" },
];
const LEGAL_PRIORITY_COLOR = { Critical:T.crimson, High:T.lotus, Medium:T.gold, Low:T.jade };
const LEGAL_CATS = ["Entity & Trading Name","IP & Copyright","Licence Agreements","Business Operations"];

// ────────────────────────────────────────────────────────────
// DATA: FIRST 20 TARGETS
// ────────────────────────────────────────────────────────────
const OUTREACH_STAGES = ["To Research","Researched","Email Drafted","Sent","Replied","Meeting Set","Proposal Sent","Passed"];
const OUTREACH_COLORS = { "To Research":T.mist, Researched:T.indigoL, "Email Drafted":T.amber, Sent:T.gold, Replied:T.lotus, "Meeting Set":"#7C3AED", "Proposal Sent":T.jade, Passed:T.crimson };

const INIT_TARGETS = [
  { id:1,  cat:"Surface Brand",      name:"[Wallcovering Brand A — EU]",            region:"Europe",        why:"Major wallcovering house; publishes annual designer collections",           collection:"Midnight Siam",         stage:"To Research" },
  { id:2,  cat:"Surface Brand",      name:"[Textile Studio B — USA]",               region:"North America", why:"Independent textile studio with heritage pattern licensing programme",    collection:"Midnight Siam",         stage:"To Research" },
  { id:3,  cat:"Surface Brand",      name:"[Stationery Brand C — UK]",              region:"Europe",        why:"Premium stationery brand; sources licensed patterns seasonally",            collection:"Dok Mali Botanical",   stage:"To Research" },
  { id:4,  cat:"Surface Brand",      name:"[Tile Manufacturer D — Italy]",          region:"Europe",        why:"High-end tile manufacturer with global distribution; cultural collections", collection:"Naga Sacred Geometry", stage:"To Research" },
  { id:5,  cat:"Surface Brand",      name:"[Homewares Label E — Australia]",        region:"ANZ",           why:"Design-led homewares brand with Southeast Asian market presence",            collection:"Midnight Siam",         stage:"To Research" },
  { id:6,  cat:"Luxury Hospitality", name:"[Boutique Resort Group F — Thailand]",   region:"Thailand",      why:"Independent boutique resort group; strong cultural design ethos",           collection:"Midnight Siam",         stage:"To Research" },
  { id:7,  cat:"Luxury Hospitality", name:"[Destination Spa G — Bali]",             region:"SE Asia",       why:"Destination spa brand; procures custom Thai design for FF&E",               collection:"Naga Sacred Geometry", stage:"To Research" },
  { id:8,  cat:"Luxury Hospitality", name:"[Heritage Hotel H — Bangkok]",           region:"Thailand",      why:"Boutique heritage hotel undergoing rebrand; lobby design project",           collection:"Midnight Siam",         stage:"To Research" },
  { id:9,  cat:"Luxury Hospitality", name:"[Resort Collection I — Maldives]",       region:"SE Asia",       why:"Luxury resort collection with Thai spa brand partnership",                  collection:"Midnight Siam",         stage:"To Research" },
  { id:10, cat:"Luxury Hospitality", name:"[Spa Network J — Singapore/HK]",         region:"Asia Pacific",  why:"Premium spa network; sources regional cultural design for branded linen",   collection:"Dok Mali Botanical",   stage:"To Research" },
  { id:11, cat:"Consumer Brand",     name:"[Wellness Brand K — Thailand]",          region:"Thailand",      why:"Thai wellness and cosmetics brand with export ambitions",                   collection:"Dok Mali Botanical",   stage:"To Research" },
  { id:12, cat:"Consumer Brand",     name:"[Tea Brand L — UK/Asia]",                region:"UK / Asia",     why:"Premium tea brand; sources cultural motifs for seasonal packaging",         collection:"Dok Mali Botanical",   stage:"To Research" },
  { id:13, cat:"Consumer Brand",     name:"[Gifting Brand M — Singapore]",          region:"SE Asia",       why:"Luxury gifting and corporate gifting brand; high-volume packaging design",   collection:"Loi Krathong",         stage:"To Research" },
  { id:14, cat:"Consumer Brand",     name:"[F&B Brand N — Thailand/Japan]",         region:"Thailand/Japan",why:"Artisan F&B brand with cultural heritage packaging strategy",              collection:"Midnight Siam",         stage:"To Research" },
  { id:15, cat:"Interior Studio",    name:"[FF&E Studio O — Bangkok]",              region:"Thailand",      why:"Hospitality FF&E consultancy; commissions custom pattern libraries",         collection:"Midnight Siam",         stage:"To Research" },
  { id:16, cat:"Interior Studio",    name:"[Design Agency P — Singapore]",          region:"SE Asia",       why:"Regional interior design agency with luxury hotel clientele",               collection:"Naga Sacred Geometry", stage:"To Research" },
  { id:17, cat:"POD Platform",       name:"Spoonflower",                            region:"Global",        why:"Primary POD platform for fabric, wallpaper, and gift wrap",                 collection:"Midnight Siam",         stage:"Researched"  },
  { id:18, cat:"POD Platform",       name:"Society6",                               region:"Global",        why:"POD platform for art prints, homewares, apparel",                           collection:"Midnight Siam",         stage:"Researched"  },
  { id:19, cat:"POD Platform",       name:"Redbubble",                              region:"Global",        why:"POD platform for prints, stickers, apparel; large consumer base",           collection:"Dok Mali Botanical",   stage:"Researched"  },
  { id:20, cat:"POD Platform",       name:"Contrado",                               region:"Europe/Global", why:"Premium UK-based POD with high-quality fabric and homewares fulfilment",    collection:"Midnight Siam",         stage:"To Research" },
];

// ────────────────────────────────────────────────────────────
// DATA: NAV
// ────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard",   label:"Dashboard",             icon:"⬡", group:"overview" },
  { id:"brand",       label:"Brand Bible",            icon:"◈", group:"system"   },
  { id:"design",      label:"Design Language",        icon:"◉", group:"system"   },
  { id:"motifs",      label:"Motif Library",           icon:"❋", group:"system"   },
  { id:"prompts",     label:"Prompt Generator",        icon:"◎", group:"tools"    },
  { id:"collections", label:"Collection Planner",      icon:"◐", group:"tools"    },
  { id:"vault",       label:"Asset Vault",             icon:"◭", group:"tools"    },
  { id:"licensing",   label:"Licensing Model",         icon:"◆", group:"tools"    },
  { id:"calculator",  label:"Licensing Calculator",    icon:"◇", group:"tools"    },
  { id:"portfolio",   label:"Portfolio Generator",     icon:"◫", group:"tools"    },
  { id:"crm",         label:"Client CRM",              icon:"▣", group:"tools"    },
  { id:"targets",     label:"First 20 Targets",        icon:"◎", group:"tools"    },
  { id:"scoring",     label:"Opportunity Scoring",     icon:"◈", group:"tools"    },
  { id:"sales",       label:"AI Sales Assistant",      icon:"◑", group:"tools"    },
  { id:"revenue",     label:"Revenue Dashboard",       icon:"◈", group:"intel"    },
  { id:"workflow",    label:"Studio Workflow",          icon:"▶", group:"ops"      },
  { id:"legal",       label:"Pre-Launch Legal",         icon:"⚑", group:"ops"      },
  { id:"action",      label:"30-Day Plan",             icon:"✦", group:"ops"      },
  { id:"watermark",   label:"Watermark Studio",        icon:"◈", group:"tools"   },
  { id:"framework",   label:"Licensing Framework",     icon:"◆", group:"business" },
  { id:"revmodel",    label:"Revenue Model",            icon:"◈", group:"business" },
  { id:"colarch",     label:"Collection Architecture",  icon:"◐", group:"business" },
  { id:"journey",     label:"Customer Journey",         icon:"◑", group:"business" },
];
const NAV_GROUPS = { overview:"Overview", system:"Brand System", tools:"Studio Tools", business:"Business Strategy", intel:"Intelligence", ops:"Operations" };

// ────────────────────────────────────────────────────────────
// UI PRIMITIVES
// ────────────────────────────────────────────────────────────
function Tag({ children, color="gold", size="sm" }) {
  const map = {
    gold:  {bg:"#FBF3E0",text:"#7A5C10",border:"#D4B56A44"},
    jade:  {bg:"#E0F0EC",text:"#1A5C45",border:"#2E7D6744"},
    lotus: {bg:"#F7E8EE",text:"#8B2E48",border:"#B85A7244"},
    indigo:{bg:"#E6E9F5",text:"#0F4D3A",border:"#1A6B5244"},
    red:   {bg:"#FEF2F2",text:"#7F1D1D",border:"#9B2C2C44"},
    mist:  {bg:"#EDE9E0",text:"#4A5270",border:"#D9D4C8"  },
    amber: {bg:"#FFFBEB",text:"#92400E",border:"#C17B2A44"},
  };
  const c = map[color]||map.gold;
  return <span style={{ background:c.bg, color:c.text, border:`1px solid ${c.border}`, borderRadius:4,
    padding:size==="xs"?"1px 6px":"2px 9px", fontSize:size==="xs"?T.xs:T.sm,
    fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{children}</span>;
}

function Card({ children, style={}, pad=24 }) {
  return <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radiusL,
    padding:pad, boxShadow:"0 1px 3px rgba(28,45,94,0.06)", ...style }}>{children}</div>;
}

function AlertBox({ type="warning", children }) {
  const map = { warning:{bg:"#FFFBEB",border:"#FCD34D",text:"#92400E",icon:"⚠"}, info:{bg:"#EFF6FF",border:"#BFDBFE",text:"#1E40AF",icon:"ℹ"}, success:{bg:"#F0FDF4",border:"#86EFAC",text:"#166534",icon:"✓"} };
  const s = map[type]||map.warning;
  return <div style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:T.radius,
    padding:"10px 14px", marginBottom:14, display:"flex", gap:8, alignItems:"flex-start" }}>
    <span style={{ color:s.text, fontWeight:700, flexShrink:0, fontSize:14 }}>{s.icon}</span>
    <span style={{ fontSize:T.sm, color:s.text, lineHeight:1.6 }}>{children}</span>
  </div>;
}

function SectionHead({ icon, title, subtitle }) {
  return <div style={{ marginBottom:28 }}>
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
      <span style={{ fontSize:22, color:T.gold, lineHeight:1 }}>{icon}</span>
      <h2 style={{ margin:0, fontSize:T.xxl, fontWeight:900, color:T.indigo, letterSpacing:"-0.025em", fontFamily:"Georgia,'Times New Roman',serif" }}>{title}</h2>
    </div>
    {subtitle && <p style={{ margin:"0 0 0 32px", color:T.mist, fontSize:T.base, lineHeight:1.6 }}>{subtitle}</p>}
    <div style={{ height:2, background:`linear-gradient(90deg,${T.gold},transparent)`, borderRadius:1, marginTop:14 }} />
  </div>;
}

function Grid({ cols=2, gap=14, children }) {
  return <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap }}>{children}</div>;
}

function Stat({ label, value, sub, accent=T.gold }) {
  return <div style={{ background:T.ground, border:`1px solid ${T.border}`, borderLeft:`3px solid ${accent}`, borderRadius:T.radius, padding:"14px 16px" }}>
    <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>{label}</div>
    <div style={{ fontSize:T.xl, fontWeight:800, color:T.indigo, lineHeight:1 }}>{value}</div>
    {sub && <div style={{ fontSize:T.sm, color:T.mist, marginTop:4 }}>{sub}</div>}
  </div>;
}

function DataTable({ headers, rows, compact=false }) {
  return <div style={{ overflowX:"auto", borderRadius:T.radius, border:`1px solid ${T.border}` }}>
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:T.base }}>
      <thead><tr style={{ background:T.indigo }}>
        {headers.map((h,i)=><th key={i} style={{ padding:compact?"8px 12px":"10px 14px", color:"#fff", textAlign:"left", fontWeight:700, fontSize:T.xs, letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>)}
      </tr></thead>
      <tbody>{rows.map((row,i)=>(
        <tr key={i} style={{ background:i%2===0?T.white:T.ground }}>
          {row.map((cell,j)=><td key={j} style={{ padding:compact?"7px 12px":"10px 14px", color:T.ink, borderBottom:`1px solid ${T.borderL}`, verticalAlign:"top", lineHeight:1.5 }}>{cell}</td>)}
        </tr>
      ))}</tbody>
    </table>
  </div>;
}

function Pill({ children, color=T.jade }) {
  return <span style={{ background:`${color}18`, color, border:`1px solid ${color}44`, borderRadius:20, padding:"3px 10px", fontSize:T.xs, fontWeight:700 }}>{children}</span>;
}

function Divider({ label }) {
  return <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0 16px" }}>
    {label && <span style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.1em", whiteSpace:"nowrap" }}>{label}</span>}
    <div style={{ flex:1, height:1, background:T.border }} />
  </div>;
}

function InfoBlock({ label, value, accent=T.gold }) {
  return <div style={{ background:T.ground, borderLeft:`3px solid ${accent}`, borderRadius:T.radius, padding:"12px 16px", marginBottom:10 }}>
    <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>{label}</div>
    <div style={{ fontSize:T.base, color:T.ink, lineHeight:1.7 }}>{value}</div>
  </div>;
}

function Button({ children, onClick, variant="primary", size="md", disabled=false, fullWidth=false }) {
  const styles = { primary:{bg:T.indigo,color:"#fff",border:`1px solid ${T.indigo}`}, secondary:{bg:"transparent",color:T.indigo,border:`1px solid ${T.border}`}, gold:{bg:T.gold,color:"#fff",border:`1px solid ${T.gold}`}, amber:{bg:T.amber,color:"#fff",border:`1px solid ${T.amber}`} };
  const s = styles[variant]||styles.primary;
  const pad = size==="sm"?"6px 14px":"9px 20px";
  return <button onClick={onClick} disabled={disabled} style={{ width:fullWidth?"100%":"auto", background:disabled?T.ground:s.bg, color:disabled?T.mist:s.color, border:disabled?`1px solid ${T.border}`:s.border, borderRadius:T.radius, padding:pad, fontSize:size==="sm"?T.sm:T.base, fontWeight:700, cursor:disabled?"not-allowed":"pointer", letterSpacing:"0.02em", transition:"opacity 0.15s" }}>{children}</button>;
}

// ────────────────────────────────────────────────────────────
// DASHBOARD
// ────────────────────────────────────────────────────────────
function Dashboard({ navigate }) {
  const kpis = [
    { label:"Midnight Siam",            value:"In Production",                  sub:"200 patterns · 10 collections · 2026–2028",       accent:T.indigo },
    { label:"Collections",             value:"4",                               sub:"Q2 2026 – Q1 2027 roadmap",   accent:T.gold   },
    { label:"Prospects Scored",        value:String(INIT_OPPORTUNITIES.length), sub:"Opportunity pipeline",        accent:T.lotus  },
    { label:"Studio Status",           value:"Pre-Launch",                      sub:"Not yet trading",             accent:T.amber  },
  ];
  const quickLinks = [
    { label:"Prompt Generator",       module:"prompts",     icon:"◎", desc:"Build structured AI design prompts from verified vocabulary" },
    { label:"Asset Vault",            module:"vault",       icon:"◭", desc:"Register Midnight Siam designs with copyright & licence status" },
    { label:"Portfolio Generator",    module:"portfolio",   icon:"◫", desc:"Configure a client-ready collection portfolio brief" },
    { label:"Opportunity Scoring",    module:"scoring",     icon:"◈", desc:"Rank prospects by value × probability × urgency" },
    { label:"AI Sales Assistant",     module:"sales",       icon:"◑", desc:"Generate outreach emails, follow-ups, proposals, agendas" },
    { label:"Revenue Dashboard",      module:"revenue",     icon:"◈", desc:"Track and project revenue across all licensing channels" },
    { label:"Pre-Launch Legal",       module:"legal",       icon:"⚑", desc:"16-item legal checklist before first licence is issued" },
    { label:"Watermark Studio",       module:"watermark",   icon:"◈", desc:"Apply NILA™ protection watermarks to designs — batch export" },
    { label:"Licensing Framework",    module:"framework",   icon:"◆", desc:"Rights matrix, process flow, prohibited uses, and FAQ" },
    { label:"Revenue Model",          module:"revmodel",    icon:"◈", desc:"Three-scenario revenue projection across all channels" },
    { label:"Customer Journey",       module:"journey",     icon:"◑", desc:"End-to-end client experience by segment" },
  ];
  return (
    <div>
      <SectionHead icon="⬡" title="Studio Dashboard" subtitle="NILA™ v3.0 — NILA Heritage Living™ Operating System" />
      <AlertBox type="warning">Pre-launch status. No licences have been issued. No client outreach has been made. Complete the Pre-Launch Legal Checklist before proceeding to commercial activity.</AlertBox>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {kpis.map(k=><Stat key={k.label} {...k} />)}
      </div>
      <Grid cols={2} gap={14}>
        <Card>
          <div style={{ fontWeight:800, color:T.indigo, fontSize:T.lg, marginBottom:14, fontFamily:"Georgia,serif" }}>Quick Access</div>
          {quickLinks.map(q=>(
            <div key={q.module} onClick={()=>navigate(q.module)}
              style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 14px", border:`1px solid ${T.border}`, borderRadius:T.radius, marginBottom:8, cursor:"pointer", background:T.ground }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=T.gold}
              onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
              <span style={{ fontSize:20, color:T.gold }}>{q.icon}</span>
              <div>
                <div style={{ fontWeight:700, color:T.indigo, fontSize:T.md }}>{q.label}</div>
                <div style={{ color:T.mist, fontSize:T.sm }}>{q.desc}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontWeight:800, color:T.indigo, fontSize:T.lg, marginBottom:14, fontFamily:"Georgia,serif" }}>System Modules</div>
          {NAV.filter(n=>n.id!=="dashboard").map(n=>(
            <div key={n.id} onClick={()=>navigate(n.id)}
              style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", borderRadius:6, cursor:"pointer", marginBottom:2 }}
              onMouseEnter={e=>e.currentTarget.style.background=T.ground}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <span style={{ color:T.gold, fontSize:14 }}>{n.icon}</span>
                <span style={{ fontSize:T.base, color:T.ink }}>{n.label}</span>
              </div>
              <span style={{ color:T.mist, fontSize:T.xs, textTransform:"uppercase", letterSpacing:"0.08em" }}>{NAV_GROUPS[n.group]}</span>
            </div>
          ))}
        </Card>
      </Grid>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BRAND BIBLE
// ────────────────────────────────────────────────────────────
function BrandBible() {
  return (
    <div>
      <SectionHead icon="◈" title="Brand Bible" subtitle="Foundational identity for NILA™ Heritage Living — Inspired by Thai Heritage. Crafted for the World." />
      <AlertBox type="info">Pre-launch document. Entity registration, trademark filing, and IP registration are all pending. Legal entity status below reflects planned structure only.</AlertBox>
      <Grid cols={2} gap={14}>
        <Card>
          <Divider label="Identity" />
          <InfoBlock label="Brand Name" accent={T.indigo} value="NILA™ — from นิล (nil), a precious Thai gemstone symbolising depth, elegance, and timeless beauty. NILA transforms Thailand's cultural heritage into contemporary design collections for modern living around the world." />
          <InfoBlock label="Positioning" accent={T.gold} value="NILA™ Heritage Living is a Thai-founded design licensing studio that transforms Thai heritage — temple art, botanical beauty, and refined cultural patterns — into contemporary surface design collections for the global luxury lifestyle market." />
          <InfoBlock label="Tagline" accent={T.jade} value='"Inspired by Thai Heritage. Crafted for the World."' />
          <InfoBlock label="Entity Status (Planned)" accent={T.mist} value="Design division of Siamese Botanica — Pathum Thani, Thailand. Formal legal entity registration, VAT registration, and trademark filing are pending as part of pre-launch setup." />
        </Card>
        <Card>
          <Divider label="Mission & Vision" />
          <div style={{ background:`linear-gradient(135deg,${T.indigo},${T.indigoL})`, borderRadius:T.radius, padding:"18px 20px", color:"#fff", marginBottom:14 }}>
            <div style={{ fontSize:T.xs, color:"rgba(255,255,255,0.55)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>Mission</div>
            <div style={{ fontSize:T.base, lineHeight:1.8 }}>Identify, document, and commercialise the visual intelligence of Thai decorative arts — delivering licensable design assets that give international brands cultural depth and surface distinction.</div>
          </div>
          <InfoBlock label="Vision (2027)" accent={T.gold} value="Establish NILA™ Heritage Living as the global reference for Thai-inspired contemporary design — with active collections in home decor, wallcovering, fashion, and lifestyle products across Europe, APAC, and the Americas." />
          <InfoBlock label="Impact Standard" accent={T.jade} value="Every collection is accompanied by a Cultural Reference Document citing historical sources. We do not produce decorative pastiche — each motif is identified, sourced, and contextualised." />
        </Card>
      </Grid>
      <Card style={{ marginTop:14 }}>
        <Divider label="Brand Personality" />
        <Grid cols={2} gap={14}>
          <div>
            {[["Warm Heritage Custodian","We carry Thai visual heritage with pride and warmth — sharing stories, not lecturing about them."],["Natural Luxury","Beauty rooted in nature and culture. Organic, botanical, timeless — never cold or corporate."],["Culturally Grounded","Thai by heart, global by reach. We celebrate rather than exoticise Thai culture."],["Inspired & Crafted","Every design begins with a cultural story and ends with something beautiful for everyday living."]].map(([t,d])=>(
              <div key={t} style={{ paddingLeft:12, borderLeft:`3px solid ${T.gold}`, marginBottom:14 }}>
                <div style={{ fontWeight:700, color:T.indigo, fontSize:T.md }}>{t}</div>
                <div style={{ color:T.mist, fontSize:T.sm, marginTop:3 }}>{d}</div>
              </div>
            ))}
          </div>
          <div>
            <Divider label="Voice Rules" />
            {[["Use","Warm nature and heritage language: 'Thai botanical', 'heritage craft', 'inspired by' — always specific"],["Avoid","'Oriental', 'exotic', 'Asian-inspired', generic luxury clichés, cold corporate language"],["B2B Tone","Confident and precise — cultural context first, commercial value second"],["B2C Tone","Warm, story-led, sensory — describe how the design makes a space feel, not just look"]].map(([l,v])=>(
              <div key={l} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:8 }}>
                <Tag color={l==="Avoid"?"red":"jade"} size="xs">{l}</Tag>
                <span style={{ fontSize:T.sm, color:"#4B5563", lineHeight:1.6 }}>{v}</span>
              </div>
            ))}
          </div>
        </Grid>
      </Card>
      <Card style={{ marginTop:14 }}>
        <Divider label="Target Market Segments" />
        <DataTable headers={["Segment","Profile","Primary Need","Typical Engagement"]}
          rows={[
            ["Surface Design Brands","Wallpaper, textile, tile, stationery houses","Seasonal heritage collections","Brand Licence — collection deal"],
            ["Luxury Hospitality","Boutique hotels, destination spas, eco-resorts","Custom Thai identity for FF&E & spa linen","Exclusive Commission"],
            ["Lifestyle & Home Decor Brands","Cushions, throws, table linen, home accessories","Heritage design for product collections","Commercial Licence"],
            ["Fashion & Accessories","Scarves, bags, apparel — premium & luxury tier","Botanical Thai patterns for fashion","Commercial or Brand Licence"],
            ["Wellness & Spa Brands","Thai spa, aromatherapy, wellness product brands","Heritage botanical aesthetics for packaging","Commercial Licence"],
            ["Print-on-Demand Sellers","Individual designers on Spoonflower, Society6","Ready-made licensed heritage patterns","POD Licence"],
            ["Interior Design Studios","FF&E consultants, hospitality designers","Bespoke pattern libraries for projects","Brand or Exclusive Licence"],
          ]} />
      </Card>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// DESIGN LANGUAGE
// ────────────────────────────────────────────────────────────
function DesignLanguage() {
  const colors = [
    {name:"Royal Indigo",hex:"#0F4D3A",role:"Primary / Authority"},{name:"Temple Gold",hex:"#C7A24D",role:"Accent / Prestige"},
    {name:"Lotus Rose",hex:"#B85A72",role:"Warmth / Feminine"},{name:"Jade Forest",hex:"#2E7D67",role:"Nature / Grounding"},
    {name:"Ivory Silk",hex:"#F7F4ED",role:"Ground / Ground"},{name:"Sacred Crimson",hex:"#9B2C2C",role:"Statement / Power"},
    {name:"Monsoon Mist",hex:"#8A93AA",role:"Depth / Atmospheric"},{name:"Saffron Dawn",hex:"#C17B2A",role:"Energy / Warmth"},
    {name:"Klong Black",hex:"#12151E",role:"Definition / Contrast"},{name:"Pale Ground",hex:"#F0EDE4",role:"UI Ground / Neutral"},
  ];
  return (
    <div>
      <SectionHead icon="◉" title="Design Language System" subtitle="The visual grammar that makes every NILA design identifiable at a glance" />
      <Card>
        <Divider label="Colour System" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
          {colors.map(c=>(
            <div key={c.hex} style={{ textAlign:"center" }}>
              <div style={{ height:52, borderRadius:T.radius, background:c.hex, marginBottom:6, boxShadow:"0 2px 8px rgba(0,0,0,0.12)" }} />
              <div style={{ fontSize:T.sm, fontWeight:700, color:T.ink }}>{c.name}</div>
              <div style={{ fontSize:T.xs, color:T.mist, fontFamily:"monospace" }}>{c.hex}</div>
              <div style={{ fontSize:T.xs, color:T.mist }}>{c.role}</div>
            </div>
          ))}
        </div>
      </Card>
      <Grid cols={2} gap={14}>
        <Card style={{ marginTop:14 }}>
          <Divider label="Typography" />
          {[{role:"Display (EN)",spec:"Georgia / Cormorant Garamond",use:"Collection names, section headings, hero text"},{role:"Display (TH)",spec:"Sarabun Bold / Angsana New",use:"Thai motif labels, cultural annotations"},{role:"UI Body (EN)",spec:"Inter Regular / System-UI",use:"Descriptions, proposals, data tables"},{role:"Caption",spec:"Inter Light / DM Sans",use:"Motif codes, technical specs, footnotes"},{role:"Technical",spec:"JetBrains Mono / Source Code Pro",use:"Prompt formulas, file names, hex codes"}].map(t=>(
            <div key={t.role} style={{ marginBottom:12, padding:"10px 14px", background:T.ground, borderRadius:T.radius }}>
              <Tag color="indigo" size="xs">{t.role}</Tag>
              <div style={{ fontWeight:700, fontSize:T.md, color:T.ink, margin:"4px 0 2px" }}>{t.spec}</div>
              <div style={{ fontSize:T.sm, color:T.mist }}>{t.use}</div>
            </div>
          ))}
        </Card>
        <Card style={{ marginTop:14 }}>
          <Divider label="Design Principles — The NILA Code" />
          {[["Heritage First, Modern Always","Every NILA pattern begins with a documented Thai cultural source — temple art, botanical heritage, or royal craft — then is reinterpreted for contemporary living."],["Nature as Foundation","Thai design draws from the natural world: lotus, monsoon, forest, gemstone. Ground every palette and form in something found in nature."],["Warmth over Austerity","Heritage Living means liveable luxury — warm ivories, botanical greens, antique golds. Never cold, never stark, never intimidating."],["Dual-Scale Intelligence","Every pattern works at two scales: architectural (wallcovering, large textile) and intimate (cushion, scarf, packaging). Test both before finalising."],["The Living Room Test","Ask: would this design feel beautiful in a real person's home, hotel room, or on a luxury scarf? If yes, proceed. If it feels like a museum exhibit, add warmth."]].map(([t,d],i)=>(
            <div key={i} style={{ display:"flex", gap:12, marginBottom:14, alignItems:"flex-start" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:[T.indigo,T.gold,T.jade,T.lotus,T.crimson][i], color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:T.sm, flexShrink:0 }}>{i+1}</div>
              <div>
                <div style={{ fontWeight:700, color:T.indigo, fontSize:T.md }}>{t}</div>
                <div style={{ color:T.mist, fontSize:T.sm, marginTop:3, lineHeight:1.6 }}>{d}</div>
              </div>
            </div>
          ))}
        </Card>
      </Grid>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MOTIF LIBRARY
// ────────────────────────────────────────────────────────────
function MotifLibrary() {
  const [filter, setFilter] = useState("All");
  const [selectedMotif, setSelectedMotif] = useState(null);
  const tiers = ["All","Core","Signature","Extended"];
  const visible = filter==="All" ? MOTIFS : MOTIFS.filter(m=>m.tier===filter);

  const tierColor = (t) => t==="Core"?T.jade : t==="Signature"?T.gold : T.amber;
  const tierBg    = (t) => t==="Core"?`${T.jade}18` : t==="Signature"?`${T.gold}18` : `${T.amber}18`;

  const Modal = ({motif, onClose}) => (
    <div style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(10,30,22,0.82)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.white, borderRadius:T.radiusL, maxWidth:640, width:"100%", maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 80px rgba(15,77,58,0.25)", border:`2px solid ${T.gold}` }}>
        {/* Header */}
        <div style={{ background:`linear-gradient(135deg,${T.indigoD},${T.indigo})`, borderRadius:`${T.radiusL}px ${T.radiusL}px 0 0`, padding:"24px 28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:T.xs, color:T.gold, fontWeight:700, marginBottom:4 }}>{motif.code}</div>
              <div style={{ fontWeight:900, color:"#F7F4ED", fontSize:22, fontFamily:"Georgia,serif" }}>{motif.name}</div>
              <div style={{ fontSize:18, color:"rgba(247,244,237,0.6)", marginTop:2 }}>{motif.thai}</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
              <button onClick={onClose} style={{ background:"rgba(255,255,255,0.12)", border:"none", color:"#F7F4ED", width:32, height:32, borderRadius:"50%", cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
              <span style={{ background:tierBg(motif.tier), color:tierColor(motif.tier), border:`1px solid ${tierColor(motif.tier)}44`, borderRadius:20, padding:"3px 12px", fontSize:T.xs, fontWeight:700 }}>{motif.tier}</span>
            </div>
          </div>
        </div>
        {/* Body */}
        <div style={{ padding:"24px 28px" }}>
          {[
            ["Cultural Reference & Form", motif.era + " — " + motif.form],
            ["Symbolic Meaning", motif.meaning],
            ["Surface Applications", motif.surfaces],
          ].map(([label, value]) => (
            <div key={label} style={{ marginBottom:18 }}>
              <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>{label}</div>
              <div style={{ fontSize:13, color:T.ink, lineHeight:1.75 }}>{value}</div>
            </div>
          ))}
          {/* Do / Don't */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:18 }}>
            <div style={{ background:`${T.jade}10`, borderRadius:T.radius, padding:"12px 14px", borderLeft:`3px solid ${T.jade}` }}>
              <div style={{ fontSize:T.xs, fontWeight:700, color:T.jade, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.09em" }}>✓ Do</div>
              <div style={{ fontSize:12, color:T.ink, lineHeight:1.7 }}>{motif.do}</div>
            </div>
            <div style={{ background:`${T.amber}10`, borderRadius:T.radius, padding:"12px 14px", borderLeft:`3px solid ${T.amber}` }}>
              <div style={{ fontSize:T.xs, fontWeight:700, color:T.amber, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.09em" }}>✕ Don't</div>
              <div style={{ fontSize:12, color:T.ink, lineHeight:1.7 }}>{motif.dont}</div>
            </div>
          </div>
          {/* Keywords */}
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:8 }}>Prompt Keywords</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {motif.keywords.split(",").map(k=>(
                <span key={k} style={{ background:T.ground, border:`1px solid ${T.border}`, borderRadius:20, padding:"3px 10px", fontSize:11, color:T.mist }}>{k.trim()}</span>
              ))}
            </div>
          </div>
          {/* IP note */}
          <div style={{ background:`${T.gold}10`, borderRadius:T.radius, padding:"10px 14px", border:`1px solid ${T.gold}30` }}>
            <div style={{ fontSize:T.xs, fontWeight:700, color:T.gold, marginBottom:4 }}>Licensing & IP Usage</div>
            <div style={{ fontSize:11, color:T.mist, lineHeight:1.6 }}>This motif is part of the NILA™ Heritage Living Cultural IP Library. All commercial use requires a valid NILA™ licence agreement. Unauthorised reproduction is prohibited.</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {selectedMotif && <Modal motif={selectedMotif} onClose={()=>setSelectedMotif(null)} />}

      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <SectionHead icon="◈" title="Thai Motif Library" subtitle="Cultural IP Library — NILA Heritage Living™ Design OS v3.2 Beta" />

        {/* Brand positioning */}
        <div style={{ background:`linear-gradient(135deg,${T.indigoD},${T.indigo})`, borderRadius:T.radiusL, padding:"20px 24px", marginBottom:14 }}>
          <div style={{ fontFamily:"Georgia,serif", fontSize:15, color:"#F7F4ED", fontStyle:"italic", lineHeight:1.7, marginBottom:10 }}>
            "NILA Motif Library is the cultural vocabulary behind every pattern, product, and collection we create."
          </div>
          <div style={{ fontSize:11, color:"rgba(199,162,77,0.8)", lineHeight:1.8 }}>
            NILA interprets Thai heritage motifs through a contemporary design lens. Sacred, royal, and ritual references are used with care.
            The library avoids direct use of sacred Buddhist objects, costume cliché, tourist-souvenir aesthetics, and inappropriate sacred misuse in commercial product patterns.
          </div>
        </div>

        {/* Pre-launch badge */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {tiers.map(t=>(
              <button key={t} onClick={()=>setFilter(t)} style={{ padding:"6px 18px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${filter===t?T.indigo:T.border}`, background:filter===t?T.indigo:T.white, color:filter===t?"#fff":T.mist, cursor:"pointer", transition:"all 0.15s" }}>{t}</button>
            ))}
          </div>
          <div style={{ fontSize:10, color:T.mist, border:`1px solid ${T.border}`, borderRadius:20, padding:"4px 12px", letterSpacing:"0.05em" }}>
            Pre-launch Cultural IP Library · v3.2 Beta
          </div>
        </div>
      </div>

      {/* Motif count */}
      <div style={{ fontSize:T.sm, color:T.mist, marginBottom:16 }}>
        Showing {visible.length} of {MOTIFS.length} motifs
        {filter!=="All" && <span style={{ marginLeft:8, color:tierColor(filter), fontWeight:700 }}>— {filter} tier</span>}
      </div>

      {/* Motif grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:16 }}>
        {visible.map(m=>(
          <div key={m.code} style={{ background:T.white, borderRadius:T.radiusL, border:`1px solid ${T.border}`, overflow:"hidden", boxShadow:"0 2px 8px rgba(15,77,58,0.06)", transition:"transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(15,77,58,0.12)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 8px rgba(15,77,58,0.06)"; }}>

            {/* Card header */}
            <div style={{ background:`linear-gradient(135deg,${T.indigoD},${T.indigo})`, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <div style={{ fontFamily:"monospace", fontSize:10, color:T.gold, fontWeight:700, marginBottom:2 }}>{m.code}</div>
                <div style={{ fontWeight:900, color:"#F7F4ED", fontSize:17, fontFamily:"Georgia,serif" }}>{m.name}</div>
                <div style={{ fontSize:15, color:"rgba(247,244,237,0.55)", marginTop:1 }}>{m.thai}</div>
              </div>
              <span style={{ background:tierBg(m.tier), color:tierColor(m.tier), border:`1px solid ${tierColor(m.tier)}55`, borderRadius:20, padding:"4px 12px", fontSize:10, fontWeight:700, flexShrink:0, marginTop:2 }}>{m.tier}</span>
            </div>

            {/* Card body */}
            <div style={{ padding:"16px 20px" }}>
              {/* Cultural reference */}
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>Cultural Reference & Form</div>
                <div style={{ fontSize:12.5, color:T.mist, lineHeight:1.6, fontStyle:"italic" }}>{m.era}</div>
                <div style={{ fontSize:13, color:T.ink, lineHeight:1.6, marginTop:2 }}>{m.form}</div>
              </div>

              {/* Meaning */}
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>Symbolic Meaning</div>
                <div style={{ fontSize:13, color:T.ink, lineHeight:1.7 }}>{m.meaning}</div>
              </div>

              {/* Surfaces */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:4 }}>Surface Applications</div>
                <div style={{ fontSize:12.5, color:T.indigo, lineHeight:1.6 }}>{m.surfaces}</div>
              </div>

              {/* View detail button */}
              <button onClick={()=>setSelectedMotif(m)} style={{ width:"100%", padding:"9px", background:"transparent", border:`1px solid ${T.indigo}`, borderRadius:T.radius, color:T.indigo, fontSize:12, fontWeight:700, cursor:"pointer", letterSpacing:"0.05em", transition:"all 0.15s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=T.indigo; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=T.indigo; }}>
                View Motif Detail →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ marginTop:28, padding:"16px 20px", background:T.ground, borderRadius:T.radius, border:`1px solid ${T.border}` }}>
        <div style={{ fontSize:11, color:T.mist, lineHeight:1.8, textAlign:"center" }}>
          <span style={{ color:T.gold, fontWeight:700 }}>NILA™ Heritage Living Cultural IP Library</span> — All motifs are interpreted through a contemporary design lens for use in licensed surface design, textile, wallcovering, and packaging applications. Sacred, royal, and ritual references are used with cultural respect and care. Unauthorised commercial use is prohibited.
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// PROMPT GENERATOR
// ────────────────────────────────────────────────────────────
function PromptGenerator() {
  const [activeTab, setActiveTab] = useState("pattern");
  const [styleModifier, setStyleModifier] = useState(PROMPT_VOCAB.styleModifiers[0]);
  const [motifCode, setMotifCode]         = useState(MOTIFS[0].code);
  const [structure, setStructure]         = useState(PROMPT_VOCAB.structures[0]);
  const [colorwayName, setColorwayName]   = useState(PROMPT_VOCAB.colorways[0].name);
  const [surface, setSurface]             = useState(PROMPT_VOCAB.surfaces[0]);
  const [mood, setMood]                   = useState(PROMPT_VOCAB.moods[0]);
  const [platform, setPlatform]           = useState("Midjourney v6");
  const [copied, setCopied]               = useState(false);

  const [product, setProduct]       = useState("Silk Scarf 90x90cm");
  const [collection, setCollection] = useState("Siam Tropical Elegance");
  const [colorwayMockup, setColorwayMockup] = useState("deep emerald #0F4D3A and antique gold #C7A24D on warm ivory #F7F4ED");
  const [setting, setSetting]       = useState("Editorial flat lay on Italian marble surface");
  const [lighting, setLighting]     = useState("Soft natural daylight, warm editorial");
  const [platformMockup, setPlatformMockup] = useState("ChatGPT (DALL-E 3)");
  const [mockupCopied, setMockupCopied] = useState(false);

  const selMotif    = MOTIFS.find(m=>m.code===motifCode) || MOTIFS[0];
  const selColorway = PROMPT_VOCAB.colorways.find(c=>c.name===colorwayName) || PROMPT_VOCAB.colorways[0];

  const PRODUCTS = [
    { name:"Silk Scarf 90x90cm",     emoji:"🧣" },
    { name:"Cushion Cover 50x50cm",  emoji:"🛋️" },
    { name:"Hotel Bed Runner",        emoji:"🏨" },
    { name:"Kimono Robe",             emoji:"👘" },
    { name:"Gift Box & Bag",          emoji:"📦" },
    { name:"Tote Bag",                emoji:"👜" },
    { name:"Table Runner",            emoji:"🍽️" },
    { name:"Zip Pouch",               emoji:"👝" },
    { name:"Tea Cosy",                emoji:"🫖" },
    { name:"Placemat Set",            emoji:"🍴" },
    { name:"Lamp Shade",              emoji:"💡" },
    { name:"Cushion + Throw Set",     emoji:"🛋️" },
  ];

  const SETTINGS = [
    "Editorial flat lay on Italian marble surface",
    "5-star luxury hotel suite interior",
    "Minimalist luxury living room, high ceilings",
    "Thai heritage architecture setting, golden hour",
    "Contemporary Bangkok luxury condo",
    "European luxury boutique hotel lobby",
    "Outdoor tropical resort terrace, natural light",
    "Dark moody studio, dramatic lighting",
  ];

  const LIGHTINGS = [
    "Soft natural daylight, warm editorial",
    "Warm golden hour sunbeams through window",
    "Moody dramatic studio lighting, deep shadows",
    "Bright clean Architectural Digest style",
    "Candlelight ambiance, intimate warmth",
    "Soft diffused overcast light, airy and clean",
  ];

  const buildPatternPrompt = () => {
    const suffix = platform==="Midjourney v6" ? " --tile --ar 1:1 --v 6 --style raw"
      : platform==="Adobe Firefly" ? ", seamless pattern, square format"
      : ", seamless tileable, 8k resolution";
    return `${styleModifier} Thai ${selMotif.name} (${selMotif.thai}) motif, ${selMotif.era}, ${structure}, color palette: ${selColorway.value}, target surface: ${surface}, mood: ${mood}, high resolution 300dpi seamless texture, luxury surface design, production ready${suffix}`;
  };

  const buildMockupPrompt = () => {
    const suffix = platformMockup==="Midjourney v6" ? `\n\n--ar 4:3 --v 6 --style raw --q 2`
      : platformMockup==="ChatGPT (DALL-E 3)" ? `\n\nPhotorealistic, ultra-detailed, luxury brand quality.`
      : `\n\nPhotorealistic, high resolution, luxury aesthetic.`;
    return `An editorial luxury commercial photograph of a ${product} featuring the NILA Heritage Living™ ${collection} pattern.

The pattern uses ${colorwayMockup} colorway with intricate Thai heritage motifs — Kanok flame scroll and botanical elements.

Setting: ${setting}
Lighting: ${lighting}

The product is the hero of the image. Pattern detail is clearly visible. No other brand names visible. Brand mark reads "NILA™" subtly.

Shot on 35mm lens, f/2.8 bokeh background, photorealistic, premium brand advertising quality, award-winning commercial photography.${suffix}`;
  };

  const doCopy = (text, setFn) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(()=>{ setFn(true); setTimeout(()=>setFn(false),2000); });
    } else {
      const ta = document.createElement("textarea"); ta.value=text;
      document.body.appendChild(ta); ta.select(); document.execCommand("copy");
      document.body.removeChild(ta); setFn(true); setTimeout(()=>setFn(false),2000);
    }
  };

  const LabeledSelect = ({label, value, onChange, options}) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{ width:"100%", padding:"9px 12px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.white, fontSize:13, fontFamily:"inherit", color:T.ink }}>
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div>
      <SectionHead icon="◎" title="Prompt Generator" subtitle="Build AI prompts for pattern design and product mockups" />

      {/* Tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["pattern","🎨 Pattern Design"],["mockup","🛋️ Product Mockup"]].map(([v,l])=>(
          <button key={v} onClick={()=>setActiveTab(v)} style={{ padding:"8px 24px", borderRadius:20, fontSize:T.sm, fontWeight:700, border:`1px solid ${activeTab===v?T.indigo:T.border}`, background:activeTab===v?T.indigo:T.white, color:activeTab===v?"#fff":T.mist, cursor:"pointer", transition:"all 0.15s" }}>{l}</button>
        ))}
      </div>

      {/* ── PATTERN TAB */}
      {activeTab==="pattern" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div style={{ background:T.white, borderRadius:T.radiusL, border:`1px solid ${T.border}`, padding:24 }}>
            <Divider label="Pattern Parameters" />
            <LabeledSelect label="Style Modifier" value={styleModifier} onChange={setStyleModifier} options={PROMPT_VOCAB.styleModifiers} />
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>Thai Motif</label>
              <select value={motifCode} onChange={e=>setMotifCode(e.target.value)} style={{ width:"100%", padding:"9px 12px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.white, fontSize:13, fontFamily:"inherit", color:T.ink }}>
                {MOTIFS.map(m=><option key={m.code} value={m.code}>{m.code} — {m.name} ({m.thai})</option>)}
              </select>
            </div>
            <LabeledSelect label="Repeat Structure" value={structure} onChange={setStructure} options={PROMPT_VOCAB.structures} />
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>Colourway</label>
              <select value={colorwayName} onChange={e=>setColorwayName(e.target.value)} style={{ width:"100%", padding:"9px 12px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.white, fontSize:13, fontFamily:"inherit", color:T.ink }}>
                {PROMPT_VOCAB.colorways.map(c=><option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <LabeledSelect label="Target Surface" value={surface} onChange={setSurface} options={PROMPT_VOCAB.surfaces} />
            <LabeledSelect label="Mood" value={mood} onChange={setMood} options={PROMPT_VOCAB.moods} />
            <LabeledSelect label="AI Platform" value={platform} onChange={setPlatform} options={["Midjourney v6","ChatGPT (DALL-E 3)","Adobe Firefly","Stable Diffusion"]} />
          </div>

          <div>
            <div style={{ background:T.white, borderRadius:T.radiusL, border:`2px solid ${T.gold}`, padding:24, marginBottom:16 }}>
              <Divider label="Generated Pattern Prompt" />
              <div style={{ background:T.indigoD, borderRadius:T.radius, padding:"14px 16px", color:"#C8D8FF", fontFamily:"monospace", fontSize:12, lineHeight:1.8, minHeight:200, whiteSpace:"pre-wrap", wordBreak:"break-word", marginBottom:14 }}>
                {buildPatternPrompt()}
              </div>
              <button onClick={()=>doCopy(buildPatternPrompt(),setCopied)} style={{ width:"100%", padding:"10px", background:copied?T.jade:T.indigo, border:"none", color:"#fff", borderRadius:T.radius, fontWeight:700, cursor:"pointer", fontSize:13, letterSpacing:"0.04em", transition:"background 0.2s" }}>
                {copied?"✓ Copied!":"⧉ Copy Pattern Prompt"}
              </button>
            </div>
            <div style={{ background:`${T.indigo}06`, borderRadius:T.radiusL, border:`1px solid ${T.border}`, padding:20 }}>
              <Divider label="Selected Motif" />
              <InfoBlock label="Code" value={selMotif.code} accent={T.gold} />
              <InfoBlock label="Thai Name" value={selMotif.thai} accent={T.indigo} />
              <InfoBlock label="Era" value={selMotif.era} accent={T.indigo} />
              <div style={{ fontSize:T.sm, color:T.mist, lineHeight:1.7, marginTop:8 }}>{selMotif.meaning}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── MOCKUP TAB */}
      {activeTab==="mockup" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div style={{ background:T.white, borderRadius:T.radiusL, border:`1px solid ${T.border}`, padding:24 }}>
            <Divider label="Product Mockup Parameters" />
            <AlertBox type="info">Select your product, collection and setting — then copy the prompt into ChatGPT, Midjourney, or DALL-E 3.</AlertBox>

            {/* Product grid */}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:8 }}>Product</label>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                {PRODUCTS.map(p=>(
                  <button key={p.name} onClick={()=>setProduct(p.name)} style={{ padding:"8px 4px", borderRadius:T.radius, border:`1px solid ${product===p.name?T.gold:T.border}`, background:product===p.name?`${T.gold}18`:T.ground, cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
                    <div style={{ fontSize:18, marginBottom:2 }}>{p.emoji}</div>
                    <div style={{ fontSize:9, color:product===p.name?T.gold:T.mist, fontWeight:product===p.name?700:400, lineHeight:1.3 }}>{p.name.split(" ").slice(0,2).join(" ")}</div>
                  </button>
                ))}
              </div>
            </div>

            <LabeledSelect label="Collection" value={collection} onChange={setCollection} options={INIT_COLLECTIONS.map(c=>c.name)} />
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>Colorway</label>
              <select value={colorwayMockup} onChange={e=>setColorwayMockup(e.target.value)} style={{ width:"100%", padding:"9px 12px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.white, fontSize:13, fontFamily:"inherit", color:T.ink }}>
                {PROMPT_VOCAB.colorways.map(c=><option key={c.name} value={c.value}>{c.name}</option>)}
              </select>
            </div>
            <LabeledSelect label="Setting" value={setting} onChange={setSetting} options={SETTINGS} />
            <LabeledSelect label="Lighting" value={lighting} onChange={setLighting} options={LIGHTINGS} />
            <LabeledSelect label="AI Platform" value={platformMockup} onChange={setPlatformMockup} options={["ChatGPT (DALL-E 3)","Midjourney v6","Adobe Firefly","Gemini"]} />
          </div>

          <div>
            <div style={{ background:T.white, borderRadius:T.radiusL, border:`2px solid ${T.gold}`, padding:24 }}>
              <div style={{ marginBottom:12 }}>
                <div style={{ fontWeight:900, color:T.indigo, fontSize:T.lg, fontFamily:"Georgia,serif" }}>
                  {PRODUCTS.find(p=>p.name===product)?.emoji} {product}
                </div>
                <div style={{ fontSize:T.xs, color:T.mist, marginTop:2 }}>{collection} · {platformMockup}</div>
              </div>
              <div style={{ background:T.indigoD, borderRadius:T.radius, padding:"14px 16px", color:"#C8D8FF", fontFamily:"monospace", fontSize:11, lineHeight:1.8, maxHeight:380, overflowY:"auto", whiteSpace:"pre-wrap", wordBreak:"break-word", marginBottom:14 }}>
                {buildMockupPrompt()}
              </div>
              <button onClick={()=>doCopy(buildMockupPrompt(),setMockupCopied)} style={{ width:"100%", padding:"10px", background:mockupCopied?T.jade:T.gold, border:"none", color:"#fff", borderRadius:T.radius, fontWeight:700, cursor:"pointer", fontSize:13, letterSpacing:"0.04em", transition:"background 0.2s" }}>
                {mockupCopied?"✓ Copied!":"⧉ Copy Mockup Prompt"}
              </button>
            </div>

            <div style={{ background:T.ground, borderRadius:T.radiusL, border:`1px solid ${T.border}`, padding:20, marginTop:14 }}>
              <Divider label="How to Use" />
              {[
                ["ChatGPT","Paste prompt → Press Enter → Download image"],
                ["Midjourney","Paste in Discord /imagine → U to upscale → Download"],
                ["Gemini","Paste in Gemini Advanced → Generate → Save"],
              ].map(([p,h])=>(
                <div key={p} style={{ marginBottom:10 }}>
                  <div style={{ fontSize:T.xs, fontWeight:700, color:T.gold }}>{p}</div>
                  <div style={{ fontSize:T.xs, color:T.mist, lineHeight:1.5 }}>{h}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function CollectionPlanner() {
  const [collections, setCollections] = useState(INIT_COLLECTIONS);
  const [form, setForm] = useState({ name:"", motif:"NIL-KNK", season:"Q2 2026", status:"Planned", designs:0, surfaces:"", colorways:2, notes:"" });
  const [adding, setAdding] = useState(false);
  const addCollection = () => { if(!form.name.trim()) return; setCollections(c=>[...c,{...form,id:Date.now()}]); setForm({ name:"", motif:"NIL-KNK", season:"Q2 2026", status:"Planned", designs:0, surfaces:"", colorways:2, notes:"" }); setAdding(false); };
  const updateStatus = (id,status) => setCollections(cs=>cs.map(c=>c.id===id?{...c,status}:c));
  return (
    <div>
      <SectionHead icon="◐" title="Collection Planner" subtitle="Track every collection from brief concept through to licensed release" />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ display:"flex", gap:10 }}>{STATUSES.map(s=><div key={s} style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:8, height:8, borderRadius:"50%", background:STATUS_COLORS[s] }} /><span style={{ fontSize:T.xs, color:T.mist, fontWeight:600 }}>{s}</span></div>)}</div>
        <Button onClick={()=>setAdding(!adding)} variant="gold" size="sm">{adding?"Cancel":"+ New Collection"}</Button>
      </div>
      {adding && (
        <Card style={{ marginBottom:16, border:`1px solid ${T.gold}44` }}>
          <Divider label="Add Collection" />
          <Grid cols={3} gap={10}>
            {[["Collection Name","name"],["Season / Quarter","season"],["Target Surfaces","surfaces"]].map(([l,k])=>(
              <div key={k}><label style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:4 }}>{l}</label><input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base, boxSizing:"border-box" }} /></div>
            ))}
            <div><label style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:4 }}>Primary Motif</label><select value={form.motif} onChange={e=>setForm(f=>({...f,motif:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base }}>{MOTIFS.map(m=><option key={m.code} value={m.code}>{m.name} — {m.code}</option>)}</select></div>
            <div><label style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:4 }}>Status</label><select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base }}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
            <div><label style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:4 }}>Notes</label><input value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base }} /></div>
          </Grid>
          <div style={{ marginTop:12 }}><Button onClick={addCollection}>Add to Planner</Button></div>
        </Card>
      )}
      <Card pad={0}>
        <DataTable headers={["Collection","Motif","Season","Designs","Surfaces","Colorways","Status","Notes"]}
          rows={collections.map(c=>[
            <span style={{ fontWeight:700, color:T.indigo }}>{c.name}</span>,
            <span style={{ fontFamily:"monospace", fontSize:T.xs, color:T.gold }}>{c.motif}</span>,
            c.season, c.designs, c.surfaces, c.colorways,
            <div style={{ display:"flex", gap:6, alignItems:"center" }}><div style={{ width:7, height:7, borderRadius:"50%", background:STATUS_COLORS[c.status]||T.mist }} /><select value={c.status} onChange={e=>updateStatus(c.id,e.target.value)} style={{ border:"none", background:"transparent", color:T.ink, fontSize:T.sm, cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>,
            <span style={{ color:T.mist, fontSize:T.sm }}>{c.notes}</span>,
          ])} />
      </Card>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// LICENSING MODEL
// ────────────────────────────────────────────────────────────
function LicensingModel() {
  const tierColor = { "NILA-POD":T.jade, "NILA-COM":T.goldL, "NILA-BRD":T.indigoL, "NILA-EXC":T.crimson };
  const tagColor  = { "NILA-POD":"jade", "NILA-COM":"gold",   "NILA-BRD":"indigo",  "NILA-EXC":"red" };
  return (
    <div>
      <SectionHead icon="◆" title="Licensing Model" subtitle="A four-tier structure covering individual POD sellers to exclusive brand commissions" />
      <AlertBox type="warning">Pre-launch: No licence agreements have been executed. All fees below are indicative planning ranges only. Licence templates must be reviewed by a qualified Thai IP lawyer before first use.</AlertBox>
      {LICENSE_TIERS.map(l=>{ const tc=tierColor[l.code]; const tg=tagColor[l.code]; return (
        <Card key={l.code} style={{ marginBottom:14, borderLeft:`3px solid ${tc}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div><Tag color={tg}>{l.code}</Tag><div style={{ fontWeight:900, color:tc, fontSize:T.xl, marginTop:6, fontFamily:"Georgia,serif" }}>{l.tier}</div></div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontWeight:800, color:tc, fontSize:T.lg }}>USD {l.priceUSD[0].toLocaleString()}–{l.priceUSD[1].toLocaleString()}</div>
              <div style={{ fontSize:T.sm, color:T.mist }}>THB {l.priceTHB[0].toLocaleString()}–{l.priceTHB[1].toLocaleString()} approx.</div>
              <div style={{ fontSize:T.xs, color:T.mist, marginTop:2, fontStyle:"italic" }}>Indicative — varies by scope</div>
            </div>
          </div>
          <p style={{ color:T.mist, fontSize:T.base, margin:"0 0 14px", lineHeight:1.7 }}>{l.desc}</p>
          <Grid cols={2} gap={12}>
            <div><div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Rights Included</div>{l.rights.map((r,i)=><div key={i} style={{ display:"flex", gap:7, marginBottom:5 }}><span style={{ color:tc, fontWeight:700, flexShrink:0 }}>✓</span><span style={{ fontSize:T.sm, color:"#4B5563", lineHeight:1.5 }}>{r}</span></div>)}</div>
            <div><InfoBlock label="Ideal for" value={l.ideal} accent={tc} /><InfoBlock label="Not for" value={l.notFor} accent={T.crimson} /></div>
          </Grid>
        </Card>
      );})}
      <Card style={{ marginTop:8 }}>
        <Divider label="Revenue Model — Indicative Planning Targets Only" />
        <p style={{ color:T.mist, fontSize:T.sm, marginBottom:12 }}>Figures below are planning targets, not guaranteed outcomes. Actual revenue depends on collection quality, client pipeline, and market conditions. No revenue has been generated to date.</p>
        <DataTable headers={["Channel","Licence Type","Target Frequency","Indicative Range per Deal"]}
          rows={[["POD Platforms (passive)","POD Licence","8–15 sales/month","USD 30–120/sale"],["Small Brand Production","Commercial Licence","1–2 deals/quarter","USD 400–1,800/deal"],["Collection Brand Deals","Brand Collection Licence","1 deal/quarter","USD 2,500–9,000/deal"],["Custom Commissions","Exclusive Commission","1–2 per year","USD 8,000–40,000/project"]]} />
      </Card>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// LICENSING CALCULATOR
// ────────────────────────────────────────────────────────────
function LicensingCalculator() {
  const FX_RATES = { USD:1, THB:35.5, EUR:0.92, GBP:0.78 };
  const [params, setParams] = useState({
    tier:"NILA-COM", designs:1, colorways:1,
    exclusivity:"none", territory:"single", duration:1,
    rush:false, currency:"USD", baseRate:null,
  });
  const set = (k,v) => setParams(p=>({...p,[k]:v}));

  const calc = useMemo(()=>{
    const tier = LICENSE_TIERS.find(l=>l.code===params.tier);
    if (!tier) return null;
    const base = params.baseRate || (tier.priceUSD[0]+tier.priceUSD[1])/2;
    let fee = base;
    if (params.designs>1) fee += (params.designs-1)*base*0.6;
    if (params.colorways>1) fee += (params.colorways-1)*base*0.15;
    fee *= ({none:1,regional:1.35,global:1.8}[params.exclusivity]??1)
         * ({single:1,regional:1.2,global:1.5}[params.territory]??1)
         * (params.duration<=1?1:1+(params.duration-1)*0.2);
    if (params.rush) fee *= 1.25;
    fee = Math.round(fee/50)*50;
    const rate = FX_RATES[params.currency]||1;
    const converted = Math.round(fee*rate);
    const symbols = {USD:"$",THB:"฿",EUR:"€",GBP:"£"};
    return { feeUSD:fee, converted, symbol:symbols[params.currency]||"", currency:params.currency, tier:tier.tier };
  },[params]);

  const SelectRow = ({label,optKey,options}) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>{label}</label>
      <select value={params[optKey]} onChange={e=>{ const v=isNaN(Number(e.target.value))?e.target.value:Number(e.target.value); set(optKey,v); }} style={{ width:"100%", padding:"8px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.white, fontSize:T.base, fontFamily:"inherit" }}>
        {options.map(([v,l])=><option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  return (
    <div>
      <SectionHead icon="◇" title="Licensing Calculator" subtitle="Multi-currency fee estimator — indicative only, for client discussion purposes" />
      <Grid cols={2} gap={14}>
        <Card>
          <Divider label="Project Scope" />
          <SelectRow label="Licence Tier" optKey="tier" options={LICENSE_TIERS.map(l=>[l.code,`${l.tier} (${l.code})`])} />
          <SelectRow label="Number of Designs" optKey="designs" options={[[1,"1 design"],[2,"2 designs"],[4,"4 designs"],[6,"6 designs"],[8,"8 designs"],[12,"12 designs (full collection)"]]} />
          <SelectRow label="Colourways per Design" optKey="colorways" options={[[1,"1 colourway"],[2,"2 colourways"],[3,"3 colourways"]]} />
          <SelectRow label="Exclusivity" optKey="exclusivity" options={[["none","Non-exclusive (multi-brand)"],["regional","Regional exclusive (6-month window)"],["global","Full global exclusive (IP asset)"]]} />
          <SelectRow label="Territory" optKey="territory" options={[["single","Single country / region"],["regional","Regional (e.g. SE Asia, EU)"],["global","Worldwide"]]} />
          <SelectRow label="Licence Duration" optKey="duration" options={[[1,"1 year"],[2,"2 years"],[3,"3 years"]]} />
          <Divider label="Settlement Currency" />
          <SelectRow label="Invoice Currency" optKey="currency" options={[["USD","USD ($) — Global default"],["THB","THB (฿) — Local Thailand"],["EUR","EUR (€) — Eurozone"],["GBP","GBP (£) — United Kingdom"]]} />
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>Custom Base Rate (USD) — Optional</label>
            <input type="number" value={params.baseRate||""} onChange={e=>set("baseRate", e.target.value?Number(e.target.value):null)}
              placeholder="Leave blank to use tier midpoint"
              style={{ width:"100%", padding:"8px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base, boxSizing:"border-box" }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:T.ground, borderRadius:T.radius, marginTop:4 }}>
            <input type="checkbox" id="rush" checked={params.rush} onChange={e=>set("rush",e.target.checked)} style={{ width:16, height:16, cursor:"pointer" }} />
            <label htmlFor="rush" style={{ fontSize:T.base, color:T.ink, cursor:"pointer" }}>Rush delivery (+25%) — under 10 business days</label>
          </div>
        </Card>
        <div>
          <Card style={{ border:`2px solid ${T.gold}`, marginBottom:14 }}>
            <Divider label="Fee Estimate" />
            {calc && <>
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Indicative Licence Fee</div>
                <div style={{ fontSize:40, fontWeight:900, color:T.indigo, fontFamily:"Georgia,serif", lineHeight:1 }}>
                  {calc.symbol}{calc.converted.toLocaleString()} {calc.currency}
                </div>
                {calc.currency !== "USD" && (
                  <div style={{ fontSize:T.sm, color:T.mist, marginTop:6 }}>
                    ≈ USD {calc.feeUSD.toLocaleString()} (FX indicative)
                  </div>
                )}
                <div style={{ fontSize:T.sm, color:T.mist, marginTop:6 }}>
                  ≈ THB {Math.round(calc.feeUSD*35.5).toLocaleString()}
                </div>
                <div style={{ fontSize:T.sm, color:T.mist, marginTop:8 }}>{calc.tier}</div>
              </div>
              <div style={{ background:"#FEF9EC", border:`1px solid ${T.gold}44`, borderRadius:T.radius, padding:"12px 14px", fontSize:T.sm, color:"#7A5C10" }}>
                <strong>Disclaimer:</strong> Indicative only. Final fees agreed in writing. FX rates are reference only — verify live rates before invoicing. USD base: {calc.feeUSD.toLocaleString()}.
              </div>
            </>}
          </Card>
          <Card>
            <Divider label="FX Reference Rates (Indicative)" />
            {Object.entries(FX_RATES).map(([cur,rate])=>(
              <div key={cur} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${T.borderL}` }}>
                <span style={{ fontSize:T.sm, color:T.mist }}>{cur}</span>
                <span style={{ fontWeight:700, color:T.indigo, fontSize:T.sm }}>1 USD = {rate} {cur}</span>
              </div>
            ))}
            <div style={{ fontSize:T.xs, color:T.mist, marginTop:8, fontStyle:"italic" }}>Update FX rates manually before client meetings. Live API integration available in production build.</div>
          </Card>
          <Card style={{ marginTop:14 }}>
            <Divider label="What Affects the Fee" />
            {[["Base rate","Set by licence tier (or custom input above)"],["Additional designs","Each extra design adds ~60% of base rate"],["Additional colourways","Each extra colourway adds ~15% of base rate"],["Exclusivity","Regional ×1.35; global exclusive ×1.8"],["Territory","Regional ×1.2; worldwide ×1.5"],["Duration","Each year beyond year 1 adds 20%"],["Rush delivery","Under 10 business days adds 25%"]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", gap:8, marginBottom:8 }}><span style={{ color:T.gold, fontWeight:700, flexShrink:0, fontSize:T.sm }}>→</span><span style={{ fontSize:T.sm, color:T.mist, lineHeight:1.5 }}><strong style={{ color:T.ink }}>{k}:</strong> {v}</span></div>
            ))}
          </Card>
        </div>
      </Grid>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// CLIENT CRM  — All pre-loaded entries are fictional placeholders
// ────────────────────────────────────────────────────────────
const INIT_CLIENTS = [
  { id:1, company:"Maison du Décor (fictional placeholder)", contact:"Licensing Dept", email:"—", segment:"Surface Brand", stage:"Research", collection:"Midnight Siam", value:"USD 5,000–8,000", lastContact:"—", notes:"Sample research prospect only. No contact made." },
  { id:2, company:"Veranda Resort Group (fictional placeholder)", contact:"Design Manager", email:"—", segment:"Luxury Hospitality", stage:"Research", collection:"Midnight Siam", value:"USD 12,000+", lastContact:"—", notes:"Sample research prospect only. No contact made." },
  { id:3, company:"Spoonflower (POD platform — real)", contact:"Seller onboarding", email:"—", segment:"POD Seller", stage:"Research", collection:"Dok Mali Botanical", value:"USD 45/design", lastContact:"—", notes:"Platform to set up seller account. No listing yet." },
];
const STAGES = ["Research","Cold Outreach","Proposal Sent","Negotiation","Licenced","Declined"];
const STAGE_COLORS = { Research:T.mist, "Cold Outreach":T.indigoL, "Proposal Sent":T.gold, Negotiation:T.lotus, Licenced:T.jade, Declined:T.crimson };

function ClientCRM() {
  const [clients, setClients] = useState(INIT_CLIENTS);
  const [adding, setAdding] = useState(false);
  const [sortKey, setSortKey] = useState("stage");
  const [form, setForm] = useState({ company:"", contact:"", email:"", segment:"Surface Brand", stage:"Research", collection:"", value:"", lastContact:"", notes:"" });
  const sorted = useMemo(()=>[...clients].sort((a,b)=>{ if(sortKey==="stage") return STAGES.indexOf(a.stage)-STAGES.indexOf(b.stage); return (a[sortKey]||"").localeCompare(b[sortKey]||""); }),[clients,sortKey]);
  const addClient = () => { if(!form.company.trim()) return; setClients(c=>[...c,{...form,id:Date.now()}]); setForm({ company:"", contact:"", email:"", segment:"Surface Brand", stage:"Research", collection:"", value:"", lastContact:"", notes:"" }); setAdding(false); };
  const updateStage = (id,stage) => setClients(cs=>cs.map(c=>c.id===id?{...c,stage}:c));
  const stageCounts = STAGES.reduce((acc,s)=>{ acc[s]=clients.filter(c=>c.stage===s).length; return acc; },{});
  return (
    <div>
      <SectionHead icon="▣" title="Client CRM" subtitle="Track every prospect, proposal, and active licence relationship" />
      <AlertBox type="warning">All pre-loaded entries are fictional placeholders for demo purposes only. No outreach has been made to any real company. Replace these with your own real research prospects.</AlertBox>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8, marginBottom:20 }}>
        {STAGES.map(s=><div key={s} style={{ background:T.white, border:`1px solid ${T.border}`, borderTop:`3px solid ${STAGE_COLORS[s]}`, borderRadius:T.radius, padding:"10px 12px", textAlign:"center" }}>
          <div style={{ fontSize:T.xl, fontWeight:900, color:STAGE_COLORS[s] }}>{stageCounts[s]||0}</div>
          <div style={{ fontSize:T.xs, color:T.mist, fontWeight:600 }}>{s}</div>
        </div>)}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:T.sm, color:T.mist, fontWeight:600 }}>Sort by:</span>
          {["stage","company","segment"].map(k=><button key={k} onClick={()=>setSortKey(k)} style={{ padding:"4px 12px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${sortKey===k?T.indigo:T.border}`, background:sortKey===k?T.indigo:T.white, color:sortKey===k?"#fff":T.mist, cursor:"pointer", textTransform:"capitalize" }}>{k}</button>)}
        </div>
        <Button onClick={()=>setAdding(!adding)} variant="gold" size="sm">{adding?"Cancel":"+ Add Contact"}</Button>
      </div>
      {adding && (
        <Card style={{ marginBottom:14, border:`1px solid ${T.gold}44` }}>
          <Divider label="New Contact" />
          <Grid cols={3} gap={10}>
            {[["Company / Brand","company"],["Contact Name","contact"],["Email","email"],["Collection","collection"],["Indicative Value","value"],["Last Contact","lastContact"]].map(([l,k])=>(
              <div key={k}><label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{l}</label><input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base, boxSizing:"border-box" }} /></div>
            ))}
            <div><label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Segment</label><select value={form.segment} onChange={e=>setForm(f=>({...f,segment:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base }}>{["Surface Brand","Luxury Hospitality","POD Seller","Consumer Brand","Interior Studio"].map(s=><option key={s}>{s}</option>)}</select></div>
            <div><label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Stage</label><select value={form.stage} onChange={e=>setForm(f=>({...f,stage:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base }}>{STAGES.map(s=><option key={s}>{s}</option>)}</select></div>
            <div><label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Notes</label><input value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base }} /></div>
          </Grid>
          <div style={{ marginTop:12 }}><Button onClick={addClient}>Add to CRM</Button></div>
        </Card>
      )}
      <Card pad={0}>
        <DataTable compact headers={["Company","Contact","Segment","Stage","Collection","Value","Last Contact","Notes"]}
          rows={sorted.map(c=>[
            <span style={{ fontWeight:700, color:T.indigo }}>{c.company}</span>,
            c.contact, <Tag color="mist" size="xs">{c.segment}</Tag>,
            <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:6, height:6, borderRadius:"50%", background:STAGE_COLORS[c.stage]||T.mist, flexShrink:0 }} /><select value={c.stage} onChange={e=>updateStage(c.id,e.target.value)} style={{ border:"none", background:"transparent", fontSize:T.sm, color:T.ink, cursor:"pointer", fontFamily:"inherit", fontWeight:600, padding:0 }}>{STAGES.map(s=><option key={s}>{s}</option>)}</select></div>,
            <span style={{ fontFamily:"monospace", fontSize:T.xs, color:T.gold }}>{c.collection}</span>,
            <span style={{ color:T.jade, fontWeight:700, fontSize:T.sm }}>{c.value}</span>,
            c.lastContact, <span style={{ color:T.mist, fontSize:T.sm }}>{c.notes}</span>,
          ])} />
      </Card>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// FIRST 20 TARGETS
// ────────────────────────────────────────────────────────────
function First20Targets() {
  const [targets, setTargets] = useState(INIT_TARGETS);
  const [catFilter, setCatFilter] = useState("All");
  const cats = ["All","Surface Brand","Luxury Hospitality","Consumer Brand","Interior Studio","POD Platform"];
  const visible = catFilter==="All" ? targets : targets.filter(t=>t.cat===catFilter);
  const updateStage = (id,stage) => setTargets(ts=>ts.map(t=>t.id===id?{...t,stage}:t));
  const stageCounts = OUTREACH_STAGES.reduce((acc,s)=>{ acc[s]=targets.filter(t=>t.stage===s).length; return acc; },{});
  const pct = Math.round((targets.filter(t=>t.stage!=="To Research").length/targets.length)*100);
  return (
    <div>
      <SectionHead icon="◎" title="First 20 Targets" subtitle="Pre-launch BD pipeline — 20 prioritised research prospects across 5 segments" />
      <AlertBox type="info">All bracket names [like this] are research placeholders — not real companies. Identify and replace them with actual prospects during your research phase. Spoonflower, Society6, Redbubble, and Contrado are real POD platforms referenced for research purposes only — no affiliation or endorsement is implied.</AlertBox>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
        {[{l:"Total Pipeline",v:20,a:T.indigo},{l:"To Research",v:stageCounts["To Research"]||0,a:T.gold},{l:"In Progress",v:targets.filter(t=>t.stage!=="To Research"&&t.stage!=="Passed").length,a:T.jade},{l:"Research Progress",v:`${pct}%`,a:T.amber}].map(k=>(
          <div key={k.l} style={{ background:T.white, border:`1px solid ${T.border}`, borderLeft:`3px solid ${k.a}`, borderRadius:T.radius, padding:"12px 16px" }}>
            <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", marginBottom:4 }}>{k.l}</div>
            <div style={{ fontSize:T.xl, fontWeight:900, color:k.a }}>{k.v}</div>
          </div>
        ))}
      </div>
      <div style={{ height:6, background:T.ground, borderRadius:3, overflow:"hidden", marginBottom:20 }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${T.indigo},${T.gold})`, borderRadius:3, transition:"width 0.3s" }} />
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {cats.map(c=><button key={c} onClick={()=>setCatFilter(c)} style={{ padding:"5px 14px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${catFilter===c?T.indigo:T.border}`, background:catFilter===c?T.indigo:T.white, color:catFilter===c?"#fff":T.mist, cursor:"pointer" }}>{c}{c==="All"?` (${targets.length})`:""}</button>)}
      </div>
      <Card pad={0}>
        <DataTable compact headers={["#","Category","Prospect","Region","Why Relevant","Collection","Outreach Stage"]}
          rows={visible.map(t=>[
            <span style={{ fontFamily:"monospace", fontSize:T.xs, color:T.mist }}>{t.id}</span>,
            <Tag color="indigo" size="xs">{t.cat}</Tag>,
            <span style={{ fontWeight:700, color:T.indigo, fontSize:T.sm }}>{t.name}</span>,
            <span style={{ fontSize:T.xs, color:T.mist }}>{t.region}</span>,
            <span style={{ fontSize:T.xs, color:"#374151", lineHeight:1.5 }}>{t.why}</span>,
            <span style={{ fontFamily:"monospace", fontSize:T.xs, color:T.gold }}>{t.collection}</span>,
            <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:6, height:6, borderRadius:"50%", background:OUTREACH_COLORS[t.stage]||T.mist, flexShrink:0 }} /><select value={t.stage} onChange={e=>updateStage(t.id,e.target.value)} style={{ border:"none", background:"transparent", fontSize:T.xs, color:T.ink, cursor:"pointer", fontFamily:"inherit", fontWeight:600, padding:0 }}>{OUTREACH_STAGES.map(s=><option key={s}>{s}</option>)}</select></div>,
          ])} />
      </Card>
      <Card style={{ marginTop:14 }}>
        <Divider label="Outreach Stage Legend" />
        <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
          {OUTREACH_STAGES.map(s=><div key={s} style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:8, height:8, borderRadius:"50%", background:OUTREACH_COLORS[s] }} /><span style={{ fontSize:T.xs, color:T.mist, fontWeight:600 }}>{s}</span></div>)}
        </div>
      </Card>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// STUDIO WORKFLOW
// ────────────────────────────────────────────────────────────
function StudioWorkflow() {
  const steps = [
    { n:1, title:"Collection Concept Brief", time:"Days 1–2", color:T.indigo, tasks:["Name the collection: [Season] + [Thai Cultural Reference]","Select 1–2 primary motifs from the NILA Library","Choose a master colourway + one alternative","Identify target surfaces and product categories","Write the collection story (100 words): cultural source, contemporary relevance","Document in Collection Brief template CB-[YEAR]-[NUMBER]"] },
    { n:2, title:"AI Generation Sprint", time:"Days 2–4", color:T.goldL, tasks:["Generate 30–50 raw outputs using Prompt Generator selections","Run three structural variations per prompt: allover / border / focal","Target platform: Midjourney v6, Adobe Firefly, or DALL-E 3","Apply Universal Negative Prompts to every generation","Archive all successful prompts with reference codes in Prompt Archive","Sort outputs into three folders: A (hero), B (support), C (reject)"] },
    { n:3, title:"Curation & Selection", time:"Days 4–5", color:T.jade, tasks:["Select 8–12 hero candidates from the A folder","Apply NILA Design Principles check: Sacred Geometry, Restraint, Dual-Scale","Verify cultural accuracy — cross-reference motif source documentation","Confirm commercial viability: does this work at scale on its target surface?","Identify 3–4 designs suitable for alternative colourways","Final cut: 6–8 designs per collection (quality over volume)"] },
    { n:4, title:"Post-Production", time:"Days 5–8", color:T.lotus, tasks:["Vectorise key designs in Adobe Illustrator or Vectornator","Build seamless tile version of each design","Produce colourway variants: original + minimum 2 alternatives","Create Tier 1 mockups: wallcovering room scene + fabric bolt","Export all formats: SVG, EPS, PNG 300 dpi, TIFF, seamless PNG","Name files: NIL-[MOTIF CODE]-[COLLECTION]-[VARIANT]-v[N]"] },
    { n:5, title:"Documentation & IP", time:"Days 8–10", color:"#7C3AED", tasks:["Complete Collection Metadata Sheet: sources, prompt codes, design intent","Prepare copyright registration package / submit only after final artwork approval","Embed NILA™ metadata and watermark to all master files","Write individual design descriptions (50 words each) for catalogue","Archive all source files: cloud primary + local encrypted backup","Confirm Cultural Reference Document is complete and accurate"] },
    { n:6, title:"Release & Licensing", time:"Days 10–14", color:T.gold, tasks:["Publish to NILA Portfolio — website gallery and PDF catalogue","Upload to POD platforms under POD Licence terms","Prepare targeted pitch decks for Brand Licence prospects","Publish collection launch content: Instagram + LinkedIn + Pinterest","Tag collection in CRM as Available / Under Discussion / Licensed","Set six-month review flag for renewal or catalogue retirement"] },
  ];
  return (
    <div>
      <SectionHead icon="▶" title="Studio Workflow" subtitle="From motif brief to licensable collection — a repeatable six-stage process" />
      {steps.map(s=>(
        <Card key={s.n} style={{ marginBottom:14 }}>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ flexShrink:0, textAlign:"center" }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:s.color, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:T.lg }}>{s.n}</div>
              <div style={{ fontSize:T.xs, color:T.mist, marginTop:4, whiteSpace:"nowrap" }}>{s.time}</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, color:s.color, fontSize:T.lg, marginBottom:10, fontFamily:"Georgia,serif" }}>{s.title}</div>
              <Grid cols={2} gap={8}>
                {s.tasks.map((t,i)=><div key={i} style={{ display:"flex", gap:7, alignItems:"flex-start" }}><span style={{ color:s.color, fontWeight:700, flexShrink:0, fontSize:T.sm }}>→</span><span style={{ fontSize:T.sm, color:"#374151", lineHeight:1.6 }}>{t}</span></div>)}
              </Grid>
            </div>
          </div>
        </Card>
      ))}
      <Card>
        <Divider label="Annual Collection Calendar — 2026" />
        <DataTable headers={["Quarter","Theme","Primary Motifs","Target Market","Deliverable Goal"]}
          rows={[
            ["Q2 2026","Midnight Siam — Flagship Collection","Kanok (NIL-KNK)","Wallcovering / Textile / Packaging","20 patterns, 3 colourways, 10 mockups — Phase 1"],
            ["Q3 2026","Dok Mali Botanical — Spa & Wellness","Dok Mali, Lotus Bud","Stationery / Packaging","6–8 designs, 2 colourways"],
            ["Q4 2026","Naga Sacred Geometry — Architecture","Naga Scale, Bai Raka","Tile / Wallcovering","8–10 designs, 3 colourways"],
            ["Q1 2027","Loi Krathong — Ceremony & Light","Phum Khaobin, Auspicious Radiance","Packaging / Gifting","10–12 designs, 3 colourways"],
          ]} />
      </Card>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// PRE-LAUNCH LEGAL CHECKLIST
// ────────────────────────────────────────────────────────────
function PreLaunchLegal() {
  const [checked, setChecked] = useState({});
  const toggle = id => setChecked(c=>({...c,[id]:!c[id]}));
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done/LEGAL.length)*100);
  const critDone = LEGAL.filter(l=>l.priority==="Critical"&&checked[l.id]).length;
  const critTotal = LEGAL.filter(l=>l.priority==="Critical").length;
  return (
    <div>
      <SectionHead icon="⚑" title="Pre-Launch Legal Checklist" subtitle="Complete all Critical and High priority items before issuing any licence agreement" />
      <AlertBox type="warning">This checklist is a planning guide only — not legal advice. Engage a qualified Thai IP and commercial lawyer before issuing any licence agreements or making formal business claims.</AlertBox>
      <Card style={{ marginBottom:16 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {[{l:"Critical Complete",v:`${critDone}/${critTotal}`,a:T.crimson},{l:"Total Items",v:LEGAL.length,a:T.indigo},{l:"Complete",v:done,a:T.jade},{l:"Progress",v:`${pct}%`,a:T.amber}].map(k=>(
            <div key={k.l} style={{ background:T.ground, borderLeft:`3px solid ${k.a}`, borderRadius:T.radius, padding:"12px 16px" }}>
              <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", marginBottom:4 }}>{k.l}</div>
              <div style={{ fontSize:T.xl, fontWeight:900, color:k.a }}>{k.v}</div>
            </div>
          ))}
        </div>
        <div style={{ height:8, background:T.ground, borderRadius:4, overflow:"hidden", marginTop:14 }}>
          <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${T.crimson},${T.gold})`, borderRadius:4, transition:"width 0.3s" }} />
        </div>
        <div style={{ fontSize:T.xs, color:T.mist, marginTop:6 }}>{done} of {LEGAL.length} items complete</div>
      </Card>
      {LEGAL_CATS.map(cat=>{
        const items = LEGAL.filter(l=>l.cat===cat);
        return (
          <Card key={cat} style={{ marginBottom:14 }}>
            <Divider label={cat} />
            {items.map(item=>{
              const pc = LEGAL_PRIORITY_COLOR[item.priority];
              const isDone = !!checked[item.id];
              return (
                <div key={item.id} onClick={()=>toggle(item.id)}
                  style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12, cursor:"pointer", padding:"10px 12px", borderRadius:T.radius, background:isDone?"#F0FDF4":T.ground, border:`1px solid ${isDone?"#86EFAC":T.border}`, transition:"all 0.15s" }}>
                  <div style={{ width:20, height:20, borderRadius:4, flexShrink:0, marginTop:1, border:isDone?"none":`2px solid ${pc}`, background:isDone?T.jade:"transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
                    {isDone && <span style={{ color:"#fff", fontSize:11, fontWeight:900 }}>✓</span>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4, flexWrap:"wrap" }}>
                      <span style={{ fontFamily:"monospace", fontSize:T.xs, color:T.mist }}>{item.id}</span>
                      <span style={{ background:`${pc}18`, color:pc, border:`1px solid ${pc}44`, borderRadius:4, padding:"1px 7px", fontSize:T.xs, fontWeight:700 }}>{item.priority}</span>
                    </div>
                    <div style={{ fontWeight:700, color:isDone?T.jade:T.ink, fontSize:T.base, textDecoration:isDone?"line-through":"none", lineHeight:1.5, marginBottom:4 }}>{item.item}</div>
                    <div style={{ fontSize:T.sm, color:T.mist, lineHeight:1.5 }}>→ {item.action}</div>
                  </div>
                </div>
              );
            })}
          </Card>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 30-DAY ACTION PLAN
// ────────────────────────────────────────────────────────────
function ActionPlan() {
  const [checked, setChecked] = useState({});
  const toggle = key => setChecked(c=>({...c,[key]:!c[key]}));
  const weeks = [
    { week:"Week 1", title:"Foundation, Legal & IP Protection", color:T.indigo, days:[
      { day:"Day 1–2", tasks:["File NILA™ trademark with Thai DIP (dip.go.th) — Class 42 design services","Purchase domain: niladesign.co or niladesign.studio","Build NILA Master Library folder architecture in Google Drive","Set up NILA business email via Google Workspace"] },
      { day:"Day 3–4", tasks:["Register legal entity with DBD (Thai limited company)","Open dedicated business bank account for NILA","Consult Thai IP lawyer — Madrid System feasibility for EU/US/UK markets","Finalise Brand Bible: tagline, mission, positioning as Thai Cultural IP Company"] },
      { day:"Day 5–7", tasks:["Engage Thai IP lawyer — review and approve all licence agreement templates","Apply watermarks and 72-DPI preview limits to all public-facing digital assets","Set up Canva Pro workspace with NILA brand kit","Begin AI generation sprint: Midnight Siam — 30 prompts"] },
    ]},
    { week:"Week 2", title:"Midnight Siam — Collection Launch", color:T.gold, days:[
      { day:"Day 8–10", tasks:["Curate 20 hero designs from Midnight Siam sprint (target: 20 patterns)","Post-produce: vectorise, seamless tile, 2 colourways each","Produce Tier 1 mockups (wallcovering + textile) for all 8 designs","Write Collection Brief with Cultural Reference Document"] },
      { day:"Day 11–12", tasks:["Launch certified stores on Spoonflower & Society6 with English SEO-optimised titles","Optimise metadata: tags like 'luxury Thai pattern', 'royal indigo wallcovering', 'heritage surface design'","Write individual design descriptions for licensing catalogue","Prepare copyright registration package for Midnight Siam (Thai DIP)"] },
      { day:"Day 13–14", tasks:["Launch NILA Instagram — 3 reveal posts for Midnight Siam","Generate 12-page premium portfolio PDF with 3D mockup renders","Build NILA website with PDPA + GDPR-compliant Privacy Policy","Complete Legal Checklist items L01–L08"] },
    ]},
    { week:"Week 3", title:"Global Outreach & CRM Activation", color:T.jade, days:[
      { day:"Day 15–17", tasks:["Begin Dok Mali Botanical AI sprint (30 prompts)","Replace all 16 CRM placeholder names with real researched prospects — EU wallpaper brands, APAC luxury hotels","Create tailored pitch email templates in AI Sales Assistant module","Set up Contrado seller account — EU premium POD channel"] },
      { day:"Day 18–19", tasks:["Curate and post-produce Dok Mali Botanical (8 designs)","Produce packaging and stationery mockups for Dok Mali collection","Launch first cold outreach cycle — 5 tailored emails to top-scored prospects","Register PDPA + GDPR compliant Privacy Policy live on website"] },
      { day:"Day 20–21", tasks:["Post to LinkedIn: NILA™ introduction as NILA Heritage Living™","Publish Midnight Siam case study to Behance — cultural context + surface applications","Score all 20 prospects in Opportunity Scoring Engine — prioritise top 5","Follow up all outreach replies within 48 hours"] },
    ]},
    { week:"Week 4", title:"FX Validation, Revenue Tracking & Review", color:T.lotus, days:[
      { day:"Day 22–24", tasks:["Install Google Analytics — track global user origins and collection interest by country","Verify FX rates in Licensing Calculator before any client proposal","Conduct Asset Vault audit — confirm zero unprotected files in public channels","Run Opportunity Scoring update — reprioritise based on outreach responses"] },
      { day:"Day 25–27", tasks:["Send outreach to next 5 prospects from First 20 Targets list","Build NILA capability deck — 8 slides for international video call pitches","Engage 20 target accounts across Instagram and LinkedIn","Explore international design licensing directories for listing (e.g. Design Week, Maison et Objet directories)"] },
      { day:"Day 28–30", tasks:["30-day review: POD sales, website traffic, enquiry pipeline, CRM stage progression","Identify top-performing designs — plan additional colourways","Set 90-day milestone: first Commercial Licence enquiry from an international prospect","Confirm: 2 collections in development, legal foundation complete, global outreach active"] },
    ]},
  ];
  const totalTasks = weeks.flatMap(w=>w.days.flatMap(d=>d.tasks)).length;
  const doneTasks = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneTasks/totalTasks)*100);
  return (
    <div>
      <SectionHead icon="✦" title="30-Day Action Plan — 2026" subtitle="A daily task framework for NILA's first month of operation" />
      <Card style={{ marginBottom:14 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
          {[{label:"Target Collections",value:"2",accent:T.indigo},{label:"Designs in Progress",value:"8+",accent:T.gold},{label:"Legal Items Target",value:"L01–L12",accent:T.crimson},{label:"Progress",value:`${pct}%`,accent:T.lotus}].map(k=><Stat key={k.label} {...k} sub="" />)}
        </div>
        <div style={{ height:8, background:T.ground, borderRadius:4, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${T.indigo},${T.gold})`, borderRadius:4, transition:"width 0.3s" }} />
        </div>
        <div style={{ fontSize:T.xs, color:T.mist, marginTop:6 }}>{doneTasks} of {totalTasks} tasks complete</div>
      </Card>
      {weeks.map(wk=>(
        <Card key={wk.week} style={{ marginBottom:14 }}>
          <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:14 }}>
            <div style={{ background:wk.color, color:"#fff", borderRadius:T.radius, padding:"5px 14px", fontWeight:800, fontSize:T.sm }}>{wk.week}</div>
            <div style={{ fontWeight:800, color:T.indigo, fontSize:T.lg, fontFamily:"Georgia,serif" }}>{wk.title}</div>
          </div>
          {wk.days.map((d,di)=>(
            <div key={di} style={{ marginBottom:14 }}>
              <div style={{ fontSize:T.xs, fontWeight:700, color:wk.color, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:7 }}>{d.day}</div>
              {d.tasks.map((task,ti)=>{
                const key=`${wk.week}-${di}-${ti}`;
                return (
                  <div key={ti} onClick={()=>toggle(key)} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:6, cursor:"pointer", padding:"4px 0" }}>
                    <div style={{ width:18, height:18, borderRadius:4, flexShrink:0, border:checked[key]?"none":`2px solid ${wk.color}`, background:checked[key]?wk.color:"transparent", display:"flex", alignItems:"center", justifyContent:"center", marginTop:1, transition:"all 0.15s" }}>
                      {checked[key]&&<span style={{ color:"#fff", fontSize:11, fontWeight:900 }}>✓</span>}
                    </div>
                    <span style={{ fontSize:T.base, color:checked[key]?T.mist:"#374151", lineHeight:1.5, textDecoration:checked[key]?"line-through":"none", transition:"color 0.15s" }}>{task}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// DATA: ASSET VAULT
// ────────────────────────────────────────────────────────────
const COPYRIGHT_STATUSES = ["Not Started","In Preparation","Filed","Registered"];
const LICENSE_STATUSES   = ["Available","Under Discussion","Licensed","Reserved","Retired"];
const COPYRIGHT_COLORS   = { "Not Started":T.mist, "In Preparation":T.amber, Filed:T.indigoL, Registered:T.jade };
const LICENSE_STATUS_COLORS = { Available:T.jade, "Under Discussion":T.gold, Licensed:T.indigoL, Reserved:T.lotus, Retired:T.mist };

const INIT_ASSETS = [
  { id:"NIL-KNK-001", collection:"Midnight Siam", motif:"NIL-KNK", promptVer:"PV-001", platform:"Midjourney v6", surface:"Luxury wallcovering", colorway:"Royal Indigo + Temple Gold", copyright:"In Preparation", licenseStatus:"Available", formats:["SVG","TIFF","PNG 300dpi"], created:"2026-06-01", notes:"Midnight Siam — Hero allover repeat. Priority for Phase 1 portfolio." },
  { id:"NIL-KNK-002", collection:"Midnight Siam", motif:"NIL-KNK", promptVer:"PV-002", platform:"Midjourney v6", surface:"Upholstery fabric", colorway:"Jade Forest + Ivory Silk",   copyright:"In Preparation", licenseStatus:"Available", formats:["SVG","TIFF","PNG 300dpi"], created:"2026-06-02", notes:"Half-drop repeat variant." },
  { id:"NIL-KNK-003", collection:"Midnight Siam", motif:"NIL-KNK", promptVer:"PV-003", platform:"Adobe Firefly", surface:"Fine woven textile",  colorway:"Sacred Crimson + Gold",    copyright:"Not Started",    licenseStatus:"Available", formats:["TIFF","PNG 300dpi"],       created:"2026-06-03", notes:"Border stripe variant. Not yet vectorised." },
  { id:"NIL-DKM-001", collection:"Dok Mali Botanical", motif:"NIL-DKM", promptVer:"PV-010", platform:"Midjourney v6", surface:"Fine stationery set", colorway:"Lotus Rose + Moonlight", copyright:"Not Started", licenseStatus:"Available", formats:["PNG 300dpi"], created:"2026-06-10", notes:"Delicate allover. Stationery target." },
  { id:"NIL-DKM-002", collection:"Dok Mali Botanical", motif:"NIL-DKM", promptVer:"PV-011", platform:"Midjourney v6", surface:"Rigid luxury packaging", colorway:"Jade Forest + Ivory Silk", copyright:"Not Started", licenseStatus:"Available", formats:["PNG 300dpi"], created:"2026-06-11", notes:"Packaging focal point. Vectorise pending." },
];

// ────────────────────────────────────────────────────────────
// DATA: REVENUE DASHBOARD (sample planning data — pre-revenue)
// ────────────────────────────────────────────────────────────
const REVENUE_PLAN = [
  { month:"Jul 2026", pod:0,    licensing:0,    target:500  },
  { month:"Aug 2026", pod:120,  licensing:0,    target:1000 },
  { month:"Sep 2026", pod:240,  licensing:400,  target:2000 },
  { month:"Oct 2026", pod:360,  licensing:1800, target:3000 },
  { month:"Nov 2026", pod:480,  licensing:2500, target:4000 },
  { month:"Dec 2026", pod:600,  licensing:5000, target:6000 },
];

// ────────────────────────────────────────────────────────────
// DATA: OPPORTUNITY SCORING
// ────────────────────────────────────────────────────────────
const INIT_OPPORTUNITIES = [
  { id:1, prospect:"[Boutique Resort Group F — Thailand]", segment:"Luxury Hospitality", collection:"Midnight Siam", tier:"NILA-EXC", potentialUSD:15000, probability:65, urgency:80, notes:"Culturally aligned; active rebrand project" },
  { id:2, prospect:"[Wallcovering Brand A — EU]",          segment:"Surface Brand",      collection:"Midnight Siam", tier:"NILA-BRD", potentialUSD:7000,  probability:45, urgency:50, notes:"Large reach; cold outreach only" },
  { id:3, prospect:"[Heritage Hotel H — Bangkok]",         segment:"Luxury Hospitality", collection:"Midnight Siam", tier:"NILA-EXC", potentialUSD:12000, probability:55, urgency:70, notes:"Local market — easier to meet" },
  { id:4, prospect:"[Wellness Brand K — Thailand]",        segment:"Consumer Brand",     collection:"Dok Mali Botanical", tier:"NILA-COM", potentialUSD:1200, probability:70, urgency:60, notes:"Good fit; manageable deal size" },
  { id:5, prospect:"[Stationery Brand C — UK]",            segment:"Surface Brand",      collection:"Dok Mali Botanical", tier:"NILA-BRD", potentialUSD:5000, probability:40, urgency:40, notes:"High interest category; needs portfolio proof" },
  { id:6, prospect:"Spoonflower",                          segment:"POD Platform",       collection:"Midnight Siam", tier:"NILA-POD", potentialUSD:800,   probability:90, urgency:95, notes:"Fastest path to first revenue" },
];

// ────────────────────────────────────────────────────────────
// MODULE: ASSET VAULT
// ────────────────────────────────────────────────────────────
function AssetVault() {
  const [assets, setAssets] = useState(INIT_ASSETS);
  const [filter, setFilter] = useState("All");
  const [adding, setAdding] = useState(false);
  const [dbStatus, setDbStatus] = useState("idle"); // idle | saving | saved | error
  const [form, setForm] = useState({
    id:"", collection:"Midnight Siam", motif:"NIL-KNK", promptVer:"",
    platform:"Midjourney v6", surface:"", colorway:"", copyright:"Not Started",
    licenseStatus:"Available", formats:[], created:"", notes:"",
  });

  // ── Load from persistent storage on mount
  useState(() => {
    (async () => {
      try {
        const res = await window.storage.get("nila_asset_vault");
        if (res && res.value) {
          const stored = JSON.parse(res.value);
          if (stored.length) setAssets(stored);
        }
      } catch(e) {
        // No saved data yet — use INIT_ASSETS
      }
    })();
  });

  // ── Save all assets to persistent storage
  const saveToDb = async (updatedAssets) => {
    setDbStatus("saving");
    try {
      await window.storage.set("nila_asset_vault", JSON.stringify(updatedAssets));
      setDbStatus("saved");
      setTimeout(() => setDbStatus("idle"), 2500);
    } catch(e) {
      setDbStatus("error");
      setTimeout(() => setDbStatus("idle"), 3000);
    }
  };

  const addAsset = () => {
    if (!form.id.trim()) return;
    const updated = [...assets, { ...form, formats: form.formats || [] }];
    setAssets(updated);
    saveToDb(updated);
    setAdding(false);
    setForm({ id:"", collection:"Midnight Siam", motif:"NIL-KNK", promptVer:"", platform:"Midjourney v6", surface:"", colorway:"", copyright:"Not Started", licenseStatus:"Available", formats:[], created:"", notes:"" });
  };

  const updateAssetStatus = (id, field, val) => {
    const updated = assets.map(a => a.id === id ? {...a, [field]: val} : a);
    setAssets(updated);
    saveToDb(updated);
  };

  const deleteAsset = (id) => {
    if (!window.confirm(`Remove asset ${id} from vault?`)) return;
    const updated = assets.filter(a => a.id !== id);
    setAssets(updated);
    saveToDb(updated);
  };

  const visible = filter === "All" ? assets : assets.filter(a => a.collection === filter);
  const totalAvail = assets.filter(a => a.licenseStatus === "Available").length;
  const totalLicensed = assets.filter(a => a.licenseStatus === "Licensed").length;
  const totalFiled = assets.filter(a => ["Filed","Registered"].includes(a.copyright)).length;
  const allCollections = [...new Set(assets.map(a => a.collection))];

  const DbStatusBadge = () => {
    const cfg = {
      saving: { bg:"#EFF6FF", color:"#1E40AF", text:"● Saving to vault…" },
      saved:  { bg:"#F0FDF4", color:"#166534", text:"✓ Saved to vault" },
      error:  { bg:"#FEF2F2", color:"#991B1B", text:"✗ Save failed — retry" },
      idle:   null,
    }[dbStatus];
    if (!cfg) return null;
    return <span style={{ fontSize:T.xs, fontWeight:700, padding:"3px 10px", borderRadius:20, background:cfg.bg, color:cfg.color }}>{cfg.text}</span>;
  };

  return (
    <div>
      <SectionHead icon="◭" title="Asset Vault" subtitle="Central IP repository — persistent storage across sessions" />
      <AlertBox type="info">Assets are saved automatically to persistent storage. Data persists between sessions on this device.</AlertBox>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <Stat label="Total Assets" value={assets.length} sub="In vault" accent={T.indigo} />
        <Stat label="Available to Licence" value={totalAvail} sub="Ready for outreach" accent={T.jade} />
        <Stat label="Currently Licensed" value={totalLicensed} sub="Active agreements" accent={T.gold} />
        <Stat label="Copyright Filed/Ready" value={totalFiled} sub="IP protection status" accent={T.lotus} />
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
          {["All", ...allCollections].map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding:"5px 14px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${filter===c?T.indigo:T.border}`, background:filter===c?T.indigo:T.white, color:filter===c?"#fff":T.mist, cursor:"pointer" }}>{c}</button>
          ))}
          <DbStatusBadge />
        </div>
        <Button onClick={() => setAdding(!adding)} variant="gold" size="sm">{adding?"Cancel":"+ Add Asset"}</Button>
      </div>

      {adding && (
        <Card style={{ marginBottom:16, border:`1px solid ${T.gold}44` }}>
          <Divider label="Register New Asset" />
          <Grid cols={3} gap={10}>
            {[["Design ID (e.g. NIL-KNK-006)","id"],["Collection","collection"],["Motif Code","motif"],["Prompt Version","promptVer"],["AI Platform","platform"],["Target Surface","surface"],["Colourway","colorway"],["Creation Date (YYYY-MM-DD)","created"],["Notes","notes"]].map(([l,k]) => (
              <div key={k}>
                <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{l}</label>
                <input value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base, boxSizing:"border-box" }} />
              </div>
            ))}
            {[["Copyright Status","copyright",COPYRIGHT_STATUSES],["Licensing Status","licenseStatus",LICENSE_STATUSES]].map(([l,k,opts]) => (
              <div key={k}>
                <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{l}</label>
                <select value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base }}>
                  {opts.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </Grid>
          <div style={{ marginTop:12 }}><Button onClick={addAsset}>Register & Save to Vault</Button></div>
        </Card>
      )}

      {visible.map(a => (
        <Card key={a.id} style={{ marginBottom:10 }} pad={16}>
          <div style={{ display:"grid", gridTemplateColumns:"160px 1fr 140px 140px 36px", gap:14, alignItems:"start" }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:T.xs, color:T.gold, fontWeight:700, marginBottom:4 }}>{a.id}</div>
              <div style={{ fontWeight:800, color:T.indigo, fontSize:T.md, fontFamily:"Georgia,serif", marginBottom:6 }}>{a.collection}</div>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                {(a.formats||[]).map(f => <span key={f} style={{ background:T.ground, border:`1px solid ${T.border}`, borderRadius:4, padding:"1px 6px", fontSize:T.xs, fontWeight:700, color:T.mist }}>{f}</span>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>Design Info</div>
              <div style={{ fontSize:T.sm, color:T.ink, marginBottom:2 }}><strong>Motif:</strong> <span style={{ fontFamily:"monospace", color:T.gold }}>{a.motif}</span></div>
              <div style={{ fontSize:T.sm, color:T.mist, marginBottom:2 }}><strong style={{ color:T.ink }}>Surface:</strong> {a.surface}</div>
              <div style={{ fontSize:T.sm, color:T.mist, marginBottom:2 }}><strong style={{ color:T.ink }}>Colourway:</strong> {a.colorway}</div>
              <div style={{ fontSize:T.sm, color:T.mist }}><strong style={{ color:T.ink }}>Platform:</strong> {a.platform}{a.promptVer?` · ${a.promptVer}`:""}</div>
              {a.notes && <div style={{ fontSize:T.xs, color:T.mist, marginTop:6, fontStyle:"italic" }}>{a.notes}</div>}
            </div>
            <div>
              <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Copyright</div>
              <select value={a.copyright} onChange={e => updateAssetStatus(a.id,"copyright",e.target.value)}
                style={{ width:"100%", padding:"5px 8px", borderRadius:T.radius, border:`1px solid ${COPYRIGHT_COLORS[a.copyright]}88`, fontSize:T.xs, fontWeight:700, color:COPYRIGHT_COLORS[a.copyright], background:`${COPYRIGHT_COLORS[a.copyright]}10`, cursor:"pointer" }}>
                {COPYRIGHT_STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
              <div style={{ fontSize:T.xs, color:T.mist, marginTop:6 }}>Created: {a.created||"—"}</div>
            </div>
            <div>
              <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Licence</div>
              <select value={a.licenseStatus} onChange={e => updateAssetStatus(a.id,"licenseStatus",e.target.value)}
                style={{ width:"100%", padding:"5px 8px", borderRadius:T.radius, border:`1px solid ${LICENSE_STATUS_COLORS[a.licenseStatus]}88`, fontSize:T.xs, fontWeight:700, color:LICENSE_STATUS_COLORS[a.licenseStatus], background:`${LICENSE_STATUS_COLORS[a.licenseStatus]}10`, cursor:"pointer" }}>
                {LICENSE_STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", alignItems:"flex-start", paddingTop:2 }}>
              <button onClick={() => deleteAsset(a.id)} title="Remove from vault"
                style={{ background:"transparent", border:`1px solid ${T.border}`, borderRadius:6, padding:"4px 7px", cursor:"pointer", color:T.mist, fontSize:12, lineHeight:1 }}>✕</button>
            </div>
          </div>
        </Card>
      ))}

      {visible.length === 0 && (
        <Card>
          <div style={{ textAlign:"center", padding:"40px 20px", color:T.mist }}>
            <div style={{ fontSize:28, marginBottom:8 }}>◭</div>
            <div style={{ fontWeight:700, color:T.indigo }}>No assets in this collection</div>
            <div style={{ fontSize:T.sm, marginTop:4 }}>Click "+ Add Asset" to register your first design.</div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MODULE: PORTFOLIO GENERATOR
// ────────────────────────────────────────────────────────────
const PORTFOLIO_SECTIONS = [
  { id:"cover",     label:"Cover Page",             desc:"Studio name, collection title, tagline, date" },
  { id:"story",     label:"Collection Story",        desc:"Cultural background, motif provenance, design intent (100–200 words)" },
  { id:"motif",     label:"Motif Documentation",     desc:"Provenance sheet per motif: era, form, meaning, source" },
  { id:"mockups",   label:"Mockup Pages",            desc:"Surface application mockups: wallcovering, textile, packaging" },
  { id:"licensing", label:"Licensing Summary",       desc:"Available tiers, indicative fees, exclusivity options" },
  { id:"contact",   label:"Contact & Next Steps",    desc:"Studio contact, enquiry process, response time" },
];

function PortfolioGenerator() {
  const [selCollection, setSelCollection] = useState("Midnight Siam");
  const [selSections, setSelSections] = useState(new Set(PORTFOLIO_SECTIONS.map(s => s.id)));
  const [generated, setGenerated] = useState(false);
  const [clientName, setClientName] = useState("");
  const [exporting, setExporting] = useState(false);
  const [exportMsg, setExportMsg] = useState("");

  const collections = [...new Set(INIT_ASSETS.map(a => a.collection))];
  const collectionAssets = INIT_ASSETS.filter(a => a.collection === selCollection);
  const toggleSection = id => setSelSections(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const estimatedPages = Array.from(selSections).reduce((acc,id) => acc + ({cover:1,story:2,motif:2,mockups:4,licensing:2,contact:1}[id]||1), 0);

  const exportPDF = async () => {
    setExporting(true);
    setExportMsg("Loading PDF library…");
    try {
      // Dynamically load jsPDF from CDN
      await new Promise((resolve, reject) => {
        if (window.jsPDF) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      setExportMsg("Generating PDF…");
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4" });
      const W = 210; const H = 297;
      const margin = 20;
      const col = "#0F4D3A";
      const gold = "#C7A24D";
      const mist = "#8A93AA";

      const addPage = (first=false) => { if (!first) doc.addPage(); };

      // ── COVER PAGE
      if (selSections.has("cover")) {
        addPage(true);
        // Background header band
        doc.setFillColor(28,45,94);
        doc.rect(0, 0, W, 80, "F");
        // Gold accent line
        doc.setFillColor(184,133,30);
        doc.rect(0, 78, W, 2, "F");
        // Logo / Studio name
        doc.setTextColor(255,255,255);
        doc.setFontSize(32); doc.setFont("helvetica","bold");
        doc.text("NILA™", margin, 38);
        doc.setFontSize(10); doc.setFont("helvetica","normal");
        doc.setTextColor(184,133,30);
        doc.text("THAI CULTURAL IP LICENSING STUDIO", margin, 48);
        // Collection title
        doc.setTextColor(255,255,255);
        doc.setFontSize(18); doc.setFont("helvetica","bold");
        doc.text(selCollection, margin, 65);
        // Client / date block
        doc.setTextColor(50,50,50);
        doc.setFontSize(11); doc.setFont("helvetica","normal");
        doc.text("Licensing Portfolio", margin, 100);
        if (clientName) {
          doc.setFont("helvetica","bold");
          doc.text(`Prepared for: ${clientName}`, margin, 110);
        }
        doc.setFont("helvetica","normal");
        doc.setTextColor(130,130,130);
        doc.text(`Date: ${new Date().toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"})}`, margin, clientName?120:110);
        doc.text(`Siamese Botanica · Design Division · Thailand`, margin, clientName?130:120);
        // Tagline
        doc.setFillColor(238,240,248);
        doc.rect(margin, 150, W-2*margin, 20, "F");
        doc.setTextColor(28,45,94); doc.setFont("helvetica","bolditalic"); doc.setFontSize(13);
        doc.text("Inspired by Thai Heritage. Crafted for the World.", W/2, 162, {align:"center"});
        // Footer
        doc.setTextColor(130,130,130); doc.setFont("helvetica","normal"); doc.setFontSize(9);
        doc.text("Confidential — for licensed use enquiries only", W/2, H-15, {align:"center"});
      }

      // ── COLLECTION STORY
      if (selSections.has("story")) {
        addPage();
        doc.setFillColor(28,45,94); doc.rect(0,0,W,12,"F");
        doc.setTextColor(255,255,255); doc.setFontSize(9); doc.setFont("helvetica","bold");
        doc.text("NILA™  ·  COLLECTION STORY", margin, 8);
        doc.setTextColor(28,45,94); doc.setFontSize(18); doc.setFont("helvetica","bold");
        doc.text(selCollection, margin, 30);
        doc.setFillColor(184,133,30); doc.rect(margin, 33, 40, 1.5, "F");
        // Find motif for this collection
        const motifCode = collectionAssets[0]?.motif || "NIL-KNK";
        const motifData = MOTIFS.find(m => m.code === motifCode) || MOTIFS[0];
        doc.setTextColor(50,50,50); doc.setFontSize(10); doc.setFont("helvetica","normal");
        const story = `The ${selCollection} collection is built around the ${motifData.name} (${motifData.thai}), a classical Thai decorative motif with origins in the ${motifData.era}. ${motifData.meaning}\n\nThis collection translates documented historical source material into contemporary surface design assets — engineered for luxury wallcovering, textile, and premium packaging applications. Each pattern is fully vectorised, seamlessly tiled, and delivered in production-ready formats (SVG, EPS, TIFF 300 dpi).`;
        const lines = doc.splitTextToSize(story, W - 2*margin);
        doc.text(lines, margin, 45);
        // Design count block
        doc.setFillColor(238,240,248);
        doc.rect(margin, 130, W-2*margin, 30, "F");
        doc.setTextColor(28,45,94); doc.setFontSize(11); doc.setFont("helvetica","bold");
        doc.text(`${collectionAssets.length} designs registered in vault`, margin+8, 148);
        doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(100,100,100);
        doc.text("All designs available for non-exclusive and exclusive licensing enquiries.", margin+8, 155);
      }

      // ── MOTIF DOCUMENTATION
      if (selSections.has("motif")) {
        addPage();
        doc.setFillColor(28,45,94); doc.rect(0,0,W,12,"F");
        doc.setTextColor(255,255,255); doc.setFontSize(9); doc.setFont("helvetica","bold");
        doc.text("NILA™  ·  MOTIF PROVENANCE", margin, 8);
        doc.setTextColor(28,45,94); doc.setFontSize(16); doc.setFont("helvetica","bold");
        doc.text("Thai Motif Documentation", margin, 28);
        doc.setFillColor(184,133,30); doc.rect(margin, 31, 50, 1.5, "F");

        let y = 42;
        MOTIFS.slice(0,3).forEach((m,i) => {
          doc.setFillColor(i%2===0?245:238,i%2===0?246:240,i%2===0?251:248);
          doc.rect(margin, y-5, W-2*margin, 36, "F");
          doc.setFillColor(184,133,30); doc.rect(margin, y-5, 3, 36, "F");
          doc.setTextColor(28,45,94); doc.setFontSize(11); doc.setFont("helvetica","bold");
          doc.text(`${m.name}  (${m.thai})`, margin+7, y+4);
          doc.setTextColor(100,100,100); doc.setFontSize(8); doc.setFont("helvetica","normal");
          doc.text(`Code: ${m.code}  ·  Era: ${m.era}`, margin+7, y+11);
          const mlines = doc.splitTextToSize(m.meaning, W-2*margin-10);
          doc.text(mlines, margin+7, y+18);
          y += 42;
        });
      }

      // ── LICENSING SUMMARY
      if (selSections.has("licensing")) {
        addPage();
        doc.setFillColor(28,45,94); doc.rect(0,0,W,12,"F");
        doc.setTextColor(255,255,255); doc.setFontSize(9); doc.setFont("helvetica","bold");
        doc.text("NILA™  ·  LICENSING MODEL", margin, 8);
        doc.setTextColor(28,45,94); doc.setFontSize(16); doc.setFont("helvetica","bold");
        doc.text("Licensing Tiers", margin, 28);
        doc.setFillColor(184,133,30); doc.rect(margin, 31, 35, 1.5, "F");

        const tierColors = {"NILA-POD":[46,125,103],"NILA-COM":[184,133,30],"NILA-BRD":[45,75,154],"NILA-EXC":[155,44,44]};
        let y = 42;
        LICENSE_TIERS.forEach(l => {
          const tc = tierColors[l.code] || [100,100,100];
          doc.setFillColor(...tc); doc.rect(margin, y, 4, 22, "F");
          doc.setFillColor(248,248,252); doc.rect(margin+4, y, W-2*margin-4, 22, "F");
          doc.setTextColor(...tc); doc.setFontSize(9); doc.setFont("helvetica","bold");
          doc.text(`${l.code}  ·  ${l.tier}`, margin+8, y+7);
          doc.setTextColor(28,45,94); doc.setFontSize(10); doc.setFont("helvetica","bold");
          doc.text(`USD ${l.priceUSD[0].toLocaleString()} – ${l.priceUSD[1].toLocaleString()}`, W-margin-2, y+7, {align:"right"});
          doc.setTextColor(80,80,80); doc.setFontSize(8); doc.setFont("helvetica","normal");
          const dlines = doc.splitTextToSize(l.desc.substring(0,120)+"…", W-2*margin-10);
          doc.text(dlines[0], margin+8, y+15);
          y += 27;
        });
        // Disclaimer
        doc.setFillColor(255,251,235); doc.rect(margin, y+5, W-2*margin, 18, "F");
        doc.setTextColor(122,92,16); doc.setFontSize(8); doc.setFont("helvetica","italic");
        const disc = "All fees are indicative and subject to negotiation. Final licence terms agreed in writing. USD/THB 35.5 indicative only.";
        doc.text(doc.splitTextToSize(disc, W-2*margin-10), margin+5, y+12);
      }

      // ── CONTACT PAGE
      if (selSections.has("contact")) {
        addPage();
        doc.setFillColor(28,45,94); doc.rect(0,0,W,H,"F");
        doc.setFillColor(184,133,30); doc.rect(0,H-60,W,60,"F");
        doc.setTextColor(255,255,255); doc.setFontSize(28); doc.setFont("helvetica","bold");
        doc.text("NILA™", margin, 60);
        doc.setFontSize(11); doc.setFont("helvetica","normal");
        doc.setTextColor(184,133,30);
        doc.text("THAI CULTURAL IP LICENSING STUDIO", margin, 72);
        doc.setTextColor(200,216,255);
        doc.setFontSize(10);
        doc.text("For licensing enquiries:", margin, 110);
        doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(13);
        doc.text("[your@email.com]", margin, 122);
        doc.text("[niladesign.co]", margin, 134);
        doc.setFont("helvetica","normal"); doc.setFontSize(10);
        doc.setTextColor(200,216,255);
        doc.text("Siamese Botanica · Pathum Thani, Thailand", margin, 152);
        doc.text("Response within 3 business days.", margin, 162);
        doc.setTextColor(28,45,94); doc.setFontSize(10); doc.setFont("helvetica","bold");
        doc.text("Inspired by Thai Heritage. Crafted for the World.", W/2, H-38, {align:"center"});
        doc.setFont("helvetica","normal"); doc.setFontSize(8);
        doc.text("© NILA™ — Siamese Botanica Design Division. All rights reserved.", W/2, H-28, {align:"center"});
      }

      // ── Save PDF
      const filename = `NILA-Portfolio-${selCollection.replace(/\s+/g,"-")}${clientName?`-${clientName.replace(/\s+/g,"-")}`:""}-${new Date().toISOString().slice(0,10)}.pdf`;
      doc.save(filename);
      setExportMsg(`✓ Downloaded: ${filename}`);
    } catch(err) {
      console.error(err);
      setExportMsg("✗ PDF export failed — check console for details");
    } finally {
      setExporting(false);
      setTimeout(() => setExportMsg(""), 6000);
    }
  };

  return (
    <div>
      <SectionHead icon="◫" title="Portfolio Generator" subtitle="Configure and export a client-ready licensing portfolio PDF" />
      <AlertBox type="info">PDF is generated in-browser using jsPDF — no server required. Personalise [bracketed placeholders] in the contact page before sending to clients.</AlertBox>

      <Grid cols={2} gap={14}>
        <Card>
          <Divider label="Portfolio Configuration" />
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>Select Collection</label>
            <select value={selCollection} onChange={e => { setSelCollection(e.target.value); setGenerated(false); }} style={{ width:"100%", padding:"8px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.white, fontSize:T.base, fontFamily:"inherit" }}>
              {collections.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>Client Name (Optional)</label>
            <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Maison du Décor — for personalised cover page" style={{ width:"100%", padding:"8px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base, boxSizing:"border-box" }} />
          </div>
          <Divider label="Sections to Include" />
          {PORTFOLIO_SECTIONS.map(s => (
            <div key={s.id} onClick={() => toggleSection(s.id)}
              style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:8, cursor:"pointer", padding:"10px 12px", borderRadius:T.radius, background:selSections.has(s.id)?`${T.indigo}08`:T.ground, border:`1px solid ${selSections.has(s.id)?T.indigo:T.border}`, transition:"all 0.12s" }}>
              <div style={{ width:18, height:18, borderRadius:4, flexShrink:0, marginTop:1, border:selSections.has(s.id)?"none":`2px solid ${T.border}`, background:selSections.has(s.id)?T.indigo:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {selSections.has(s.id) && <span style={{ color:"#fff", fontSize:11, fontWeight:900 }}>✓</span>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:selSections.has(s.id)?T.indigo:T.ink, fontSize:T.base }}>{s.label}</div>
                <div style={{ fontSize:T.xs, color:T.mist, marginTop:2 }}>{s.desc}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop:16, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            <Button onClick={() => setGenerated(true)} variant="secondary">Preview Brief</Button>
            <button onClick={exportPDF} disabled={exporting}
              style={{ background:exporting?T.ground:T.indigo, color:exporting?T.mist:"#fff", border:`1px solid ${T.indigo}`, borderRadius:T.radius, padding:"9px 20px", fontSize:T.base, fontWeight:700, cursor:exporting?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:8, transition:"opacity 0.15s" }}>
              {exporting ? "⏳ Generating…" : "⬇ Export PDF"}
            </button>
            {exportMsg && <span style={{ fontSize:T.xs, color:exportMsg.startsWith("✓")?T.jade:T.crimson, fontWeight:700 }}>{exportMsg}</span>}
          </div>
        </Card>

        <div>
          {!generated ? (
            <Card style={{ border:`2px dashed ${T.border}` }}>
              <div style={{ textAlign:"center", padding:"40px 20px", color:T.mist }}>
                <div style={{ fontSize:32, marginBottom:12 }}>◫</div>
                <div style={{ fontSize:T.md, fontWeight:700, color:T.indigo, marginBottom:6 }}>Portfolio Preview</div>
                <div style={{ fontSize:T.sm, lineHeight:1.6 }}>Configure your portfolio on the left, then click "Preview Brief" or "Export PDF" directly.</div>
              </div>
            </Card>
          ) : (
            <Card style={{ border:`2px solid ${T.gold}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <div>
                  <div style={{ fontWeight:900, color:T.indigo, fontSize:T.lg, fontFamily:"Georgia,serif" }}>Portfolio Brief</div>
                  <div style={{ fontSize:T.sm, color:T.mist, marginTop:2 }}>{selCollection}{clientName?` · ${clientName}`:""}</div>
                </div>
                <Tag color="gold">{estimatedPages} pages est.</Tag>
              </div>
              <div style={{ fontSize:T.xs, color:T.mist, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Assets in Collection</div>
              <div style={{ marginBottom:14 }}>
                {collectionAssets.length === 0
                  ? <div style={{ fontSize:T.sm, color:T.mist }}>No assets registered in vault yet.</div>
                  : collectionAssets.map(a => (
                    <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 10px", background:T.ground, borderRadius:6, marginBottom:4 }}>
                      <span style={{ fontFamily:"monospace", fontSize:T.xs, color:T.gold, fontWeight:700 }}>{a.id}</span>
                      <span style={{ fontSize:T.xs, color:T.mist }}>{a.surface}</span>
                      <span style={{ background:`${LICENSE_STATUS_COLORS[a.licenseStatus]}18`, color:LICENSE_STATUS_COLORS[a.licenseStatus], border:`1px solid ${LICENSE_STATUS_COLORS[a.licenseStatus]}44`, borderRadius:4, padding:"1px 7px", fontSize:T.xs, fontWeight:700 }}>{a.licenseStatus}</span>
                    </div>
                  ))
                }
              </div>
              <Divider label="Content Outline" />
              {PORTFOLIO_SECTIONS.filter(s => selSections.has(s.id)).map((s,i) => (
                <div key={s.id} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:8, padding:"8px 12px", background:T.ground, borderRadius:T.radius }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:T.indigo, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:T.xs, flexShrink:0 }}>{i+1}</div>
                  <div>
                    <div style={{ fontWeight:700, color:T.indigo, fontSize:T.base }}>{s.label}</div>
                    <div style={{ fontSize:T.xs, color:T.mist, marginTop:2 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </Card>
          )}
          <Card style={{ marginTop:14 }}>
            <Divider label="PDF Includes" />
            {[["Format","A4 Portrait, professional layout"],["Fonts","Helvetica (embedded)"],["Pages",`~${estimatedPages} pages based on selection`],["File name",`NILA-Portfolio-${selCollection.replace(/\s+/g,"-")}…pdf`],["Library","jsPDF 2.5.1 (loaded on demand)"]].map(([l,v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${T.borderL}` }}>
                <span style={{ fontSize:T.sm, color:T.mist }}>{l}</span>
                <span style={{ fontWeight:600, color:T.ink, fontSize:T.sm, textAlign:"right", maxWidth:"60%" }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>
      </Grid>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MODULE: REVENUE DASHBOARD
// ────────────────────────────────────────────────────────────
function RevenueDashboard() {
  const [view, setView] = useState("overview");
  const totalPOD = REVENUE_PLAN.reduce((s,m)=>s+m.pod,0);
  const totalLic = REVENUE_PLAN.reduce((s,m)=>s+m.licensing,0);
  const totalRev = totalPOD + totalLic;
  const totalTarget = REVENUE_PLAN.reduce((s,m)=>s+m.target,0);
  const pct = Math.round((totalRev/totalTarget)*100);

  const barMax = Math.max(...REVENUE_PLAN.map(m=>m.target));

  return (
    <div>
      <SectionHead icon="◈" title="Revenue Dashboard" subtitle="Track performance across all licensing channels — planning model only" />
      <AlertBox type="warning">Pre-revenue status. All figures below are planning targets and projections only. No revenue has been earned. This module becomes active once first licensing income is received.</AlertBox>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <Stat label="Total Revenue YTD" value="USD 0" sub="Pre-revenue stage" accent={T.mist} />
        <Stat label="Annual Target" value={`USD ${totalTarget.toLocaleString()}`} sub="Planning figure — 2026 H2" accent={T.indigo} />
        <Stat label="POD Revenue (plan)" value={`USD ${totalPOD.toLocaleString()}`} sub="6-month projection" accent={T.jade} />
        <Stat label="Licensing Revenue (plan)" value={`USD ${totalLic.toLocaleString()}`} sub="6-month projection" accent={T.gold} />
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {[["overview","Overview"],["channels","Channels"],["milestones","🎯 Milestones"],["kpis","KPIs"]].map(([v,l])=><button key={v} onClick={()=>setView(v)} style={{ padding:"5px 16px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${view===v?T.indigo:T.border}`, background:view===v?T.indigo:T.white, color:view===v?"#fff":T.mist, cursor:"pointer" }}>{l}</button>)}
      </div>

      {view==="overview" && (
        <>
          <Card style={{ marginBottom:14 }}>
            <Divider label="Revenue vs Target — 2026 H2 Projection (Planning Model)" />
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {REVENUE_PLAN.map(m=>{
                const total = m.pod+m.licensing;
                const pctBar = Math.round((m.target/barMax)*100);
                const pctActual = total>0?Math.round((total/m.target)*100):0;
                return (
                  <div key={m.month} style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <div style={{ width:70, fontSize:T.xs, fontWeight:700, color:T.mist, flexShrink:0 }}>{m.month}</div>
                    <div style={{ flex:1, position:"relative", height:28, background:T.ground, borderRadius:4, overflow:"hidden" }}>
                      <div style={{ position:"absolute", height:"100%", width:`${pctBar}%`, background:`${T.border}`, borderRadius:4 }} />
                      <div style={{ position:"absolute", height:"100%", width:`${Math.round((total/barMax)*100)}%`, background:`linear-gradient(90deg,${T.jade},${T.gold})`, borderRadius:4, transition:"width 0.3s" }} />
                    </div>
                    <div style={{ width:110, textAlign:"right", fontSize:T.xs, flexShrink:0 }}>
                      <span style={{ fontWeight:700, color:total>0?T.jade:T.mist }}>USD {total.toLocaleString()}</span>
                      <span style={{ color:T.mist }}> / {m.target.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          <Grid cols={2} gap={14}>
            <Card>
              <Divider label="POD Channel (Planning)" />
              {[["Spoonflower","Primary — fabric, wallpaper, gift wrap"],["Society6","Prints, homewares, apparel"],["Redbubble","Prints, stickers, apparel"],["Contrado","Premium fabric and homewares — EU"]].map(([p,d])=>(
                <div key={p} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"9px 0", borderBottom:`1px solid ${T.borderL}` }}>
                  <div><div style={{ fontWeight:700, color:T.ink, fontSize:T.sm }}>{p}</div><div style={{ fontSize:T.xs, color:T.mist }}>{d}</div></div>
                  <Tag color="mist" size="xs">Not Listed</Tag>
                </div>
              ))}
              <div style={{ fontSize:T.xs, color:T.mist, marginTop:10, fontStyle:"italic" }}>External platforms — no affiliation implied.</div>
            </Card>
            <Card>
              <Divider label="Licensing Channel (Planning)" />
              {LICENSE_TIERS.map(l=>(
                <div key={l.code} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${T.borderL}` }}>
                  <div><div style={{ fontWeight:700, color:T.ink, fontSize:T.sm }}>{l.tier}</div><div style={{ fontSize:T.xs, color:T.mist }}>USD {l.priceUSD[0].toLocaleString()}–{l.priceUSD[1].toLocaleString()}/deal</div></div>
                  <Tag color="mist" size="xs">0 deals</Tag>
                </div>
              ))}
            </Card>
          </Grid>
        </>
      )}

      {view==="channels" && (
        <Card>
          <Divider label="Revenue by Channel — Target Model" />
          <DataTable headers={["Channel","Type","Target Frequency","Range/Deal","H2 2026 Target"]}
            rows={[
              ["POD (all platforms)","POD Licence","10–20 sales/month","USD 30–120","USD 1,800"],
              ["Small brands","Commercial Licence","1–2/quarter","USD 400–1,800","USD 3,600"],
              ["Collection deals","Brand Collection","1/quarter","USD 2,500–9,000","USD 5,000"],
              ["Commissions","Exclusive","1 per year","USD 8,000–40,000","USD 8,000"],
            ]} />
          <div style={{ marginTop:12, fontSize:T.xs, color:T.mist, fontStyle:"italic" }}>All figures are planning targets only. Actual revenue depends on market response and pipeline conversion.</div>
        </Card>
      )}

      {view==="milestones" && (
        <div>
          <Card style={{ marginBottom:14 }}>
            <Divider label="Phase 3 — Path to First USD" />
            <div style={{ fontSize:T.sm, color:T.mist, marginBottom:16 }}>Track each milestone on the journey from pre-launch to first licensing revenue. Update status as you progress.</div>
            {[
              { id:"M01", phase:"Phase 1", label:"Midnight Siam Collection Complete",      desc:"20 patterns, 3 colourways, 10 mockups, 1 portfolio PDF", status:"In Progress", color:T.amber },
              { id:"M02", phase:"Phase 1", label:"NILA Website Live",                       desc:"Portfolio gallery, privacy policy, contact form active", status:"Pending",     color:T.mist  },
              { id:"M03", phase:"Phase 1", label:"POD Stores Launched",                     desc:"Spoonflower + Society6 + Redbubble listings live", status:"Pending",          color:T.mist  },
              { id:"M04", phase:"Phase 2", label:"First 20 Prospects Researched",           desc:"All bracket placeholders replaced with real company names", status:"Pending",  color:T.mist  },
              { id:"M05", phase:"Phase 2", label:"20 Outreach Emails Sent",                 desc:"Personalised, not template. One cultural fact per email.", status:"Pending",   color:T.mist  },
              { id:"M06", phase:"Phase 3", label:"First Reply from Prospect",               desc:"Any reply counts — positive, question, or request for portfolio", status:"Pending", color:T.indigoL },
              { id:"M07", phase:"Phase 3", label:"First Meeting / Discovery Call",          desc:"15–30 min video call with any qualified prospect", status:"Pending",            color:T.indigoL },
              { id:"M08", phase:"Phase 3", label:"First Proposal Sent",                     desc:"Formal NILA-COM or NILA-BRD proposal with signed NDA", status:"Pending",       color:T.indigoL },
              { id:"M09", phase:"Phase 3", label:"First Licence Agreement Signed",          desc:"Any tier — even NILA-POD counts as proof of concept", status:"Pending",        color:T.jade   },
              { id:"M10", phase:"Phase 3", label:"First USD Received 💰",                   desc:"Payment confirmed. NILA becomes a revenue-generating business.", status:"Pending", color:T.gold },
            ].map((m,i) => {
              const statusCfg = {
                "Complete":    { bg:"#F0FDF4", border:"#86EFAC", text:T.jade,    badge:"✓ Complete"    },
                "In Progress": { bg:"#FFFBEB", border:"#FCD34D", text:T.amber,   badge:"● In Progress" },
                "Pending":     { bg:T.ground,  border:T.border,  text:T.mist,    badge:"○ Pending"     },
              }[m.status] || {};
              return (
                <div key={m.id} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"12px 14px", borderRadius:T.radius, background:statusCfg.bg, border:`1px solid ${statusCfg.border}`, marginBottom:8 }}>
                  <div style={{ flexShrink:0, textAlign:"center", minWidth:36 }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", background:m.color, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:T.xs }}>{i+1}</div>
                    <div style={{ fontSize:9, color:T.mist, marginTop:3, fontWeight:700 }}>{m.phase}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:T.indigo, fontSize:T.md, marginBottom:3 }}>{m.label}</div>
                    <div style={{ fontSize:T.xs, color:T.mist, lineHeight:1.5 }}>{m.desc}</div>
                  </div>
                  <div style={{ flexShrink:0 }}>
                    <span style={{ fontSize:T.xs, fontWeight:700, color:statusCfg.text, whiteSpace:"nowrap" }}>{statusCfg.badge}</span>
                  </div>
                </div>
              );
            })}
          </Card>
          <Card>
            <Divider label="90-Day Roadmap" />
            {[
              { days:"Day 1–7",   title:"NILA OS Online",           done:true,  desc:"NILA OS v3.1 deployed and running" },
              { days:"Day 8–30",  title:"Midnight Siam Collection", done:false, desc:"20 patterns · 3 colourways · 10 mockups · 1 portfolio" },
              { days:"Day 31–60", title:"Portfolio + Website",       done:false, desc:"Website live · Portfolio PDF sent to first 10 prospects" },
              { days:"Day 61–90", title:"CRM + Outreach",            done:false, desc:"20 outreach emails · First reply · First meeting" },
            ].map((r,i)=>(
              <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:12, padding:"10px 14px", borderRadius:T.radius, background:r.done?`${T.jade}10`:T.ground, border:`1px solid ${r.done?T.jade:T.border}` }}>
                <div style={{ width:60, flexShrink:0 }}>
                  <div style={{ fontSize:T.xs, fontWeight:800, color:r.done?T.jade:T.mist }}>{r.days}</div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:r.done?T.jade:T.indigo, fontSize:T.base }}>{r.done?"✓ ":""}{r.title}</div>
                  <div style={{ fontSize:T.xs, color:T.mist, marginTop:2 }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {view==="kpis" && (
        <Grid cols={2} gap={14}>
          {[
            {label:"Monthly Revenue",value:"USD 0",target:"USD 500 (Aug 2026)",accent:T.mist},
            {label:"Annual Revenue Run Rate",value:"USD 0",target:"USD 18,600 (plan)",accent:T.mist},
            {label:"Active Licences",value:"0",target:"Target: 3 by Dec 2026",accent:T.mist},
            {label:"Designs Licensed",value:"0",target:"Target: 5 by Dec 2026",accent:T.mist},
            {label:"Average Deal Size",value:"—",target:"Target: USD 2,000",accent:T.mist},
            {label:"Top Collection",value:"—",target:"Midnight Siam (in development)",accent:T.gold},
          ].map(k=>(
            <div key={k.label} style={{ background:T.white, border:`1px solid ${T.border}`, borderLeft:`3px solid ${k.accent}`, borderRadius:T.radius, padding:"14px 16px" }}>
              <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>{k.label}</div>
              <div style={{ fontSize:T.xl, fontWeight:800, color:T.mist, lineHeight:1 }}>{k.value}</div>
              <div style={{ fontSize:T.xs, color:T.mist, marginTop:4 }}>{k.target}</div>
            </div>
          ))}
        </Grid>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MODULE: OPPORTUNITY SCORING ENGINE
// ────────────────────────────────────────────────────────────
function OpportunityScoring() {
  const [opps, setOpps] = useState(INIT_OPPORTUNITIES);
  const [adding, setAdding] = useState(false);
  const [sortBy, setSortBy] = useState("score");
  const [form, setForm] = useState({ prospect:"", segment:"Surface Brand", collection:"Midnight Siam", tier:"NILA-BRD", potentialUSD:5000, probability:50, urgency:50, notes:"" });

  const scored = opps.map(o=>({ ...o, score:Math.round((o.potentialUSD/1000)*(o.probability/100)*(o.urgency/100)*10)/10 }));
  const sorted = [...scored].sort((a,b)=> sortBy==="score" ? b.score-a.score : (a[sortBy]||"").toString().localeCompare((b[sortBy]||"").toString()));

  const addOpp = () => {
    if (!form.prospect.trim()) return;
    setOpps(o=>[...o,{...form,id:Date.now()}]);
    setAdding(false);
  };

  const scoreColor = s => s>=50?T.jade:s>=25?T.gold:s>=10?T.amber:T.mist;
  const ScoreBar = ({value,max=100})=>(
    <div style={{ height:6, background:T.ground, borderRadius:3, overflow:"hidden", marginTop:4 }}>
      <div style={{ height:"100%", width:`${Math.min((value/max)*100,100)}%`, background:scoreColor(value), borderRadius:3 }} />
    </div>
  );

  return (
    <div>
      <SectionHead icon="◈" title="Opportunity Scoring Engine" subtitle="Prioritise prospects by weighted value, probability, and urgency" />
      <AlertBox type="info">Scores are calculated as: (Potential Value ÷ 1,000) × Probability% × Urgency%. Higher scores = prioritise first. All figures are estimates — adjust as research deepens.</AlertBox>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:16 }}>
        <Stat label="Total Prospects Scored" value={opps.length} accent={T.indigo} />
        <Stat label="Top Score" value={`${Math.max(...scored.map(o=>o.score)).toFixed(1)}`} sub="/ 100 max" accent={T.jade} />
        <Stat label="Pipeline Value (max)" value={`USD ${opps.reduce((s,o)=>s+o.potentialUSD,0).toLocaleString()}`} sub="If all converted — not guaranteed" accent={T.gold} />
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:T.sm, color:T.mist, fontWeight:600 }}>Sort:</span>
          {[["score","Score"],["potentialUSD","Value"],["segment","Segment"]].map(([k,l])=>(
            <button key={k} onClick={()=>setSortBy(k)} style={{ padding:"4px 12px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${sortBy===k?T.indigo:T.border}`, background:sortBy===k?T.indigo:T.white, color:sortBy===k?"#fff":T.mist, cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        <Button onClick={()=>setAdding(!adding)} variant="gold" size="sm">{adding?"Cancel":"+ Add Prospect"}</Button>
      </div>

      {adding && (
        <Card style={{ marginBottom:14, border:`1px solid ${T.gold}44` }}>
          <Divider label="Score New Prospect" />
          <Grid cols={3} gap={10}>
            {[["Prospect Name","prospect","text"],["Collection","collection","text"],["Notes","notes","text"]].map(([l,k,t])=>(
              <div key={k}><label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{l}</label><input type={t} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base, boxSizing:"border-box" }} /></div>
            ))}
            <div><label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Segment</label><select value={form.segment} onChange={e=>setForm(f=>({...f,segment:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base }}>{["Surface Brand","Luxury Hospitality","Consumer Brand","Interior Studio","POD Platform"].map(s=><option key={s}>{s}</option>)}</select></div>
            <div><label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Licence Tier</label><select value={form.tier} onChange={e=>setForm(f=>({...f,tier:e.target.value}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base }}>{LICENSE_TIERS.map(l=><option key={l.code} value={l.code}>{l.tier}</option>)}</select></div>
            {[["Potential Value (USD)","potentialUSD"],["Probability of Success (%)","probability"],["Urgency (%)","urgency"]].map(([l,k])=>(
              <div key={k}><label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{l}</label><input type="number" value={form[k]} onChange={e=>setForm(f=>({...f,[k]:Number(e.target.value)}))} style={{ width:"100%", padding:"7px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.base, boxSizing:"border-box" }} /></div>
            ))}
          </Grid>
          <div style={{ marginTop:12 }}><Button onClick={addOpp}>Add to Scoring Engine</Button></div>
        </Card>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {sorted.map((o,i)=>(
          <Card key={o.id} pad={16} style={{ borderLeft:`3px solid ${scoreColor(o.score)}` }}>
            <div style={{ display:"grid", gridTemplateColumns:"40px 1fr 140px 140px 140px 80px", gap:12, alignItems:"center" }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:T.xs, fontWeight:800, color:T.mist }}>#{i+1}</div>
              </div>
              <div>
                <div style={{ fontWeight:700, color:T.indigo, fontSize:T.md }}>{o.prospect}</div>
                <div style={{ display:"flex", gap:6, marginTop:4 }}>
                  <Tag color="mist" size="xs">{o.segment}</Tag>
                  <Tag color="indigo" size="xs">{o.tier}</Tag>
                </div>
                {o.notes && <div style={{ fontSize:T.xs, color:T.mist, marginTop:4 }}>{o.notes}</div>}
              </div>
              <div>
                <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", marginBottom:3 }}>Potential</div>
                <div style={{ fontWeight:800, color:T.indigo }}>USD {o.potentialUSD.toLocaleString()}</div>
                <div style={{ fontSize:T.xs, color:T.mist }}>{o.collection}</div>
              </div>
              <div>
                <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", marginBottom:3 }}>Probability</div>
                <div style={{ fontWeight:700, color:T.ink }}>{o.probability}%</div>
                <ScoreBar value={o.probability} />
              </div>
              <div>
                <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", marginBottom:3 }}>Urgency</div>
                <div style={{ fontWeight:700, color:T.ink }}>{o.urgency}%</div>
                <ScoreBar value={o.urgency} />
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", marginBottom:3 }}>Score</div>
                <div style={{ fontSize:T.xl, fontWeight:900, color:scoreColor(o.score), lineHeight:1 }}>{o.score.toFixed(1)}</div>
                <ScoreBar value={o.score} max={100} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ marginTop:14 }}>
        <Divider label="Score Formula" />
        <div style={{ background:T.indigoD, borderRadius:T.radius, padding:"14px 18px", color:"#C8D8FF", fontFamily:"monospace", fontSize:T.sm, lineHeight:2 }}>
          Score = (Potential Value ÷ 1,000) × Probability% × Urgency%<br/>
          <span style={{ color:"rgba(200,216,255,0.5)", fontSize:T.xs }}>Example: USD 10,000 × 80% × 90% = 72.0</span>
        </div>
        <div style={{ fontSize:T.xs, color:T.mist, marginTop:10, lineHeight:1.6 }}>Scores are estimates based on your own assessment of each opportunity. Reassess as prospects move through the pipeline. A high score does not guarantee conversion.</div>
      </Card>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MODULE: AI SALES ASSISTANT
// ────────────────────────────────────────────────────────────
const EMAIL_TEMPLATES = {
  outreach: {
    label:"Cold Outreach — Initial Introduction",
    subject:"Thai Cultural Surface Design — Licensing Enquiry from NILA™",
    body:(prospect,collection,segment)=>`Subject: Thai Cultural Surface Design — ${collection} Collection · Licensing Enquiry

Dear [Design / Licensing Director],

I am writing to introduce NILA™, a Thai cultural IP licensing studio based in Bangkok, Thailand.

We research, document, and translate classical Thai decorative motifs into contemporary surface design assets — available for international licensing to ${segment.toLowerCase()}s working at the premium and luxury tier.

Our current collection, ${collection}, is built around the ${collection==="Midnight Siam"?"Kanok (กนก) flame scroll motif — a sacred Thai symbol spanning the Sukhothai period through to the Rattanakosin court":"Dok Mali (ดอกมะลิ) jasmine motif — a classical Thai symbol of purity and maternal devotion"}. It is available in both non-exclusive and regional exclusive configurations.

I would be glad to share our portfolio and licensing overview at your convenience.

With regards,
[Your Name]
NILA™ Design Licensing Studio
Siamese Botanica · Thailand
[Email] · [Website]

---
NILA™ — Inspired by Thai Heritage. Crafted for the World.`
  },
  followup: {
    label:"Follow-Up — 10 Days After Initial Outreach",
    subject:"Following Up — NILA™ Thai Design Licensing",
    body:(prospect,collection)=>`Subject: Following Up — NILA™ Thai Design Licensing · ${collection}

Dear [Name],

I wanted to follow up on my introduction to NILA™ sent [10 days ago].

If timing was not right, I fully understand — I am happy to reconnect when it suits your planning cycle better.

For reference, the ${collection} collection is currently available for non-exclusive licensing across wallcovering, textile, and packaging applications. I am also able to arrange a short video call to walk through the collection context and surface applications.

Please let me know if you would like me to send across our portfolio PDF.

With regards,
[Your Name]
NILA™ · Inspired by Thai Heritage. Crafted for the World.`
  },
  proposal: {
    label:"Licensing Proposal Introduction Email",
    subject:"NILA™ Licensing Proposal — [Collection] · [Licence Tier]",
    body:(prospect,collection,segment,tier)=>`Subject: NILA™ Licensing Proposal — ${collection} · ${tier||"Brand Collection Licence"}

Dear [Name],

Thank you for your interest in NILA™.

Following our conversation, please find attached our formal licensing proposal for the ${collection} collection.

The proposal outlines:
· Licence scope and territory
· Exclusivity options
· Indicative fee range
· Delivery format and timeline
· Cultural documentation included

All fees stated are indicative. Final terms are agreed in writing following your review.

I am available for a call at your convenience to discuss any questions.

With regards,
[Your Name]
NILA™ · Siamese Botanica · Thailand

---
Note: This email template is for planning purposes. Review and personalise before sending. Do not send before licence agreement templates have been reviewed by a qualified Thai IP lawyer.`
  },
  meeting: {
    label:"Meeting Agenda — Licensing Discovery Call",
    subject:"NILA™ × [Prospect] — Discovery Call Agenda",
    body:(prospect,collection)=>`NILA™ × [Prospect Name]
Licensing Discovery Call — Agenda

Duration: 30 minutes
Format: Video call

---

1. NILA™ Introduction (5 min)
   · Studio background and cultural research methodology
   · Thai IP licensing structure overview

2. ${collection} Collection Walk-Through (10 min)
   · Motif provenance and design context
   · Surface applications and available formats
   · Colourway options

3. Licensing Options (10 min)
   · Tier overview: POD / Commercial / Brand / Exclusive
   · Exclusivity and territory discussion
   · Indicative fee range

4. Next Steps (5 min)
   · Portfolio PDF delivery
   · Proposal timeline
   · Questions

---
NILA™ — Inspired by Thai Heritage. Crafted for the World.
[Website] · [Email]`
  },
};

function AISalesAssistant() {
  const [selProspect, setSelProspect] = useState(INIT_TARGETS[0]);
  const [selCollection, setSelCollection] = useState("Midnight Siam");
  const [selTemplate, setSelTemplate] = useState("outreach");
  const [copied, setCopied] = useState(false);
  const [customNote, setCustomNote] = useState("");
  const [aiMode, setAiMode] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState("");
  const [aiError, setAiError] = useState("");
  const [aiTone, setAiTone] = useState("professional");
  const [aiWords, setAiWords] = useState(200);

  const collections = [...new Set(INIT_ASSETS.map(a => a.collection))];
  const template = EMAIL_TEMPLATES[selTemplate];
  const tierForProspect = selProspect.cat==="Luxury Hospitality"?"Exclusive Commission":selProspect.cat==="Surface Brand"?"Brand Collection Licence":"Commercial Licence";
  const staticBody = template.body(selProspect.name, selCollection, selProspect.cat, tierForProspect);
  const fullStatic = `${template.subject}\n\n${staticBody}${customNote?`\n\n---\nPersonal Note:\n${customNote}`:""}`;

  const displayText = aiMode && aiOutput ? aiOutput : fullStatic;

  const copyText = () => {
    const text = displayText;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    } else {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateWithAI = async () => {
    setAiLoading(true);
    setAiError("");
    setAiOutput("");
    const motifData = MOTIFS.find(m => selCollection.includes(m.name.split(" ")[0])) || MOTIFS[0];
    const systemPrompt = `You are a professional licensing outreach specialist for NILA™, a NILA Heritage Living™ based in Thailand (a design division of Siamese Botanica). 

NILA™ brand voice: Scholarly Artisan. Quiet Authority. Culturally Grounded. Precise and Poetic.
- Uses specific motif names (${motifData.name} / ${motifData.thai}), historical periods, and precise surface descriptions
- Never uses "oriental", "exotic", or vague cultural references
- Tone: warm but precise, story-first, one cultural fact before any commercial claim
- Never makes unverified legal claims about IP registration status
- Always positions NILA as pre-revenue, credible, and invitation-based

Write in ${aiTone} tone. Target length: approximately ${aiWords} words.`;

    const userPrompt = `Write a ${template.label} for NILA™.

Prospect: ${selProspect.name}
Prospect Type: ${selProspect.cat}
Region: ${selProspect.region}
Why relevant: ${selProspect.why}
Collection: ${selCollection}
Motif: ${motifData.name} (${motifData.thai}) — ${motifData.meaning}
Suggested licence tier: ${tierForProspect}
${customNote ? `Additional context: ${customNote}` : ""}

Include:
- Subject line
- Opening that leads with a cultural fact about the motif
- Clear, specific value proposition for this prospect type
- Soft call to action (portfolio PDF or discovery call)
- Professional sign-off as NILA™ / Siamese Botanica

Important: Keep all [bracketed placeholders] for contact details (email, website, phone). Do not invent contact information.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:1000,
          system: systemPrompt,
          messages:[{ role:"user", content:userPrompt }],
        }),
      });
      const data = await response.json();
      if (data.content && data.content[0]?.text) {
        setAiOutput(data.content[0].text);
      } else if (data.error) {
        setAiError(`API error: ${data.error.message}`);
      }
    } catch(err) {
      setAiError(`Network error: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div>
      <SectionHead icon="◑" title="AI Sales Assistant" subtitle="Generate outreach emails with Claude AI or use structured templates" />
      <AlertBox type="warning">All outputs are drafts only. Personalise every [bracketed placeholder] before sending. Do not send proposals before licence templates are reviewed by your IP lawyer.</AlertBox>

      <Grid cols={2} gap={14}>
        <Card>
          <Divider label="Configuration" />
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>Select Prospect</label>
            <select value={selProspect.id} onChange={e => setSelProspect(INIT_TARGETS.find(t => t.id===Number(e.target.value)))} style={{ width:"100%", padding:"8px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.white, fontSize:T.base, fontFamily:"inherit" }}>
              {INIT_TARGETS.map(t => <option key={t.id} value={t.id}>{t.name} — {t.cat}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>Select Collection</label>
            <select value={selCollection} onChange={e => setSelCollection(e.target.value)} style={{ width:"100%", padding:"8px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.white, fontSize:T.base, fontFamily:"inherit" }}>
              {collections.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Divider label="Template Type" />
          {Object.entries(EMAIL_TEMPLATES).map(([key,tmpl]) => (
            <div key={key} onClick={() => { setSelTemplate(key); setAiOutput(""); }}
              style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:8, cursor:"pointer", padding:"10px 12px", borderRadius:T.radius, background:selTemplate===key?`${T.indigo}08`:T.ground, border:`1px solid ${selTemplate===key?T.indigo:T.border}`, transition:"all 0.12s" }}>
              <div style={{ width:16, height:16, borderRadius:"50%", flexShrink:0, marginTop:1, background:selTemplate===key?T.indigo:T.border, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {selTemplate===key && <div style={{ width:6, height:6, borderRadius:"50%", background:"#fff" }} />}
              </div>
              <div style={{ fontWeight:700, color:selTemplate===key?T.indigo:T.ink, fontSize:T.sm }}>{tmpl.label}</div>
            </div>
          ))}
          <Divider label="Personal Note" />
          <textarea value={customNote} onChange={e => setCustomNote(e.target.value)} placeholder="Add context or personalisation hint…" style={{ width:"100%", padding:"8px 10px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.sm, fontFamily:"inherit", resize:"vertical", minHeight:60, boxSizing:"border-box", color:T.ink }} />

          {/* AI Controls */}
          <Divider label="Claude AI Generation" />
          <div style={{ padding:"14px", background:`${T.indigo}06`, borderRadius:T.radius, border:`1px solid ${T.indigo}22` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ fontSize:T.sm, fontWeight:700, color:T.indigo }}>Generate with Claude AI</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:T.xs, color:T.mist }}>AI Mode</span>
                <div onClick={() => { setAiMode(!aiMode); setAiOutput(""); }}
                  style={{ width:36, height:20, borderRadius:10, background:aiMode?T.indigo:T.border, cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
                  <div style={{ position:"absolute", top:3, left:aiMode?18:3, width:14, height:14, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
                </div>
              </div>
            </div>
            <Grid cols={2} gap={8}>
              <div>
                <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Tone</label>
                <select value={aiTone} onChange={e => setAiTone(e.target.value)} style={{ width:"100%", padding:"6px 8px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.sm }}>
                  {[["professional","Professional"],["warm","Warm & Story-led"],["concise","Concise & Direct"],["creative","Creative & Cultural"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:"block", fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Length</label>
                <select value={aiWords} onChange={e => setAiWords(Number(e.target.value))} style={{ width:"100%", padding:"6px 8px", borderRadius:T.radius, border:`1px solid ${T.border}`, fontSize:T.sm }}>
                  {[[150,"Short (~150 words)"],[200,"Standard (~200 words)"],[300,"Detailed (~300 words)"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </Grid>
            <button onClick={generateWithAI} disabled={aiLoading}
              style={{ marginTop:10, width:"100%", padding:"9px", borderRadius:T.radius, border:"none", background:aiLoading?T.ground:`linear-gradient(135deg,${T.indigo},${T.indigoL})`, color:aiLoading?T.mist:"#fff", fontWeight:700, fontSize:T.base, cursor:aiLoading?"not-allowed":"pointer", letterSpacing:"0.02em" }}>
              {aiLoading ? "⏳ Claude is writing…" : "✦ Generate with Claude"}
            </button>
            {aiError && <div style={{ marginTop:8, fontSize:T.xs, color:T.crimson, padding:"6px 10px", background:"#FEF2F2", borderRadius:6 }}>{aiError}</div>}
          </div>

          <div style={{ marginTop:14, display:"flex", gap:8, flexWrap:"wrap" }}>
            <div style={{ background:T.ground, borderRadius:T.radius, padding:"8px 12px" }}>
              <div style={{ fontSize:T.xs, color:T.mist, fontWeight:700 }}>Prospect type</div>
              <div style={{ fontSize:T.sm, color:T.ink, fontWeight:700 }}>{selProspect.cat}</div>
            </div>
            <div style={{ background:T.ground, borderRadius:T.radius, padding:"8px 12px" }}>
              <div style={{ fontSize:T.xs, color:T.mist, fontWeight:700 }}>Suggested tier</div>
              <div style={{ fontSize:T.sm, color:T.indigo, fontWeight:700 }}>{tierForProspect}</div>
            </div>
          </div>
        </Card>

        <div style={{ position:"sticky", top:16, alignSelf:"flex-start" }}>
          <Card style={{ border:`2px solid ${aiMode && aiOutput ? T.jade : T.gold}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <Tag color={aiMode && aiOutput ? "jade" : "gold"}>{aiMode && aiOutput ? "✦ Claude AI" : "Template"}</Tag>
                  {aiMode && aiOutput && <Tag color="indigo" size="xs">{aiTone} · ~{aiWords} words</Tag>}
                </div>
                <div style={{ fontSize:T.xs, color:T.mist, marginTop:6 }}>{selProspect.name}</div>
              </div>
              <Button onClick={copyText} variant={aiMode && aiOutput ? "primary" : "gold"} size="sm">{copied ? "✓ Copied" : "Copy"}</Button>
            </div>

            {aiLoading ? (
              <div style={{ textAlign:"center", padding:"40px 20px" }}>
                <div style={{ fontSize:24, marginBottom:12, animation:"none" }}>✦</div>
                <div style={{ fontSize:T.sm, color:T.mist }}>Claude is crafting your email…</div>
              </div>
            ) : (
              <div style={{ background:T.indigoD, borderRadius:T.radius, padding:"14px 16px", color:"#C8D8FF", fontFamily:"monospace", fontSize:T.xs, lineHeight:1.8, maxHeight:480, overflowY:"auto", whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
                {displayText}
              </div>
            )}

            <div style={{ marginTop:12, padding:"10px 14px", background:"#FEF9EC", border:`1px solid ${T.gold}44`, borderRadius:T.radius, fontSize:T.xs, color:"#7A5C10", lineHeight:1.5 }}>
              ⚠ Personalise all [bracketed placeholders] before sending. This is a draft — not ready to send as-is.
            </div>
            {aiMode && aiOutput && (
              <div style={{ marginTop:8, display:"flex", gap:8 }}>
                <button onClick={() => { setAiOutput(""); }} style={{ flex:1, padding:"6px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.ground, color:T.mist, fontSize:T.xs, cursor:"pointer", fontWeight:600 }}>↺ Regenerate</button>
                <button onClick={() => setAiMode(false)} style={{ flex:1, padding:"6px", borderRadius:T.radius, border:`1px solid ${T.border}`, background:T.ground, color:T.mist, fontSize:T.xs, cursor:"pointer", fontWeight:600 }}>← Use Template</button>
              </div>
            )}
          </Card>
        </div>
      </Grid>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MODULE: WATERMARK STUDIO
// ────────────────────────────────────────────────────────────
// ─── Watermark presets ───────────────────────────────────────
const PRESETS = {
  heavy: {
    label: "Heavy — Pre-Licence Preview",
    text: "NILA™ CONFIDENTIAL",
    subtext: "© Siamese Botanica · NOT LICENSED",
    opacity: 0.38,
    spacing: 160,
    fontSize: 18,
    angle: -42,
    color: "#0F4D3A",
    showBorder: true,
    borderText: "NILA™ DESIGN LICENSING STUDIO · SIAMESE BOTANICA · THAILAND · FOR ENQUIRY ONLY · NOT FOR REPRODUCTION ·",
  },
  medium: {
    label: "Medium — Portfolio PDF",
    text: "NILA™",
    subtext: "© Siamese Botanica",
    opacity: 0.22,
    spacing: 200,
    fontSize: 16,
    angle: -38,
    color: "#0F4D3A",
    showBorder: true,
    borderText: "NILA™ THAI CULTURAL IP LICENSING · niladesign.co · FOR LICENCED USE ONLY ·",
  },
  light: {
    label: "Light — Social Media",
    text: "NILA™",
    subtext: "niladesign.co",
    opacity: 0.14,
    spacing: 240,
    fontSize: 14,
    angle: -35,
    color: "#0F4D3A",
    showBorder: false,
    borderText: "",
  },
  gold: {
    label: "Gold — Premium Client Preview",
    text: "NILA™ PREVIEW",
    subtext: "Licensed copy pending · © Siamese Botanica",
    opacity: 0.30,
    spacing: 180,
    fontSize: 17,
    angle: -42,
    color: "#C7A24D",
    showBorder: true,
    borderText: "NILA™ · THAI CULTURAL SURFACE DESIGN · CONFIDENTIAL PREVIEW · NOT FOR REPRODUCTION ·",
  },
};

// ─── Main Component ──────────────────────────────────────────
function WatermarkStudio() {
  // ── Pull vault assets from persistent storage (shared with AssetVault)
  const [vaultAssets, setVaultAssets] = useState(INIT_ASSETS);
  useState(() => {
    (async () => {
      try {
        const res = await window.storage.get("nila_asset_vault");
        if (res && res.value) {
          const stored = JSON.parse(res.value);
          if (stored.length) setVaultAssets(stored);
        }
      } catch(e) { /* use INIT_ASSETS */ }
    })();
  });
  const canvasRef    = useRef(null);
  const previewRef   = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);       // HTMLImageElement
  const [imgFile, setImgFile] = useState(null);   // File object
  const [preset, setPreset] = useState("heavy");
  const [custom, setCustom] = useState({ ...PRESETS.heavy });
  const [tab, setTab] = useState("upload");        // upload | adjust | export
  const [processing, setProcessing] = useState(false);
  const [batchFiles, setBatchFiles] = useState([]);
  const [batchDone, setBatchDone] = useState([]);
  const [batchRunning, setBatchRunning] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Sync preset → custom when preset changes
  useEffect(() => {
    setCustom({ ...PRESETS[preset] });
  }, [preset]);

  // ── Draw watermark on canvas
  const drawWatermark = useCallback((img, cfg, targetCanvas) => {
    const cvs = targetCanvas || canvasRef.current;
    if (!cvs || !img) return;
    const ctx = cvs.getContext("2d");

    // ── Polyfill: roundRect (Safari < 15.4, Firefox < 112)
    if (!ctx.roundRect) {
      ctx.roundRect = function(x, y, w, h, r) {
        const rad = Math.min(r, w/2, h/2);
        this.beginPath();
        this.moveTo(x + rad, y);
        this.lineTo(x + w - rad, y);
        this.quadraticCurveTo(x + w, y, x + w, y + rad);
        this.lineTo(x + w, y + h - rad);
        this.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
        this.lineTo(x + rad, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - rad);
        this.lineTo(x, y + rad);
        this.quadraticCurveTo(x, y, x + rad, y);
        this.closePath();
      };
    }

    // ── Helper: draw spaced text manually (replaces ctx.letterSpacing)
    // ctx.letterSpacing is not supported in Firefox < 110 or Safari < 16.1
    const fillSpacedText = (text, x, y, tracking) => {
      if (typeof ctx.letterSpacing !== "undefined") {
        // Native support available
        ctx.letterSpacing = tracking;
        ctx.fillText(text, x, y);
        ctx.letterSpacing = "0px";
      } else {
        // Manual character spacing fallback
        const chars = text.split("");
        const pxPerEm = parseFloat(ctx.font) || 14;
        const spacingPx = parseFloat(tracking) * pxPerEm / 100;
        let totalW = 0;
        chars.forEach(ch => { totalW += ctx.measureText(ch).width + spacingPx; });
        let cx = ctx.textAlign === "center" ? x - totalW / 2 : x;
        const savedAlign = ctx.textAlign;
        ctx.textAlign = "left";
        chars.forEach(ch => {
          ctx.fillText(ch, cx, y);
          cx += ctx.measureText(ch).width + spacingPx;
        });
        ctx.textAlign = savedAlign;
      }
    };

    // Match canvas to image
    cvs.width  = img.naturalWidth  || img.width;
    cvs.height = img.naturalHeight || img.height;
    const W = cvs.width;
    const H = cvs.height;

    // Draw base image
    ctx.drawImage(img, 0, 0, W, H);

    // ── Diagonal repeating watermark grid
    const scale = Math.max(W, H) / 900; // scale font to image size
    const fontSize   = Math.round(cfg.fontSize * scale);
    const subSize    = Math.round((cfg.fontSize - 4) * scale);
    const spacing    = Math.round(cfg.spacing * scale);
    const angleRad   = (cfg.angle * Math.PI) / 180;

    ctx.save();
    ctx.globalAlpha = cfg.opacity;

    // Diagonal grid: tile across rotated space
    const diag = Math.sqrt(W * W + H * H);
    ctx.translate(W / 2, H / 2);
    ctx.rotate(angleRad);

    const cols = Math.ceil(diag / spacing) + 2;
    const rows = Math.ceil(diag / spacing) + 2;

    for (let row = -rows; row <= rows; row++) {
      for (let col = -cols; col <= cols; col++) {
        const x = col * spacing;
        const y = row * spacing;

        // Main text
        ctx.font = `700 ${fontSize}px 'Georgia', serif`;
        ctx.fillStyle = cfg.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        fillSpacedText(cfg.text, x, y - fontSize * 0.6, "0.12em");

        // Sub text
        ctx.font = `500 ${subSize}px 'Helvetica Neue', sans-serif`;
        fillSpacedText(cfg.subtext, x, y + fontSize * 0.4, "0.08em");

        // Small ornament dot
        ctx.beginPath();
        ctx.arc(x, y + fontSize * 1.1, Math.max(2, 3 * scale), 0, Math.PI * 2);
        ctx.fillStyle = cfg.color;
        ctx.fill();
      }
    }
    ctx.restore();

    // ── Border band (heavy protection)
    if (cfg.showBorder && cfg.borderText) {
      const bandH = Math.round(28 * scale);

      // Top band
      ctx.save();
      ctx.fillStyle = cfg.color;
      ctx.globalAlpha = 0.82;
      ctx.fillRect(0, 0, W, bandH);
      ctx.restore();

      // Top band text
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = cfg.color === T.gold ? "#fff" : T.goldL;
      ctx.font = `700 ${Math.round(9 * scale)}px 'Helvetica Neue', sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      // Repeat border text across full width
      let bx = 12;
      const repeatText = cfg.borderText + "  ";
      while (bx < W + 200) {
        fillSpacedText(repeatText, bx, bandH / 2, "0.12em");
        ctx.textAlign = "left";
        bx += ctx.measureText(repeatText).width + repeatText.length * (parseFloat("0.12em") * Math.round(9 * scale) / 100 || 1);
      }
      ctx.restore();

      // Bottom band
      ctx.save();
      ctx.fillStyle = cfg.color;
      ctx.globalAlpha = 0.82;
      ctx.fillRect(0, H - bandH, W, bandH);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = cfg.color === T.gold ? "#fff" : T.goldL;
      ctx.font = `700 ${Math.round(9 * scale)}px 'Helvetica Neue', sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      let bx2 = 12;
      while (bx2 < W + 200) {
        fillSpacedText(repeatText, bx2, H - bandH / 2, "0.12em");
        ctx.textAlign = "left";
        bx2 += ctx.measureText(repeatText).width + repeatText.length * (parseFloat("0.12em") * Math.round(9 * scale) / 100 || 1);
      }
      ctx.restore();

      // Corner stamp — top right
      const stampW = Math.round(120 * scale);
      const stampH = Math.round(36 * scale);
      ctx.save();
      ctx.fillStyle = T.gold;
      ctx.globalAlpha = 0.92;
      ctx.fillRect(W - stampW - Math.round(16 * scale), bandH + Math.round(12 * scale), stampW, stampH);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#fff";
      ctx.font = `800 ${Math.round(8 * scale)}px 'Helvetica Neue', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      fillSpacedText("NILA™ PREVIEW ONLY", W - stampW / 2 - Math.round(16 * scale), bandH + stampH / 2 + Math.round(12 * scale), "0.1em");
      ctx.restore();
    }

    // ── Corner mark — bottom right (always)
    const cmSize = Math.round(64 * scale);
    const cmPad  = Math.round(14 * scale);
    ctx.save();
    ctx.globalAlpha = 0.90;
    ctx.fillStyle = T.indigo;
    ctx.beginPath();
    ctx.roundRect(W - cmSize - cmPad, H - cmSize - cmPad, cmSize, cmSize, Math.round(6 * scale));
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = T.goldL;
    ctx.font      = `800 ${Math.round(10 * scale)}px 'Georgia', serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    fillSpacedText("NILA™", W - cmSize / 2 - cmPad, H - cmSize / 2 - cmPad - Math.round(5 * scale), "0em");
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = `500 ${Math.round(7 * scale)}px 'Helvetica Neue', sans-serif`;
    fillSpacedText("© PROTECTED", W - cmSize / 2 - cmPad, H - cmSize / 2 - cmPad + Math.round(8 * scale), "0.08em");
    ctx.restore();

  }, []);

  // Re-draw whenever image or config changes
  useEffect(() => {
    if (image) drawWatermark(image, custom, canvasRef.current);
  }, [image, custom, drawWatermark]);

  // ── File load
  const loadFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImgFile(file);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { setImage(img); setTab("adjust"); };
    img.src = url;
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    loadFile(file);
  };

  // ── Single download
  const downloadSingle = () => {
    setProcessing(true);
    const cvs = canvasRef.current;
    if (!cvs) return;
    const link = document.createElement("a");
    const base = imgFile?.name.replace(/\.[^.]+$/, "") || "design";
    link.download = `NILA-WM-${base}-${preset}.png`;
    link.href = cvs.toDataURL("image/png", 1.0);
    link.click();
    setProcessing(false);
  };

  // ── Batch processing
  const runBatch = async () => {
    setBatchRunning(true);
    setBatchDone([]);
    for (const file of batchFiles) {
      await new Promise((resolve) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          const offscreen = document.createElement("canvas");
          drawWatermark(img, custom, offscreen);
          const link = document.createElement("a");
          link.download = `NILA-WM-${file.name.replace(/\.[^.]+$/, "")}-${preset}.png`;
          link.href = offscreen.toDataURL("image/png", 1.0);
          link.click();
          setBatchDone(d => [...d, file.name]);
          URL.revokeObjectURL(url);
          setTimeout(resolve, 400); // small delay between downloads
        };
        img.src = url;
      });
    }
    setBatchRunning(false);
  };

  const SliderRow = ({ label, field, min, max, step=1, display }) => (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <label style={{ fontSize:11, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.09em" }}>{label}</label>
        <span style={{ fontSize:11, fontWeight:700, color:T.indigo }}>{display || custom[field]}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={custom[field]}
        onChange={e => setCustom(c => ({...c, [field]: parseFloat(e.target.value)}))}
        style={{ width:"100%", accentColor:T.indigo, cursor:"pointer" }} />
    </div>
  );

  // ── Layout
  return (
    <div style={{ minHeight:"100vh", background:T.indigoD, fontFamily:"'Inter',system-ui,sans-serif", fontSize:13, color:T.ink }}>

      {/* Topbar */}
      <div style={{ background:T.indigoD, borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"0 24px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
          <span style={{ fontSize:20, fontWeight:900, color:"#fff", fontFamily:"Georgia,serif", letterSpacing:"-0.02em" }}>NILA™</span>
          <span style={{ fontSize:10, color:T.goldL, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase" }}>Watermark Studio</span>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {["upload","adjust","export"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding:"5px 16px", borderRadius:20, fontSize:11, fontWeight:700, textTransform:"capitalize", letterSpacing:"0.06em", border:`1px solid ${tab===t?T.goldL:"rgba(255,255,255,0.15)"}`, background:tab===t?"rgba(184,133,30,0.18)":"transparent", color:tab===t?T.goldL:"rgba(255,255,255,0.5)", cursor:"pointer" }}>
              {t==="upload"?"① Upload":t==="adjust"?"② Adjust":"③ Export"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", minHeight:"calc(100vh - 52px)" }}>

        {/* ── Left Panel */}
        <div style={{ width:300, flexShrink:0, background:"rgba(255,255,255,0.03)", borderRight:"1px solid rgba(255,255,255,0.07)", padding:20, overflowY:"auto" }}>

          {/* Preset selector */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:10 }}>Protection Preset</div>
            {Object.entries(PRESETS).map(([key, p]) => (
              <div key={key} onClick={() => setPreset(key)}
                style={{ padding:"10px 12px", borderRadius:8, marginBottom:6, cursor:"pointer", border:`1px solid ${preset===key?T.goldL:"rgba(255,255,255,0.08)"}`, background:preset===key?"rgba(184,133,30,0.12)":"transparent", transition:"all 0.12s" }}>
                <div style={{ fontWeight:700, fontSize:12, color:preset===key?T.goldL:"rgba(255,255,255,0.7)" }}>{p.label}</div>
              </div>
            ))}
          </div>

          {/* Custom sliders */}
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:16, marginBottom:16 }}>
            <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>Fine-Tune</div>

            <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"12px 14px", marginBottom:12 }}>
              <SliderRow label="Opacity" field="opacity" min={0.04} max={0.65} step={0.01} display={`${Math.round(custom.opacity*100)}%`} />
              <SliderRow label="Grid Spacing" field="spacing" min={100} max={320} display={`${custom.spacing}px`} />
              <SliderRow label="Font Size" field="fontSize" min={10} max={28} display={`${custom.fontSize}px`} />
              <SliderRow label="Angle" field="angle" min={-60} max={-15} display={`${custom.angle}°`} />
            </div>

            {/* Text customisation */}
            {["text","subtext"].map(field => (
              <div key={field} style={{ marginBottom:10 }}>
                <label style={{ display:"block", fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>
                  {field === "text" ? "Main Text" : "Sub Text"}
                </label>
                <input value={custom[field]} onChange={e => setCustom(c => ({...c,[field]:e.target.value}))}
                  style={{ width:"100%", padding:"7px 10px", borderRadius:6, border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.06)", color:"#fff", fontSize:12, boxSizing:"border-box", fontFamily:"inherit" }} />
              </div>
            ))}

            {/* Color */}
            <div style={{ marginBottom:10 }}>
              <label style={{ display:"block", fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:5 }}>Watermark Color</label>
              <div style={{ display:"flex", gap:8 }}>
                {[T.indigo, T.gold, "#000000", "#FFFFFF"].map(col => (
                  <div key={col} onClick={() => setCustom(c=>({...c,color:col}))}
                    style={{ width:28, height:28, borderRadius:6, background:col, border:`2px solid ${custom.color===col?"#fff":"transparent"}`, cursor:"pointer", boxShadow:custom.color===col?"0 0 0 1px rgba(255,255,255,0.4)":"none", transition:"all 0.12s" }} />
                ))}
              </div>
            </div>

            {/* Border toggle */}
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(255,255,255,0.04)", borderRadius:8 }}>
              <div onClick={() => setCustom(c=>({...c,showBorder:!c.showBorder}))}
                style={{ width:34, height:18, borderRadius:9, background:custom.showBorder?T.gold:"rgba(255,255,255,0.15)", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
                <div style={{ position:"absolute", top:2, left:custom.showBorder?16:2, width:14, height:14, borderRadius:"50%", background:"#fff", transition:"left 0.18s" }} />
              </div>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)", fontWeight:600 }}>Top & Bottom bands</span>
            </div>
          </div>
        </div>

        {/* ── Main canvas area */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Upload tab */}
          {tab === "upload" && (
            <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:32 }}>
              <div
                onDrop={onDrop}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                style={{ width:"100%", maxWidth:480, aspectRatio:"4/3", border:`2px dashed ${dragOver?T.goldL:"rgba(255,255,255,0.15)"}`, borderRadius:16, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", background:dragOver?"rgba(184,133,30,0.06)":"rgba(255,255,255,0.02)", transition:"all 0.18s" }}>
                <div style={{ fontSize:40, marginBottom:16, opacity:0.4 }}>◭</div>
                <div style={{ fontSize:16, fontWeight:700, color:"rgba(255,255,255,0.7)", marginBottom:8 }}>Drop image here</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginBottom:20 }}>PNG, JPG, WEBP — any size</div>
                <div style={{ padding:"9px 24px", borderRadius:8, background:T.gold, color:"#fff", fontWeight:700, fontSize:13 }}>Browse Files</div>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display:"none" }}
                  onChange={e => loadFile(e.target.files[0])} />
              </div>
            </div>
          )}

          {/* Adjust tab — canvas preview */}
          {tab === "adjust" && (
            <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:24, background:"rgba(0,0,0,0.3)", overflow:"auto" }}>
              {image ? (
                <canvas ref={canvasRef}
                  style={{ maxWidth:"100%", maxHeight:"calc(100vh - 160px)", borderRadius:8, boxShadow:"0 8px 40px rgba(0,0,0,0.6)", display:"block" }} />
              ) : (
                <div style={{ color:"rgba(255,255,255,0.3)", textAlign:"center" }}>
                  <div style={{ fontSize:32, marginBottom:10 }}>◭</div>
                  <div>Upload an image first</div>
                </div>
              )}
            </div>
          )}

          {/* Export tab */}
          {tab === "export" && (
            <div style={{ flex:1, padding:32, overflowY:"auto" }}>
              <div style={{ maxWidth:640, margin:"0 auto" }}>

                {/* Single export */}
                <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:24, marginBottom:20 }}>
                  <div style={{ fontSize:14, fontWeight:800, color:"#fff", marginBottom:4 }}>Single Image</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:16 }}>Export the current preview as PNG</div>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <button onClick={downloadSingle} disabled={!image}
                      style={{ padding:"10px 24px", borderRadius:8, border:"none", background:image?T.gold:"rgba(255,255,255,0.1)", color:image?"#fff":"rgba(255,255,255,0.3)", fontWeight:700, fontSize:13, cursor:image?"pointer":"not-allowed", letterSpacing:"0.03em" }}>
                      ⬇ Download PNG
                    </button>
                    {image && <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>NILA-WM-[filename]-{preset}.png</span>}
                  </div>
                </div>

                {/* Batch export */}
                <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:24, marginBottom:20 }}>
                  <div style={{ fontSize:14, fontWeight:800, color:"#fff", marginBottom:4 }}>Batch Export</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:16 }}>Watermark multiple images at once — same preset applied to all</div>
                  <input type="file" accept="image/*" multiple onChange={e => setBatchFiles(Array.from(e.target.files))}
                    style={{ display:"block", fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:12, cursor:"pointer" }} />
                  {batchFiles.length > 0 && (
                    <>
                      <div style={{ marginBottom:12 }}>
                        {batchFiles.map((f,i) => (
                          <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                            <span style={{ fontSize:11, color:batchDone.includes(f.name)?T.jade:"rgba(255,255,255,0.5)", flex:1 }}>{f.name}</span>
                            {batchDone.includes(f.name) && <span style={{ fontSize:10, color:T.jade, fontWeight:700 }}>✓ done</span>}
                          </div>
                        ))}
                      </div>
                      <button onClick={runBatch} disabled={batchRunning}
                        style={{ padding:"10px 24px", borderRadius:8, border:"none", background:batchRunning?"rgba(255,255,255,0.1)":T.indigo, color:batchRunning?"rgba(255,255,255,0.3)":"#fff", fontWeight:700, fontSize:13, cursor:batchRunning?"not-allowed":"pointer" }}>
                        {batchRunning ? `⏳ Processing… (${batchDone.length}/${batchFiles.length})` : `⬇ Batch Download (${batchFiles.length} files)`}
                      </button>
                    </>
                  )}
                </div>

                {/* Export specs */}
                <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:20 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>Active Configuration</div>
                  {[
                    ["Preset", PRESETS[preset].label],
                    ["Main text", custom.text],
                    ["Sub text", custom.subtext],
                    ["Opacity", `${Math.round(custom.opacity*100)}%`],
                    ["Grid spacing", `${custom.spacing}px`],
                    ["Angle", `${custom.angle}°`],
                    ["Color", custom.color],
                    ["Top/bottom bands", custom.showBorder ? "ON" : "OFF"],
                    ["Output format", "PNG (lossless, full resolution)"],
                    ["Watermark type", "Canvas-rendered (cannot be removed by CSS)"],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>{k}</span>
                      <span style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.7)", textAlign:"right", maxWidth:"55%" }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Strategy notes */}
                <div style={{ marginTop:20, padding:18, background:"rgba(184,133,30,0.1)", border:"1px solid rgba(184,133,30,0.25)", borderRadius:12 }}>
                  <div style={{ fontSize:12, fontWeight:800, color:T.goldL, marginBottom:10 }}>NILA™ Watermark Strategy</div>
                  {[
                    ["Portfolio PDF sent to prospects", "Medium preset — clean enough to evaluate, marked as NILA property"],
                    ["Website / online gallery", "Light preset — brand presence without blocking detail"],
                    ["Social media (Instagram/Pinterest)", "Light or corner badge — visible but not dominant"],
                    ["Pre-licence preview (initial outreach)", "Heavy preset — strong protection before any agreement is signed"],
                    ["Post-licence delivery", "Remove watermark — deliver clean master files to licensed client"],
                  ].map(([use, rec]) => (
                    <div key={use} style={{ marginBottom:8 }}>
                      <div style={{ fontSize:11, color:T.goldL, fontWeight:700 }}>→ {use}</div>
                      <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginLeft:12 }}>{rec}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ────────────────────────────────────────────────────────────
// MODULE: LICENSING FRAMEWORK
// ────────────────────────────────────────────────────────────
function LicensingFramework() {
  const [activeTab, setActiveTab] = useState("structure");

  const RIGHTS_MATRIX = [
    { right:"Non-exclusive use",             pod:"✓", com:"✓", brd:"✓", exc:"✓" },
    { right:"Regional exclusivity",          pod:"✗", com:"✗", brd:"✓ (6 mo.)", exc:"✓ (custom)" },
    { right:"Global exclusivity",            pod:"✗", com:"✗", brd:"✗", exc:"✓" },
    { right:"Physical production",           pod:"✗", com:"✓ (≤2,000)", brd:"Unlimited", exc:"Unlimited" },
    { right:"Digital / POD production",      pod:"✓", com:"✓", brd:"✓", exc:"✓" },
    { right:"Multiple product categories",   pod:"✗", com:"1 only", brd:"Up to 3", exc:"All" },
    { right:"Sub-licensing",                 pod:"✗", com:"✗", brd:"✗", exc:"Negotiable" },
    { right:"White-label resale",            pod:"✗", com:"✗", brd:"✗", exc:"✗" },
    { right:"Vector source files",           pod:"✗", com:"✓", brd:"✓", exc:"✓" },
    { right:"Full art direction rounds",     pod:"✗", com:"✗", brd:"2 rounds", exc:"Unlimited" },
    { right:"Cultural documentation",        pod:"Summary", com:"✓", brd:"Full PDF", exc:"Full + research" },
    { right:"Bespoke custom development",    pod:"✗", com:"✗", brd:"✗", exc:"✓" },
    { right:"Quarterly consultation",        pod:"✗", com:"✗", brd:"✗", exc:"✓" },
    { right:"SIAC arbitration available",    pod:"✗", com:"On request", brd:"On request", exc:"✓ Default" },
  ];

  const LICENCE_PROCESS = [
    { step:1, title:"Initial Enquiry", desc:"Client contacts NILA via email or portfolio request form. Response within 3 business days.", icon:"✉", color:T.jade },
    { step:2, title:"NDA + Brief", desc:"NILA sends NDA for signature. Client completes a design brief: surfaces, volume, territory, timeline.", icon:"📋", color:T.gold },
    { step:3, title:"Collection Preview", desc:"NILA sends watermarked preview PDF. Client selects designs and preferred colourways.", icon:"◫", color:T.indigoL },
    { step:4, title:"Proposal & Scoping", desc:"NILA prepares formal licence proposal with scope, fees, and delivery timeline. Fees calculated via Licensing Calculator.", icon:"◇", color:T.amber },
    { step:5, title:"Negotiation & Agreement", desc:"Scope is finalised. Licence Agreement signed via DocuSign or equivalent. Governing law: Thai law (or SIAC for EXC tier).", icon:"⚖", color:T.lotus },
    { step:6, title:"Invoice & Payment", desc:"Invoice issued in agreed currency (USD / THB / EUR / GBP). 50% deposit before file delivery for BRD and EXC tiers.", icon:"💳", color:T.crimson },
    { step:7, title:"File Delivery", desc:"Clean master files delivered: SVG, EPS, TIFF 300dpi, PNG. No watermarks. Cultural Reference Document included.", icon:"📦", color:T.jade },
    { step:8, title:"Licence Active", desc:"Client begins production within licence scope. NILA records in CRM as 'Licensed'. Renewal contact at 80% of term.", icon:"✓", color:T.gold },
  ];

  const PROHIBITED = [
    "Sub-licensing or resale of design files to third parties",
    "Use outside the agreed product category without written amendment",
    "Removal or alteration of any NILA copyright metadata embedded in files",
    "White-label or private-label resale (presenting as own original design)",
    "Use beyond agreed territory without written amendment",
    "Production beyond agreed unit cap (COM tier) without upgrade",
    "Any application that misrepresents or disrespects Thai cultural heritage",
    "Use for political advertising, gambling, or adult content",
  ];

  return (
    <div>
      <SectionHead icon="◆" title="Licensing Framework"
        subtitle="Complete licensing structure — rights matrix, process flow, and prohibited uses" />

      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {[["structure","Rights Matrix"],["process","Licence Process"],["prohibited","Prohibited Uses"],["faq","FAQ"]].map(([v,l])=>(
          <button key={v} onClick={()=>setActiveTab(v)} style={{ padding:"6px 18px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${activeTab===v?T.indigo:T.border}`, background:activeTab===v?T.indigo:T.white, color:activeTab===v?"#fff":T.mist, cursor:"pointer" }}>{l}</button>
        ))}
      </div>

      {activeTab==="structure" && (
        <div>
          <AlertBox type="info">Matrix shows rights included in each tier. All licences require a signed Licence Agreement before file delivery. Fees are indicative — use Licensing Calculator for scoped estimates.</AlertBox>
          <Card pad={0}>
            <div style={{ overflowX:"auto", borderRadius:T.radiusL, border:`1px solid ${T.border}` }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:T.sm }}>
                <thead>
                  <tr style={{ background:T.indigo }}>
                    <th style={{ padding:"10px 16px", color:"#fff", textAlign:"left", fontSize:T.xs, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", minWidth:200 }}>Right / Restriction</th>
                    {[["NILA-POD",T.jade],["NILA-COM",T.goldL],["NILA-BRD",T.indigoL],["NILA-EXC",T.crimson]].map(([t,c])=>(
                      <th key={t} style={{ padding:"10px 16px", color:"#fff", textAlign:"center", fontSize:T.xs, fontWeight:700, minWidth:110 }}>
                        <span style={{ background:`${c}55`, color:"#fff", borderRadius:4, padding:"2px 8px" }}>{t}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RIGHTS_MATRIX.map((row,i)=>(
                    <tr key={i} style={{ background:i%2===0?T.white:T.ground }}>
                      <td style={{ padding:"9px 16px", color:T.ink, fontWeight:600, borderBottom:`1px solid ${T.borderL}` }}>{row.right}</td>
                      {[row.pod,row.com,row.brd,row.exc].map((val,j)=>(
                        <td key={j} style={{ padding:"9px 16px", textAlign:"center", borderBottom:`1px solid ${T.borderL}`,
                          color:val==="✓"||val.startsWith("✓")?T.jade:val==="✗"?T.crimson:T.amber, fontWeight:700, fontSize:T.xs }}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab==="process" && (
        <div>
          <AlertBox type="info">This is the standard 8-step process for NILA-COM, NILA-BRD, and NILA-EXC licences. POD licences use a simplified 3-step process (contact → payment → file access).</AlertBox>
          {LICENCE_PROCESS.map((s,i)=>(
            <Card key={s.step} style={{ marginBottom:10, borderLeft:`3px solid ${s.color}` }} pad={16}>
              <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                <div style={{ flexShrink:0 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:s.color, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:T.md }}>{s.step}</div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, color:s.color, fontSize:T.lg, fontFamily:"Georgia,serif", marginBottom:4 }}>{s.title}</div>
                  <div style={{ fontSize:T.base, color:T.mist, lineHeight:1.7 }}>{s.desc}</div>
                </div>
                <div style={{ fontSize:24, flexShrink:0, opacity:0.6 }}>{s.icon}</div>
              </div>
            </Card>
          ))}
          <Card style={{ marginTop:14, background:`${T.indigo}06`, border:`1px solid ${T.indigo}22` }}>
            <Divider label="Typical Timeline" />
            <DataTable headers={["Tier","Enquiry to Agreement","Production Start","Typical Total"]}
              rows={[
                ["NILA-POD","1–3 days","Immediate (digital)","1–5 days"],
                ["NILA-COM","5–10 days","After payment","2–3 weeks"],
                ["NILA-BRD","2–4 weeks","After 50% deposit","4–6 weeks"],
                ["NILA-EXC","4–8 weeks","After 50% deposit","8–16 weeks"],
              ]} />
          </Card>
        </div>
      )}

      {activeTab==="prohibited" && (
        <div>
          <AlertBox type="warning">All NILA licence agreements include these prohibited uses. Violation results in immediate termination and legal action under applicable law.</AlertBox>
          <Card>
            <Divider label="Prohibited Uses — All Licence Tiers" />
            {PROHIBITED.map((item,i)=>(
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"10px 14px", marginBottom:8, background:"#FEF2F2", border:`1px solid #FECACA`, borderRadius:T.radius }}>
                <span style={{ color:T.crimson, fontWeight:900, fontSize:16, flexShrink:0 }}>✗</span>
                <span style={{ fontSize:T.base, color:T.ink, lineHeight:1.6 }}>{item}</span>
              </div>
            ))}
          </Card>
          <Card style={{ marginTop:14 }}>
            <Divider label="Cultural Responsibility Clause" />
            <div style={{ background:`${T.indigo}06`, borderLeft:`3px solid ${T.gold}`, borderRadius:T.radius, padding:"14px 18px" }}>
              <div style={{ fontSize:T.base, color:T.ink, lineHeight:1.8 }}>All NILA Heritage Living designs are sourced from documented Thai cultural heritage. Licensees agree to use these designs in a manner that respects and honours Thai cultural traditions. NILA reserves the right to decline or terminate any licence where use is deemed culturally disrespectful or misrepresentative, regardless of payment status.</div>
            </div>
          </Card>
        </div>
      )}

      {activeTab==="faq" && (
        <div>
          {[
            ["Can I use a NILA design on multiple products?", "Depends on your licence tier. NILA-COM covers 1 product category. NILA-BRD covers up to 3. NILA-EXC covers all categories within the agreed territory."],
            ["What if I need more units than NILA-COM allows?", "Contact NILA for a licence amendment. Production beyond the 2,000-unit cap requires upgrade to NILA-BRD or a custom addendum."],
            ["Can I modify the designs?", "Minor colourway adjustments are permitted within the licensed colourway options. Structural modification of the motif requires written approval and may incur an art direction fee."],
            ["What formats are delivered?", "SVG vector, EPS, TIFF 300dpi, PNG seamless tile. All files are production-ready. Cultural Reference Document (PDF) included for all COM tier and above."],
            ["How is exclusivity enforced?", "Regional exclusivity means NILA will not license the same design in the same product category to another client within your agreed territory during your exclusivity window."],
            ["What currency can I pay in?", "USD (default), THB, EUR, or GBP. Use the Licensing Calculator to get an indicative fee in your preferred currency. FX rates verified at invoice date."],
            ["Is my licence transferable if I sell my business?", "Licence agreements are not automatically transferable. A business transfer requires written notification to NILA and a formal assignment agreement."],
            ["What happens at the end of my licence term?", "NILA will contact you at 80% of your term to discuss renewal. Existing stock produced within the licence term may continue to be sold after expiry, but no new production is permitted."],
          ].map(([q,a],i)=>(
            <Card key={i} style={{ marginBottom:10 }} pad={16}>
              <div style={{ fontWeight:700, color:T.indigo, fontSize:T.md, marginBottom:6 }}>Q: {q}</div>
              <div style={{ fontSize:T.base, color:T.mist, lineHeight:1.7, paddingLeft:12, borderLeft:`2px solid ${T.gold}` }}>{a}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MODULE: REVENUE MODEL
// ────────────────────────────────────────────────────────────
function RevenueModel() {
  const [scenario, setScenario] = useState("base");

  const SCENARIOS = {
    base: {
      label:"Base Case",
      pod:{ monthly:8, avgFee:60 },
      com:{ quarterly:1, avgFee:900 },
      brd:{ quarterly:1, avgFee:4500 },
      exc:{ annual:1, avgFee:15000 },
    },
    growth: {
      label:"Growth Case",
      pod:{ monthly:20, avgFee:75 },
      com:{ quarterly:2, avgFee:1200 },
      brd:{ quarterly:2, avgFee:6000 },
      exc:{ annual:2, avgFee:20000 },
    },
    conservative: {
      label:"Conservative",
      pod:{ monthly:4, avgFee:45 },
      com:{ quarterly:1, avgFee:600 },
      brd:{ quarterly:0, avgFee:3500 },
      exc:{ annual:0, avgFee:12000 },
    }
  };

  const s = SCENARIOS[scenario];
  const annualPOD = s.pod.monthly * s.pod.avgFee * 12;
  const annualCOM = s.com.quarterly * s.com.avgFee * 4;
  const annualBRD = s.brd.quarterly * s.brd.avgFee * 4;
  const annualEXC = s.exc.annual * s.exc.avgFee;
  const totalAnnual = annualPOD + annualCOM + annualBRD + annualEXC;

  const streams = [
    { label:"POD Licensing", code:"NILA-POD", annual:annualPOD, color:T.jade, icon:"◎",
      desc:`${s.pod.monthly} sales/month × USD ${s.pod.avgFee} avg × 12 months` },
    { label:"Commercial Licence", code:"NILA-COM", annual:annualCOM, color:T.goldL, icon:"◆",
      desc:`${s.com.quarterly} deal/quarter × USD ${s.com.avgFee} avg × 4 quarters` },
    { label:"Brand Collection Licence", code:"NILA-BRD", annual:annualBRD, color:T.indigoL, icon:"◈",
      desc:`${s.brd.quarterly} deal/quarter × USD ${s.brd.avgFee} avg × 4 quarters` },
    { label:"Exclusive Commission", code:"NILA-EXC", annual:annualEXC, color:T.crimson, icon:"✦",
      desc:`${s.exc.annual} project/year × USD ${s.exc.avgFee} avg` },
  ];

  const REVENUE_MILESTONES = [
    { label:"First Revenue",     usd:30,    desc:"First POD sale — proof of market interest", phase:"Phase 2" },
    { label:"First USD 1,000",   usd:1000,  desc:"~17 POD sales or 1 COM deal — momentum confirmed", phase:"Phase 3" },
    { label:"Break Even (costs)",usd:5000,  desc:"Cover IP legal, domain, tools, and production costs", phase:"Phase 3" },
    { label:"USD 10,000/year",   usd:10000, desc:"Sustainable solo business — 1 BRD deal + POD passive", phase:"Phase 4" },
    { label:"USD 50,000/year",   usd:50000, desc:"Full IP Export Company — multiple BRD + 1 EXC annually", phase:"Phase 4+" },
    { label:"USD 100,000/year",  usd:100000,desc:"NILA Heritage Living as established global IP brand", phase:"Vision" },
  ];

  const pct = (val) => Math.round((val/totalAnnual)*100) || 0;

  return (
    <div>
      <SectionHead icon="◈" title="Revenue Model"
        subtitle="Three-scenario revenue projection across all four licensing channels" />
      <AlertBox type="warning">All figures are planning projections only. No revenue has been earned. Actual results depend on collection quality, outreach execution, and market response.</AlertBox>

      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {Object.entries(SCENARIOS).map(([key,sc])=>(
          <button key={key} onClick={()=>setScenario(key)} style={{ padding:"6px 18px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${scenario===key?T.indigo:T.border}`, background:scenario===key?T.indigo:T.white, color:scenario===key?"#fff":T.mist, cursor:"pointer" }}>{sc.label}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <Stat label="Annual POD Revenue"       value={`USD ${annualPOD.toLocaleString()}`}  sub="Passive income baseline"  accent={T.jade}    />
        <Stat label="Annual COM Revenue"        value={`USD ${annualCOM.toLocaleString()}`}  sub="Small brand deals"        accent={T.goldL}   />
        <Stat label="Annual BRD Revenue"        value={`USD ${annualBRD.toLocaleString()}`}  sub="Collection deals"         accent={T.indigoL} />
        <Stat label="Annual EXC Revenue"        value={`USD ${annualEXC.toLocaleString()}`}  sub="Exclusive commissions"    accent={T.crimson} />
      </div>

      <Grid cols={2} gap={14}>
        <Card>
          <Divider label="Annual Revenue by Channel" />
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>Total Annual ({SCENARIOS[scenario].label})</div>
            <div style={{ fontSize:48, fontWeight:900, color:T.indigo, fontFamily:"Georgia,serif", lineHeight:1 }}>USD {totalAnnual.toLocaleString()}</div>
          </div>
          {streams.map(st=>(
            <div key={st.code} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ color:st.color, fontSize:14 }}>{st.icon}</span>
                  <span style={{ fontSize:T.sm, fontWeight:700, color:T.ink }}>{st.label}</span>
                </div>
                <div style={{ textAlign:"right" }}>
                  <span style={{ fontWeight:800, color:st.color }}>USD {st.annual.toLocaleString()}</span>
                  <span style={{ fontSize:T.xs, color:T.mist, marginLeft:6 }}>{pct(st.annual)}%</span>
                </div>
              </div>
              <div style={{ height:8, background:T.ground, borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${pct(st.annual)}%`, background:st.color, borderRadius:4, transition:"width 0.4s" }} />
              </div>
              <div style={{ fontSize:T.xs, color:T.mist, marginTop:3 }}>{st.desc}</div>
            </div>
          ))}
        </Card>

        <div>
          <Card style={{ marginBottom:14 }}>
            <Divider label="Revenue Milestones Roadmap" />
            {REVENUE_MILESTONES.map((m,i)=>{
              const reached = totalAnnual >= m.usd || (m.usd === 30 && false);
              return (
                <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10, padding:"10px 12px", borderRadius:T.radius, background:reached?`${T.jade}10`:T.ground, border:`1px solid ${reached?T.jade:T.border}` }}>
                  <div style={{ flexShrink:0 }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", background:reached?T.jade:T.ground, border:`2px solid ${reached?T.jade:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", color:reached?"#fff":T.mist, fontWeight:800, fontSize:T.xs }}>
                      {reached?"✓":i+1}
                    </div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontWeight:700, color:reached?T.jade:T.indigo, fontSize:T.base }}>{m.label}</span>
                      <Tag color="mist" size="xs">{m.phase}</Tag>
                    </div>
                    <div style={{ fontSize:T.xs, color:T.mist, marginTop:2 }}>{m.desc}</div>
                  </div>
                </div>
              );
            })}
          </Card>
          <Card>
            <Divider label="Revenue Mix Strategy" />
            {[
              ["POD","Passive baseline. Low effort once listed. Build to 15–20 designs on 4 platforms."],
              ["COM","First active revenue. Target Thai brands and wellness companies first — easier to reach."],
              ["BRD","Highest ROI per deal. Target EU wallcovering brands after Midnight Siam portfolio is ready."],
              ["EXC","Largest single deal. Requires strong portfolio and reputation. Target from Year 2."],
            ].map(([tier,strategy])=>(
              <div key={tier} style={{ display:"flex", gap:10, marginBottom:10 }}>
                <Tag color={tier==="POD"?"jade":tier==="COM"?"gold":tier==="BRD"?"indigo":"red"} size="xs">{tier}</Tag>
                <span style={{ fontSize:T.sm, color:T.mist, lineHeight:1.5, flex:1 }}>{strategy}</span>
              </div>
            ))}
          </Card>
        </div>
      </Grid>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MODULE: COLLECTION ARCHITECTURE
// ────────────────────────────────────────────────────────────
function CollectionArchitecture() {
  const [view, setView] = useState("roadmap");

  const COLLECTION_ARCH = [
    { id:"C01", name:"Siam Tropical Elegance", season:"Q2 2026", phase:"Phase 1", status:"In Production",
      motif:"NIL-TRO", palette:"Tropical Green + Antique Gold + Ivory",
      targets:["Wallpaper","Textile","Packaging"], markets:["Resort Lifestyle","EU Surface Brands","APAC Hotels"],
      designs:20, colorways:3, status_color:T.amber,
      story:"Tropical Thai botanical luxury — lush botanical motifs inspired by Thailand's resort gardens, reimagined for contemporary luxury surfaces." },
    { id:"C02", name:"Emerald Siam",           season:"Q3 2026", phase:"Phase 1", status:"Planned",
      motif:"NIL-EMS", palette:"Emerald Green + Antique Gold + Ivory",
      targets:["Wallcovering","Textile","Hotel Decor"], markets:["EU Wallcovering Brands","APAC Hospitality"],
      designs:20, colorways:3, status_color:T.jade,
      story:"Emerald and antique gold heritage palette — the deep forest greens of Thailand's royal temples reinterpreted for global luxury interiors." },
    { id:"C03", name:"Lotus Blush",            season:"Q4 2026", phase:"Phase 1", status:"Planned",
      motif:"NIL-LTB", palette:"Lotus Pink + Antique Gold + Linen",
      targets:["Textile","Spa Linen","Packaging"], markets:["Wellness Brands","Spa","Thai Hospitality"],
      designs:20, colorways:3, status_color:T.mist,
      story:"Soft lotus palette for wellness and hospitality — the sacred Thai lotus reimagined in blush tones for premium spa and wellness applications." },
    { id:"C04", name:"Ivory Kingdom",          season:"Q1 2027", phase:"Phase 2", status:"Planned",
      motif:"NIL-IVK", palette:"Ivory + Champagne Gold + Soft White",
      targets:["Wallcovering","Bedding","Luxury Packaging"], markets:["Luxury Interiors","Boutique Hotels"],
      designs:20, colorways:3, status_color:T.mist,
      story:"Ivory and champagne gold for refined interiors — understated luxury at its most elegant, for discerning international clients." },
    { id:"C05", name:"Midnight Siam",          season:"Q2 2027", phase:"Phase 2", status:"Flagship",
      motif:"NIL-MDS", palette:"Nila Black + Antique Gold + Deep Emerald",
      targets:["Wallcovering","Textile","Packaging"], markets:["Luxury Fashion","Premium Hospitality","Global Export"],
      designs:20, colorways:3, status_color:T.gold,
      story:"Black and antique gold flagship Thai heritage collection — the dramatic beauty of Siam after midnight, for the highest tier of global luxury licensing." },
    { id:"C06", name:"Royal Azure",            season:"Q3 2027", phase:"Phase 2", status:"Planned",
      motif:"NIL-RAZ", palette:"Royal Indigo + Pearl + Soft Gold",
      targets:["Wallcovering","Silk Scarf","Fashion"], markets:["Fashion Brands","Luxury Retail","Premium Licensing"],
      designs:20, colorways:3, status_color:T.mist,
      story:"Royal indigo, pearl, and soft gold for premium licensing — inspired by Thailand's royal court, reinterpreted for international fashion and lifestyle." },
    { id:"C07", name:"Dok Mali Botanical",     season:"Q4 2027", phase:"Phase 3", status:"Planned",
      motif:"NIL-DKM", palette:"Jasmine White + Sage Green + Antique Gold",
      targets:["Stationery","Packaging","Textile"], markets:["Stationery Brands","Wellness Packaging","Gifting"],
      designs:20, colorways:2, status_color:T.mist,
      story:"Jasmine botanical crossover — the sacred Dok Mali flower of Thailand, translated into an elegant botanical repeat for stationery and packaging." },
    { id:"C08", name:"Naga Sacred Geometry",   season:"Q1 2028", phase:"Phase 3", status:"Planned",
      motif:"NIL-NAG", palette:"Deep Teal + Antique Gold + Stone",
      targets:["Tile","Wallcovering","Hospitality"], markets:["Tile Manufacturers","Architectural Firms","Hotel FF&E"],
      designs:20, colorways:3, status_color:T.mist,
      story:"Architecture-focused sacred geometry — Naga serpent scales transformed into precise geometric patterns for luxury architectural specification." },
    { id:"C09", name:"Loi Krathong Ceremony",  season:"Q2 2028", phase:"Phase 4", status:"Planned",
      motif:"NIL-LKC", palette:"Deep Blue + Gold + Lotus Pink",
      targets:["Gift Wrap","Packaging","Home Decor"], markets:["Corporate Gifting","Luxury Retail","Holiday Market"],
      designs:20, colorways:3, status_color:T.mist,
      story:"Holiday gifting collection — inspired by lotus, water, and candlelight of the Loi Krathong ceremony, for the global premium gifting market." },
    { id:"C10", name:"Golden Naga",            season:"Q3 2028", phase:"Phase 4", status:"Flagship",
      motif:"NIL-GNG", palette:"Ceremonial Gold + Heritage Black + Ivory",
      targets:["Luxury Packaging","Hotel","Wallpaper"], markets:["Global Luxury Brands","5-Star Hotels","IP Export"],
      designs:20, colorways:3, status_color:T.gold,
      story:"High-value export collection — ceremonial gold identity for the apex of NILA's global licensing programme." },
  ];

  const STATUS_CFG = {
    "In Production": { color:T.amber,   bg:"#FFFBEB", label:"● In Production" },
    "In Brief":      { color:T.jade,    bg:"#F0FDF4", label:"● In Brief"      },
    "Planned":       { color:T.mist,    bg:T.ground,  label:"○ Planned"       },
    "Released":      { color:T.indigo,  bg:`${T.indigo}10`, label:"✓ Released" },
  };

  return (
    <div>
      <SectionHead icon="◐" title="Collection Architecture"
        subtitle="Full collection roadmap — from Midnight Siam to the NILA Heritage Living IP Export catalogue" />

      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["roadmap","Roadmap View"],["detail","Collection Detail"],["matrix","Market Matrix"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)} style={{ padding:"6px 18px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${view===v?T.indigo:T.border}`, background:view===v?T.indigo:T.white, color:view===v?"#fff":T.mist, cursor:"pointer" }}>{l}</button>
        ))}
      </div>

      {view==="roadmap" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:14 }}>
            <Stat label="Total Collections Planned" value="8" sub="6 defined + 2 in backlog" accent={T.indigo} />
            <Stat label="In Production" value="1" sub="Midnight Siam — Phase 1" accent={T.amber} />
            <Stat label="Target by End 2026" value="3" sub="Midnight Siam, Lotus Blush, Royal Azure" accent={T.jade} />
          </div>
          {COLLECTION_ARCH.map(c=>{
            const sc = STATUS_CFG[c.status] || STATUS_CFG["Planned"];
            return (
              <Card key={c.id} style={{ marginBottom:10, borderLeft:`4px solid ${sc.color}`, background:c.status==="In Production"?`${T.amber}06`:T.white }} pad={18}>
                <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 1fr 160px", gap:16, alignItems:"start" }}>
                  <div>
                    <div style={{ fontFamily:"monospace", fontSize:T.xs, color:T.gold, fontWeight:700 }}>{c.id}</div>
                    <div style={{ fontSize:T.xs, color:T.mist, marginTop:2 }}>{c.season}</div>
                    <Tag color="mist" size="xs">{c.phase}</Tag>
                  </div>
                  <div>
                    <div style={{ fontWeight:900, color:T.indigo, fontSize:T.lg, fontFamily:"Georgia,serif", marginBottom:4 }}>{c.name}</div>
                    <div style={{ fontSize:T.sm, color:T.mist, marginBottom:4 }}>Motif: <strong style={{color:T.ink}}>{c.motif}</strong></div>
                    <div style={{ fontSize:T.xs, color:T.mist, fontStyle:"italic" }}>{c.story}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", marginBottom:6 }}>Target Surfaces</div>
                    {c.targets.map(t=><div key={t} style={{ fontSize:T.xs, color:T.ink, marginBottom:2 }}>→ {t}</div>)}
                    <div style={{ marginTop:8, fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase" }}>Palette</div>
                    <div style={{ fontSize:T.xs, color:T.ink, marginTop:2 }}>{c.palette}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <span style={{ fontSize:T.xs, fontWeight:700, color:sc.color }}>{sc.label}</span>
                    <div style={{ marginTop:8, display:"flex", gap:10, justifyContent:"flex-end" }}>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:T.xl, fontWeight:900, color:c.designs>0?T.indigo:T.border }}>{c.designs}</div>
                        <div style={{ fontSize:T.xs, color:T.mist }}>designs</div>
                      </div>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:T.xl, fontWeight:900, color:T.gold }}>{c.colorways}</div>
                        <div style={{ fontSize:T.xs, color:T.mist }}>colorways</div>
                      </div>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:T.xl, fontWeight:900, color:c.mockups>0?T.jade:T.border }}>{c.mockups}</div>
                        <div style={{ fontSize:T.xs, color:T.mist }}>mockups</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {view==="detail" && (
        <Grid cols={2} gap={14}>
          {COLLECTION_ARCH.map(c=>{
            const sc = STATUS_CFG[c.status]||STATUS_CFG["Planned"];
            return (
              <Card key={c.id} style={{ borderTop:`3px solid ${sc.color}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div>
                    <span style={{ fontFamily:"monospace", fontSize:T.xs, color:T.gold, fontWeight:700 }}>{c.id}</span>
                    <div style={{ fontWeight:900, color:T.indigo, fontSize:T.lg, fontFamily:"Georgia,serif" }}>{c.name}</div>
                    <div style={{ fontSize:T.xs, color:T.mist }}>{c.season} · {c.phase}</div>
                  </div>
                  <span style={{ fontSize:T.xs, fontWeight:700, color:sc.color }}>{sc.label}</span>
                </div>
                <div style={{ fontSize:T.sm, color:T.mist, lineHeight:1.7, marginBottom:12, fontStyle:"italic" }}>{c.story}</div>
                <InfoBlock label="Motif" value={c.motif} accent={T.gold} />
                <InfoBlock label="Palette" value={c.palette} accent={T.indigo} />
                <div style={{ marginTop:8 }}>
                  <div style={{ fontSize:T.xs, fontWeight:700, color:T.mist, textTransform:"uppercase", marginBottom:6 }}>Target Markets</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {c.markets.map(m=><Pill key={m} color={T.jade}>{m}</Pill>)}
                  </div>
                </div>
              </Card>
            );
          })}
        </Grid>
      )}

      {view==="matrix" && (
        <Card>
          <Divider label="Collection × Market Matrix" />
          <DataTable
            headers={["Collection","Season","Wallcovering","Textile","Packaging","Tile","Fashion","Wellness"]}
            rows={COLLECTION_ARCH.map(c=>[
              <span style={{fontWeight:700,color:T.indigo}}>{c.name}</span>,
              c.season,
              c.targets.includes("Luxury wallcovering")||c.targets.includes("Architectural wallcovering")?"✓":"·",
              c.targets.includes("Upholstery fabric")||c.targets.includes("Fashion textile")?"✓":"·",
              c.targets.includes("Premium packaging")||c.targets.some(t=>t.toLowerCase().includes("packag"))?"✓":"·",
              c.targets.some(t=>t.toLowerCase().includes("tile"))?"✓":"·",
              c.targets.some(t=>t.toLowerCase().includes("fashion"))?"✓":"·",
              c.targets.some(t=>t.toLowerCase().includes("spa")||t.toLowerCase().includes("wellness"))?"✓":"·",
            ])}
          />
        </Card>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MODULE: CUSTOMER JOURNEY
// ────────────────────────────────────────────────────────────
function CustomerJourney() {
  const [segment, setSegment] = useState("wallcovering");

  const SEGMENTS = {
    wallcovering: {
      label:"Surface Brand (EU/US)",
      icon:"◈",
      tier:"NILA-BRD",
      persona:"Design Director or Licensing Manager at a European wallcovering, textile, or tile brand. Sourcing new cultural pattern collections seasonally. Values heritage authenticity and professional documentation.",
      journey:[
        { stage:"Awareness",    touch:"Instagram / Pinterest / Behance",      action:"Discovers NILA collection via visual content. Saves post.", need:"Visual quality + cultural distinctiveness", time:"Passive" },
        { stage:"Interest",     touch:"Portfolio PDF / Website gallery",       action:"Requests portfolio. Reviews collection story and provenance.", need:"Cultural documentation + surface application proof", time:"1–3 days" },
        { stage:"Evaluation",   touch:"Email + Discovery Call",                action:"Asks about exclusivity, delivery formats, MOQ, and pricing.", need:"Rights matrix + pricing clarity + format specs", time:"1–2 weeks" },
        { stage:"Proposal",     touch:"Licensing Calculator + Proposal PDF",   action:"Receives scoped proposal. Reviews with procurement team.", need:"Clear scope, timeline, and fee structure", time:"2–4 weeks" },
        { stage:"Decision",     touch:"Licence Agreement + NDA",               action:"Signs licence agreement. Pays 50% deposit.", need:"Contract confidence + cultural responsibility clause", time:"1–3 weeks" },
        { stage:"Delivery",     touch:"File delivery + Cultural PDF",          action:"Receives clean master files. Begins production.", need:"All formats + documentation + responsive support", time:"2–4 weeks" },
        { stage:"Loyalty",      touch:"Renewal email + New collection preview", action:"Reviews new season collection. Renews or upgrades tier.", need:"Consistent quality + early access to new collections", time:"Annual" },
      ]
    },
    hospitality: {
      label:"Luxury Hotel / Resort",
      icon:"◆",
      tier:"NILA-EXC",
      persona:"Interior Design Director or Procurement Manager at a boutique hotel group, destination spa, or eco-resort. Seeking custom cultural identity for FF&E, spa linen, and branded packaging. Values exclusivity.",
      journey:[
        { stage:"Awareness",    touch:"LinkedIn / Design press / Referral",    action:"Sees NILA featured or referred by interior designer.", need:"Credibility + portfolio quality + Thai heritage depth", time:"Passive" },
        { stage:"Interest",     touch:"Custom presentation / NDA",             action:"Requests custom presentation for specific property project.", need:"Project-specific relevance + exclusivity assurance", time:"1 week" },
        { stage:"Evaluation",   touch:"Site visit or video call",              action:"Discusses brief: property DNA, colour palette, surfaces.", need:"Cultural bespoke capability + design process understanding", time:"2–4 weeks" },
        { stage:"Proposal",     touch:"Custom EXC proposal",                   action:"Receives exclusive commission proposal with full creative scope.", need:"Complete exclusivity + custom development + SIAC terms", time:"2–4 weeks" },
        { stage:"Decision",     touch:"Legal review + Agreement",              action:"Hotel legal reviews agreement. Signs. Pays 50% deposit.", need:"IP protection clarity + territory exclusivity guarantee", time:"4–6 weeks" },
        { stage:"Development",  touch:"Art direction sessions",                action:"Collaborative design development. Motif research shared.", need:"Deep cultural knowledge + responsive art direction", time:"8–16 weeks" },
        { stage:"Delivery",     touch:"Complete IP package",                   action:"Receives all files + Cultural Reference Document + usage guide.", need:"Complete package + implementation support", time:"On completion" },
        { stage:"Loyalty",      touch:"Annual consultation + New property",    action:"Engages NILA for next property or seasonal refresh.", need:"Relationship continuity + expanding collection", time:"Annual" },
      ]
    },
    pod: {
      label:"POD Seller / Independent Designer",
      icon:"◎",
      tier:"NILA-POD",
      persona:"Independent designer or creative entrepreneur selling on Spoonflower, Society6, or Redbubble. Looking for high-quality licensed patterns with cultural story to differentiate their shop.",
      journey:[
        { stage:"Discovery",    touch:"Spoonflower / Etsy / Social",          action:"Finds NILA patterns while browsing surface design libraries.", need:"Distinctive quality + clear licensing terms", time:"Passive" },
        { stage:"Research",     touch:"NILA website / Portfolio",              action:"Reviews pattern catalogue and POD licence terms.", need:"Simple, affordable, clear rights for digital POD use", time:"1–3 days" },
        { stage:"Purchase",     touch:"POD Licence checkout",                  action:"Selects design and purchases NILA-POD licence.", need:"Simple payment + immediate file access", time:"Same day" },
        { stage:"Production",   touch:"File download",                         action:"Downloads licensed files. Uploads to their POD shop.", need:"Correct formats (PNG seamless) + clear attribution guide", time:"1–3 days" },
        { stage:"Attribution",  touch:"Shop listing",                          action:"Lists product with NILA™ licence credit in description.", need:"Guidance on attribution wording", time:"Ongoing" },
        { stage:"Repeat",       touch:"New collection email",                  action:"Notified of new NILA collections. Purchases additional designs.", need:"Regular new releases + loyalty pricing", time:"Seasonal" },
      ]
    },
    wellness: {
      label:"Wellness & Lifestyle Brand",
      icon:"◐",
      tier:"NILA-COM",
      persona:"Founder or Creative Director of a Thai wellness brand, spa product company, or lifestyle label. Seeking heritage botanical design for packaging, product labels, and brand identity. Values warm authenticity.",
      journey:[
        { stage:"Awareness",    touch:"Instagram / Thai design network",       action:"Discovers NILA via Siamese Botanica connection or social.", need:"Thai heritage authenticity + botanical aesthetic alignment", time:"Passive" },
        { stage:"Interest",     touch:"Portfolio PDF",                         action:"Reviews Lotus Blush and Midnight Siam collections.", need:"Botanical warmth + packaging application proof", time:"2–5 days" },
        { stage:"Enquiry",      touch:"Email / WhatsApp",                     action:"Enquires about packaging rights and pricing for product line.", need:"Simple COM licence explanation + indicative fee", time:"1 week" },
        { stage:"Proposal",     touch:"COM Licence Proposal",                  action:"Receives proposal: 1 design, 1 category, up to 2,000 units.", need:"Clear scope + THB pricing option", time:"1–2 weeks" },
        { stage:"Agreement",    touch:"Licence Agreement",                     action:"Signs COM licence. Pays full fee (small deal, no deposit).", need:"Simple contract + payment in THB accepted", time:"1 week" },
        { stage:"Delivery",     touch:"File delivery",                         action:"Receives vector files + Cultural Reference Document.", need:"Packaging-ready formats + usage guidance", time:"3–5 days" },
        { stage:"Expansion",    touch:"Brand Collection upgrade",              action:"After success, upgrades to BRD licence for full collection.", need:"Easy upgrade path + relationship continuity", time:"6–12 months" },
      ]
    }
  };

  const seg = SEGMENTS[segment];
  const stageColors = [T.mist, T.amber, T.gold, T.indigoL, T.jade, T.indigo, T.crimson, T.lotus];

  return (
    <div>
      <SectionHead icon="◑" title="Customer Journey"
        subtitle="End-to-end experience for each client segment — from awareness to loyalty" />

      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {Object.entries(SEGMENTS).map(([key,s])=>(
          <button key={key} onClick={()=>setSegment(key)} style={{ padding:"6px 16px", borderRadius:20, fontSize:T.xs, fontWeight:700, border:`1px solid ${segment===key?T.indigo:T.border}`, background:segment===key?T.indigo:T.white, color:segment===key?"#fff":T.mist, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>

      <Grid cols={2} gap={14}>
        <Card style={{ borderTop:`3px solid ${T.gold}` }}>
          <div style={{ fontWeight:900, color:T.indigo, fontSize:T.lg, fontFamily:"Georgia,serif", marginBottom:4 }}>{seg.label}</div>
          <Tag color="gold">{seg.tier}</Tag>
          <div style={{ fontSize:T.sm, color:T.mist, lineHeight:1.7, marginTop:12 }}>{seg.persona}</div>
          <Divider label="Key Priorities" />
          {seg.journey.slice(0,3).map(j=>(
            <div key={j.stage} style={{ marginBottom:8 }}>
              <div style={{ fontSize:T.xs, fontWeight:700, color:T.gold, textTransform:"uppercase" }}>{j.stage}</div>
              <div style={{ fontSize:T.sm, color:T.mist }}>{j.need}</div>
            </div>
          ))}
        </Card>

        <Card>
          <Divider label="Primary Touchpoints" />
          {["Portfolio PDF","Watermarked preview","Licensing Calculator","AI Sales email","Licence Agreement","File delivery"].map((t,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 10px", marginBottom:4, background:T.ground, borderRadius:6 }}>
              <div style={{ width:20, height:20, borderRadius:"50%", background:T.gold, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:T.xs, fontWeight:800, flexShrink:0 }}>{i+1}</div>
              <span style={{ fontSize:T.sm, color:T.ink }}>{t}</span>
            </div>
          ))}
        </Card>
      </Grid>

      <Card style={{ marginTop:14 }}>
        <Divider label={`Full Journey — ${seg.label}`} />
        <div style={{ overflowX:"auto" }}>
          <div style={{ display:"flex", gap:0, minWidth: seg.journey.length * 180 }}>
            {seg.journey.map((j,i)=>(
              <div key={i} style={{ flex:1, minWidth:160, position:"relative" }}>
                {i < seg.journey.length-1 && (
                  <div style={{ position:"absolute", top:28, right:-1, width:2, height:2, zIndex:1 }}>
                    <div style={{ position:"absolute", top:-1, right:-8, width:0, height:0, borderTop:"6px solid transparent", borderBottom:"6px solid transparent", borderLeft:`8px solid ${stageColors[i]}` }} />
                  </div>
                )}
                <div style={{ padding:"14px 12px", borderRight:i<seg.journey.length-1?`1px dashed ${T.border}`:"none", marginRight:i<seg.journey.length-1?8:0 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:stageColors[i], color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:T.sm, marginBottom:8 }}>{i+1}</div>
                  <div style={{ fontWeight:800, color:stageColors[i], fontSize:T.sm, marginBottom:4 }}>{j.stage}</div>
                  <div style={{ fontSize:T.xs, fontWeight:600, color:T.indigo, marginBottom:4 }}>{j.touch}</div>
                  <div style={{ fontSize:T.xs, color:T.mist, lineHeight:1.5, marginBottom:6 }}>{j.action}</div>
                  <div style={{ fontSize:T.xs, color:"#6B7280", fontStyle:"italic" }}>Need: {j.need}</div>
                  <div style={{ marginTop:6 }}>
                    <span style={{ background:`${stageColors[i]}18`, color:stageColors[i], border:`1px solid ${stageColors[i]}44`, borderRadius:20, padding:"1px 8px", fontSize:10, fontWeight:700 }}>{j.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}


// ────────────────────────────────────────────────────────────
// MVP MODE
// ────────────────────────────────────────────────────────────
const MVP_IDS = new Set(["prompts","collections","vault","portfolio","crm"]);

// ────────────────────────────────────────────────────────────
// SIDEBAR
// ────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, mvpMode, setMvpMode }) {
  const visibleNav = mvpMode ? NAV.filter(n=>MVP_IDS.has(n.id)) : NAV;
  return (
    <aside style={{ width:220, flexShrink:0, background:T.indigoD, display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      <div style={{ padding:"20px 18px 16px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:9, color:T.goldL, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", opacity:0.8 }}>DESIGN OS  v3.2</span>
        </div>
        <div style={{ marginTop:12, display:"flex", justifyContent:"center" }}>
          <div style={{ textAlign:"center", padding:"12px 0 10px" }}>
          {/* NILA wordmark */}
          <div style={{ fontSize:30, fontWeight:900, color:"#F7F4ED", fontFamily:"Georgia,'Times New Roman',serif", letterSpacing:7, lineHeight:1, marginBottom:4 }}>NILA</div>
          {/* Sub-brand */}
          <div style={{ fontSize:8, fontWeight:700, color:"#C7A24D", letterSpacing:4, textTransform:"uppercase", lineHeight:1, marginBottom:8 }}>HERITAGE LIVING™</div>
          {/* Ornamental rule */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <div style={{ width:28, height:1, background:"linear-gradient(90deg,transparent,#C7A24D)" }} />
            <div style={{ width:5, height:5, background:"#C7A24D", transform:"rotate(45deg)", opacity:0.8 }} />
            <div style={{ width:28, height:1, background:"linear-gradient(90deg,#C7A24D,transparent)" }} />
          </div>
        </div>
        </div>
        <div style={{ marginTop:14, padding:"10px 12px", background:"rgba(255,255,255,0.05)", borderRadius:T.radius, border:"1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize:T.xs, color:"rgba(255,255,255,0.45)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>View Mode</div>
          <button onClick={()=>{ setMvpMode(!mvpMode); if(!mvpMode) setActive("prompts"); }}
            style={{ width:"100%", padding:"7px 10px", borderRadius:6, border:`1px solid ${mvpMode?T.goldL:"rgba(255,255,255,0.2)"}`, background:mvpMode?`rgba(184,133,30,0.2)`:"transparent", color:mvpMode?T.goldL:"rgba(255,255,255,0.5)", fontSize:T.xs, fontWeight:700, cursor:"pointer", letterSpacing:"0.06em", textAlign:"left", display:"flex", alignItems:"center", gap:7, transition:"all 0.15s" }}>
            <span style={{ fontSize:11 }}>{mvpMode?"◉":"◎"}</span>
            <span>{mvpMode?"MVP Mode — ON":"MVP Launch Mode"}</span>
          </button>
          {mvpMode && <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:6, lineHeight:1.5 }}>5 revenue-critical modules only.</div>}
        </div>
      </div>
      <nav style={{ flex:1, padding:"12px 0", overflowY:"auto" }}>
        {mvpMode ? (
          <div style={{ marginBottom:4 }}>
            <div style={{ padding:"8px 18px 4px", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:"0.12em" }}>MVP Essentials</div>
            {visibleNav.map(item=>{
              const isActive = active===item.id;
              return (
                <button key={item.id} onClick={()=>setActive(item.id)} style={{ width:"100%", textAlign:"left", background:isActive?"rgba(184,133,30,0.12)":"transparent", border:"none", borderLeft:isActive?`2px solid ${T.goldL}`:"2px solid transparent", padding:"8px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:9, transition:"all 0.12s" }}
                  onMouseEnter={e=>{ if(!isActive) e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e=>{ if(!isActive) e.currentTarget.style.background="transparent"; }}>
                  <span style={{ fontSize:13, color:isActive?T.goldL:"rgba(255,255,255,0.35)", width:16, textAlign:"center" }}>{item.icon}</span>
                  <span style={{ fontSize:T.sm, fontWeight:isActive?700:400, color:isActive?"#fff":"rgba(255,255,255,0.55)", lineHeight:1.3 }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          Object.entries(NAV_GROUPS).map(([groupId,groupLabel])=>{
            const items = NAV.filter(n=>n.group===groupId);
            return (
              <div key={groupId} style={{ marginBottom:4 }}>
                <div style={{ padding:"8px 18px 4px", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:"0.12em" }}>{groupLabel}</div>
                {items.map(item=>{
                  const isActive = active===item.id;
                  return (
                    <button key={item.id} onClick={()=>setActive(item.id)} style={{ width:"100%", textAlign:"left", background:isActive?"rgba(184,133,30,0.12)":"transparent", border:"none", borderLeft:isActive?`2px solid ${T.goldL}`:"2px solid transparent", padding:"8px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:9, transition:"all 0.12s" }}
                      onMouseEnter={e=>{ if(!isActive) e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
                      onMouseLeave={e=>{ if(!isActive) e.currentTarget.style.background="transparent"; }}>
                      <span style={{ fontSize:13, color:isActive?T.goldL:"rgba(255,255,255,0.35)", width:16, textAlign:"center" }}>{item.icon}</span>
                      <span style={{ fontSize:T.sm, fontWeight:isActive?700:400, color:isActive?"#fff":"rgba(255,255,255,0.55)", lineHeight:1.3 }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            );
          })
        )}
      </nav>
      <div style={{ padding:"14px 18px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontSize:T.xs, color:"rgba(255,255,255,0.25)", lineHeight:1.6 }}>
          Siamese Botanica<br/>Heritage Living™ · Midnight Siam in production<br/>
          <span style={{ color:T.goldL, opacity:0.5 }}>v3.1 · Pre-Launch · 2026</span>
        </div>
      </div>
    </aside>
  );
}

// ────────────────────────────────────────────────────────────
// TOPBAR
// ────────────────────────────────────────────────────────────
function Topbar({ active, mvpMode }) {
  const item = NAV.find(n=>n.id===active);
  const group = item ? NAV_GROUPS[item.group] : "";
  return (
    <div style={{ height:48, background:T.white, borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", padding:"0 28px", gap:6, flexShrink:0, justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ fontSize:T.sm, color:T.mist }}>{group}</span>
        <span style={{ fontSize:T.sm, color:T.border }}>›</span>
        <span style={{ fontSize:T.sm, fontWeight:700, color:T.indigo }}>{item?.label}</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        {mvpMode && <span style={{ fontSize:T.xs, fontWeight:700, color:T.jade, background:"#E0F0EC", border:`1px solid ${T.jade}44`, borderRadius:20, padding:"2px 10px", letterSpacing:"0.07em" }}>MVP MODE</span>}
        <span style={{ fontSize:T.xs, fontWeight:700, color:T.amber, background:"#FFFBEB", border:"1px solid #FCD34D", borderRadius:20, padding:"2px 10px", letterSpacing:"0.07em" }}>PRE-LAUNCH · 2026</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// EXPORT BAR
// ────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────
// MUSIC PLAYER — Thai Ambient (Tone.js generative)
// ────────────────────────────────────────────────────────────
const MusicPlayer = React.forwardRef(function MusicPlayer(_, ref) {
  const [playing, setPlaying]   = useState(false);
  const [volume, setVolume]     = useState(0.5);
  const [loading, setLoading]   = useState(false);
  const [ready, setReady]       = useState(!!window.Tone);
  const [tick, setTick]         = useState(0);
  const toneRef = useRef(null);

  useImperativeHandle(ref, () => ({
    autoStart: () => { if (!playing) startMusic(); }
  }));

  useEffect(() => {
    if (window.Tone) { setReady(true); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js';
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTick(t => (t+1)%100), 180);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (!toneRef.current || !window.Tone) return;
    try { window.Tone.getDestination().volume.value = window.Tone.gainToDb(volume); } catch(e) {}
  }, [volume]);

  const startMusic = async () => {
    if (!window.Tone) return;
    setLoading(true);
    try {
      const Tone = window.Tone;
      await Tone.start();
      Tone.getDestination().volume.value = Tone.gainToDb(volume);
      const drone = new Tone.PolySynth(Tone.Synth, {
        oscillator:{type:"sine"}, envelope:{attack:3,decay:1,sustain:1,release:4}, volume:-18,
      }).toDestination();
      drone.triggerAttack(["C2","G2","E3"], Tone.now());
      const THAI = ["C4","D4","E4","G4","A4","C5","D5","E5","G5","A5"];
      const melody = new Tone.Synth({
        oscillator:{type:"triangle"}, envelope:{attack:0.1,decay:0.8,sustain:0.3,release:2}, volume:-20,
      }).toDestination();
      const melPat = new Tone.Pattern((time,note)=>melody.triggerAttackRelease(note,"8n",time), THAI, "randomWalk");
      melPat.interval = "2n"; melPat.start(0);
      const bell = new Tone.MetalSynth({
        frequency:400, envelope:{attack:0.001,decay:2.5,release:3},
        harmonicity:5.1, modulationIndex:32, resonance:4000, octaves:1.5, volume:-28,
      }).toDestination();
      const bellLoop = new Tone.Loop(time=>{
        bell.triggerAttackRelease([523,659,784,880][Math.floor(Math.random()*4)], "16n", time);
      }, "3m");
      bellLoop.start("4m");
      const pad = new Tone.PolySynth(Tone.Synth, {
        oscillator:{type:"fatsine",count:3,spread:20}, envelope:{attack:4,decay:2,sustain:0.8,release:6}, volume:-24,
      }).toDestination();
      const chords=[["C3","E3","G3"],["A2","C3","E3"],["F2","A2","C3"],["G2","B2","D3"]];
      let ci=0;
      const padLoop = new Tone.Loop(time=>{
        pad.releaseAll(time); pad.triggerAttack(chords[ci++%chords.length], time+0.1);
      }, "8m");
      padLoop.start(0);
      const reverb = new Tone.Reverb({decay:6,wet:0.55}).toDestination();
      melody.connect(reverb); bell.connect(reverb);
      Tone.getTransport().bpm.value = 60;
      Tone.getTransport().start();
      toneRef.current = {drone,melody,melPat,bell,bellLoop,pad,padLoop,reverb,Tone};
      setPlaying(true);
    } catch(err) { console.error("Tone:",err); }
    finally { setLoading(false); }
  };

  const stopMusic = () => {
    if (!toneRef.current) return;
    const {drone,melody,melPat,bell,bellLoop,pad,padLoop,reverb,Tone} = toneRef.current;
    try {
      melPat.stop(); melPat.dispose(); bellLoop.stop(); bellLoop.dispose();
      padLoop.stop(); padLoop.dispose(); drone.releaseAll(); drone.dispose();
      melody.dispose(); bell.dispose(); pad.releaseAll(); pad.dispose(); reverb.dispose();
      Tone.getTransport().stop();
    } catch(e) {}
    toneRef.current = null; setPlaying(false);
  };

  const waveH = [4,7,12,9,5,13,8,6,11,7,4,10,13,6,9,7,5,12,8,4];

  return (
    <div style={{background:`linear-gradient(90deg,#0A3528,#0F4D3A 50%,#0A3528)`,borderTop:`1px solid rgba(199,162,77,0.3)`,padding:"0 24px",height:50,display:"flex",alignItems:"center",gap:16,flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:10,minWidth:170,flexShrink:0}}>
        <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${T.gold},#8B6914)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 0 10px rgba(199,162,77,${playing?0.5:0.2})`,transition:"box-shadow 0.5s"}}>
          <span style={{fontSize:13}}>{playing?"♪":"♫"}</span>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:T.goldL,letterSpacing:"0.1em",textTransform:"uppercase",lineHeight:1}}>NILA™ Heritage Living</div>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.4)",marginTop:2,lineHeight:1}}>
            {!ready?"Loading Tone.js…":loading?"Starting…":playing?"Thai Ambient · Generative":"Thai Ambient Music"}
          </div>
        </div>
      </div>
      <button onClick={()=>playing?stopMusic():startMusic()} disabled={!ready||loading}
        style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:playing?"rgba(199,162,77,0.15)":T.gold,border:`1.5px solid ${T.gold}`,color:playing?T.goldL:"#fff",fontSize:13,cursor:(!ready||loading)?"wait":"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",boxShadow:playing?`0 0 14px rgba(199,162,77,0.4)`:"none"}}>
        {loading?"⟳":playing?"⏸":"▶"}
      </button>
      <div style={{flex:1,display:"flex",alignItems:"center",gap:2,height:28,justifyContent:"center"}}>
        {waveH.map((h,i)=>(
          <div key={i} style={{width:3,borderRadius:2,background:`linear-gradient(180deg,${T.goldL},${T.gold})`,opacity:playing?0.75:0.2,height:playing?Math.max(3,h*(0.5+Math.abs(Math.sin((tick*0.3)+i*0.4))*0.6)):3,transition:"height 0.2s ease,opacity 0.4s"}} />
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
        <span style={{fontSize:12,opacity:0.5}}>{volume===0?"🔇":volume<0.4?"🔉":"🔊"}</span>
        <input type="range" min={0} max={1} step={0.05} value={volume}
          onChange={e=>setVolume(Number(e.target.value))}
          style={{width:64,accentColor:T.gold,cursor:"pointer"}} />
      </div>
    </div>
  );
});

function ExportBar() {
  const [msg, setMsg] = useState(null);
  const handleExport = () => {
    setMsg("Preparing print view — use browser Print › Save as PDF.");
    setTimeout(()=>window.print(),300);
    setTimeout(()=>setMsg(null),6000);
  };
  return (
    <div style={{ background:"#FFFBEB", borderBottom:"1px solid #FCD34D", padding:"8px 28px", display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
      <span style={{ fontSize:T.xs, fontWeight:700, color:"#92400E", textTransform:"uppercase", letterSpacing:"0.08em" }}>Portfolio Export</span>
      <Button onClick={handleExport} variant="amber" size="sm">⬇ Export Portfolio PDF</Button>
      {msg && <span style={{ fontSize:T.xs, color:"#92400E", lineHeight:1.5 }}>{msg}</span>}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// APP ROOT
// ────────────────────────────────────────────────────────────
const MODULE_MAP = {
  dashboard:Dashboard, brand:BrandBible, design:DesignLanguage, motifs:MotifLibrary,
  prompts:PromptGenerator, collections:CollectionPlanner, vault:AssetVault,
  licensing:LicensingModel, calculator:LicensingCalculator, portfolio:PortfolioGenerator,
  crm:ClientCRM, targets:First20Targets, scoring:OpportunityScoring, sales:AISalesAssistant,
  revenue:RevenueDashboard, workflow:StudioWorkflow, legal:PreLaunchLegal, action:ActionPlan,
  watermark:WatermarkStudio,
  framework:LicensingFramework, revmodel:RevenueModel,
  colarch:CollectionArchitecture, journey:CustomerJourney,
};


// ════════════════════════════════════════════════════════════
// ADMIN PASSWORD (hidden — not visible to clients)
// ════════════════════════════════════════════════════════════
const ADMIN_PASSWORD = "NilaAdminAim@2026!";

// ════════════════════════════════════════════════════════════
// SPLASH SCREEN — with hidden admin password gate
// ════════════════════════════════════════════════════════════
function SplashScreen({ onEnter }) {
  const [fadeOut, setFadeOut]   = useState(false);
  const [pwInput, setPwInput]   = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [shake, setShake]       = useState(false);
  const toneStarted = useRef(false);

  const handleEnter = async (isAdmin=false) => {
    if (toneStarted.current) return;
    toneStarted.current = true;
    if (window.Tone) { try { await window.Tone.start(); } catch(e) {} }
    setFadeOut(true);
    setTimeout(() => onEnter(isAdmin), 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (pwInput === ADMIN_PASSWORD) {
        handleEnter(true);
      } else if (pwInput.length > 0) {
        setShake(true);
        setTimeout(() => { setShake(false); setPwInput(""); }, 600);
      } else {
        handleEnter(false);
      }
    }
  };

  // Secret: type "admin" keyword to show password field
  const [keyBuffer, setKeyBuffer] = useState("");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      const newBuf = (keyBuffer + e.key).slice(-5);
      setKeyBuffer(newBuf);
      if (newBuf === "admin") { setShowPw(true); setKeyBuffer(""); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [keyBuffer]);

  const handleLogoClick = () => {
    const n = clickCount + 1;
    setClickCount(n);
    if (n >= 3) { setShowPw(true); setClickCount(0); }
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999,
      background:`linear-gradient(160deg,#0A3528 0%,#0F4D3A 50%,#0A2A1E 100%)`,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      opacity:fadeOut?0:1, transition:"opacity 0.8s ease" }}>

      {/* Ambient glow */}
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(199,162,77,0.08) 0%,transparent 70%)",
        top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />

      <div style={{ textAlign:"center", marginBottom:48 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:32 }}>
          <div style={{ width:60, height:1, background:"linear-gradient(90deg,transparent,rgba(199,162,77,0.5))" }} />
          <div style={{ width:6, height:6, background:"#C7A24D", transform:"rotate(45deg)", opacity:0.7 }} />
          <div style={{ width:60, height:1, background:"linear-gradient(90deg,rgba(199,162,77,0.5),transparent)" }} />
        </div>
        {/* Triple-click here to show admin login */}
        <div onClick={handleLogoClick} style={{ cursor:"default", userSelect:"none" }}>
          <img src="/nila-logo.png.png" alt="NILA Heritage Living"
            style={{ width:220, height:"auto", marginBottom:16,
              filter:"drop-shadow(0 4px 32px rgba(199,162,77,0.3))" }} />
        </div>
        <div style={{ fontSize:11, color:"rgba(247,244,237,0.45)", letterSpacing:3, fontStyle:"italic" }}>
          Inspired by Thai Heritage. Crafted for the World.
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:20 }}>
          <div style={{ width:40, height:1, background:"linear-gradient(90deg,transparent,rgba(199,162,77,0.4))" }} />
          <span style={{ color:"#C7A24D", fontSize:14, opacity:0.6 }}>✦</span>
          <div style={{ width:40, height:1, background:"linear-gradient(90deg,rgba(199,162,77,0.4),transparent)" }} />
        </div>
      </div>

      {/* Admin password field — hidden until triple-click */}
      {showPw && (
        <div style={{ marginBottom:20, textAlign:"center",
          animation:shake?"shake 0.4s ease":"none" }}>
          <input
            autoFocus
            type="password"
            value={pwInput}
            onChange={e=>setPwInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="••••••••"
            style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(199,162,77,0.4)",
              borderRadius:4, padding:"10px 20px", color:"#C7A24D", fontSize:14,
              textAlign:"center", letterSpacing:4, outline:"none", width:180,
              fontFamily:"monospace" }}
          />
          <div style={{ fontSize:9, color:"rgba(199,162,77,0.3)", marginTop:6, letterSpacing:2 }}>
            PRESS ENTER
          </div>
        </div>
      )}

      <button onClick={()=>handleEnter(false)} style={{ padding:"16px 56px",
        background:"transparent", border:"1px solid rgba(199,162,77,0.6)", borderRadius:2,
        color:"#C7A24D", fontSize:11, fontWeight:700, letterSpacing:6, textTransform:"uppercase",
        cursor:"pointer", transition:"all 0.3s" }}
        onMouseEnter={e=>{ e.currentTarget.style.background="rgba(199,162,77,0.12)"; e.currentTarget.style.letterSpacing="8px"; }}
        onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.letterSpacing="6px"; }}>
        ENTER
      </button>
      <div style={{ marginTop:16, fontSize:10, color:"rgba(247,244,237,0.25)", letterSpacing:2 }}>
        DESIGN OS  v3.2
      </div>
      <div style={{ position:"absolute", bottom:40, fontSize:10,
        color:"rgba(199,162,77,0.4)", letterSpacing:3, textTransform:"uppercase" }}>
        Siamese Botanica · Thailand
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}`}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// CLIENT VIEW — Luxury public-facing portal
// ════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
// AUTO-WATERMARK CANVAS COMPONENT
// Canvas-rendered — cannot be removed by CSS or DevTools
// ════════════════════════════════════════════════════════════
function WatermarkedImage({ src, alt, width="100%", height=280, collection="Midnight Siam", motif="Kanok · กนก", style={} }) {
  const canvasRef   = useRef(null);
  const [loaded, setLoaded]   = useState(false);
  const [error, setError]     = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const drawPlaceholder = () => {
      // ── Elegant placeholder — Midnight Siam palette
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0,   "#0A3528");
      grad.addColorStop(0.4, "#0F4D3A");
      grad.addColorStop(0.7, "#1A6B52");
      grad.addColorStop(1,   "#0A2A1E");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Subtle geometric pattern overlay (Kanok-inspired)
      ctx.globalAlpha = 0.06;
      for (let x = 0; x < W; x += 40) {
        for (let y = 0; y < H; y += 40) {
          ctx.strokeStyle = "#C7A24D";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 20, y + 20);
          ctx.lineTo(x, y + 40);
          ctx.lineTo(x - 20, y + 20);
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Collection name
      ctx.fillStyle = "rgba(247,244,237,0.12)";
      ctx.font = "900 " + Math.round(W/6) + "px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("NILA™", W/2, H/2 - 16);
      ctx.font = "700 " + Math.round(W/18) + "px Arial, sans-serif";
      ctx.fillStyle = "rgba(199,162,77,0.25)";
      ctx.letterSpacing = "4px";
      ctx.fillText(collection.toUpperCase(), W/2, H/2 + 20);

      // Motif label
      ctx.font = "500 " + Math.round(W/24) + "px Arial, sans-serif";
      ctx.fillStyle = "rgba(199,162,77,0.18)";
      ctx.fillText(motif, W/2, H/2 + 42);
    };

    const applyWatermark = () => {
      const scale = Math.max(W, H) / 900;
      const fontSize = Math.round(16 * scale);
      const subSize  = Math.round(11 * scale);
      const spacing  = Math.round(160 * scale);
      const angleRad = -42 * Math.PI / 180;

      // ── Diagonal NILA™ CONFIDENTIAL grid
      ctx.save();
      ctx.globalAlpha = 0.38;
      ctx.translate(W/2, H/2);
      ctx.rotate(angleRad);
      const diag = Math.sqrt(W*W + H*H);
      const cols = Math.ceil(diag/spacing) + 2;
      const rows = Math.ceil(diag/spacing) + 2;
      for (let row = -rows; row <= rows; row++) {
        for (let col = -cols; col <= cols; col++) {
          const x = col * spacing;
          const y = row * spacing;
          ctx.font = "700 " + fontSize + "px Georgia, serif";
          ctx.fillStyle = "#F7F4ED";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("NILA™ CONFIDENTIAL", x, y - fontSize * 0.6);
          ctx.font = "500 " + subSize + "px Arial, sans-serif";
          ctx.fillStyle = "#C7A24D";
          ctx.fillText("© Siamese Botanica · NOT LICENSED", x, y + fontSize * 0.4);
          ctx.beginPath();
          ctx.arc(x, y + fontSize * 1.1, Math.max(2, 2.5 * scale), 0, Math.PI * 2);
          ctx.fillStyle = "#C7A24D";
          ctx.fill();
        }
      }
      ctx.restore();

      // ── Top band
      const bandH = Math.round(26 * scale);
      ctx.save();
      ctx.fillStyle = "#0A3528";
      ctx.globalAlpha = 0.88;
      ctx.fillRect(0, 0, W, bandH);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#C7A24D";
      ctx.font = "700 " + Math.round(9 * scale) + "px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      let bx = 10;
      const btext = "NILA™ HERITAGE LIVING · PREVIEW ONLY · NOT FOR REPRODUCTION · niladesign.co · ";
      while (bx < W + 200) {
        ctx.fillText(btext, bx, bandH/2);
        bx += ctx.measureText(btext).width;
      }
      ctx.restore();

      // ── Bottom band
      ctx.save();
      ctx.fillStyle = "#0A3528";
      ctx.globalAlpha = 0.88;
      ctx.fillRect(0, H - bandH, W, bandH);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#C7A24D";
      ctx.font = "700 " + Math.round(9 * scale) + "px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      let bx2 = 10;
      while (bx2 < W + 200) {
        ctx.fillText(btext, bx2, H - bandH/2);
        bx2 += ctx.measureText(btext).width;
      }
      ctx.restore();

      // ── Gold corner stamp
      const stampW = Math.round(130 * scale);
      const stampH = Math.round(32 * scale);
      const stampX = W - stampW - Math.round(12 * scale);
      const stampY = bandH + Math.round(10 * scale);
      ctx.save();
      ctx.fillStyle = "#C7A24D";
      ctx.globalAlpha = 0.95;
      ctx.fillRect(stampX, stampY, stampW, stampH);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#0A3528";
      ctx.font = "800 " + Math.round(8 * scale) + "px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("NILA™ PREVIEW ONLY", stampX + stampW/2, stampY + stampH/2);
      ctx.restore();

      // ── NILA corner badge bottom-right
      const cmSize = Math.round(52 * scale);
      const cmPad  = Math.round(bandH + 10 * scale);
      ctx.save();
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = "#0F4D3A";
      ctx.fillRect(W - cmSize - 10, H - cmSize - cmPad, cmSize, cmSize);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#C7A24D";
      ctx.font = "800 " + Math.round(9 * scale) + "px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("NILA™", W - cmSize/2 - 10, H - cmSize/2 - cmPad - Math.round(4*scale));
      ctx.fillStyle = "rgba(247,244,237,0.5)";
      ctx.font = "500 " + Math.round(6.5 * scale) + "px Arial, sans-serif";
      ctx.fillText("© PROTECTED", W - cmSize/2 - 10, H - cmSize/2 - cmPad + Math.round(8*scale));
      ctx.restore();
    };

    if (src) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Draw real image
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canRatio = W / H;
        let sx=0, sy=0, sw=img.naturalWidth, sh=img.naturalHeight;
        if (imgRatio > canRatio) {
          sw = img.naturalHeight * canRatio;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sh = img.naturalWidth / canRatio;
          sy = (img.naturalHeight - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
        applyWatermark();
        setLoaded(true);
      };
      img.onerror = () => {
        drawPlaceholder();
        applyWatermark();
        setError(true);
        setLoaded(true);
      };
      img.src = src;
    } else {
      drawPlaceholder();
      applyWatermark();
      setLoaded(true);
    }
  }, [src, collection, motif]);

  return (
    <div style={{ position:"relative", width, overflow:"hidden", borderRadius:`${T.radius}px ${T.radius}px 0 0`, ...style }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={480}
        style={{ width:"100%", height, display:"block", objectFit:"cover" }}
      />
      {!loaded && (
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,#0A3528,#0F4D3A)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ color:"rgba(199,162,77,0.5)", fontSize:12, letterSpacing:3 }}>LOADING…</div>
        </div>
      )}
    </div>
  );
}

// ── EmailJS credentials
const EMAILJS_SERVICE_ID  = "service_fi2q0j8";
const EMAILJS_TEMPLATE_ID = "template_nycoc3r";
const EMAILJS_PUBLIC_KEY  = "by31p0MpeRcLDKPUb";

function ClientView() {
  const [activeSection, setActiveSection] = useState("home");
  const [calcParams, setCalcParams]       = useState({ tier:"NILA-BRD", designs:1, colorways:2, exclusivity:"none", territory:"single", duration:1 });
  const [enquiry, setEnquiry]             = useState({ name:"", company:"", email:"", segment:"Surface Brand", message:"", collection:"Midnight Siam" });
  const [submitted, setSubmitted]         = useState(false);
  const [sending, setSending]             = useState(false);
  const [sendError, setSendError]         = useState("");
  const [menuOpen, setMenuOpen]           = useState(false);

  const calcFee = () => {
    const tier = LICENSE_TIERS.find(l=>l.code===calcParams.tier);
    if (!tier) return null;
    const base = (tier.priceUSD[0]+tier.priceUSD[1])/2;
    let fee = base;
    if (calcParams.designs>1) fee += (calcParams.designs-1)*base*0.6;
    if (calcParams.colorways>1) fee += (calcParams.colorways-1)*base*0.15;
    fee *= ({none:1,regional:1.35,global:1.8}[calcParams.exclusivity]??1)
         * ({single:1,regional:1.2,global:1.5}[calcParams.territory]??1)
         * (calcParams.duration<=1?1:1+(calcParams.duration-1)*0.2);
    return Math.round(fee/50)*50;
  };

  const navItems = [
    { id:"home",        label:"Home" },
    { id:"collections", label:"Collections" },
    { id:"motifs",      label:"Heritage" },
    { id:"licensing",   label:"Licensing" },
    { id:"about",       label:"About" },
    { id:"enquiry",     label:"Enquire" },
  ];

  const NavBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
      background:"rgba(10,53,40,0.97)", backdropFilter:"blur(12px)",
      borderBottom:"1px solid rgba(199,162,77,0.2)", height:60,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 clamp(16px,4vw,40px)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}
        onClick={()=>{ setActiveSection("home"); setMobileOpen(false); }}>
        <img src="/nila-logo.png.png" alt="NILA Heritage Living"
          style={{ height:38, width:"auto", filter:"brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg)",
            opacity:0.92 }} />
      </div>
      {/* Desktop nav */}
      <div style={{ display:"flex", gap:28, "@media(max-width:768px)":{display:"none"} }}
        className="nila-desktop-nav">
        {navItems.map(n=>(
          <button key={n.id} onClick={()=>setActiveSection(n.id)} style={{
            background:"none", border:"none", color:activeSection===n.id?"#C7A24D":"rgba(247,244,237,0.6)",
            fontSize:11, fontWeight:700, letterSpacing:3, textTransform:"uppercase",
            cursor:"pointer", transition:"color 0.2s",
            borderBottom:activeSection===n.id?"1px solid #C7A24D":"1px solid transparent",
            paddingBottom:2 }}>
            {n.label}
          </button>
        ))}
      </div>
      {/* Desktop CTA */}
      <button onClick={()=>setActiveSection("enquiry")} className="nila-desktop-cta"
        style={{
        background:"transparent", border:"1px solid rgba(199,162,77,0.7)",
        color:"#C7A24D", padding:"8px 20px", fontSize:10, fontWeight:700,
        letterSpacing:3, textTransform:"uppercase", cursor:"pointer",
        borderRadius:2, transition:"all 0.2s" }}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(199,162,77,0.12)"}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        ENQUIRE NOW
      </button>
      {/* Hamburger */}
      <button className="nila-hamburger"
        onClick={()=>setMobileOpen(o=>!o)}
        style={{ display:"none", background:"none", border:"none",
          color:"#C7A24D", fontSize:22, cursor:"pointer", padding:4,
          lineHeight:1, flexDirection:"column", gap:4 }}
        aria-label="Menu">
        {mobileOpen ? "✕" : "☰"}
      </button>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position:"fixed", top:60, left:0, right:0,
          background:"rgba(10,40,28,0.98)", backdropFilter:"blur(12px)",
          borderBottom:"1px solid rgba(199,162,77,0.2)",
          padding:"20px 24px 28px", display:"flex", flexDirection:"column", gap:0,
          zIndex:200 }}>
          {navItems.map(n=>(
            <button key={n.id} onClick={()=>{ setActiveSection(n.id); setMobileOpen(false); }} style={{
              background:"none", border:"none", borderBottom:"1px solid rgba(199,162,77,0.1)",
              color:activeSection===n.id?"#C7A24D":"rgba(247,244,237,0.7)",
              fontSize:13, fontWeight:700, letterSpacing:3, textTransform:"uppercase",
              cursor:"pointer", textAlign:"left", padding:"16px 0" }}>
              {n.label}
            </button>
          ))}
          <button onClick={()=>{ setActiveSection("enquiry"); setMobileOpen(false); }} style={{
            marginTop:16, padding:"13px", background:T.gold, border:"none",
            color:"#fff", fontSize:11, fontWeight:700, letterSpacing:3,
            textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>
            ENQUIRE NOW →
          </button>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .nila-desktop-nav { display: none !important; }
          .nila-desktop-cta { display: none !important; }
          .nila-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
  };

  // ── HOME
  const HomeSection = () => (
    <div style={{ fontFamily:"Georgia,serif" }}>

      {/* ── HERO — editorial split layout */}
      <div className="nila-hero-split" style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0A3528 0%,#0F4D3A 55%,#0A2A1E 100%)",
        display:"flex", alignItems:"stretch", position:"relative", overflow:"hidden", paddingTop:60 }}>
        {/* Kanok pattern overlay */}
        <div style={{ position:"absolute", inset:0, opacity:0.04,
          backgroundImage:`url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C7A24D'%3E%3Cpath d='M50 8C50 8 63 30 50 50C37 30 50 8 50 8Z'/%3E%3Cpath d='M50 92C50 92 63 70 50 50C37 70 50 92 50 92Z'/%3E%3Cpath d='M8 50C8 50 30 63 50 50C30 37 8 50 8 50Z'/%3E%3Cpath d='M92 50C92 50 70 63 50 50C70 37 92 50 92 50Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize:"100px 100px" }} />

        {/* LEFT — copy */}
        <div className="nila-hero-left" style={{ flex:"0 0 auto", width:"clamp(300px,46%,580px)",
          display:"flex", flexDirection:"column", justifyContent:"center",
          padding:"clamp(48px,8vw,100px) clamp(24px,5vw,72px)", position:"relative", zIndex:2 }}>
          <div style={{ fontSize:10, color:T.gold, letterSpacing:6, textTransform:"uppercase",
            marginBottom:28, opacity:0.85, fontFamily:"'Inter',system-ui,sans-serif" }}>
            Cultural Design House · Thailand
          </div>
          <div style={{ fontSize:"clamp(34px,4.5vw,68px)", fontWeight:300, color:"#F7F4ED",
            lineHeight:1.08, marginBottom:24, letterSpacing:"-0.5px" }}>
            Contemporary Thai<br/>
            <em style={{ color:"#D9BA78", fontStyle:"italic" }}>Cultural Design</em><br/>
            for Modern Living
          </div>
          <div style={{ width:44, height:1, background:T.gold, marginBottom:24 }} />
          <div style={{ fontSize:"clamp(13px,1.4vw,16px)", color:"rgba(247,244,237,0.65)",
            fontStyle:"italic", lineHeight:1.8, maxWidth:460, marginBottom:40 }}>
            Premium design collections rooted in Thai heritage — thoughtfully crafted
            for homes, hospitality, and lifestyle brands around the world.
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button onClick={()=>setActiveSection("collections")} style={{
              padding:"13px 32px", background:T.gold, border:"none", color:"#fff",
              fontSize:10, fontWeight:500, letterSpacing:4, textTransform:"uppercase",
              cursor:"pointer", borderRadius:2, fontFamily:"'Inter',system-ui,sans-serif",
              transition:"all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="#D9BA78"}
              onMouseLeave={e=>e.currentTarget.style.background=T.gold}>
              EXPLORE COLLECTIONS
            </button>
            <button onClick={()=>setActiveSection("enquiry")} style={{
              padding:"13px 32px", background:"transparent",
              border:"1px solid rgba(199,162,77,0.5)", color:"#C7A24D",
              fontSize:10, fontWeight:500, letterSpacing:4, textTransform:"uppercase",
              cursor:"pointer", borderRadius:2, fontFamily:"'Inter',system-ui,sans-serif",
              transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="#C7A24D"; e.currentTarget.style.background="rgba(199,162,77,0.08)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(199,162,77,0.5)"; e.currentTarget.style.background="transparent"; }}>
              LICENSING ENQUIRY
            </button>
          </div>
          <div style={{ marginTop:52, fontSize:9, letterSpacing:4, textTransform:"uppercase",
            color:"rgba(247,244,237,0.25)", fontFamily:"'Inter',system-ui,sans-serif" }}>
            From the heart of Thailand to homes around the world
          </div>
        </div>

        {/* RIGHT — editorial product visual mockups */}
        <div className="nila-hero-right" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
          padding:"clamp(40px,5vw,80px) clamp(20px,3vw,48px)", position:"relative", zIndex:2,
          gap:16 }}>

          {/* Tall card — Wallcovering */}
          <div style={{ flex:"0 0 auto", width:200, display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ background:"linear-gradient(160deg,#0A2A1E,#1A5C46)",
              borderRadius:8, overflow:"hidden", aspectRatio:"2/3", position:"relative",
              border:"1px solid rgba(199,162,77,0.18)", boxShadow:"0 16px 48px rgba(0,0,0,0.4)" }}>
              {/* SVG Kanok pattern inside card */}
              <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.5 }}>
                <defs>
                  <pattern id="kanok1" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M25 4C25 4 31.5 15 25 25C18.5 15 25 4 25 4Z" fill="#C7A24D" opacity="0.8"/>
                    <path d="M25 46C25 46 31.5 35 25 25C18.5 35 25 46 25 46Z" fill="#C7A24D" opacity="0.8"/>
                    <path d="M4 25C4 25 15 31.5 25 25C15 18.5 4 25 4 25Z" fill="#C7A24D" opacity="0.8"/>
                    <path d="M46 25C46 25 35 31.5 25 25C35 18.5 46 25 46 25Z" fill="#C7A24D" opacity="0.8"/>
                    <circle cx="25" cy="25" r="3" fill="#D9BA78" opacity="0.6"/>
                    <path d="M25 4C25 4 28 10 25 14C22 10 25 4 25 4Z" fill="#F7F4ED" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="200" height="300" fill="url(#kanok1)"/>
              </svg>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,40,28,0.9) 0%,transparent 50%)" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 12px" }}>
                <div style={{ fontSize:8, color:T.gold, letterSpacing:3, textTransform:"uppercase",
                  fontFamily:"'Inter',system-ui,sans-serif", marginBottom:3 }}>WALLCOVERING</div>
                <div style={{ fontSize:11, color:"#F7F4ED", fontFamily:"Georgia,serif" }}>Midnight Siam</div>
              </div>
            </div>
            {/* Small scarf card */}
            <div style={{ background:"linear-gradient(135deg,#C7A24D10,#0F4D3A40)",
              borderRadius:6, overflow:"hidden", aspectRatio:"1/1", position:"relative",
              border:"1px solid rgba(199,162,77,0.25)", boxShadow:"0 8px 24px rgba(0,0,0,0.3)" }}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.65 }}>
                <defs>
                  <pattern id="lotus1" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                    <ellipse cx="12.5" cy="6" rx="4" ry="6" fill="#B85A72" opacity="0.7"/>
                    <ellipse cx="19" cy="12.5" rx="6" ry="4" fill="#B85A72" opacity="0.5"/>
                    <ellipse cx="6" cy="12.5" rx="6" ry="4" fill="#B85A72" opacity="0.5"/>
                    <circle cx="12.5" cy="12.5" r="2.5" fill="#D9BA78"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#lotus1)"/>
              </svg>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px 10px",
                background:"linear-gradient(to top,rgba(10,40,28,0.85),transparent)" }}>
                <div style={{ fontSize:7, color:T.gold, letterSpacing:2, textTransform:"uppercase",
                  fontFamily:"'Inter',system-ui,sans-serif" }}>SILK SCARF · TEXTILE</div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ flex:"0 0 auto", width:180, display:"flex", flexDirection:"column", gap:14, marginTop:40 }}>
            {/* Square — Hospitality interior */}
            <div style={{ background:"linear-gradient(135deg,#0A1E16,#1A4030)",
              borderRadius:8, overflow:"hidden", aspectRatio:"1/1.1", position:"relative",
              border:"1px solid rgba(199,162,77,0.2)", boxShadow:"0 12px 36px rgba(0,0,0,0.4)" }}>
              <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.45 }}>
                <defs>
                  <pattern id="naga1" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M0 15 Q7.5 7.5 15 15 Q22.5 22.5 30 15" stroke="#C7A24D" strokeWidth="1.2" fill="none" opacity="0.8"/>
                    <path d="M0 0 Q7.5 7.5 15 0 Q22.5 -7.5 30 0" stroke="#C7A24D" strokeWidth="0.8" fill="none" opacity="0.4"/>
                    <path d="M15 0 Q22.5 7.5 15 15 Q7.5 22.5 15 30" stroke="#C7A24D" strokeWidth="0.8" fill="none" opacity="0.4"/>
                  </pattern>
                </defs>
                <rect width="180" height="200" fill="url(#naga1)"/>
              </svg>
              <div style={{ position:"absolute", inset:0,
                background:"linear-gradient(135deg,rgba(10,53,40,0.3),rgba(10,30,22,0.6))" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 12px" }}>
                <div style={{ fontSize:7, color:T.gold, letterSpacing:2, textTransform:"uppercase",
                  fontFamily:"'Inter',system-ui,sans-serif", marginBottom:2 }}>HOSPITALITY · FF&E</div>
                <div style={{ fontSize:10, color:"#F7F4ED", fontFamily:"Georgia,serif" }}>Interior Application</div>
              </div>
            </div>
            {/* Tall card — Packaging */}
            <div style={{ background:"linear-gradient(160deg,#1A0D05,#3D2010)",
              borderRadius:6, overflow:"hidden", aspectRatio:"2/3", position:"relative",
              border:"1px solid rgba(199,162,77,0.3)", boxShadow:"0 10px 30px rgba(0,0,0,0.4)" }}>
              <svg viewBox="0 0 180 270" xmlns="http://www.w3.org/2000/svg"
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.55 }}>
                <defs>
                  <pattern id="gem1" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                    <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="#C7A24D" strokeWidth="1" opacity="0.9"/>
                    <polygon points="18,8 28,18 18,28 8,18" fill="none" stroke="#D9BA78" strokeWidth="0.6" opacity="0.6"/>
                    <circle cx="18" cy="18" r="2" fill="#C7A24D"/>
                  </pattern>
                </defs>
                <rect width="180" height="270" fill="url(#gem1)"/>
              </svg>
              <div style={{ position:"absolute", inset:0,
                background:"linear-gradient(to top,rgba(61,32,16,0.9) 0%,transparent 55%)" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 10px" }}>
                <div style={{ fontSize:7, color:T.gold, letterSpacing:2, textTransform:"uppercase",
                  fontFamily:"'Inter',system-ui,sans-serif", marginBottom:2 }}>LUXURY PACKAGING</div>
                <div style={{ fontSize:10, color:"#F7F4ED", fontFamily:"Georgia,serif" }}>Gifting & Spa</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── IP STATEMENT BAR */}
      <div style={{ background:T.indigo, padding:"44px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex",
          alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:28 }}>
          <div>
            <div style={{ fontSize:"clamp(20px,2.8vw,36px)", fontWeight:300, color:"#F7F4ED", lineHeight:1.3 }}>
              We don't sell generic patterns.<br/>
              <em style={{ color:"#D9BA78" }}>We build and license Cultural IP.</em>
            </div>
          </div>
          <div style={{ maxWidth:460 }}>
            <div style={{ fontSize:13, color:"rgba(247,244,237,0.52)", lineHeight:1.85,
              fontFamily:"'Inter',system-ui,sans-serif", marginBottom:20 }}>
              Every NILA™ collection carries documented cultural research, authentic Thai heritage context,
              and original creative interpretation — designed for brands that demand more than a stock file.
            </div>
            <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
              <div>
                <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase",
                  color:T.gold, marginBottom:4, fontFamily:"'Inter',system-ui,sans-serif" }}>Not this</div>
                <div style={{ fontSize:12, color:"rgba(247,244,237,0.3)",
                  textDecoration:"line-through", fontFamily:"'Inter',system-ui,sans-serif" }}>Stock pattern file</div>
              </div>
              <div style={{ color:"rgba(199,162,77,0.35)", fontSize:18, alignSelf:"flex-end", paddingBottom:2 }}>→</div>
              <div>
                <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase",
                  color:T.gold, marginBottom:4, fontFamily:"'Inter',system-ui,sans-serif" }}>This</div>
                <div style={{ fontSize:12, color:"#F7F4ED", fontFamily:"'Inter',system-ui,sans-serif" }}>Licensed Cultural IP with story</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── WHAT YOU WILL DISCOVER */}
      <div style={{ background:"#FFFFFF", padding:"clamp(64px,10vw,120px) clamp(24px,6vw,80px)" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ fontSize:9, color:T.gold, letterSpacing:5, textTransform:"uppercase",
            marginBottom:16, fontFamily:"'Inter',system-ui,sans-serif" }}>What You Will Discover</div>
          <div style={{ fontSize:"clamp(28px,3.5vw,50px)", fontWeight:300, color:T.indigo, lineHeight:1.1, marginBottom:16 }}>
            Where Heritage <em style={{ fontStyle:"italic" }}>Meets the World</em>
          </div>
          <div style={{ width:44, height:1, background:T.gold, margin:"0 auto 24px" }} />
          <div style={{ fontSize:14, color:T.mist, maxWidth:560, margin:"0 auto", lineHeight:1.85,
            fontFamily:"'Inter',system-ui,sans-serif" }}>
            NILA is a Creative Technology and Cultural IP company — transforming Thai cultural heritage
            into contemporary design assets for a global audience.
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
          gap:1, background:T.ivory, maxWidth:1300, margin:"0 auto" }}>
          {[
            { num:"I",   title:"Premium Thai-Inspired Collections",   body:"Luxury design collections rooted in documented Thai cultural motifs — Kanok ornamentation, lotus botanicals, and classical heritage forms." },
            { num:"II",  title:"Authentic Cultural Storytelling",      body:"Each collection carries the cultural context of its origin — the era, the motif, and the meaning — translated for contemporary audiences." },
            { num:"III", title:"Contemporary Heritage Aesthetics",     body:"Traditional motifs reinterpreted through modern design — timeless in spirit, relevant in form, refined for the highest-tier markets." },
            { num:"IV",  title:"For Homes, Hospitality & Brands",     body:"Designs for residential interiors, luxury hotel spaces, wellness sanctuaries, fashion accessories, and lifestyle product lines." },
            { num:"V",   title:"Original Cultural IP",                 body:"Design assets developed through creative technology and rigorous cultural research — original, licensable, and globally relevant." },
          ].map((d,i)=>(
            <div key={i} style={{ background:"#fff", padding:"clamp(24px,3vw,44px) clamp(16px,2vw,32px)",
              transition:"background 0.25s, color 0.25s", cursor:"default" }}
              onMouseEnter={e=>{ e.currentTarget.style.background=T.indigo;
                e.currentTarget.querySelectorAll('[data-hover]').forEach(el=>el.style.color=el.dataset.hoverColor); }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#fff";
                e.currentTarget.querySelectorAll('[data-hover]').forEach(el=>el.style.color=el.dataset.origColor); }}>
              <div data-hover="1" data-hover-color="rgba(247,244,237,0.12)" data-orig-color="rgba(10,53,40,0.1)"
                style={{ fontSize:36, fontWeight:300, color:"rgba(10,53,40,0.1)", lineHeight:1, marginBottom:18 }}>{d.num}</div>
              <div style={{ width:22, height:1, background:T.gold, marginBottom:14 }} />
              <div data-hover="1" data-hover-color="#F7F4ED" data-orig-color="#0F4D3A"
                style={{ fontSize:"clamp(15px,1.4vw,20px)", fontWeight:400, color:T.indigo,
                  marginBottom:12, lineHeight:1.2, fontFamily:"Georgia,serif" }}>{d.title}</div>
              <div data-hover="1" data-hover-color="rgba(247,244,237,0.55)" data-orig-color="#7A8C7E"
                style={{ fontSize:12, color:T.mist, lineHeight:1.75,
                  fontFamily:"'Inter',system-ui,sans-serif" }}>{d.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY NILA */}
      <div style={{ background:T.indigo, padding:"clamp(64px,10vw,120px) clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"clamp(40px,6vw,80px)", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:9, color:T.gold, letterSpacing:5, textTransform:"uppercase",
              marginBottom:18, fontFamily:"'Inter',system-ui,sans-serif" }}>Why NILA™</div>
            <div style={{ fontSize:"clamp(28px,3.5vw,48px)", fontWeight:300, color:"#F7F4ED",
              lineHeight:1.1, marginBottom:20 }}>
              A Different Kind of<br/><em style={{ color:"#D9BA78", fontStyle:"italic" }}>Design House</em>
            </div>
            <div style={{ width:44, height:1, background:T.gold, marginBottom:24 }} />
            <div style={{ fontSize:14, color:"rgba(247,244,237,0.6)", lineHeight:1.9, marginBottom:16,
              fontFamily:"'Inter',system-ui,sans-serif" }}>
              NILA transforms Thai cultural heritage into <span style={{ color:"#F7F4ED" }}>globally relevant design experiences</span>.
              Rather than reproducing traditional motifs, NILA reinterprets them through contemporary design —
              creating original Cultural IP that connects heritage, creativity, and modern living.
            </div>
            <div style={{ fontSize:14, color:"rgba(247,244,237,0.6)", lineHeight:1.9, marginBottom:28,
              fontFamily:"'Inter',system-ui,sans-serif" }}>
              Imagine a design house where <span style={{ color:"#F7F4ED" }}>cultural codes, botanical intelligence, and refined craftsmanship</span> come together.
              NILA brings that depth of cultural intentionality to Thai heritage — for the world's most discerning homes and hospitality brands.
            </div>
            <button onClick={()=>setActiveSection("motifs")} style={{
              background:"none", border:"none", color:T.gold, fontSize:10, letterSpacing:4,
              textTransform:"uppercase", cursor:"pointer", fontFamily:"'Inter',system-ui,sans-serif",
              borderBottom:"1px solid rgba(199,162,77,0.4)", paddingBottom:3 }}>
              DISCOVER OUR HERITAGE →
            </button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {[
              { icon:"🌿", title:"Heritage Research",    body:"Every collection begins with documented cultural research — motif origin, historical context, and artistic tradition." },
              { icon:"✦",  title:"Original IP",          body:"Not a reproduction. Each NILA design is original — reinterpreted, refined, and ready for global licensing." },
              { icon:"◎",  title:"Creative Technology",  body:"AI-assisted design workflows expand creative possibilities while grounded in human expertise and cultural understanding." },
              { icon:"⬡",  title:"Global Relevance",     body:"Distinctly Thai in character — designed to resonate across cultures, markets, and the highest tiers of global living." },
            ].map((c,i)=>(
              <div key={i} style={{ background:"rgba(247,244,237,0.04)", border:"1px solid rgba(199,162,77,0.1)",
                padding:"clamp(18px,2.5vw,28px)", borderRadius:1,
                transition:"background 0.25s, border-color 0.25s", cursor:"default" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(199,162,77,0.07)"; e.currentTarget.style.borderColor="rgba(199,162,77,0.3)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(247,244,237,0.04)"; e.currentTarget.style.borderColor="rgba(199,162,77,0.1)"; }}>
                <div style={{ fontSize:20, marginBottom:12 }}>{c.icon}</div>
                <div style={{ fontSize:16, color:"#F7F4ED", marginBottom:8, fontFamily:"Georgia,serif" }}>{c.title}</div>
                <div style={{ fontSize:12, color:"rgba(247,244,237,0.48)", lineHeight:1.75,
                  fontFamily:"'Inter',system-ui,sans-serif" }}>{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COLLECTIONS TEASER */}
      <div style={{ background:T.ground, padding:"clamp(64px,10vw,120px) clamp(24px,6vw,80px)" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ fontSize:9, color:T.gold, letterSpacing:5, textTransform:"uppercase",
            marginBottom:16, fontFamily:"'Inter',system-ui,sans-serif" }}>Signature Collections</div>
          <div style={{ fontSize:"clamp(28px,3.5vw,50px)", fontWeight:300, color:T.indigo, lineHeight:1.1, marginBottom:16 }}>
            Design for the <em style={{ fontStyle:"italic" }}>World's Finest Spaces</em>
          </div>
          <div style={{ width:44, height:1, background:T.gold, margin:"0 auto 24px" }} />
          <div style={{ fontSize:13, color:T.mist, maxWidth:520, margin:"0 auto", lineHeight:1.85,
            fontFamily:"'Inter',system-ui,sans-serif" }}>
            Available for non-exclusive, regional exclusive, and global exclusive licensing.
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:24, maxWidth:1200, margin:"0 auto 40px" }}>
          {[
            { name:"Midnight Siam — Classic", motif:"Kanok · กนก", badge:"Available", badgeColor:T.jade,
              bg:"linear-gradient(160deg,#0A3528 0%,#1A5C46 100%)",
              desc:"The sacred Kanok flame scroll in warm emerald and antique gold — heritage luxury for contemporary interiors.",
              svgId:"ms-classic",
              svgPattern: `<defs>
                <pattern id="ms-classic" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30 5C30 5 38 20 30 30C22 20 30 5 30 5Z" fill="#C7A24D" opacity="0.75"/>
                  <path d="M30 55C30 55 38 40 30 30C22 40 30 55 30 55Z" fill="#C7A24D" opacity="0.75"/>
                  <path d="M5 30C5 30 20 38 30 30C20 22 5 30 5 30Z" fill="#C7A24D" opacity="0.75"/>
                  <path d="M55 30C55 30 40 38 30 30C40 22 55 30 55 30Z" fill="#C7A24D" opacity="0.75"/>
                  <path d="M30 12C30 12 33 18 30 22C27 18 30 12 30 12Z" fill="#F7F4ED" opacity="0.35"/>
                  <circle cx="30" cy="30" r="3.5" fill="#D9BA78" opacity="0.8"/>
                  <circle cx="30" cy="30" r="1.5" fill="#F7F4ED" opacity="0.9"/>
                </pattern></defs>
                <rect width="400" height="220" fill="url(#ms-classic)"/>` },
            { name:"Midnight Siam — Premium", motif:"Kanok · กนก", badge:"Available", badgeColor:T.jade,
              bg:"linear-gradient(160deg,#050F09 0%,#0A2A1A 100%)",
              desc:"The dramatic flagship in Nila Black and antique gold — exclusive night elegance for global luxury licensing.",
              svgId:"ms-premium",
              svgPattern: `<defs>
                <pattern id="ms-premium" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M25 4C25 4 32 16 25 25C18 16 25 4 25 4Z" fill="#DAAF37" opacity="0.85"/>
                  <path d="M25 46C25 46 32 34 25 25C18 34 25 46 25 46Z" fill="#DAAF37" opacity="0.85"/>
                  <path d="M4 25C4 25 16 32 25 25C16 18 4 25 4 25Z" fill="#DAAF37" opacity="0.85"/>
                  <path d="M46 25C46 25 34 32 25 25C34 18 46 25 46 25Z" fill="#DAAF37" opacity="0.85"/>
                  <circle cx="25" cy="25" r="4" fill="#0D0D0F"/>
                  <circle cx="25" cy="25" r="2" fill="#DAAF37" opacity="0.9"/>
                  <path d="M25 9C25 9 28 14 25 18C22 14 25 9 25 9Z" fill="#F6F3E8" opacity="0.3"/>
                </pattern></defs>
                <rect width="400" height="220" fill="url(#ms-premium)"/>` },
            { name:"Lotus Blush", motif:"Lotus · บัว", badge:"Preview · Q3 2026", badgeColor:T.amber,
              bg:"linear-gradient(160deg,#2E1A20 0%,#5C2E3A 100%)",
              desc:"A soft luminous palette for wellness sanctuaries and refined hospitality spaces.",
              svgId:"lotus-blush",
              svgPattern: `<defs>
                <pattern id="lotus-blush" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <ellipse cx="25" cy="14" rx="6" ry="10" fill="#E8A0B0" opacity="0.6"/>
                  <ellipse cx="25" cy="14" rx="3.5" ry="6" fill="#F2C5D0" opacity="0.7"/>
                  <ellipse cx="15" cy="25" rx="10" ry="6" fill="#E8A0B0" opacity="0.5"/>
                  <ellipse cx="35" cy="25" rx="10" ry="6" fill="#E8A0B0" opacity="0.5"/>
                  <ellipse cx="25" cy="36" rx="6" ry="10" fill="#E8A0B0" opacity="0.4"/>
                  <circle cx="25" cy="25" r="4" fill="#D9BA78" opacity="0.8"/>
                  <circle cx="25" cy="25" r="2" fill="#F7F4ED" opacity="0.9"/>
                </pattern></defs>
                <rect width="400" height="220" fill="url(#lotus-blush)"/>` },
          ].map((c,i)=>(
            <div key={i} style={{ background:"#fff", overflow:"hidden",
              boxShadow:"0 2px 16px rgba(10,53,40,0.07)", cursor:"pointer",
              transition:"transform 0.25s, box-shadow 0.25s" }}
              onClick={()=>setActiveSection("collections")}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(10,53,40,0.16)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(10,53,40,0.07)"; }}>
              {/* Pattern preview — SVG inline */}
              <div style={{ height:200, background:c.bg, position:"relative", overflow:"hidden" }}>
                <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}
                  dangerouslySetInnerHTML={{ __html: c.svgPattern }} />
                {/* Subtle vignette overlay */}
                <div style={{ position:"absolute", inset:0,
                  background:"radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)" }}/>
                <span style={{ position:"absolute", top:12, right:12, background:`${c.badgeColor}ee`,
                  color:"#fff", borderRadius:20, padding:"3px 12px", fontSize:9,
                  fontWeight:600, letterSpacing:2, fontFamily:"'Inter',system-ui,sans-serif",
                  backdropFilter:"blur(4px)" }}>{c.badge}</span>
                {/* Surface label bottom-left */}
                <div style={{ position:"absolute", bottom:12, left:14,
                  fontSize:8, color:"rgba(247,244,237,0.55)", letterSpacing:3,
                  textTransform:"uppercase", fontFamily:"'Inter',system-ui,sans-serif" }}>
                  Wallcovering · Textile · Scarf
                </div>
              </div>
              <div style={{ padding:24 }}>
                <div style={{ fontSize:20, color:T.indigo, marginBottom:4, fontFamily:"Georgia,serif" }}>{c.name}</div>
                <div style={{ fontSize:10, color:T.gold, letterSpacing:3, textTransform:"uppercase",
                  marginBottom:12, fontFamily:"'Inter',system-ui,sans-serif" }}>{c.motif}</div>
                <div style={{ fontSize:12, color:T.mist, lineHeight:1.7,
                  fontFamily:"'Inter',system-ui,sans-serif" }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center" }}>
          <button onClick={()=>setActiveSection("collections")} style={{
            padding:"12px 36px", background:"transparent", border:`1px solid ${T.gold}`,
            color:T.gold, fontSize:10, fontWeight:500, letterSpacing:4, textTransform:"uppercase",
            cursor:"pointer", borderRadius:2, fontFamily:"'Inter',system-ui,sans-serif",
            transition:"all 0.2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background=T.gold; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=T.gold; }}>
            VIEW ALL COLLECTIONS →
          </button>
        </div>
      </div>

      {/* ── BRAND STATEMENT */}
      <div style={{ background:"#fff", padding:"clamp(80px,12vw,160px) clamp(24px,8vw,140px)", textAlign:"center" }}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:72, color:T.gold, opacity:0.15,
          lineHeight:0.6, marginBottom:16 }}>"</div>
        <blockquote style={{ fontFamily:"Georgia,serif", fontSize:"clamp(20px,3vw,42px)",
          fontWeight:300, fontStyle:"italic", color:T.indigo, lineHeight:1.5,
          maxWidth:840, margin:"0 auto 28px" }}>
          Culture should not remain behind museum walls.<br/>
          It should live in the spaces people inhabit,
          the objects they cherish — and the <span style={{ color:T.gold }}>experiences they share.</span>
        </blockquote>
        <div style={{ width:44, height:1, background:T.gold, margin:"0 auto 20px" }} />
        <div style={{ fontSize:9, letterSpacing:5, textTransform:"uppercase", color:T.mist,
          fontFamily:"'Inter',system-ui,sans-serif" }}>NILA™ Heritage Living · Brand Philosophy</div>
      </div>

      {/* ── LICENSING CTA */}
      <div style={{ background:T.indigo, padding:"clamp(64px,10vw,120px) clamp(24px,6vw,80px)", textAlign:"center" }}>
        <div style={{ fontSize:9, color:T.gold, letterSpacing:5, textTransform:"uppercase",
          marginBottom:20, fontFamily:"'Inter',system-ui,sans-serif" }}>Ready to Begin</div>
        <div style={{ fontSize:"clamp(28px,4vw,56px)", fontWeight:300, color:"#F7F4ED",
          lineHeight:1.1, marginBottom:20 }}>
          Bring <em style={{ color:"#D9BA78", fontStyle:"italic" }}>Thai Heritage</em><br/>Into Your World
        </div>
        <div style={{ fontSize:14, color:"rgba(247,244,237,0.5)", lineHeight:1.8,
          maxWidth:500, margin:"0 auto 40px", fontFamily:"'Inter',system-ui,sans-serif" }}>
          NILA collections are available for licensing across interiors, hospitality,
          wellness, fashion accessories, and lifestyle brands globally.
        </div>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={()=>setActiveSection("enquiry")} style={{
            padding:"14px 36px", background:T.gold, border:"none", color:"#fff",
            fontSize:10, fontWeight:500, letterSpacing:4, textTransform:"uppercase",
            cursor:"pointer", borderRadius:2, fontFamily:"'Inter',system-ui,sans-serif",
            transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background="#D9BA78"}
            onMouseLeave={e=>e.currentTarget.style.background=T.gold}>
            ENQUIRE ABOUT LICENSING
          </button>
          <button onClick={()=>setActiveSection("enquiry")} style={{
            padding:"14px 36px", background:"transparent",
            border:"1px solid rgba(199,162,77,0.5)", color:"#C7A24D",
            fontSize:10, fontWeight:500, letterSpacing:4, textTransform:"uppercase",
            cursor:"pointer", borderRadius:2, fontFamily:"'Inter',system-ui,sans-serif",
            transition:"all 0.2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="#C7A24D"; e.currentTarget.style.background="rgba(199,162,77,0.08)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(199,162,77,0.5)"; e.currentTarget.style.background="transparent"; }}>
            REQUEST LOOKBOOK
          </button>
        </div>
      </div>

    </div>
  );

  // ── COLLECTIONS
  const CollectionsSection = () => {
    const [modalCol, setModalCol] = useState(null);
    const COLS = [
      { name:"Midnight Siam — Classic",  motif:"Kanok · กนก",
        era:"Associated with Thai classical ornament",
        palette:"Emerald + Antique Gold + Ivory",
        surfaces:"Wallcovering · Textile · Packaging · Scarf · Hotel",
        status:"Available", statusColor:T.jade,
        imageUrl:"/midnight-siam-2.jpg.png",
        desc:"The sacred Kanok flame scroll in warm emerald and antique gold on ivory — heritage, liveable luxury for contemporary interiors." },
      { name:"Midnight Siam — Premium",  motif:"Kanok · กนก",
        era:"Associated with Thai classical ornament",
        palette:"Nila Black + Antique Gold + Deep Emerald",
        surfaces:"Wallcovering · Textile · Packaging · Scarf · Hotel",
        status:"Available", statusColor:T.jade,
        imageUrl:"/midnight-siam-1.jpg.png",
        desc:"The dramatic flagship in Nila Black and antique gold — exclusive, night elegance for the highest tier of global luxury licensing." },
      { name:"Lotus Blush",  motif:"Dok Mali · ดอกมะลิ",
        era:"Contemporary Thai heritage form",
        palette:"Lotus Blossom + Antique Gold + Linen",
        surfaces:"Stationery · Spa Linen · Packaging",
        status:"Coming Q3 2026", statusColor:T.amber,
        imageUrl:null,
        desc:"A soft luminous palette for wellness sanctuaries and refined hospitality spaces." },
    ];
    return (
    <div style={{ paddingTop:80, minHeight:"100vh", background:T.ground }}>
      {/* ── Lightbox Modal */}
      {modalCol && (
        <div onClick={()=>setModalCol(null)} style={{
          position:"fixed", inset:0, zIndex:1000,
          background:"rgba(10,30,20,0.85)", display:"flex",
          alignItems:"center", justifyContent:"center", padding:24, backdropFilter:"blur(6px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:T.white, borderRadius:T.radiusXL, maxWidth:780, width:"100%",
            maxHeight:"90vh", overflowY:"auto", boxShadow:"0 32px 80px rgba(0,0,0,0.5)",
            display:"flex", flexDirection:"column" }}>
            {/* Image large */}
            <div style={{ position:"relative", flexShrink:0 }}>
              <WatermarkedImage src={modalCol.imageUrl} alt={modalCol.name}
                height={380} collection={modalCol.name} motif={modalCol.motif} />
              <button onClick={()=>setModalCol(null)} style={{
                position:"absolute", top:12, right:12, width:36, height:36,
                borderRadius:"50%", border:"none", background:"rgba(0,0,0,0.5)",
                color:"#fff", fontSize:18, cursor:"pointer", display:"flex",
                alignItems:"center", justifyContent:"center", backdropFilter:"blur(4px)" }}>✕</button>
              <div style={{ position:"absolute", top:12, left:12 }}>
                <span style={{ background:`${modalCol.statusColor}ee`, color:"#fff", borderRadius:20,
                  padding:"4px 12px", fontSize:10, fontWeight:700, backdropFilter:"blur(4px)" }}>{modalCol.status}</span>
              </div>
            </div>
            {/* Detail */}
            <div style={{ padding:"28px 32px 32px" }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:900,
                color:T.indigo, marginBottom:4 }}>{modalCol.name}</div>
              <div style={{ fontSize:11, color:T.gold, fontWeight:700, letterSpacing:3,
                textTransform:"uppercase", marginBottom:16 }}>{modalCol.motif}</div>
              <div style={{ fontSize:13, color:T.mist, lineHeight:1.8, marginBottom:24 }}>{modalCol.desc}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
                <div style={{ background:T.ground, borderRadius:T.radius, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, color:T.mist, fontWeight:700, textTransform:"uppercase",
                    letterSpacing:1, marginBottom:6 }}>Surfaces</div>
                  <div style={{ fontSize:13, color:T.ink, lineHeight:1.7 }}>{modalCol.surfaces}</div>
                </div>
                <div style={{ background:T.ground, borderRadius:T.radius, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, color:T.mist, fontWeight:700, textTransform:"uppercase",
                    letterSpacing:1, marginBottom:6 }}>Palette</div>
                  <div style={{ fontSize:13, color:T.ink, lineHeight:1.7 }}>{modalCol.palette}</div>
                </div>
              </div>
              {modalCol.status === "Available" && (
                <button onClick={()=>{ setModalCol(null); setActiveSection("enquiry"); }} style={{
                  width:"100%", padding:"13px", background:T.indigo, border:"none",
                  color:"#fff", fontSize:11, fontWeight:700, letterSpacing:4,
                  textTransform:"uppercase", cursor:"pointer", borderRadius:T.radius }}>
                  ENQUIRE ABOUT LICENSING →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div style={{ padding:"60px 40px 40px", textAlign:"center" }}>
        <div style={{ fontSize:10, color:T.gold, letterSpacing:5, textTransform:"uppercase", marginBottom:12 }}>Our Work</div>
        <div style={{ fontSize:40, fontWeight:900, color:T.indigo, fontFamily:"Georgia,serif", marginBottom:12 }}>Collections</div>
        <div style={{ width:60, height:2, background:T.gold, margin:"0 auto 24px" }} />
        <div style={{ fontSize:13, color:T.mist, maxWidth:560, margin:"0 auto", lineHeight:1.8 }}>
          Each NILA™ collection is built around a documented Thai cultural motif — researched, sourced, and reinterpreted
          for the contemporary international market.
        </div>
      </div>
      <div style={{ padding:"0 40px 80px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
        {COLS.map((c,i)=>(
          <div key={i} style={{ background:T.white, borderRadius:T.radiusL,
            overflow:"hidden", boxShadow:"0 2px 12px rgba(15,77,58,0.08)",
            border:`1px solid ${T.border}`, transition:"transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(15,77,58,0.15)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 12px rgba(15,77,58,0.08)"; }}>
            {/* Clickable image */}
            <div style={{ position:"relative", cursor: c.imageUrl ? "zoom-in" : "default" }}
              onClick={()=>{ if(c.imageUrl) setModalCol(c); }}>
              <WatermarkedImage src={c.imageUrl} alt={c.name} height={200}
                collection={c.name} motif={c.motif} />
              {c.imageUrl && (
                <div style={{ position:"absolute", inset:0, background:"rgba(15,77,58,0)",
                  transition:"background 0.2s", display:"flex", alignItems:"center", justifyContent:"center" }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(15,77,58,0.18)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(15,77,58,0)"}>
                  <span style={{ color:"#fff", fontSize:22, opacity:0.85,
                    textShadow:"0 2px 8px rgba(0,0,0,0.5)" }}>⊕</span>
                </div>
              )}
              <div style={{ position:"absolute", top:8, right:8, zIndex:2 }}>
                <span style={{ background:`${c.statusColor}ee`, color:"#fff", borderRadius:20,
                  padding:"3px 10px", fontSize:10, fontWeight:700, backdropFilter:"blur(4px)" }}>{c.status}</span>
              </div>
            </div>
            <div style={{ padding:24 }}>
              <div style={{ fontWeight:900, color:T.indigo, fontSize:20, fontFamily:"Georgia,serif", marginBottom:4 }}>{c.name}</div>
              <div style={{ fontSize:11, color:T.gold, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>{c.motif}</div>
              <div style={{ fontSize:12, color:T.mist, lineHeight:1.7, marginBottom:16 }}>{c.desc}</div>
              <div style={{ background:T.ground, borderRadius:T.radius, padding:"12px 14px" }}>
                <div style={{ fontSize:10, color:T.mist, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Surfaces</div>
                <div style={{ fontSize:12, color:T.ink }}>{c.surfaces}</div>
              </div>
              <div style={{ marginTop:12 }}>
                <div style={{ fontSize:10, color:T.mist, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Palette</div>
                <div style={{ fontSize:12, color:T.ink }}>{c.palette}</div>
              </div>
              {c.status === "Available" && (
                <button onClick={()=>setActiveSection("enquiry")} style={{
                  marginTop:16, width:"100%", padding:"10px", background:T.indigo,
                  border:"none", color:"#fff", fontSize:10, fontWeight:700,
                  letterSpacing:3, textTransform:"uppercase", cursor:"pointer", borderRadius:T.radius }}>
                  ENQUIRE ABOUT LICENSING →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  };

  // ── HERITAGE / MOTIFS
  const HeritageSection = () => (
    <div style={{ paddingTop:80, minHeight:"100vh", background:T.white }}>
      <div style={{ padding:"60px 40px 40px", textAlign:"center",
        background:`linear-gradient(180deg,${T.indigo}08,transparent)` }}>
        <div style={{ fontSize:10, color:T.gold, letterSpacing:5, textTransform:"uppercase", marginBottom:12 }}>Cultural Foundation</div>
        <div style={{ fontSize:40, fontWeight:900, color:T.indigo, fontFamily:"Georgia,serif", marginBottom:12 }}>Thai Heritage</div>
        <div style={{ width:60, height:2, background:T.gold, margin:"0 auto 24px" }} />
        <div style={{ fontSize:13, color:T.mist, maxWidth:600, margin:"0 auto", lineHeight:1.8 }}>
          Every NILA™ design is sourced from documented Thai cultural heritage. We research, cite, and honour
          the historical origins of each motif before beginning any design work.
        </div>
      </div>
      <div style={{ padding:"40px 40px 80px" }}>
        {MOTIFS.slice(0,6).map((m,i)=>(
          <div key={m.code} style={{ display:"grid", gridTemplateColumns:"180px 1fr 1fr",
            gap:24, padding:"24px 0", borderBottom:`1px solid ${T.borderL}`,
            alignItems:"start" }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:11, color:T.gold, fontWeight:700, marginBottom:4 }}>{m.code}</div>
              <div style={{ fontWeight:900, color:T.indigo, fontSize:18, fontFamily:"Georgia,serif" }}>{m.name}</div>
              <div style={{ fontSize:18, color:T.mist, marginBottom:6 }}>{m.thai}</div>
              <div style={{ fontSize:11, color:T.mist }}>{m.era}</div>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Symbolic Meaning</div>
              <div style={{ fontSize:13, color:T.ink, lineHeight:1.7 }}>{m.meaning}</div>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:T.mist, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Surface Applications</div>
              <div style={{ fontSize:13, color:T.ink, lineHeight:1.7 }}>{m.surfaces}</div>
              <div style={{ marginTop:8 }}>
                <span style={{ background:`${T.indigo}10`, color:T.indigo, border:`1px solid ${T.indigo}22`,
                  borderRadius:20, padding:"2px 10px", fontSize:10, fontWeight:700 }}>{m.tier}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── LICENSING
  const LicensingSection = () => {
    const fee = calcFee();
    return (
      <div style={{ paddingTop:80, minHeight:"100vh", background:T.ground }}>
        <div style={{ padding:"60px 40px 40px", textAlign:"center" }}>
          <div style={{ fontSize:10, color:T.gold, letterSpacing:5, textTransform:"uppercase", marginBottom:12 }}>How It Works</div>
          <div style={{ fontSize:40, fontWeight:900, color:T.indigo, fontFamily:"Georgia,serif", marginBottom:12 }}>Licensing</div>
          <div style={{ width:60, height:2, background:T.gold, margin:"0 auto 24px" }} />
        </div>
        {/* 4 Tiers */}
        <div style={{ padding:"0 40px", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:60 }}>
          {LICENSE_TIERS.map(l=>(
            <div key={l.code} style={{ background:T.white, borderRadius:T.radiusL, padding:24,
              borderTop:`3px solid ${l.color}`, boxShadow:"0 2px 8px rgba(15,77,58,0.06)" }}>
              <div style={{ fontSize:10, fontWeight:800, color:l.color, letterSpacing:2,
                textTransform:"uppercase", marginBottom:8 }}>{l.code}</div>
              <div style={{ fontWeight:900, color:T.indigo, fontSize:16, fontFamily:"Georgia,serif", marginBottom:8 }}>{l.tier}</div>
              <div style={{ fontSize:18, fontWeight:800, color:l.color, marginBottom:12 }}>
                USD {l.priceUSD[0].toLocaleString()}–{l.priceUSD[1].toLocaleString()}
              </div>
              <div style={{ fontSize:12, color:T.mist, lineHeight:1.7, marginBottom:16 }}>{l.desc}</div>
              <div style={{ fontSize:11, color:T.mist, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Ideal for</div>
              <div style={{ fontSize:12, color:T.ink }}>{l.ideal}</div>
            </div>
          ))}
        </div>
        {/* Calculator */}
        <div style={{ padding:"0 40px 80px" }}>
          <div style={{ background:T.white, borderRadius:T.radiusL, padding:40,
            boxShadow:"0 2px 12px rgba(15,77,58,0.08)", maxWidth:700, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:32 }}>
              <div style={{ fontSize:18, fontWeight:900, color:T.indigo, fontFamily:"Georgia,serif" }}>Estimate Your Licence Fee</div>
              <div style={{ fontSize:12, color:T.mist, marginTop:6 }}>For scoping purposes only — final fees agreed in writing</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
              {[
                ["Licence Tier","tier",LICENSE_TIERS.map(l=>[l.code,l.tier])],
                ["Number of Designs","designs",[[1,"1 design"],[2,"2 designs"],[4,"4 designs"],[6,"6 designs"]]],
                ["Exclusivity","exclusivity",[["none","Non-exclusive"],["regional","Regional exclusive"],["global","Global exclusive"]]],
                ["Territory","territory",[["single","Single country"],["regional","Regional"],["global","Worldwide"]]],
              ].map(([label,key,opts])=>(
                <div key={key}>
                  <label style={{ display:"block", fontSize:10, fontWeight:700, color:T.mist,
                    textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>{label}</label>
                  <select value={calcParams[key]}
                    onChange={e=>setCalcParams(p=>({...p,[key]:isNaN(Number(e.target.value))?e.target.value:Number(e.target.value)}))}
                    style={{ width:"100%", padding:"9px 12px", borderRadius:T.radius,
                      border:`1px solid ${T.border}`, fontSize:13, background:T.ground, fontFamily:"inherit" }}>
                    {opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ background:`linear-gradient(135deg,${T.indigo},${T.indigoL})`,
              borderRadius:T.radius, padding:24, textAlign:"center" }}>
              <div style={{ fontSize:10, color:"rgba(247,244,237,0.6)", fontWeight:700,
                textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>Indicative Licence Fee</div>
              <div style={{ fontSize:44, fontWeight:900, color:"#F7F4ED", fontFamily:"Georgia,serif", lineHeight:1 }}>
                USD {fee?fee.toLocaleString():"—"}
              </div>
              <div style={{ fontSize:12, color:"rgba(199,162,77,0.8)", marginTop:8 }}>
                ≈ THB {fee?Math.round(fee*35.5).toLocaleString():"—"}
              </div>
            </div>
            <div style={{ textAlign:"center", marginTop:20 }}>
              <button onClick={()=>setActiveSection("enquiry")} style={{
                padding:"12px 40px", background:T.gold, border:"none", color:"#fff",
                fontSize:11, fontWeight:700, letterSpacing:3, textTransform:"uppercase",
                cursor:"pointer", borderRadius:T.radius }}>
                PROCEED TO ENQUIRY →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── ENQUIRY FORM
  const EnquirySection = () => {
    const [errors, setErrors]     = useState({});
    const [lastSent, setLastSent] = useState(0);
    const [honey, setHoney]       = useState(""); // honeypot

    const validate = () => {
      const e = {};
      if (!enquiry.name.trim() || enquiry.name.trim().length < 2)
        e.name = "Please enter your full name.";
      if (!enquiry.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/))
        e.email = "Please enter a valid email address.";
      if (enquiry.message.trim().length > 0 && enquiry.message.trim().length < 10)
        e.message = "Message is too short — please share a bit more about your project.";
      return e;
    };

    const handleSend = async () => {
      // Honeypot check (bot filled hidden field)
      if (honey) return;
      // Simple rate-limit: 60s between submissions
      const now = Date.now();
      if (now - lastSent < 60000) {
        setSendError("Please wait a moment before sending another enquiry.");
        return;
      }
      const e = validate();
      setErrors(e);
      if (Object.keys(e).length) return;

      setSending(true); setSendError("");
      try {
        if (!window.emailjs) {
          await new Promise((res, rej) => {
            const s = document.createElement("script");
            s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
            s.onload = res; s.onerror = rej;
            document.head.appendChild(s);
          });
          window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        }
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          name:       enquiry.name.trim(),
          company:    enquiry.company.trim() || "—",
          email:      enquiry.email.trim(),
          segment:    enquiry.segment,
          collection: enquiry.collection,
          message:    enquiry.message.trim() || "—",
          time: new Date().toLocaleString("en-GB", { timeZone:"Asia/Bangkok" }),
        });
        setLastSent(Date.now());
        setSubmitted(true);
      } catch(err) {
        setSendError("ขออภัยค่ะ ไม่สามารถส่งได้ตอนนี้ กรุณาติดต่อ studio@niladesign.co โดยตรงค่ะ");
      } finally {
        setSending(false);
      }
    };

    const fieldStyle = (key) => ({
      width:"100%", padding:"12px 14px", borderRadius:T.radius,
      border:`1px solid ${errors[key] ? "#991B1B" : T.border}`,
      fontSize:13, background:T.white,
      boxSizing:"border-box", fontFamily:"inherit", outline:"none"
    });

    return (
    <div style={{ paddingTop:80, minHeight:"100vh", background:T.white }}>
      <div style={{ padding:"60px 40px 40px", textAlign:"center" }}>
        <div style={{ fontSize:10, color:T.gold, letterSpacing:5, textTransform:"uppercase", marginBottom:12 }}>Get In Touch</div>
        <div style={{ fontSize:40, fontWeight:900, color:T.indigo, fontFamily:"Georgia,serif", marginBottom:12 }}>Licensing Enquiry</div>
        <div style={{ width:60, height:2, background:T.gold, margin:"0 auto 24px" }} />
        <div style={{ fontSize:13, color:T.mist, maxWidth:480, margin:"0 auto", lineHeight:1.8 }}>
          We respond to all licensing enquiries within 3 business days. Please share as much detail as possible about your project.
        </div>
      </div>
      <div style={{ padding:"0 40px 80px", maxWidth:600, margin:"0 auto" }}>
        {submitted ? (
          <div style={{ textAlign:"center", padding:"60px 40px", background:T.ground,
            borderRadius:T.radiusL, border:`1px solid ${T.jade}44` }}>
            <div style={{ fontSize:32, marginBottom:16 }}>✦</div>
            <div style={{ fontSize:22, fontWeight:900, color:T.indigo, fontFamily:"Georgia,serif", marginBottom:8 }}>Thank you</div>
            <div style={{ fontSize:13, color:T.mist, lineHeight:1.8 }}>
              Your enquiry has been received. We will be in touch within 3 business days.
            </div>
            <div style={{ marginTop:16, fontSize:11, color:T.gold, fontWeight:700 }}>NILA™ Heritage Living</div>
          </div>
        ) : (
          <div style={{ background:T.ground, borderRadius:T.radiusL, padding:40,
            boxShadow:"0 2px 12px rgba(15,77,58,0.06)" }}>

            {/* Honeypot — hidden from real users */}
            <input type="text" value={honey} onChange={e=>setHoney(e.target.value)}
              style={{ position:"absolute", left:"-9999px", opacity:0, pointerEvents:"none" }}
              tabIndex={-1} autoComplete="off" />

            {[
              ["Full Name *","name","text","Your name"],
              ["Company / Brand","company","text","Company or brand name"],
              ["Email Address *","email","email","your@email.com"],
            ].map(([label,key,type,ph])=>(
              <div key={key} style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontSize:10, fontWeight:700, color:T.mist,
                  textTransform:"uppercase", letterSpacing:2, marginBottom:6 }}>{label}</label>
                <input type={type} value={enquiry[key]} placeholder={ph}
                  onChange={e=>{ setEnquiry(q=>({...q,[key]:e.target.value})); setErrors(r=>({...r,[key]:""})); }}
                  style={fieldStyle(key)} />
                {errors[key] && <div style={{ fontSize:11, color:"#991B1B", marginTop:4 }}>{errors[key]}</div>}
              </div>
            ))}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"block", fontSize:10, fontWeight:700, color:T.mist,
                textTransform:"uppercase", letterSpacing:2, marginBottom:6 }}>Segment</label>
              <select value={enquiry.segment} onChange={e=>setEnquiry(q=>({...q,segment:e.target.value}))}
                style={{ width:"100%", padding:"12px 14px", borderRadius:T.radius,
                  border:`1px solid ${T.border}`, fontSize:13, background:T.white, fontFamily:"inherit" }}>
                {["Surface Brand","Luxury Hospitality","Consumer Brand","Interior Design Studio","POD Platform","Other"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"block", fontSize:10, fontWeight:700, color:T.mist,
                textTransform:"uppercase", letterSpacing:2, marginBottom:6 }}>Collection of Interest</label>
              <select value={enquiry.collection} onChange={e=>setEnquiry(q=>({...q,collection:e.target.value}))}
                style={{ width:"100%", padding:"12px 14px", borderRadius:T.radius,
                  border:`1px solid ${T.border}`, fontSize:13, background:T.white, fontFamily:"inherit" }}>
                {["Midnight Siam","Lotus Blush","Royal Azure","Loi Krathong","Bespoke Commission","Not sure yet"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:28 }}>
              <label style={{ display:"block", fontSize:10, fontWeight:700, color:T.mist,
                textTransform:"uppercase", letterSpacing:2, marginBottom:6 }}>Message</label>
              <textarea value={enquiry.message}
                placeholder="Tell us about your project — surfaces, volume, territory, timeline..."
                onChange={e=>{ setEnquiry(q=>({...q,message:e.target.value})); setErrors(r=>({...r,message:""})); }}
                style={{ width:"100%", padding:"12px 14px", borderRadius:T.radius,
                  border:`1px solid ${errors.message ? "#991B1B" : T.border}`, fontSize:13, background:T.white,
                  minHeight:120, resize:"vertical", fontFamily:"inherit", boxSizing:"border-box",
                  outline:"none", lineHeight:1.6 }} />
              {errors.message && <div style={{ fontSize:11, color:"#991B1B", marginTop:4 }}>{errors.message}</div>}
            </div>
            <button onClick={handleSend} disabled={sending}
              style={{ width:"100%", padding:"14px", background:sending ? "#888" : T.indigo,
                border:"none", color:"#fff", fontSize:11, fontWeight:700, letterSpacing:4,
                textTransform:"uppercase", cursor:sending?"not-allowed":"pointer",
                borderRadius:T.radius, transition:"background 0.2s" }}>
              {sending ? "SENDING…" : "SEND ENQUIRY"}
            </button>
            <div style={{ textAlign:"center", marginTop:16, fontSize:11, color:T.mist }}>
              Response within 3 business days · All enquiries treated confidentially
            </div>
            {sendError && <div style={{ marginTop:12, padding:"10px 14px", background:"#FEF2F2",
              borderRadius:T.radius, fontSize:T.sm, color:"#991B1B" }}>{sendError}</div>}
          </div>
        )}
      </div>
    </div>
  );
  };

  // Footer
  const Footer = () => (
    <div style={{ background:T.indigoD, padding:"48px 40px", textAlign:"center",
      borderTop:`1px solid rgba(199,162,77,0.2)` }}>
      <div style={{ fontFamily:"Georgia,serif", fontSize:24, fontWeight:900,
        color:"#F7F4ED", letterSpacing:8, marginBottom:6 }}>NILA™</div>
      <div style={{ fontSize:10, color:"#C7A24D", letterSpacing:4, textTransform:"uppercase", marginBottom:20 }}>HERITAGE LIVING</div>
      <div style={{ fontSize:11, color:"rgba(247,244,237,0.35)", lineHeight:1.8 }}>
        Inspired by Thai Heritage. Crafted for the World.<br/>
        Siamese Botanica · Design Division · Thailand<br/>
        <span style={{ color:"rgba(199,162,77,0.4)" }}>© 2026 NILA™ Heritage Living. All rights reserved.</span>
      </div>
    </div>
  );

  // ── ABOUT
  const AboutSection = () => (
    <div style={{ paddingTop:60 }}>
      {/* Hero */}
      <div style={{ background:T.indigo, padding:"clamp(80px,12vw,140px) clamp(24px,6vw,80px)", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:0.05,
          backgroundImage:`url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C7A24D'%3E%3Cpath d='M50 8C50 8 63 30 50 50C37 30 50 8 50 8Z'/%3E%3Cpath d='M50 92C50 92 63 70 50 50C37 70 50 92 50 92Z'/%3E%3Cpath d='M8 50C8 50 30 63 50 50C30 37 8 50 8 50Z'/%3E%3Cpath d='M92 50C92 50 70 63 50 50C70 37 92 50 92 50Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize:"100px 100px" }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ fontSize:9, color:T.gold, letterSpacing:5, textTransform:"uppercase",
            marginBottom:20, fontFamily:"'Inter',system-ui,sans-serif" }}>Creative Technology · Cultural IP · Thai Heritage</div>
          <div style={{ fontSize:"clamp(36px,6vw,80px)", fontWeight:300, color:"#F7F4ED",
            lineHeight:1.05, marginBottom:20, fontFamily:"Georgia,serif" }}>
            NILA™<br/><em style={{ fontStyle:"italic", color:"#D9BA78" }}>Heritage Living</em>
          </div>
          <div style={{ width:44, height:1, background:T.gold, margin:"0 auto 24px" }} />
          <div style={{ fontSize:"clamp(15px,2vw,20px)", fontStyle:"italic", color:"rgba(247,244,237,0.7)",
            fontFamily:"Georgia,serif" }}>Inspired by Thai Heritage. Crafted for the World.</div>
        </div>
      </div>
      {/* About text */}
      <div style={{ background:"#fff", padding:"clamp(64px,10vw,120px) clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"clamp(40px,6vw,80px)" }}>
          <div>
            <div style={{ fontSize:9, color:T.gold, letterSpacing:5, textTransform:"uppercase",
              marginBottom:20, fontFamily:"'Inter',system-ui,sans-serif" }}>About NILA™</div>
            <div style={{ fontSize:"clamp(28px,3vw,44px)", fontWeight:300, color:T.indigo,
              lineHeight:1.1, marginBottom:28, fontFamily:"Georgia,serif" }}>Where Heritage<br/><em>Meets the World</em></div>
            <div style={{ width:44, height:1, background:T.gold, marginBottom:28 }} />
            {["NILA™ Heritage Living is a contemporary cultural design brand that transforms the richness of Thai heritage into timeless patterns, products, and lifestyle experiences for a global audience.",
              "Rooted in the belief that culture should continue to evolve, NILA reinterprets traditional Thai motifs, craftsmanship, and visual traditions through modern design and creative technology. Our work bridges the past and the future — creating collections that honor heritage while feeling relevant to contemporary living.",
              "Inspired by Thailand's artistic legacy — from lotus blossoms and tropical botanicals to Kanok ornamentation, traditional textiles, and architectural details — each collection is carefully developed to balance authenticity, elegance, and international appeal.",
              "NILA began as a small idea and gradually became a new way of helping Thai heritage travel across the world."
            ].map((p,i)=>(
              <div key={i} style={{ fontSize:14, color:T.mist, lineHeight:1.9, marginBottom:18,
                fontFamily:"'Inter',system-ui,sans-serif" }}>{p}</div>
            ))}
          </div>
          <div>
            {/* Vision */}
            <div style={{ background:T.indigo, padding:"clamp(28px,3vw,44px)", marginBottom:16, borderRadius:1 }}>
              <div style={{ fontSize:9, color:T.gold, letterSpacing:4, textTransform:"uppercase",
                marginBottom:14, fontFamily:"'Inter',system-ui,sans-serif" }}>Our Vision</div>
              <div style={{ fontSize:"clamp(18px,2vw,26px)", color:"#F7F4ED", lineHeight:1.3,
                marginBottom:16, fontFamily:"Georgia,serif" }}>A globally recognized cultural design house</div>
              <div style={{ fontSize:13, color:"rgba(247,244,237,0.55)", lineHeight:1.85,
                fontFamily:"'Inter',system-ui,sans-serif" }}>
                To become a globally recognized cultural design house that brings Thai heritage into contemporary life through design, technology, and creativity.
              </div>
            </div>
            {/* Mission */}
            <div style={{ background:T.ground, padding:"clamp(28px,3vw,44px)", borderRadius:1 }}>
              <div style={{ fontSize:9, color:T.gold, letterSpacing:4, textTransform:"uppercase",
                marginBottom:14, fontFamily:"'Inter',system-ui,sans-serif" }}>Our Mission</div>
              {["Preserve and reinterpret Thai cultural heritage through contemporary design.",
                "Create original cultural design assets for global lifestyle markets.",
                "Use creative technology and AI-assisted workflows to expand cultural storytelling.",
                "Support the global appreciation of Thai design and craftsmanship.",
                "Build sustainable cultural value that can inspire future generations."
              ].map((m,i)=>(
                <div key={i} style={{ display:"flex", gap:14, marginBottom:12 }}>
                  <div style={{ width:20, height:1, background:T.gold, flexShrink:0, marginTop:10 }} />
                  <div style={{ fontSize:13, color:T.mist, lineHeight:1.7,
                    fontFamily:"'Inter',system-ui,sans-serif" }}>{m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Design Philosophy */}
      <div style={{ background:T.ground, padding:"clamp(64px,10vw,100px) clamp(24px,6vw,80px)" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:9, color:T.gold, letterSpacing:5, textTransform:"uppercase",
            marginBottom:16, fontFamily:"'Inter',system-ui,sans-serif" }}>How We Work</div>
          <div style={{ fontSize:"clamp(28px,3vw,44px)", fontWeight:300, color:T.indigo,
            fontFamily:"Georgia,serif" }}>Design Philosophy</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
          gap:1, background:T.ivory, maxWidth:1200, margin:"0 auto" }}>
          {[
            { num:"01", title:"Heritage First",                body:"Every collection begins with cultural research and deep respect for authentic Thai artistic traditions. Heritage is the foundation." },
            { num:"02", title:"Contemporary Interpretation",   body:"Traditional motifs thoughtfully reimagined for modern interiors — honoring the past while speaking to the present." },
            { num:"03", title:"Creative Technology",           body:"AI-assisted workflows enable new creative possibilities while remaining guided by human expertise and cultural understanding." },
            { num:"04", title:"Global Relevance",              body:"Distinctly Thai in character — designed to resonate across cultures and the highest tiers of global living." },
          ].map((p,i)=>(
            <div key={i} style={{ background:"#fff", padding:"clamp(28px,3vw,44px) clamp(20px,2vw,32px)",
              transition:"background 0.25s", cursor:"default" }}
              onMouseEnter={e=>e.currentTarget.style.background=T.indigo}
              onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
              <div style={{ fontSize:9, color:T.gold, letterSpacing:3, textTransform:"uppercase",
                marginBottom:16, fontFamily:"'Inter',system-ui,sans-serif" }}>{p.num}</div>
              <div style={{ fontSize:"clamp(18px,1.8vw,24px)", color:T.indigo, marginBottom:12,
                fontFamily:"Georgia,serif" }}>{p.title}</div>
              <div style={{ fontSize:12, color:T.mist, lineHeight:1.8,
                fontFamily:"'Inter',system-ui,sans-serif" }}>{p.body}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Brand Statement */}
      <div style={{ background:T.indigo, padding:"clamp(64px,10vw,100px) clamp(24px,8vw,120px)", textAlign:"center" }}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:64, color:T.gold, opacity:0.18, lineHeight:0.6, marginBottom:16 }}>"</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"clamp(18px,2.8vw,38px)", fontWeight:300,
          fontStyle:"italic", color:"#F7F4ED", lineHeight:1.5, maxWidth:820, margin:"0 auto 24px" }}>
          NILA™ is more than a pattern brand. It is a <span style={{ color:"#D9BA78" }}>Cultural IP platform</span> and
          contemporary Thai heritage design house — dedicated to transforming Thai heritage into meaningful design for the world.
        </div>
        <div style={{ width:44, height:1, background:T.gold, margin:"0 auto 20px" }} />
        <div style={{ fontSize:9, letterSpacing:4, textTransform:"uppercase",
          color:"rgba(199,162,77,0.55)", fontFamily:"'Inter',system-ui,sans-serif" }}>
          Creative Technology · Cultural IP · Thai Heritage
        </div>
      </div>
    </div>
  );

  // ── PRICING
  const PricingSection = () => (
    <div style={{ paddingTop:60, background:T.ground, minHeight:"100vh" }}>
      <div style={{ padding:"clamp(64px,10vw,100px) clamp(24px,6vw,80px)" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ fontSize:9, color:T.gold, letterSpacing:5, textTransform:"uppercase",
            marginBottom:16, fontFamily:"'Inter',system-ui,sans-serif" }}>Licensing Investment</div>
          <div style={{ fontSize:"clamp(28px,3.5vw,50px)", fontWeight:300, color:T.indigo,
            lineHeight:1.1, marginBottom:16, fontFamily:"Georgia,serif" }}>
            Transparent <em style={{ fontStyle:"italic" }}>Pricing</em>
          </div>
          <div style={{ width:44, height:1, background:T.gold, margin:"0 auto 24px" }} />
          <div style={{ fontSize:13, color:T.mist, maxWidth:520, margin:"0 auto", lineHeight:1.85,
            fontFamily:"'Inter',system-ui,sans-serif" }}>
            All licenses are annual and include full commercial use rights for the specified territory and application.
            Custom and exclusive arrangements available on request.
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
          gap:20, maxWidth:1100, margin:"0 auto 48px" }}>
          {[
            { tier:"Non-Exclusive", price:"From $2,500", desc:"Use the pattern across your products and interiors. Other licensees may use the same design in different territories.",
              features:["Annual commercial license","Single territory","1 collection / 1 colorway","Digital pattern files included","NILA™ attribution required"],
              highlight:false },
            { tier:"Regional Exclusive", price:"From $8,000", desc:"Exclusive rights to the pattern within your country or region. No competing licensees in your territory.",
              features:["Annual commercial license","Country or regional exclusivity","1 collection / up to 2 colorways","Digital files + print-ready assets","Priority support"],
              highlight:true },
            { tier:"Global Exclusive", price:"Contact Us", desc:"Full worldwide exclusivity. The most prestigious tier — reserved for global luxury brands and flagship collaborations.",
              features:["Worldwide exclusivity","Multi-year terms available","Full collection access","Custom colorway development","Dedicated account management"],
              highlight:false },
          ].map((p,i)=>(
            <div key={i} style={{ background: p.highlight ? T.indigo : "#fff",
              border: p.highlight ? "none" : `1px solid ${T.border}`,
              padding:"clamp(28px,3vw,44px)", position:"relative",
              boxShadow: p.highlight ? "0 20px 60px rgba(10,53,40,0.2)" : "none",
              transform: p.highlight ? "translateY(-8px)" : "none" }}>
              {p.highlight && <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)",
                background:T.gold, color:"#fff", fontSize:8, letterSpacing:3, textTransform:"uppercase",
                padding:"4px 16px", fontFamily:"'Inter',system-ui,sans-serif" }}>Most Popular</div>}
              <div style={{ fontSize:9, color: p.highlight ? T.gold : T.gold, letterSpacing:4,
                textTransform:"uppercase", marginBottom:12, fontFamily:"'Inter',system-ui,sans-serif" }}>{p.tier}</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"clamp(24px,2.5vw,36px)",
                color: p.highlight ? "#F7F4ED" : T.indigo, marginBottom:16, fontWeight:300 }}>{p.price}</div>
              <div style={{ fontSize:12, color: p.highlight ? "rgba(247,244,237,0.55)" : T.mist,
                lineHeight:1.75, marginBottom:24, fontFamily:"'Inter',system-ui,sans-serif" }}>{p.desc}</div>
              <div style={{ width:"100%", height:1, background: p.highlight ? "rgba(199,162,77,0.2)" : T.border, marginBottom:20 }} />
              {p.features.map((f,j)=>(
                <div key={j} style={{ display:"flex", gap:12, marginBottom:10 }}>
                  <div style={{ color:T.gold, fontSize:12, flexShrink:0 }}>✓</div>
                  <div style={{ fontSize:12, color: p.highlight ? "rgba(247,244,237,0.65)" : T.mist,
                    fontFamily:"'Inter',system-ui,sans-serif", lineHeight:1.5 }}>{f}</div>
                </div>
              ))}
              <button onClick={()=>setActiveSection("enquiry")} style={{
                marginTop:24, width:"100%", padding:"12px",
                background: p.highlight ? T.gold : "transparent",
                border: p.highlight ? "none" : `1px solid ${T.gold}`,
                color: p.highlight ? "#fff" : T.gold,
                fontSize:10, fontWeight:500, letterSpacing:3, textTransform:"uppercase",
                cursor:"pointer", fontFamily:"'Inter',system-ui,sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=T.gold; e.currentTarget.style.color="#fff"; e.currentTarget.style.border="none"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=p.highlight?T.gold:"transparent"; e.currentTarget.style.color=p.highlight?"#fff":T.gold; }}>
                {p.price==="Contact Us" ? "GET IN TOUCH" : "ENQUIRE NOW"}
              </button>
            </div>
          ))}
        </div>
        <div style={{ background:"#fff", padding:"clamp(28px,3vw,44px)", maxWidth:1100, margin:"0 auto",
          border:`1px solid ${T.border}`, textAlign:"center" }}>
          <div style={{ fontSize:13, fontFamily:"Georgia,serif", color:T.indigo, marginBottom:8 }}>
            Need something bespoke?
          </div>
          <div style={{ fontSize:12, color:T.mist, lineHeight:1.75, marginBottom:20,
            fontFamily:"'Inter',system-ui,sans-serif" }}>
            Custom collection development, OEM licensing, multi-year agreements, and bundle packages are available.
            Contact us to discuss your specific requirements.
          </div>
          <button onClick={()=>setActiveSection("enquiry")} style={{
            padding:"11px 32px", background:"transparent", border:`1px solid ${T.gold}`,
            color:T.gold, fontSize:10, letterSpacing:3, textTransform:"uppercase",
            cursor:"pointer", fontFamily:"'Inter',system-ui,sans-serif" }}>
            DISCUSS CUSTOM LICENSING →
          </button>
        </div>
      </div>
    </div>
  );

  // ── FAQ
  const FAQSection = () => {
    const [open, setOpen] = useState(null);
    const faqs = [
      { q:"What is a NILA™ design license?",
        a:"A NILA™ license grants you the right to commercially use one or more of our original cultural design collections for a specified territory, application, and duration. Unlike stock pattern files, each license includes cultural documentation, brand story, and the authenticity of the NILA™ heritage research process." },
      { q:"What is the difference between non-exclusive and exclusive licensing?",
        a:"A non-exclusive license allows multiple clients to use the same design in different territories. A regional exclusive license gives you sole rights within your country or region. A global exclusive license means no other brand may use that design anywhere in the world." },
      { q:"What file formats are included?",
        a:"All licenses include high-resolution digital pattern files suitable for print and digital application. Formats typically include PNG, PDF, and TIFF at 300dpi minimum. Production-ready files for specific applications (wallcovering, textile, packaging) can be arranged upon request." },
      { q:"Can I request a custom colorway?",
        a:"Yes. Custom colorway development is available for Regional Exclusive and Global Exclusive licensees, and as an add-on for Non-Exclusive licenses. Please include your colorway requirements in your enquiry." },
      { q:"How long does the licensing process take?",
        a:"Once we receive your enquiry, we typically respond within 2–3 business days. After agreement on terms, licensing documentation is issued within 5–7 business days. Files are delivered digitally upon receipt of payment." },
      { q:"Is NILA™ open to collaborations with hotels and hospitality brands?",
        a:"Yes — hospitality is one of our primary markets. We welcome conversations with boutique hotels, luxury resorts, wellness retreats, and spa brands looking to incorporate authentic Thai heritage design into their guest experience." },
      { q:"Can I use NILA™ designs for print-on-demand products?",
        a:"Print-on-demand use falls under our entry-level licensing tier. Please contact us with details of your platform and product range to discuss the most appropriate arrangement." },
      { q:"How does NILA™ protect its Cultural IP?",
        a:"Each NILA™ collection is supported by documented cultural research, creative process records, and copyright registration. Our watermarked preview images are not for reproduction — all commercial use requires a valid license agreement." },
    ];
    return (
      <div style={{ paddingTop:60, background:"#fff", minHeight:"100vh" }}>
        <div style={{ padding:"clamp(64px,10vw,100px) clamp(24px,6vw,80px)" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontSize:9, color:T.gold, letterSpacing:5, textTransform:"uppercase",
              marginBottom:16, fontFamily:"'Inter',system-ui,sans-serif" }}>Common Questions</div>
            <div style={{ fontSize:"clamp(28px,3.5vw,50px)", fontWeight:300, color:T.indigo,
              lineHeight:1.1, marginBottom:16, fontFamily:"Georgia,serif" }}>
              Licensing <em style={{ fontStyle:"italic" }}>FAQ</em>
            </div>
            <div style={{ width:44, height:1, background:T.gold, margin:"0 auto" }} />
          </div>
          <div style={{ maxWidth:800, margin:"0 auto" }}>
            {faqs.map((f,i)=>(
              <div key={i} style={{ borderBottom:`1px solid ${T.border}` }}>
                <button onClick={()=>setOpen(open===i?null:i)} style={{
                  width:"100%", padding:"22px 0", background:"none", border:"none",
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  cursor:"pointer", gap:20, textAlign:"left" }}>
                  <span style={{ fontSize:"clamp(14px,1.5vw,17px)", color:T.indigo,
                    fontFamily:"Georgia,serif", fontWeight:400, lineHeight:1.3 }}>{f.q}</span>
                  <span style={{ color:T.gold, fontSize:20, flexShrink:0, transition:"transform 0.2s",
                    transform: open===i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                {open===i && (
                  <div style={{ paddingBottom:24 }}>
                    <div style={{ fontSize:13, color:T.mist, lineHeight:1.85,
                      fontFamily:"'Inter',system-ui,sans-serif" }}>{f.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:56 }}>
            <div style={{ fontSize:14, color:T.mist, marginBottom:20,
              fontFamily:"'Inter',system-ui,sans-serif" }}>Still have questions?</div>
            <button onClick={()=>setActiveSection("enquiry")} style={{
              padding:"12px 36px", background:T.indigo, border:"none", color:"#F7F4ED",
              fontSize:10, letterSpacing:3, textTransform:"uppercase",
              cursor:"pointer", fontFamily:"'Inter',system-ui,sans-serif" }}>
              CONTACT US →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const sections = { home:<HomeSection/>, collections:<CollectionsSection/>,
    motifs:<HeritageSection/>, licensing:<LicensingSection/>,
    about:<AboutSection/>, pricing:<PricingSection/>, faq:<FAQSection/>,
    enquiry:<EnquirySection/> };

  return (
    <div style={{ minHeight:"100vh", background:T.white,
      fontFamily:"'Inter',system-ui,sans-serif", fontSize:T.base, color:T.ink }}>
      <style>{`
        @media (max-width: 768px) {
          .nila-hero-split { flex-direction: column !important; }
          .nila-hero-left  { width: 100% !important; padding: 48px 24px 32px !important; text-align: center; align-items: center; }
          .nila-hero-right { display: none !important; }
          .nila-hero-left > div:last-child { justify-content: center !important; }
        }
        @media (max-width: 900px) {
          .nila-hero-right { padding: 24px 16px 40px !important; }
        }
      `}</style>
      <NavBar />
      {sections[activeSection]||<HomeSection/>}
      <Footer />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// APP ROOT — routes between Client and Admin
// ════════════════════════════════════════════════════════════
export default function App() {
  const [active, setActive]   = useState("dashboard");
  const [mvpMode, setMvpMode] = useState(false);
  const [mode, setMode]       = useState("splash"); // splash | client | admin
  const ActiveModule = MODULE_MAP[active] || Dashboard;

  if (mode === "splash") {
    return <SplashScreen onEnter={(isAdmin) => setMode(isAdmin?"admin":"client")} />;
  }

  if (mode === "client") {
    return (
      <div style={{ position:"relative" }}>
        <ClientView />
        <MusicPlayer />
      </div>
    );
  }

  // Admin mode — full NILA OS
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:T.ground,
      fontFamily:"'Inter',system-ui,-apple-system,BlinkMacSystemFont,sans-serif",
      fontSize:T.base, color:T.ink }}>
      <Sidebar active={active} setActive={setActive} mvpMode={mvpMode} setMvpMode={setMvpMode} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <Topbar active={active} mvpMode={mvpMode} />
        <ExportBar />
        <main style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
          <ActiveModule navigate={setActive} />
        </main>
        <MusicPlayer />
      </div>
    </div>
  );
}

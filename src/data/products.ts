import lavida from "@/assets/orbit/products/lavida.jpg";
import emactin from "@/assets/orbit/products/emactin.jpg";
import blossom from "@/assets/orbit/products/blossom.jpg";

// Public filenames are case-sensitive; keep these paths identical to the uploaded files.
const productPhotos = {
  alphaCymba: "/products/alpha-cymba.png",
  ballista: "/products/ballista.png",
  blazer: "/products/blazer.png",
  chordata: "/products/chordata.png",
  devisulphur: "/products/devisulphur.png",
  efosite: "/products/efosite.png",
  orbitHymatic: "/products/orbit-hymatic.png",
  orbitJacto: "/products/orbit-jacto.png",
  sprayers: "/products/knapsack-sprayers.jpg",
  penncozeb: "/products/Penncozeb.png",
  mosthane: "/products/Mosthane.png",
  zyban: "/products/Zyban.png",
  sherrif: "/products/Sherrif.png",
  samurai: "/products/Samurai.png",
  halothrin: "/products/Halothrin.png",
  robust: "/products/Robust.png",
  rajput: "/products/Rajput.png",
  expel: "/products/Expel.png",
  vagan: "/products/Vagan.png",
  pronto: "/products/Pronto.png",
  glyweed: "/products/Glyweed.png",
  eradika: "/products/Eradika.png",
  humigold: "/products/Humigold.png",
  morgro: "/products/Morgro.png",
  veljiRoot: "/products/velji-root-energizer.png",
  veljiLeaf: "/products/velji-leaf-energizer.png",
  veljiFruitFlower: "/products/velji-fruit-flower-energizer.png",
  veljiTriple19: "/products/velji-triple-19.png",
};

export type Product = {
  slug: string;
  name: string;
  image?: string;
  activeIngredient?: string;
  classification?: string;
  description?: string;
  targets?: string[];
  preHarvest?: string;
  applicationRate?: string;
  modeOfAction?: string;
  benefits?: string[];
};

export type Family = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  products: Product[];
};

export type ProductFamilySlug = Family["slug"];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const p = (name: string, rest: Omit<Product, "slug" | "name"> = {}): Product => ({
  slug: slugify(name),
  name,
  ...rest,
});

export const families: Family[] = [
  {
    slug: "fungicides",
    title: "Fungicides",
    tagline: "Broad-spectrum protection against blights, rusts, mildews and leaf spots.",
    intro:
      "Preventive, contact and systemic fungicides formulated for vegetables, field crops, fruits and flowers — engineered to stop disease before it takes hold and to cure active infection.",
    products: [
      p("Penncozeb 80% WP", {
        image: productPhotos.penncozeb,
        activeIngredient: "Mancozeb 800 g/kg",
        classification: "Dithiocarbamate",
        description:
          "High quality preventive fungicide with broad spectrum for the control of fungal diseases in various crops like vegetables, field crops, fruits and flowers/ornamentals.",
        targets: ["Late blight", "Early blight", "Anthracnose", "Powdery mildew", "Leafspot", "Damping off"],
        preHarvest: "7 days in vegetables",
        applicationRate: "50 g / 20 L  ·  2 kg / Ha",
        modeOfAction:
          "Contact fungicide with protective action, applied prior to disease set. Non-specific thiol reactant that inhibits respiration in the fungus.",
        benefits: ["Broad spectrum fungicide", "No known resistance", "High level of control before disease pressure"],
      }),
      p("Devisulphur 80WP", {
        image: productPhotos.devisulphur,
        activeIngredient: "Sulphur 800 g/kg",
        classification: "Multi-site inorganic",
        description:
          "A premium sulphur fungicide and miticide with preventative action — a micronized wettable formulation designed to deliver superior disease and mite control.",
        targets: ["Rust", "Angular leaf spot", "Anthracnose", "Powdery mildew", "Mites"],
        preHarvest: "0 days open field · 3 days greenhouse",
        applicationRate: "50 g / 20 L  ·  2 kg / Ha",
        modeOfAction:
          "Thiol reactant that forms a protective barrier on the leaf surface and acts as a stomach toxin on mites.",
        benefits: ["Excellent surface coverage", "Low phytotoxicity risk", "Easy to mix and spray", "Suspends easily in the tank"],
      }),
      p("Mosthane", {
        image: productPhotos.mosthane,
        activeIngredient: "Mancozeb 800 g/kg",
        classification: "Dithiocarbamate",
        description:
          "Cost effective fungicide with a wide spectrum of fungal disease control in various crops — vegetables, field crops and fruits.",
        targets: ["Late blight", "Early blight", "Anthracnose", "Powdery mildew", "Leafspot", "Damping off"],
        preHarvest: "7 days",
        applicationRate: "50 g / 20 L  ·  2 kg / Ha",
        modeOfAction: "Protectant contact fungicide with redistribution on the leaf surface.",
        benefits: ["Effective against a large variety of fungi", "Protectant with redistribution", "No known resistance"],
      }),
      p("Zyban 500SC", {
        image: productPhotos.zyban,
        activeIngredient: "Carbendazim 500 g/L",
        classification: "Benzimidazole",
        description: "Systemic fungicide with protective and curative action on disease.",
        targets: [
          "Powdery mildew",
          "Botrytis",
          "Leafspot",
          "Anthracnose",
          "Root rot",
          "Rice blast",
          "Sheath blight",
          "Rust",
          "Fusarium wilt",
        ],
        applicationRate: "15–20 ml / 20 L  ·  0.75–1.0 L / Ha",
        modeOfAction: "Readily absorbed by the plant and translocated, giving protective and curative activity.",
        benefits: ["Readily absorbed", "Excellent protective and curative activity"],
      }),
      p("Sherrif 75WP", {
        image: productPhotos.sherrif,
        activeIngredient: "Carbendazim 120 g/kg + Mancozeb 630 g/kg",
        classification: "Benzimidazole + Dithiocarbamate",
        description:
          "Broad spectrum systemic and contact fungicide for the cure and protection of a profitable vegetable and ornamental/flower crop.",
        targets: [
          "Rice blast",
          "Damping off",
          "Bean rust",
          "Anthracnose",
          "Angular leafspot",
          "Fusarium wilt",
          "Root rot",
          "Blights",
        ],
        applicationRate: "20–25 g / 20 L  ·  1.0–1.25 kg / Ha",
        modeOfAction: "Dual systemic and contact activity — protects the leaf surface while moving inside the plant.",
        benefits: ["Multiple application modes", "Excellent protective and curative action", "Fast acting"],
      }),
      p("Lavida 73WDG", {
        image: lavida,
        activeIngredient: "Cymoxanil 50 g/kg + Mancozeb 680 g/kg",
        classification: "Water dispersible granules · systemic + contact",
        description:
          "Broad spectrum foliar fungicide with systemic and contact action, curative and preventive, for potatoes, tomatoes, grapes, cucurbits, onions, chives, garlic and roses.",
        targets: ["Late blight", "Downy mildew", "Early blight", "Damping off"],
        preHarvest: "10 days",
        applicationRate: "30 g / 20 L  ·  1.5 kg / Ha",
        modeOfAction: "Cymoxanil moves systemically for curative action while mancozeb protects the leaf surface.",
        benefits: ["Fast disintegration", "Uniform dispersion", "High suspension rate", "No known resistance"],
      }),
      p("Samurai", {
        image: productPhotos.samurai,
        activeIngredient: "Metalaxyl 80 g/kg + Mancozeb 640 g/kg",
        classification: "Systemic + contact wettable powder",
        description: "Systemic and contact broad spectrum fungicide with both protective and curative action.",
        targets: ["Early blight", "Late blight", "Downy mildew", "Damping off"],
        applicationRate: "50 g / 20 L  ·  2.0 kg / Ha",
        modeOfAction: "Metalaxyl is absorbed and translocated; mancozeb gives multisite contact protection.",
        benefits: ["Rainfast", "Excellent protective and curative action", "Low resistance risk (multisite)"],
      }),
      p("Efosite", {
        image: productPhotos.efosite,
        activeIngredient: "Fosetyl-aluminium 800 g/kg",
        classification: "Fungicide",
        description: "Systemic fungicide with curative and preventive control.",
        targets: [
          "Downy mildew (cucumber, onion, lettuce, cucurbits, rose, snowpea, squash)",
          "Sheath blight and rice blast (rice)",
          "Canker (citrus, banana)",
          "Ringspot (carnation)",
          "Purple blotch and rust (onion)",
        ],
        applicationRate: "60 g / 20 L  ·  3 kg / 1000 L / Ha",
      }),
      p("Valiant", {
        classification: "Fungicide",
        description: "See the current product label for verified active ingredient, approved crops, rates and pre-harvest interval.",
      }),
    ],
  },
  {
    slug: "insecticides",
    title: "Insecticides & Miticides",
    tagline: "Targeted insect control at every crop growth stage.",
    intro:
      "Fast knock-down and long-residual insecticides for aphids, thrips, whiteflies, caterpillars, bollworms, borers, armyworms and mites.",
    products: [
      p("Alpha Cymba 10EC", {
        image: productPhotos.alphaCymba,
        activeIngredient: "Alpha cypermethrin 100g/L",
        classification: "Pyrethroid",
        description: "Broad spectrum, low dose acting insecticide with rapid knock-down action and high mortality.",
        targets: ["Aphids", "Cutworms", "Thrips", "Whiteflies", "Caterpillars", "Borers", "Leaf miners"],
        preHarvest: "1–3 days in vegetables",
        applicationRate: "5 ml / 20 L  ·  250 ml / Ha",
        modeOfAction:
          "Non-systemic insecticide with contact and stomach action, acting on the central and peripheral nervous system at very low doses.",
        benefits: [
          "Suitable for IPM programs",
          "Compatible with most fungicides and fertilizers",
          "Fast acting knock-down",
          "Low product residues on crops",
        ],
      }),
      p("Halothrin 2.5EC", {
        image: productPhotos.halothrin,
        activeIngredient: "Lambda-Cyhalothrin 25 g/L",
        classification: "Pyrethroid",
        description: "Fast and rapid knock-down insecticide with long residual activity and a short pre-harvest interval.",
        targets: [
          "Whiteflies",
          "Thrips",
          "Aphids",
          "Caterpillars",
          "Bollworms",
          "Cutworms",
          "Leaf miners",
          "Diamond back moth",
        ],
        preHarvest: "3 days",
        applicationRate: "15 ml / 20 L  ·  750 ml / Ha",
        modeOfAction: "Contact and stomach action on the insect nervous system, with repellent and anti-feeding effect.",
        benefits: ["Fast acting", "Anti-feeding and repellent action", "Reduces virus transmission", "Broad spectrum"],
      }),
      p("Robust 48EC", {
        image: productPhotos.robust,
        activeIngredient: "Chlorpyrifos 480 g/L",
        classification: "Organophosphate",
        description: "Broad spectrum non-systemic insecticide with wide crop and pest usage.",
        targets: [
          "Thrips",
          "Aphids",
          "Whiteflies",
          "Scales",
          "Cutworms",
          "Armyworms",
          "Bollworms",
          "Mealy bugs",
          "Ants",
          "Termites",
          "Antestia bugs",
        ],
        preHarvest: "14 days · re-entry 24 hours",
        applicationRate: "30–40 ml / 20 L  ·  1.5–2.0 L / Ha",
        modeOfAction: "Triple action — vapour, contact and stomach activity as a cholinesterase inhibitor.",
        benefits: ["Short environmental persistence", "Flexible delivery options", "Triple action control"],
      }),
      p("Rajput 40EC", {
        image: productPhotos.rajput,
        activeIngredient: "Abamectin 10 g/L + Acetamiprid 30 g/L",
        classification: "Avermectin + Neonicotinoid",
        description: "Broad spectrum acaricide and insecticide for vegetables and flowers.",
        targets: ["Thrips", "Aphids", "Whiteflies", "Spidermites", "Leafminer (Tuta absoluta)", "Squash beetles"],
        applicationRate: "10 ml / 20 L  ·  500 ml / Ha",
        modeOfAction:
          "Acetamiprid acts systemically while abamectin works by contact and ingestion — both interfere with the insect nervous system.",
        benefits: ["Broad spectrum", "Long residual activity", "Efficacy at low dose", "Translaminar movement"],
      }),
      p("Chordata 120 EC", {
        image: productPhotos.chordata,
        activeIngredient: "Abamectin 20g/l + Pyridaben 100g/l",
        classification: "Avermectin + Pyridazinone",
        description: "Non-systemic insecticide and miticide for mite control in vegetables and ornamentals.",
        targets: ["Spidermites", "Thrips", "Aphids", "Whiteflies", "Leafminer (Tuta absoluta)"],
        applicationRate: "10 ml / 20 L  ·  375 ml / Ha",
        modeOfAction:
          "Abamectin paralyses pests through nerve inhibition while pyridaben targets larval and nymph stages. Re-apply after 7–10 days.",
        benefits: ["Rapid knockdown with long residual", "Effective at low rates"],
      }),
      p("Em-actin 57SC", {
        image: emactin,
        activeIngredient: "Emamectin benzoate 57 g/L",
        classification: "Avermectin · suspension concentrate",
        description: "Broad spectrum contact and systemic insecticide and miticide.",
        targets: [
          "Stem borers",
          "Leafminers (Tuta absoluta)",
          "Diamond back moth",
          "Caterpillars",
          "Fall armyworms",
          "False codling moth",
          "Thrips",
          "Spidermites",
        ],
        applicationRate: "5 ml / 20 L (vegetables, cereals, ornamentals) · 3.6 ml / 15 L (rice)",
        benefits: ["Pack sizes 50 ml, 100 ml, 250 ml, 500 ml and 1 L"],
      }),
      p("Blazer", {
        image: productPhotos.blazer,
        activeIngredient: "Lambda cyhalothrin 95g/L + Thiamethoxam 126g/L",
        classification: "Synthetic pyrethroid + neonicotinoid",
        description: "Broad spectrum insecticide for a wide range of pests and crops.",
        targets: ["Fall armyworms", "Thrips", "Whiteflies", "Leafminers", "Mealybugs", "Aphids", "Caterpillars"],
        preHarvest: "3 days · re-entry 12 hours",
        applicationRate: "6 ml / 20 L  ·  150 ml / 500 L / Ha",
        modeOfAction:
          "Lambda-cyhalothrin gives contact, stomach and repellent action with rapid knockdown, while thiamethoxam moves systemically to control larvae inside the plant.",
      }),
      p("Vagan 50SC", {
        image: productPhotos.vagan,
        activeIngredient: "Fipronil 50g/L",
        classification: "Insecticide",
        description: "Insecticide for termites and related pests. Follow the product label for approved use and precautions.",
        targets: ["Termites", "Thrips"],
        applicationRate: "50 ml / 20 L · 75 ml / 30 L · 2.5 L / 1000 L / Ha",
      }),
    ],
  },
  {
    slug: "public-health",
    title: "Public Health",
    tagline: "Vector and pest control for homes, institutions and public spaces.",
    intro: "Household, institutional and agroforestry insect control for crawling and flying pests and termites.",
    products: [
      p("Expel", {
        image: productPhotos.expel,
        activeIngredient: "Fipronil 30g/L",
        classification: "Public Health",
        description:
          "Public health insecticide for the control of flying and crawling household insects like cockroaches, bedbugs, house flies and ants.",
        targets: ["Cockroaches", "Bedbugs", "House flies", "Ants"],
        applicationRate: "50 ml per 1 L of water",
      }),
    ],
  },
  {
    slug: "bio-stimulants",
    title: "Biostimulants",
    tagline: "Bio-active compounds that unlock yield potential and stress resilience.",
    intro:
      "Plant growth promoters and amino-acid based biostimulants that drive flowering, fruit set, stress recovery and nutrient uptake.",
    products: [
      p("Blossom EC", {
        image: blossom,
        activeIngredient: "2.2% w/w aromatic nitrogen + proteins + vitamins",
        classification: "Plant growth promoter",
        description:
          "A unique combination of aromatic nitrogen, proteins and vitamins — a highly effective plant growth promoter that increases both reproductive and vegetative buds, improves plant canopy, induces profuse flowering, promotes high conversion of flowers to fruits and reduces flower and fruit fall.",
        targets: [
          "Tomatoes",
          "Coffee",
          "Rice",
          "Flowers",
          "Chilli / hoho",
          "Seedlings",
          "Cuttings",
          "Wheat",
          "Melons",
          "Fruit trees",
          "Squash",
          "Cucumbers",
        ],
        applicationRate: "2–3 L / Ha  ·  2–3 ml / L of water",
        benefits: [
          "Enhances vegetative growth",
          "Increases nutrient uptake and use efficiency",
          "Induces profuse flowering",
          "Reduces flower and fruit shedding",
          "Increases total harvestable yield",
          "Compatible with pesticides",
        ],
      }),
      p("Pronto", {
        image: productPhotos.pronto,
        activeIngredient: "Amino acid complex with nutritional complement",
        classification: "Amino acid based bio stimulant",
        description:
          "Amino acid biostimulant that combines a nutritional complement with a complex of amino acids that enables cell formation and enhances metabolism in plants. Pronto revitalizes plants under stress, maintains and improves pesticide efficacy and improves growth, flowering and yield.",
        targets: [
          "Vegetables",
          "Flowers",
          "Coffee",
          "Fruit trees",
          "Pineapples",
          "Potatoes",
          "Maize",
          "Cereals",
          "Turf grass",
          "Cotton",
          "Ornamentals",
        ],
        applicationRate: "20 ml / 20 L  ·  1 L / Ha",
        modeOfAction: "Penetrates through the stomata and can be used at all crop stages.",
        benefits: [
          "Improves tolerance to drought, frost and insect stress",
          "Better pollination",
          "Less flower and fruit drop",
          "Improved fertilizer absorption",
          "Enhanced photosynthesis and chlorophyll formation",
        ],
      }),
    ],
  },
  {
    slug: "herbicides",
    title: "Herbicides",
    tagline: "Non-selective, systemic weed control engineered for minimum crop stress.",
    intro: "Systemic post-emergence herbicides for grasses, sedges and broad-leaved weeds — including zero-tillage programs.",
    products: [
      p("Glyweed", {
        image: productPhotos.glyweed,
        activeIngredient: "Glyphosate 360 g/L",
        classification: "Glycine derivative",
        description:
          "A systemic, non-selective herbicide for the control of grasses, sedges and broad leaved weeds. Depending on the crop, Glyweed can be used pre-plant or post-plant, and is an important tool in zero-tillage farming.",
        applicationRate: "135 ml / 20 L  ·  approx. 2 L / Ha",
        modeOfAction:
          "Rapidly absorbed through foliage and green stems then translocated to roots, rhizomes, tubers and stolons, inhibiting biosynthesis of essential amino acids.",
        benefits: ["Inactivated on contact with soil", "Rapid translocation to roots and rhizomes", "Broad spectrum activity"],
      }),
      p("Eradika", {
        image: productPhotos.eradika,
        activeIngredient: "Glyphosate 410 g/L",
        classification: "Glycine derivative",
        description: "A non-selective systemic post-emergence herbicide for the control of weeds in non-cropped areas.",
        applicationRate: "200 ml / 20 L  ·  2 L / Ha",
      }),
      p("Ballista", {
        image: productPhotos.ballista,
        activeIngredient: "Glufosinate ammonium 200g/L",
        classification: "Herbicide",
      }),
    ],
  },
  {
    slug: "fertilizers",
    title: "Fertilizers",
    tagline: "Foliar and 100% water-soluble nutrient blends tuned to every growth stage.",
    intro:
      "Foliar fertilizers and fully water-soluble blends delivering macro-nutrients, chelated trace elements and amino acids.",
    products: [
      p("Morgro", {
        image: productPhotos.morgro,
        activeIngredient: "N.P.K. 14:10:8 + trace elements + amino acids",
        classification: "Multipurpose liquid foliar fertilizer",
        description:
          "A liquid foliar fertilizer and plant booster that is rapidly absorbed through the leaves and provides plants with essential nutrients — trace elements, macro nutrients and amino acids.",
        targets: ["Vegetables", "Flowers", "Coffee", "Fruit trees", "Pineapples", "Potatoes", "Maize", "Cereals"],
        applicationRate: "Vegetables 50 ml / 20 L (2.5 L/Ha) · Cereals 50 ml / 20 L (2.5 L/Ha) · Fruit trees 80 ml / 20 L (4.0 L/Ha)",
        modeOfAction:
          "Improves the suspendability of spray liquids, reduces transplant shock and improves root and stem development and crop uniformity.",
        benefits: ["Balanced foliar nutrition", "Quick crop response under stress", "Readily absorbed", "Multi-crop use"],
      }),
      p("Velji Root Energizer", {
        image: productPhotos.veljiRoot,
        activeIngredient: "N.P.K. 12:40:15",
        classification: "Foliar fertilizer · Root Energizer",
        description: "Velji Root Energizer supports root initiation and development.",
        applicationRate: "2–4 kg / Ha  ·  30–60 g per knapsack",
      }),
      p("Velji Leaf Energizer", {
        image: productPhotos.veljiLeaf,
        activeIngredient: "N.P.K. 27:11:9",
        classification: "Foliar fertilizer · Leaf Energizer",
        description: "High-nitrogen Velji foliar fertilizer for vegetative growth.",
        applicationRate: "2–4 kg / Ha  ·  30–60 g per knapsack",
      }),
      p("Velji Fruit & Flower Energizer", {
        image: productPhotos.veljiFruitFlower,
        activeIngredient: "N.P.K. 15:5:35",
        classification: "Foliar fertilizer · Fruit & Flower Energizer",
        description: "Velji foliar fertilizer for flowering, fruiting, even ripening, fruit size and colour.",
        applicationRate: "2–4 kg / Ha  ·  30–60 g per knapsack",
      }),
      p("Velji Energizer Triple 19", {
        image: productPhotos.veljiTriple19,
        activeIngredient: "N.P.K. 19:19:19",
        classification: "Foliar fertilizer · Triple 19",
        description: "Balanced Velji foliar fertilizer for crop growth at any stage.",
        applicationRate: "2–4 kg / Ha  ·  30–60 g per knapsack",
      }),
    ],
  },
  {
    slug: "soil-conditioners",
    title: "Soil Conditioners",
    tagline: "Restorative formulations that rebuild soil structure and biology.",
    intro: "Humic and fulvic acid based conditioners that improve nutrient availability, soil structure and root development.",
    products: [
      p("Humigold", {
        image: productPhotos.humigold,
        activeIngredient: "Humic acid / fulvic acid",
        classification: "Bio-organic humic granules",
        description: "Bio-organic humic granules that mix and blend well with fertilizer or manure for a rich humic based soil.",
        targets: ["Horticulture crops", "Cereals", "Field crops", "Lawns", "Flowers", "Kitchen gardens"],
        applicationRate: "Fertilizer blend 1–2 kg per 50 kg bag of D.A.P, T.S.P, M.A.P, C.A.N etc.",
        benefits: [
          "Buffers excessive/toxic elements in the soil",
          "Reduces nutrient lock-up",
          "Promotes root development",
          "Improves soil structure",
        ],
      }),
    ],
  },
  {
    slug: "knapsack-sprayers",
    title: "Knapsack Sprayers",
    tagline: "Durable, precision-engineered sprayers for accurate field application.",
    intro: "High-pressure knapsack sprayers built to withstand day-to-day farm operations.",
    products: [
      p("Orbit Hymatic Knapsack Sprayer", {
        image: productPhotos.orbitHymatic,
        classification: "Application equipment",
        description:
          "External brass pressure chamber, high-pressure piston pump and UV-resistant HDPE tank.",
        benefits: ["External brass pressure chamber", "High-pressure piston pump", "UV-resistant HDPE tank"],
      }),
      p("Orbit Jacto Knapsack Sprayer", {
        image: productPhotos.orbitJacto,
        classification: "Application equipment",
        description: "Knapsack sprayer with an internal pump mechanism, mechanical agitator and ergonomic straps.",
        benefits: [
          "Internal pump mechanism",
          "Mechanical agitator",
          "Ergonomic straps",
        ],
      }),
    ],
  },
];

export const getFamily = (slug: string) => families.find((f) => f.slug === slug);

export const pendingProducts: Product[] = [
  p("Esteem", {
    description: "Category confirmation pending. Verified product details are required before assigning a product family.",
  }),
  p("Headlines", {
    description: "Category confirmation pending. Verified product details are required before assigning a product family.",
  }),
];

export const allProducts = families.flatMap((f) =>
  f.products.map((prod) => ({ ...prod, family: f.title, familySlug: f.slug })),
);

export interface TileGuide {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  topicLabel: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  readingTime: string;
  publishedDate?: string; // intentionally omitted or left undefined for academic clarity
  intro: string;
  sections: {
    h2: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  selectionChecklist?: {
    title: string;
    items: string[];
  };
  cta: {
    headline: string;
    text: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref?: string;
    secondaryLabel?: string;
  };
  academicDisclaimer: string;
}

export const tileGuides: TileGuide[] = [
  {
    slug: "how-to-choose-bathroom-tiles",
    title: "How to Choose Bathroom Tiles",
    seoTitle: "How to Choose Bathroom Tiles | Timeless Tiles Guide",
    description: "Learn how to choose bathroom tiles for wet areas, considering slip ratings, tile finishes, materials, wall-versus-floor applications, and maintenance.",
    topicLabel: "Bathroom Tiles",
    primaryKeyword: "bathroom tiles",
    relatedKeywords: ["bathroom floor tiles", "bathroom wall tiles", "slip rating", "matte vs glossy tiles"],
    readingTime: "5 min read",
    intro: "Selecting bathroom tiles requires balancing moisture resistance, maintenance, surface grip, and design aesthetics. Because bathrooms feature both splash-prone walls and wet floor surfaces, understanding tile finishes, slip resistance ratings, and material properties is key to designing a safe and elegant space.",
    sections: [
      {
        h2: "Understanding Wet-Area Applications and Moisture Resistance",
        paragraphs: [
          "Bathrooms are high-moisture environments where tiles are subjected to direct water contact, steam, and daily cleaning chemicals. Porcelain and ceramic tiles are the industry standard for bathroom surfaces due to their low water absorption rates.",
          "Vitreous porcelain tiles absorb less than 0.5% water by weight, making them exceptionally suited for floor surfaces, walk-in shower enclosures, and splash zones. Ceramic tiles, which are lighter and easier to cut, are frequently selected for bathroom walls, feature niches, and splashbacks."
        ]
      },
      {
        h2: "Choosing Finishes: Matte vs. Glossy in Bathrooms",
        paragraphs: [
          "Tile surface finish directly impacts both visual appeal and practical maintenance in a bathroom environment:",
          "Glossy finishes reflect light, making smaller bathrooms appear larger and brighter. They are effortless to wipe clean, which makes them ideal for shower walls and vanity splashbacks. However, polished glossy surfaces become slick when wet and are generally avoided for shower floors.",
          "Matte and textured finishes diffuse light and provide superior tactile traction. Matte tiles are the preferred choice for bathroom floors and wet-room areas, helping reduce slip hazards while hiding water spots and minor dust."
        ],
        bullets: [
          "Glossy Finish: High reflectivity, easy wall cleaning, recommended for walls and niches.",
          "Matte Finish: Low sheen, superior traction when damp, recommended for bathroom floors.",
          "Textured Finish: Enhanced grip for high-water areas, suitable for main bathroom and shower floors."
        ]
      },
      {
        h2: "Slip Ratings and Safety Standards",
        paragraphs: [
          "When selecting tiles for wet floors, slip resistance ratings provide clear guidance on surface traction under wet conditions. R-ratings (ranging from R9 to R13) measure dynamic slip resistance for shod feet, while DIN 51097 ratings (Classes A, B, and C) measure barefoot traction on wet surfaces.",
          "For standard home bathroom floors, tiles with an R10 rating or Class B barefoot slip rating offer dependable everyday grip. Walk-in shower bases benefit from textured R11 or Class C surfaces. While high slip ratings improve traction, regular cleaning remains essential to prevent soap film accumulation."
        ]
      },
      {
        h2: "Tile Size, Layout, and Maintenance Considerations",
        paragraphs: [
          "Tile dimensions shape both bathroom proportions and cleaning routines. Large format tiles (such as 600x1200mm or 800x800mm) minimize grout lines, creating a seamless visual space that reduces soap scum buildup in joints.",
          "Smaller tiles and mosaics (such as 300x300mm or subway tiles) offer increased grout line frequency, which naturally enhances traction on shower slopes. For optimal balance, many designers combine large-format porcelain floor tiles with complementary wall tiles."
        ]
      }
    ],
    selectionChecklist: {
      title: "Bathroom Tile Selection Checklist",
      items: [
        "Verify floor tiles have a matte or textured finish with appropriate wet slip traction.",
        "Choose non-porous porcelain for shower floors and high-moisture walls.",
        "Pair glossy wall tiles with matte floor tiles for balanced light and safety.",
        "Consider grout joint width and select water-resistant epoxy or modified grout.",
        "Cross-reference catalog specifications with bathroom floor and wall tags."
      ]
    },
    cta: {
      headline: "Explore Bathroom Tile Options",
      text: "Browse our dedicated bathroom catalogue or use our room recommendation tool to find products tagged for wet-area suitability.",
      primaryHref: "/tiles/bathroom-tiles",
      primaryLabel: "Browse Bathroom Catalogue",
      secondaryHref: "/recommendations?room=bathroom",
      secondaryLabel: "Try Room Recommendations"
    },
    academicDisclaimer: "Timeless Tiles is an academic demonstration platform. Specifications and tile tags reflect demo catalogue entries for educational exploration."
  },
  {
    slug: "floor-tile-size-finish-material-guide",
    title: "Floor Tiles: Size, Finish and Material Guide",
    seoTitle: "Floor Tile Size, Finish & Material Guide | Timeless Tiles",
    description: "Comprehensive guide to choosing floor tiles based on sizes (600x600, 600x1200, 800x800), finishes (matte, glossy, carved), materials, and room traffic.",
    topicLabel: "Floor Tiles",
    primaryKeyword: "floor tiles",
    relatedKeywords: ["tile sizes", "porcelain floor tiles", "matte floor tiles", "tile finishes", "tile materials"],
    readingTime: "6 min read",
    intro: "Floor tiles endure continuous foot traffic, heavy furniture, and daily wear. Selecting the right floor tile requires understanding how material density, physical dimensions, and surface finishes interact to deliver durability, safety, and architectural elegance.",
    sections: [
      {
        h2: "Tile Materials: Porcelain vs. Ceramic vs. Vitrified",
        paragraphs: [
          "The material composition of a tile determines its breaking strength, water resistance, and suitability for different floor applications across residential and commercial projects:",
          "Porcelain Tiles: Crafted from refined clays fired at high temperatures (over 1200°C), porcelain tiles are dense, heavy-duty, and highly resistant to stains and moisture. They represent the premier material choice for high-traffic living rooms, hallways, kitchens, and outdoor zones.",
          "Vitrified & Double-Charged Tiles: Vitrified tiles feature a glass-like silica matrix throughout their body, ensuring high wear resistance even under heavy foot traffic. Double-charged vitrified tiles carry a double layer of pigment, making them exceptionally durable for commercial floors.",
          "Ceramic Tiles: Lighter than porcelain, ceramic tiles are easy to install and economical. While popular for wall surfaces and low-traffic interior rooms, dense porcelain remains preferred for primary living room floors."
        ]
      },
      {
        h2: "Understanding Catalogue Tile Sizes and Layout Dynamics",
        paragraphs: [
          "Tile size influences room perception, installation complexity, and joint density. Contemporary flooring design relies heavily on standardized modular dimensions:",
          "600x600 mm (2x2 ft): The versatile classic for residential bedrooms, kitchens, and corridors. Easy to handle and maneuver during installation.",
          "600x1200 mm (2x4 ft): Elegant rectangular format ideal for open-plan living rooms and corridors. Stretches room visuals and reduces visible joints.",
          "800x800 mm & 1200x1200 mm: Large format tiles designed for expansive floors, creating a seamless marble or concrete aesthetic."
        ],
        bullets: [
          "600x600mm: Standard residential room floor tile size.",
          "600x1200mm: Modern rectangular format for spacious living rooms.",
          "800x800mm: Expansive square format for continuous floor layouts."
        ]
      },
      {
        h2: "Selecting the Right Surface Finish for Floor Surfaces",
        paragraphs: [
          "Surface texture dictates light reflection, slip safety, and cleaning routines:",
          "Matte Finish: Offers a smooth, non-reflective surface with natural slip resistance. Excellent for active family spaces, kitchens, and entryways where foot traffic is high.",
          "Glossy & Polished Finish: Delivers a high-luster, reflective surface that enhances light in formal living rooms. Requires regular dry-dusting and care in wet areas.",
          "Carved & Textured Finishes: Feature subtle tactile veining or structured surface depth, combining visual realism with enhanced tactile grip."
        ]
      },
      {
        h2: "Matching Floor Tiles to Room Traffic",
        paragraphs: [
          "High-traffic areas like entryways, open-plan living halls, and commercial reception desks demand porcelain tiles with high breaking strength and abrasion resistance.",
          "Low-traffic residential areas like guest bedrooms allow for greater flexibility in finish choice, permitting high-gloss marble-effect surfaces where foot traffic is lighter."
        ]
      }
    ],
    selectionChecklist: {
      title: "Floor Tile Buyer Checklist",
      items: [
        "Select porcelain or vitrified body material for high-traffic floor areas.",
        "Choose tile dimensions proportional to the room floor area.",
        "Verify slip performance when selecting polished or glossy floor tiles.",
        "Calculate tile quantities with an additional 8-10% allowance for cutting waste.",
        "Compare size, finish, and price options using the tile catalogue comparison tool."
      ]
    },
    cta: {
      headline: "Discover Floor Tile Collections",
      text: "Filter our complete catalogue by size, finish, colour, and material to find the ideal floor tile for your space.",
      primaryHref: "/tiles/floor-tiles",
      primaryLabel: "Browse Floor Tiles",
      secondaryHref: "/compare",
      secondaryLabel: "Compare Floor Tiles"
    },
    academicDisclaimer: "Timeless Tiles is an academic demonstration platform. Catalogue products and attributes represent mock data for evaluation."
  },
  {
    slug: "how-to-choose-tiles-for-each-room",
    title: "How to Choose Tiles for Different Rooms",
    seoTitle: "How to Choose Tiles for Each Room | Timeless Tiles Guide",
    description: "Room-by-room tile selection guide covering living rooms, bedrooms, bathrooms, kitchens, balconies, and outdoor spaces with rule-based suitabilities.",
    topicLabel: "Room Selection",
    primaryKeyword: "room-wise tile selection",
    relatedKeywords: ["living room tiles", "bedroom tiles", "kitchen backsplash tiles", "outdoor balcony tiles", "tiles by room"],
    readingTime: "5 min read",
    intro: "Every room in a residential or commercial building places unique demands on flooring and wall surfaces. From spill-prone kitchen floors to relaxing bedroom walls, matching tile specifications to specific room requirements ensures long-term performance and aesthetic harmony.",
    sections: [
      {
        h2: "Living Room: Grand Statements and High-Traffic Durability",
        paragraphs: [
          "Living rooms serve as the central gathering hub. Flooring must handle continuous foot traffic while anchoring the room's design palette.",
          "Large format porcelain tiles in 600x1200mm or 800x800mm sizes create an expansive, uninterrupted surface. Polished marble-look porcelain adds luxury, while subtle matte stone effects offer understated warm elegance."
        ]
      },
      {
        h2: "Bedrooms: Warm Comfort and Refined Finishes",
        paragraphs: [
          "Bedrooms prioritize comfort, quiet aesthetics, and ease of cleaning. Warm-toned wood-effect porcelain planks (e.g. 200x1200mm) bring the organic beauty of hardwood with the durability and maintenance ease of tile.",
          "Matte and satin finishes work exceptionally well in bedrooms, reflecting soft ambient lighting without glare."
        ]
      },
      {
        h2: "Kitchens: Grease Resistance and Easy-Clean Walls",
        paragraphs: [
          "Kitchens require dual tile strategies: durable stain-resistant floor tiles and protective wall tiles for backsplashes.",
          "Kitchen Floors: Non-porous porcelain tiles in matte finishes withstand dropped utensils, oil splatters, and heavy foot traffic.",
          "Kitchen Backsplashes: Glazed ceramic subway tiles, mosaic patterns, or polished porcelain panels shield walls from moisture and cooktop splatters while serving as a focal design element."
        ]
      },
      {
        h2: "Bathrooms, Balconies, and Outdoor Spaces",
        paragraphs: [
          "Bathrooms require matte or textured slip-rated tiles for floors, paired with easy-to-clean wall tiles.",
          "Balconies and Outdoor Patios demand weather-resistant exterior porcelain tiles with textured, non-slip surfaces to handle rain and sunlight exposure without degrading."
        ]
      },
      {
        h2: "Transparent Room Suitability Tagging",
        paragraphs: [
          "At Timeless Tiles, our room recommendations rely on transparent, rule-based catalogue attribute tags rather than hidden algorithms or AI tracking. Products are matched based on explicit room suitability tags (Living Room, Bedroom, Bathroom, Kitchen, Outdoor, Commercial) assigned to each catalogue item."
        ]
      }
    ],
    selectionChecklist: {
      title: "Room Tile Matching Quick Guide",
      items: [
        "Living Room: Large format (600x1200mm) polished or satin porcelain.",
        "Bedroom: Wood-plank or warm matte stone porcelain.",
        "Kitchen: Stain-resistant floor porcelain + glazed wall backsplash.",
        "Bathroom: Matte/textured slip-rated floor tiles + glossy wall tiles.",
        "Balcony/Outdoor: Heavy-duty textured weather-resistant porcelain."
      ]
    },
    cta: {
      headline: "Find Tiles Matched to Your Room",
      text: "Use our interactive Room Recommendation tool to instantly filter products matched by transparent catalogue tags.",
      primaryHref: "/recommendations",
      primaryLabel: "Use Room Recommendation Tool",
      secondaryHref: "/tiles",
      secondaryLabel: "Browse All Categories"
    },
    academicDisclaimer: "Timeless Tiles is an academic demo project. Room matching recommendations are based on pre-defined catalogue attribute tags."
  },
  {
    slug: "tiles-near-me-guide",
    title: "What to Look for When Searching 'Tiles Near Me'",
    seoTitle: "Tiles Near Me: What to Look For | Timeless Tiles Guide",
    description: "Guide on evaluating local tile showrooms, specs, pricing transparency, sample access, and directions when searching for tiles near your location.",
    topicLabel: "Local Discovery",
    primaryKeyword: "tiles near me",
    relatedKeywords: ["tile showroom near me", "tile store finder", "local tile supplier", "tile sample display"],
    readingTime: "5 min read",
    intro: "Searching for 'tiles near me' is often the first step when starting a renovation or construction project. However, finding the right tile partner involves evaluating far more than just geographic proximity. Physical store access, technical documentation transparency, sample availability, and clear pricing are essential factors.",
    sections: [
      {
        h2: "Key Criteria for Evaluating Local Tile Stores and Showrooms",
        paragraphs: [
          "When exploring local tile suppliers or tile showrooms near you, consider the following evaluation criteria to ensure a smooth project experience:",
          "1. Catalogue Breadth & Display Clarity: A well-organized showroom presents full-size tile slabs, panel displays, and tactile samples, allowing you to evaluate true color depth and finish textures under direct lighting.",
          "2. Transparent Technical Specifications: Professional suppliers provide clear specification sheets covering material composition, thickness, slip ratings, water absorption, and recommended applications.",
          "3. Price Visibility & Stock Information: Reputable showrooms clearly display prices per square foot or square meter alongside stock availability, enabling accurate budget planning."
        ]
      },
      {
        h2: "Digital Tools Supporting Nearby Tile Discovery",
        paragraphs: [
          "Modern digital tile platforms bridge online research with offline showroom visits. Key digital features to look for include:",
          "Location & Store Finders: Quick access to showroom addresses, operating hours, phone numbers, and direct map navigation.",
          "Online Quote Enquiries: The ability to save tile selections online and submit formal price enquiries before traveling to a store location.",
          "Comparison Tools: Side-by-side comparison of tile sizes, finishes, and prices to narrow down options prior to physical sample inspection."
        ]
      },
      {
        h2: "Understanding Timeless Tiles Fictional Store Locations",
        paragraphs: [
          "Please note that Timeless Tiles is a student academic demonstration project. Our Store Finder features fictional demo store locations created exclusively to demonstrate how a contemporary tile brand integrates digital store-finding functionality.",
          "While our online catalogue, product filter engines, room recommendations, and store finder interface mimic an enterprise digital platform, Timeless Tiles does not operate real commercial showrooms or physical retail stores."
        ]
      }
    ],
    selectionChecklist: {
      title: "Nearby Store Evaluation Checklist",
      items: [
        "Check showroom operating hours and exact directions before visiting.",
        "Confirm whether tile samples are available for home lighting testing.",
        "Verify price transparency and stock lead times for bulk orders.",
        "Check technical spec sheets for slip ratings and thickness.",
        "Use digital store finders to compare nearby showroom offerings."
      ]
    },
    cta: {
      headline: "Explore Our Demo Store Finder",
      text: "Test how digital store discovery functions within the Timeless Tiles academic demonstration platform.",
      primaryHref: "/stores",
      primaryLabel: "Launch Store Finder",
      secondaryHref: "/contact",
      secondaryLabel: "Submit Product Enquiry"
    },
    academicDisclaimer: "Timeless Tiles is an academic demonstration platform. Store listings and locations are fictional demonstration entries."
  },
  {
    slug: "how-to-choose-a-tile-company",
    title: "How to Choose the Best Tile Company for Your Project",
    seoTitle: "How to Choose a Tile Company | Timeless Tiles Guide",
    description: "Objective evaluation criteria for selecting a tile manufacturer or supplier based on range breadth, spec transparency, customer service, and reviews.",
    topicLabel: "Company Selection",
    primaryKeyword: "best tiles company",
    relatedKeywords: ["choose tile manufacturer", "tile supplier evaluation", "tile quality standards", "tile reviews"],
    readingTime: "5 min read",
    intro: "Finding the 'best tile company' for your residential or commercial project is not about finding a single universal brand label—it is about choosing a supplier whose product range, technical transparency, pricing structure, and support services align with your specific project requirements.",
    sections: [
      {
        h2: "Objective Criteria for Evaluating Tile Manufacturers and Suppliers",
        paragraphs: [
          "Instead of relying on unsubstantiated claims or promotional ratings, home builders, architects, and interior designers evaluate tile companies using concrete operational criteria:",
          "1. Range Breadth & Design Variety: Top tile suppliers maintain versatile collections across floor, wall, bathroom, kitchen, and outdoor categories, offering ceramic, porcelain, and vitrified materials.",
          "2. Specification Transparency: Reliable companies publish exact product dimensions, thickness, breaking strength, water absorption rates, and slip ratings, enabling accurate engineering decisions.",
          "3. Price Transparency & Budget Flexibility: Clear pricing structures across standard, premium, and promotional ranges allow buyers to manage project costs effectively without hidden charges."
        ]
      },
      {
        h2: "Customer Service, Sample Access, and Enquiry Support",
        paragraphs: [
          "In addition to product quality, customer support services significantly impact project execution:",
          "Sample Delivery & Showroom Access: Being able to inspect physical tile samples under actual project lighting prevents color mismatch.",
          "Dedicated Project Consultation: Expert guidance on technical tile selection, quantity estimation, grout compatibility, and tile layout advice.",
          "Verified Reviews & Reputation: Authentic customer feedback regarding delivery timelines, packing safety, and product consistency."
        ]
      },
      {
        h2: "Evaluating 'Best' Based on Your Specific Needs",
        paragraphs: [
          "Ultimately, the 'best' tile company depends on your project context. A residential homeowner renovating a compact bathroom values slip safety and stylish backsplashes. A commercial developer building a hotel hall prioritizes high breaking strength, high-wear vitrified flooring, and bulk supply capacity.",
          "By comparing technical specifications, physical samples, and customer reviews, you can confidently select the right tile provider for your exact needs."
        ]
      },
      {
        h2: "Academic Project Context Notice",
        paragraphs: [
          "Timeless Tiles provides this informational guide to help users understand objective evaluation principles in the tile industry. Timeless Tiles is an academic demonstration project and does not claim to be a real commercial business, commercial manufacturer, or industry leader."
        ]
      }
    ],
    selectionChecklist: {
      title: "Tile Supplier Evaluation Checklist",
      items: [
        "Verify product specification sheets for ISO / technical standard compliance.",
        "Check range breadth across floor, wall, and specialized wet-area categories.",
        "Evaluate price clarity and quote responsiveness.",
        "Inspect customer reviews and feedback regarding supply reliability.",
        "Confirm availability of physical samples and technical guidance."
      ]
    },
    cta: {
      headline: "Explore Timeless Tiles Demo Platform",
      text: "Experience our digital catalogue, compare tile specifications, and test demo quote submission.",
      primaryHref: "/tiles",
      primaryLabel: "Browse Digital Catalogue",
      secondaryHref: "/about",
      secondaryLabel: "About Academic Project"
    },
    academicDisclaimer: "Timeless Tiles is a fictional academic demo brand created for digital platform design evaluation. No commercial claims are made."
  }
];

export function getTileGuide(slug: string): TileGuide | undefined {
  return tileGuides.find((guide) => guide.slug === slug);
}

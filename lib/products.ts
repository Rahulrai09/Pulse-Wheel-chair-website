export interface ProductFeature {
  label: string;
  iconKey: "joystick" | "shield" | "fold" | "heart" | "feather" | "battery" | "wheels" | "cushion" | "speed" | "hand" | "suitcase";
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  image: string;
  price: string;
  category?: string;
  features: ProductFeature[];
  specifications?: Record<string, string>;
}

export const products: Product[] = [
  {
    slug: "innovax",
    name: "Pulse Comfort Electric Wheelchair",
    description:
      "Model 6016A electric wheelchair with innovative design for enhanced comfort.",
    image: "/products/innovax-01.webp",
    price: "₹58,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "joystick", label: "360° Joystick" },
      { iconKey: "shield", label: "Shock Absorb" },
      { iconKey: "fold", label: "Foldable Frame" },
      { iconKey: "heart", label: "Extra Comfort" },
    ],
    specifications: {
      "Model Name": "Pulse Innovax (Model 6016A)",
      "Frame Material": "Lightweight Aluminum Alloy",
      "Motor": "Brushed Motor 250W x 2",
      "Battery": "Lithium-ion 24V 12Ah",
      "Driving Range": "15 – 20 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "120 – 150 kg",
      "Net Weight": "29 kg",
      "Brake System": "Electromagnetic Brake",
    },
  },
  {
    slug: "joylite-1",
    name: "Pulse Lightweight Carbon Fiber Wheelchair",
    description:
      "Ultra-lightweight electric wheelchair, foldable frame, extended battery.",
    image: "/products/joylite-1-01.webp",
    price: "₹68,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "feather", label: "21kg Light" },
      { iconKey: "fold", label: "Foldable" },
      { iconKey: "battery", label: "Long Battery" },
      { iconKey: "wheels", label: "Dual Motors" },
    ],
    specifications: {
      "Model Name": "Pulse Joylite 1 (Model 9005)",
      "Frame Material": "Ultra-light Aluminum Alloy",
      "Motor": "Brushless Dual Motor 250W x 2",
      "Battery": "Lithium-ion 24V 10Ah",
      "Driving Range": "15 – 20 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "120 – 150 kg",
      "Net Weight": "21 kg",
      "Brake System": "Electromagnetic Brake",
    },
  },
  {
    slug: "joylite-2",
    name: "Pulse Prime Electric Wheelchair",
    description:
      "Upgraded battery capacity, improved seat comfort, intuitive joystick.",
    image: "/products/joylite-2-01.webp",
    price: "₹55,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "battery", label: "Plus Battery" },
      { iconKey: "cushion", label: "Plush Seat" },
      { iconKey: "joystick", label: "Smart Control" },
      { iconKey: "shield", label: "Safe Brakes" },
    ],
    specifications: {
      "Model Name": "Pulse Joylite 2 (Model 9006)",
      "Frame Material": "Aluminum Alloy",
      "Motor": "Dual Brushed Motor 250W",
      "Battery": "Extended Lithium-ion 24V 12Ah",
      "Driving Range": "18 – 22 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "130 kg",
      "Net Weight": "24 kg",
      "Brake System": "Electromagnetic Safety Brakes",
    },
  },
  {
    slug: "aerodrive-1",
    name: "Pulse Power Electric Wheelchair",
    description:
      "Lightweight aluminium frame, dual motors, smart joystick.",
    image: "/products/aerodrive-1-01.webp",
    price: "₹61,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "feather", label: "Alloy Frame" },
      { iconKey: "wheels", label: "Dual 250W" },
      { iconKey: "joystick", label: "Smart Control" },
      { iconKey: "shield", label: "Electro Brake" },
    ],
    specifications: {
      "Model Name": "Pulse Aerodrive 1 (Model 6019)",
      "Frame Material": "Aircraft Aluminum Alloy",
      "Motor": "Dual 250W Motors",
      "Battery": "Lithium-ion 24V 12Ah",
      "Driving Range": "15 – 20 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "120 – 150 kg",
      "Net Weight": "37 kg",
      "Brake System": "Electromagnetic Brake",
    },
  },
  {
    slug: "aerodrive-2",
    name: "Pulse Endurance Electric Wheelchair",
    description:
      "36kg lightweight build, 24V 10Ah battery, 15-20km range.",
    image: "/products/aerodrive-2-01.webp",
    price: "₹64,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "feather", label: "36kg Light" },
      { iconKey: "battery", label: "24V 10Ah" },
      { iconKey: "speed", label: "15-20km Range" },
      { iconKey: "fold", label: "Foldable" },
    ],
    specifications: {
      "Model Name": "Pulse Aerodrive 2",
      "Frame Material": "Lightweight Aluminum",
      "Motor": "High Efficiency Dual Motor",
      "Battery": "Lithium 24V 10Ah",
      "Driving Range": "15 – 20 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "125 kg",
      "Net Weight": "36 kg",
      "Brake System": "Automatic Electromagnetic",
    },
  },
  {
    slug: "cruza",
    name: "Pulse Comfort Reclining Wheelchair",
    description:
      "Electric recline to 160°, one-hand 360° joystick control.",
    image: "/products/cruza-01.webp",
    price: "₹74,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "joystick", label: "160° Recline" },
      { iconKey: "hand", label: "One Hand 360°" },
      { iconKey: "shield", label: "Heavy Iron" },
      { iconKey: "cushion", label: "Rest Support" },
    ],
    specifications: {
      "Model Name": "Pulse Cruza Recliner",
      "Frame Material": "Reinforced Structural Iron",
      "Motor": "Dual High Torque 250W",
      "Battery": "Lithium-ion 24V 20Ah",
      "Driving Range": "15 – 20 km",
      "Recline Angle": "Up to 160° Power Recline",
      "Max Load Capacity": "120 – 150 kg",
      "Net Weight": "47 kg",
      "Brake System": "Electromagnetic Brake System",
    },
  },
  {
    slug: "xtrion",
    name: "Pulse Rugged All-Terrain Wheelchair",
    description:
      "Heavy-duty electric wheelchair for all-terrain mobility.",
    image: "/products/xtrion-01.webp",
    price: "₹57,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "shield", label: "Heavy Duty" },
      { iconKey: "wheels", label: "All Terrain" },
      { iconKey: "speed", label: "High Torque" },
      { iconKey: "battery", label: "Long Range" },
    ],
    specifications: {
      "Model Name": "Pulse Xtrion (Model 6013A)",
      "Frame Material": "Heavy-Duty Steel Alloy",
      "Motor": "High-Torque All-Terrain Motors",
      "Battery": "24V Heavy Duty Pack",
      "Driving Range": "20 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "150 kg",
      "Net Weight": "42 kg",
      "Brake System": "Dual Electromagnetic Brakes",
    },
  },
  {
    slug: "motion-pro-1",
    name: "Pulse Long-Range Electric Wheelchair",
    description:
      "Heavy-duty foldable, long-range battery, all-terrain control.",
    image: "/products/motion-pro-1-01.webp",
    price: "₹59,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "fold", label: "Heavy Fold" },
      { iconKey: "battery", label: "Long Range" },
      { iconKey: "wheels", label: "All Terrain" },
      { iconKey: "shield", label: "Rugged Build" },
    ],
    specifications: {
      "Model Name": "Pulse Motion Pro 1 (Model 6001)",
      "Frame Material": "Foldable Alloy Frame",
      "Motor": "Dual Performance 250W",
      "Battery": "Extended Lithium Battery",
      "Driving Range": "20 – 25 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "135 kg",
      "Net Weight": "38 kg",
      "Brake System": "Automatic Safety Brakes",
    },
  },
  {
    slug: "motion-pro-2",
    name: "Pulse Heavy-Duty Foldable Wheelchair",
    description:
      "24V 20Ah battery, 15-20km range, 24-inch alloy rear wheel.",
    image: "/products/motion-pro-2-01.webp",
    price: "₹56,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "battery", label: "24V 20Ah" },
      { iconKey: "wheels", label: '24" Rear Wheel' },
      { iconKey: "speed", label: "15-20km Range" },
      { iconKey: "shield", label: "Alloy Drive" },
    ],
    specifications: {
      "Model Name": "Pulse Motion Pro 2",
      "Frame Material": "Heavy-Duty Reinforced Frame",
      "Rear Wheels": "24-Inch Aluminum Alloy Rims",
      "Battery": "Lithium-ion 24V 20Ah",
      "Driving Range": "15 – 20 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "140 kg",
      "Net Weight": "40 kg",
      "Brake System": "Electromagnetic & Hand Brake",
    },
  },
  {
    slug: "smartride-1",
    name: "Pulse Carbon Fiber Smart Wheelchair",
    description:
      "26kg carbon fiber, autofold, 24V 10Ah battery, 15-20km range.",
    image: "/products/smartride-1-01.webp",
    price: "₹62,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "feather", label: "Carbon Fiber" },
      { iconKey: "fold", label: "Autofold" },
      { iconKey: "battery", label: "24V 10Ah" },
      { iconKey: "speed", label: "15-20km Range" },
    ],
    specifications: {
      "Model Name": "Pulse Smartride 1",
      "Frame Material": "Ultra-Light Carbon Fiber",
      "Fold Mechanism": "One-Touch Automatic Power Fold",
      "Battery": "Lithium-ion 24V 10Ah",
      "Driving Range": "15 – 20 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "120 kg",
      "Net Weight": "26 kg",
      "Brake System": "Smart Electromagnetic Brakes",
    },
  },
  {
    slug: "smartride-2",
    name: "Pulse Autofold Smart Ride Wheelchair",
    description:
      "One-touch fold mechanism, travel-friendly compact design.",
    image: "/products/smartride-2-01.webp",
    price: "₹82,999",
    category: "Electric Wheelchair",
    features: [
      { iconKey: "fold", label: "One-Touch" },
      { iconKey: "suitcase", label: "Compact Travel" },
      { iconKey: "feather", label: "Lightweight" },
      { iconKey: "joystick", label: "Smart Control" },
    ],
    specifications: {
      "Model Name": "Pulse Smartride 2",
      "Frame Material": "Compact Airline-Approved Alloy",
      "Fold Mechanism": "Quick One-Touch Folding",
      "Battery": "Lithium-ion Quick Charge Pack",
      "Driving Range": "15 – 20 km",
      "Max Speed": "6 km/h",
      "Max Load Capacity": "120 kg",
      "Net Weight": "25 kg",
      "Brake System": "Electromagnetic Safety Brakes",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

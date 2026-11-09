import {
  ClipboardCheck,
  FileCheck2,
  PackageCheck,
  PackageSearch,
  SearchCheck,
  Ship,
} from "lucide-react";

export const services = [
  {
    title: "Product sourcing",
    description: "Explore products and supply options based on your requirements.",
    icon: PackageSearch,
  },
  {
    title: "Supplier identification",
    description: "Help identify potential suppliers for the product and quantity you need.",
    icon: SearchCheck,
  },
  {
    title: "Quality coordination",
    description: "Align specifications and coordinate inspection needs with trade partners.",
    icon: ClipboardCheck,
  },
  {
    title: "Export documentation",
    description: "Coordinate the documentation required for an agreed shipment.",
    icon: FileCheck2,
  },
  {
    title: "Packaging solutions",
    description: "Discuss packaging and labelling requirements with suppliers.",
    icon: PackageCheck,
  },
  {
    title: "Logistics coordination",
    description: "Coordinate shipment details and milestones with the parties involved.",
    icon: Ship,
  },
];

export const products = [
  {
    title: "Mineral Water",
    description: "Bottled water opportunities with packaging options discussed to order.",
    image: "/Images/mineral-water.jpg",
    category: "Beverages",
  },
  {
    title: "Spices & Seeds",
    description: "Explore Indian spices and seeds based on your sourcing specifications.",
    image: "/Images/spices.jpg",
    category: "Agriculture",
  },
  {
    title: "Rice & Agricultural Products",
    description: "Share your grade, packaging and quantity requirements.",
    image: "/Images/rice.jpg",
    category: "Agriculture",
  },
  {
    title: "Natural Minerals",
    description: "Discuss mineral product requirements and relevant specifications.",
    image: "/Images/natural-minerals.jpg",
    category: "Minerals",
  },
];

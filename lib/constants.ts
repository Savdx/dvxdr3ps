export const AFFILIATE_URL = "https://www.lovegobuy.com/?invite_code=SA8GJ2";

export const CATEGORIES = [
  "All",
  "Shoes",
  "Hoodies",
  "Zip-Ups",
  "T-Shirts",
  "Pants",
  "Jeans",
  "Shorts",
  "Jackets",
  "Puffers",
  "Sweaters",
  "Bags",
  "Accessories",
  "Hats",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const ADMIN_PASSWORD_CLIENT = "DvxdR3ps2024!";

export type Product = {
  id: number;
  name: string;
  category: string;
  rating: number;
  price: string;
  link: string;
  image: string;
  created_at: string;
};

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Nike Air Force 1 Low",
    category: "Shoes",
    rating: 4.8,
    price: "¥299",
    link: AFFILIATE_URL,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Stone Island Hoodie",
    category: "Hoodies",
    rating: 4.6,
    price: "¥459",
    link: AFFILIATE_URL,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Essentials FOG Crewneck",
    category: "Sweaters",
    rating: 4.7,
    price: "¥349",
    link: AFFILIATE_URL,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Carhartt WIP Jacket",
    category: "Jackets",
    rating: 4.5,
    price: "¥529",
    link: AFFILIATE_URL,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
    created_at: new Date().toISOString(),
  },
];


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'seeds' | 'fertilizers' | 'tools' | 'machinery' | 'pesticides';
  imageUrl: string;
  stock: number;
  rating: number;
  isFeatured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Tomato Seeds",
    description: "High-quality organic tomato seeds for your garden. These seeds are non-GMO and will produce delicious, juicy tomatoes.",
    price: 4.99,
    category: "seeds",
    imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stock: 50,
    rating: 4.8,
    isFeatured: true
  },
  {
    id: 2,
    name: "Eco-Friendly Garden Trowel",
    description: "A sturdy, ergonomic garden trowel made from sustainable materials. Perfect for planting seeds or transplanting small plants.",
    price: 12.99,
    category: "tools",
    imageUrl: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stock: 30,
    rating: 4.5,
    isFeatured: true
  },
  {
    id: 3,
    name: "Organic Plant Fertilizer",
    description: "All-purpose organic fertilizer that promotes healthy plant growth. Safe for all plants and vegetables.",
    price: 19.95,
    category: "fertilizers",
    imageUrl: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stock: 25,
    rating: 4.7,
    isFeatured: true
  },
  {
    id: 4,
    name: "Small Greenhouse Kit",
    description: "Compact greenhouse perfect for starting seeds or protecting young plants. Easy to assemble and maintain.",
    price: 129.99,
    category: "tools",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stock: 10,
    rating: 4.6,
    isFeatured: false
  },
  {
    id: 5,
    name: "Corn Seeds - Sweet Variety",
    description: "Premium sweet corn seeds that produce juicy, delicious corn. Great for home gardens.",
    price: 5.99,
    category: "seeds",
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stock: 40,
    rating: 4.4,
    isFeatured: false
  },
  {
    id: 6,
    name: "Natural Pest Control Spray",
    description: "Effective, chemical-free pest control that's safe for organic gardening. Protects plants from common insects.",
    price: 14.99,
    category: "pesticides",
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stock: 35,
    rating: 4.3,
    isFeatured: true
  },
  {
    id: 7,
    name: "Compact Tractor",
    description: "Reliable compact tractor ideal for small to medium farms. Fuel-efficient with multiple attachment options.",
    price: 7999.99,
    category: "machinery",
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stock: 3,
    rating: 4.9,
    isFeatured: false
  },
  {
    id: 8,
    name: "Potato Growing Kit",
    description: "Complete kit for growing potatoes including specialized container, soil mix, and seed potatoes.",
    price: 39.99,
    category: "seeds",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stock: 15,
    rating: 4.2,
    isFeatured: true
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category);
};


import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-grow flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          {product.stock < 5 && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
              Low Stock: {product.stock}
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-md font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <CardContent className="flex-grow p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-2 text-agri-green-dark">
              {product.name}
            </h3>
          </div>
          
          <div className="mb-3">
            <span className="text-sm capitalize px-2 py-1 bg-agri-beige text-agri-brown rounded-full">
              {product.category}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-2">
            {product.description}
          </p>
          
          <div className="flex items-center mt-2">
            {Array(5).fill(0).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? 'text-amber-500' 
                    : i < product.rating 
                      ? 'text-amber-500/50' 
                      : 'text-gray-300'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="w-full flex items-center justify-between">
          <span className="text-xl font-bold text-agri-green-dark">
            ${product.price.toFixed(2)}
          </span>
          <Button 
            size="sm" 
            className="bg-agri-green-dark hover:bg-agri-green-dark/90"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

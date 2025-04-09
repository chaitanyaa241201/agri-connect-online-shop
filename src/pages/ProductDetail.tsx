
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Truck, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Check,
  Star 
} from 'lucide-react';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(parseInt(id, 10)) : undefined;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
    
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="agri-container py-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="flex flex-col">
                <div className="mb-2">
                  <span className="text-sm capitalize px-2 py-1 bg-agri-beige text-agri-brown rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="text-2xl lg:text-3xl font-bold text-agri-green-dark mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300 fill-current'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating.toFixed(1)} rating
                  </span>
                </div>
                
                <span className="text-3xl font-bold text-agri-green-dark mb-4">
                  ${product.price.toFixed(2)}
                </span>
                
                <p className="text-foreground mb-6">
                  {product.description}
                </p>
                
                <div className="p-4 bg-agri-beige/50 rounded-lg mb-6">
                  <div className="flex items-center text-sm">
                    <Truck className="h-5 w-5 mr-2 text-agri-green-dark" />
                    <span>
                      <span className="font-medium">Free shipping</span> on orders over $50
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-3 text-sm">
                    {product.stock > 0 ? (
                      <>
                        <Check className="h-5 w-5 mr-2 text-green-600" />
                        <span>
                          <span className="font-medium">In stock</span>
                          {product.stock < 10 && ` (Only ${product.stock} left)`}
                        </span>
                      </>
                    ) : (
                      <span className="text-red-600 font-medium">Out of stock</span>
                    )}
                  </div>
                </div>
                
                {product.stock > 0 && (
                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <div className="flex items-center h-10 w-32 border rounded-md overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-full rounded-none"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 h-full flex items-center justify-center text-center">
                        {quantity}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-full rounded-none"
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      className="w-full sm:w-auto bg-agri-green-dark hover:bg-agri-green-dark/90"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-agri-green-dark mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

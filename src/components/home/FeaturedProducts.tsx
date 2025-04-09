
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-muted/30">
      <div className="agri-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-agri-green-dark mb-4">Featured Products</h2>
          <p className="text-muted-foreground">
            Check out our most popular agricultural products, hand-picked for quality and performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-agri-green-dark text-agri-green-dark hover:bg-agri-green-dark hover:text-white"
            size="lg"
            asChild
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

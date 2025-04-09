
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-agri-beige py-20">
      <div className="agri-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-agri-green-dark mb-4">
              Grow Better with<br />Premium Agricultural Products
            </h1>
            <p className="text-lg text-foreground/80 mb-8">
              Discover a wide range of high-quality seeds, tools, fertilizers, and more to help your farm or garden thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-agri-green-dark hover:bg-agri-green-dark/90 text-white"
                size="lg"
                asChild
              >
                <Link to="/products">Shop Products</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-agri-green-dark text-agri-green-dark hover:bg-agri-green-dark hover:text-white"
                size="lg"
                asChild
              >
                <Link to="/contact">Get Advice</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-80 lg:h-auto rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Farming landscape" 
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

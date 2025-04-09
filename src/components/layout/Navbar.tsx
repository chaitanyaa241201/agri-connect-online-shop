
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="agri-container">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-agri-green-dark text-xl font-bold">AgriConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-agri-green-dark transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-agri-green-dark transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-foreground hover:text-agri-green-dark transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-agri-green-dark transition-colors">
              Contact
            </Link>
          </div>

          {/* Cart and Account */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-foreground hover:text-agri-green-dark transition-colors" />
              {getCartItemCount() > 0 && (
                <span className="absolute top-0 right-0 bg-agri-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            <Link to="/account">
              <Button variant="outline" size="sm" className="border-agri-green-dark text-agri-green-dark hover:bg-agri-green-dark hover:text-white">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-foreground" />
              {getCartItemCount() > 0 && (
                <span className="absolute top-0 right-0 bg-agri-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-agri-green-dark px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-foreground hover:text-agri-green-dark px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-agri-green-dark px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-agri-green-dark px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/account" 
                className="text-foreground hover:text-agri-green-dark px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

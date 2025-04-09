
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-agri-green-dark text-white pt-12 pb-6">
      <div className="agri-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">AgriConnect</h3>
            <p className="mb-4 text-sm">
              Your one-stop solution for all agricultural needs. From seeds to machinery, we've got you covered.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons could go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/80 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=seeds" className="text-white/80 hover:text-white transition-colors">
                  Seeds
                </Link>
              </li>
              <li>
                <Link to="/products?category=fertilizers" className="text-white/80 hover:text-white transition-colors">
                  Fertilizers
                </Link>
              </li>
              <li>
                <Link to="/products?category=tools" className="text-white/80 hover:text-white transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/products?category=machinery" className="text-white/80 hover:text-white transition-colors">
                  Machinery
                </Link>
              </li>
              <li>
                <Link to="/products?category=pesticides" className="text-white/80 hover:text-white transition-colors">
                  Pesticides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>123 Farm Road, Agri Town, Country, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@agriconnect.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 mt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

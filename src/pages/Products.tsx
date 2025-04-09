
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Product, products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CheckCircle, Circle, Search } from 'lucide-react';

type ProductCategory = Product['category'];

const Products: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') as ProductCategory | null;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    categoryParam ? [categoryParam] : []
  );
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const categories: ProductCategory[] = ['seeds', 'fertilizers', 'tools', 'machinery', 'pesticides'];

  useEffect(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you'd sort by date added
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategories, sortBy, priceRange]);

  const toggleCategory = (category: ProductCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-agri-beige py-10">
          <div className="agri-container">
            <h1 className="text-3xl md:text-4xl font-bold text-agri-green-dark mb-4">
              Agricultural Products
            </h1>
            <p className="text-foreground/80 max-w-2xl">
              Browse our extensive catalog of high-quality agricultural products designed to help farmers and gardeners achieve optimal results.
            </p>
          </div>
        </div>
        
        <div className="agri-container py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h3 className="font-semibold text-lg mb-4">Search Products</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h3 className="font-semibold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => toggleCategory(category)}
                    >
                      {selectedCategories.includes(category) ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-agri-green-dark" />
                      ) : (
                        <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                      )}
                      <span className="capitalize">{category}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Sort By</h3>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="priceLow">Price: Low to High</SelectItem>
                    <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="lg:w-3/4">
              <div className="mb-6 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategories([]);
                      setSortBy('featured');
                      setPriceRange([0, 10000]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;

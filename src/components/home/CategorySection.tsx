
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Seeds as SeedsIcon, Wheat, Hammer, Tractor, Leaf } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  path: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, description, path }) => {
  return (
    <Link to={path}>
      <Card className="hover:shadow-md transition-shadow border-agri-beige">
        <CardContent className="pt-6 pb-4 px-4 flex flex-col items-center text-center">
          <div className="bg-agri-green-light/20 p-4 rounded-full mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2 text-agri-green-dark">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const CategorySection: React.FC = () => {
  const categories = [
    {
      title: "Seeds",
      icon: <SeedsIcon className="h-6 w-6 text-agri-green-dark" />,
      description: "High-quality seeds for all crops",
      path: "/products?category=seeds"
    },
    {
      title: "Fertilizers",
      icon: <Leaf className="h-6 w-6 text-agri-green-dark" />,
      description: "Organic and chemical fertilizers",
      path: "/products?category=fertilizers"
    },
    {
      title: "Tools",
      icon: <Hammer className="h-6 w-6 text-agri-green-dark" />,
      description: "Durable farming and gardening tools",
      path: "/products?category=tools"
    },
    {
      title: "Machinery",
      icon: <Tractor className="h-6 w-6 text-agri-green-dark" />,
      description: "Modern farming equipment",
      path: "/products?category=machinery"
    },
    {
      title: "Pesticides",
      icon: <Wheat className="h-6 w-6 text-agri-green-dark" />,
      description: "Effective pest control solutions",
      path: "/products?category=pesticides"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="agri-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-agri-green-dark mb-4">Our Product Categories</h2>
          <p className="text-muted-foreground">
            Browse our comprehensive range of agricultural products designed to meet all your farming needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              icon={category.icon}
              description={category.description}
              path={category.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

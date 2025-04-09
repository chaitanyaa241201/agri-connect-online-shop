
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        <FeaturedProducts />
        <section className="py-16 bg-agri-beige">
          <div className="agri-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-agri-green-dark mb-6">Why Choose AgriConnect?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="rounded-full bg-agri-green-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-agri-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-agri-green-dark">Quality Products</h3>
                  <p className="text-muted-foreground">We source only the highest quality agricultural products from trusted suppliers.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="rounded-full bg-agri-green-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-agri-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-agri-green-dark">Fast Delivery</h3>
                  <p className="text-muted-foreground">We understand timing is crucial in agriculture. Expect prompt delivery of your orders.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="rounded-full bg-agri-green-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-agri-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-agri-green-dark">Expert Support</h3>
                  <p className="text-muted-foreground">Our team of agricultural experts is always ready to assist with your farming needs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

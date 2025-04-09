
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Trash, Plus, Minus, ShoppingCart } from 'lucide-react';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getCartTotal 
  } = useCart();
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-agri-green-dark mb-4">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. 
              Browse our collection to find what you need for your garden or farm.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="agri-container">
          <h1 className="text-3xl font-bold text-agri-green-dark mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={clearCart}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map(item => (
                      <div key={item.product.id} className="py-4 flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <Link to={`/product/${item.product.id}`} className="font-medium text-agri-green-dark hover:underline">
                            {item.product.name}
                          </Link>
                          <div className="text-sm text-muted-foreground mb-2 capitalize">
                            {item.product.category}
                          </div>
                          <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center h-8 border rounded-md overflow-hidden">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-full rounded-none px-2"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <div className="w-8 h-full flex items-center justify-center text-center text-sm">
                                {item.quantity}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-full rounded-none px-2"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-destructive"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                        
                        <div className="font-semibold text-right sm:mt-0 mt-2">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Free shipping on orders over $50
                      </div>
                    )}
                    <div className="border-t pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-xl text-agri-green-dark">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-agri-green-dark hover:bg-agri-green-dark/90"
                    size="lg"
                    asChild
                  >
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <Link to="/products" className="text-sm text-agri-green-dark hover:underline">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

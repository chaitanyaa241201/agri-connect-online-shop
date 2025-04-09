
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { Check, CreditCard, Truck } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit-card',
  });
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. We'll process your order shortly.",
      });
      
      clearCart();
      navigate('/order-confirmation');
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="agri-container">
          <h1 className="text-3xl font-bold text-agri-green-dark mb-8">Checkout</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Customer Information */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input 
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input 
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input 
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input 
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={handleRadioChange}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-md border border-input hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex-grow cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-agri-green-dark" />
                          Credit/Debit Card
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-md border border-input hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-grow cursor-pointer">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.6 8.80005H11.4C14.4 8.80005 16 10.4 15.8 12.9C15.6 15.7 13.6 17 10.8 17H9.2C8.8 17 8.4 17.3 8.3 17.7L7.6 21.1C7.5 21.4 7.3 21.7 7 21.8H3.8C3.4 21.8 3.2 21.5 3.3 21.1L5.8 9.30005C5.9 9.00005 6.2 8.80005 6.5 8.80005H7.6Z" fill="#005AAD"/>
                            <path d="M19.3 8.80005L16.8 21C16.7 21.4 16.5 21.7 16.1 21.7H12.9C12.5 21.7 12.3 21.4 12.4 21L14.9 8.80005C15 8.50005 15.3 8.20005 15.6 8.20005H18.6C19 8.20005 19.4 8.50005 19.3 8.80005Z" fill="#0070BA"/>
                            <path d="M17.3 4.60002H13.5C13.1 4.60002 12.7 4.90002 12.6 5.30002L11.9 8.70002C11.8 9.10002 12.1 9.40002 12.5 9.40002H16.1C16.5 9.40002 16.9 9.10002 17 8.70002L17.7 5.30002C17.9 4.90002 17.6 4.60002 17.3 4.60002Z" fill="#003186"/>
                            <path d="M9.7 4.60002H5.9C5.5 4.60002 5.1 4.90002 5 5.30002L3.2 13.9C3.1 14.3 3.4 14.6 3.8 14.6H6C6.4 14.6 6.8 14.3 6.9 13.9L7.6 10.5C7.7 10.1 8.1 9.80002 8.5 9.80002H10.1C12.9 9.80002 14.9 8.50002 15.1 5.70002C15.2 5.00002 14.9 4.60002 14.6 4.40002C13.9 4.40002 12 4.60002 9.7 4.60002Z" fill="#0070BA"/>
                          </svg>
                          PayPal
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.paymentMethod === 'credit-card' && (
                    <div className="mt-6 space-y-4 animate-fade-in">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input 
                          id="cardName"
                          placeholder="Name on card"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input 
                            id="expiryDate"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="divide-y mb-4">
                    {cartItems.map(item => (
                      <div key={item.product.id} className="py-3 flex justify-between">
                        <div>
                          <span className="font-medium">
                            {item.product.name}
                          </span>
                          <div className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <div className="flex items-center">
                        {shipping === 0 ? (
                          <>
                            <Check className="h-4 w-4 mr-1 text-green-600" />
                            <span>Free</span>
                          </>
                        ) : (
                          <span>${shipping.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    {shipping > 0 && (
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        Free shipping on orders over $50
                      </div>
                    )}
                    <div className="border-t pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-xl text-agri-green-dark">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-agri-green-dark hover:bg-agri-green-dark/90"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

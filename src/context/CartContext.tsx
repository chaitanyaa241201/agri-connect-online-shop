
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { toast } from '../components/ui/use-toast';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Check if adding more would exceed stock
        if (existingItem.quantity + quantity > product.stock) {
          toast({
            title: "Cannot add more",
            description: `Sorry, only ${product.stock} in stock`,
            variant: "destructive"
          });
          return prevItems;
        }
        
        toast({
          title: "Updated cart",
          description: `Added more ${product.name} to your cart`,
        });
        
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Check if new item exceeds stock
        if (quantity > product.stock) {
          toast({
            title: "Cannot add more",
            description: `Sorry, only ${product.stock} in stock`,
            variant: "destructive"
          });
          return prevItems;
        }
        
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const updatedCart = prevItems.filter(item => item.product.id !== productId);
      
      toast({
        title: "Removed from cart",
        description: "Item removed from your cart",
      });
      
      return updatedCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => {
      const productItem = prevItems.find(item => item.product.id === productId);
      
      if (productItem && quantity > productItem.product.stock) {
        toast({
          title: "Cannot update quantity",
          description: `Sorry, only ${productItem.product.stock} in stock`,
          variant: "destructive"
        });
        return prevItems;
      }
      
      return prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

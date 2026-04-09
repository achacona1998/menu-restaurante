import { useState, useCallback, useEffect } from "react";
import { CartItem, MenuItem } from "../types/menu";

// Custom hook for managing cart state
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [showAddAnimation, setShowAddAnimation] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      void e;
    }
  }, [cart]);

  // Add item to cart
  const addToCart = useCallback((item: MenuItem, quantity: number = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...item, quantity }];
    });

    setShowAddAnimation(true);
    setTimeout(() => setShowAddAnimation(false), 800);
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((itemId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // Update quantity
  const updateQuantity = useCallback(
    (itemId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }

      setCart((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
      );
    },
    [removeFromCart],
  );

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calculate total
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    showAddAnimation,
  };
}

export default useCart;

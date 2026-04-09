import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "../types/menu";
import { formatCurrency } from "../utils/currency";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onClearCart: () => void;
  currency: string;
}

// Slide-out cart panel showing current order
export function Cart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
}: CartProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 backdrop-blur-sm bg-black/60"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="flex fixed top-0 right-0 bottom-0 z-50 flex-col w-full max-w-md border-l bg-charcoal glass-card border-white/10">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex gap-3 items-center">
                <ShoppingBag className="w-6 h-6 text-gold-400" />
                <h2 className="text-xl font-bold text-white font-display">
                  Tu Pedido
                </h2>
                <span className="px-2 py-0.5 bg-gold-500/20 text-gold-400 text-sm font-medium rounded-full">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center w-10 h-10 rounded-full transition-colors bg-white/5 hover:bg-white/10"
                aria-label="Cerrar carrito">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="overflow-y-auto flex-1 p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-center">
                  <ShoppingBag className="mb-4 w-16 h-16 text-white/20" />
                  <p className="text-lg text-white/50">Tu pedido está vacío</p>
                  <p className="mt-1 text-sm text-white/30">
                    Agrega platos del menú
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-3 p-3 glass-card">
                      {/* Image */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-16 h-16 rounded-lg opacity-0 transition-opacity duration-300"
                        onLoad={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex gap-2 justify-between items-start">
                          <h4 className="text-sm font-medium text-white truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="transition-colors text-white/30 hover:text-red-400"
                            aria-label="Eliminar del carrito">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="mt-1 text-sm font-semibold text-gold-400">
                          {formatCurrency(item.price, currency)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex gap-2 items-center mt-2">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex justify-center items-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20"
                            aria-label="Disminuir cantidad">
                            <Minus className="w-3 h-3 text-white" />
                          </button>
                          <span className="w-6 text-sm font-medium text-center text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex justify-center items-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20"
                            aria-label="Aumentar cantidad">
                            <Plus className="w-3 h-3 text-white" />
                          </button>

                          <span className="ml-auto text-sm font-semibold text-white">
                            {formatCurrency(
                              item.price * item.quantity,
                              currency,
                            )}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 space-y-3 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Subtotal</span>
                  <span className="font-medium text-white">
                    {formatCurrency(total, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">IVA (10%)</span>
                  <span className="font-medium text-white">
                    {formatCurrency(total * 0.1, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-xl font-bold text-gold-400">
                    {formatCurrency(total * 1.1, currency)}
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="py-4 w-full text-lg font-bold rounded-xl transition-colors bg-gold-500 hover:bg-gold-400 text-charcoal">
                  Confirmar Pedido
                </motion.button>

                <button
                  onClick={onClearCart}
                  className="py-2 w-full text-sm transition-colors text-white/50 hover:text-white/70">
                  Vaciar pedido
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Cart;

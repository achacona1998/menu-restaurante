import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Plus, Minus } from "lucide-react";
import { MenuItem } from "../types/menu";
import { useEffect, useId, useRef, useState } from "react";
import { formatCurrency } from "../utils/currency";

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

// Modal overlay with full item details
export function ItemModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
}: ItemModalProps) {
  const [quantity, setQuantity] = useState(1);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    queueMicrotask(() => closeButtonRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;

      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      lastFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
    onClose();
  };

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-end md:items-center justify-center pointer-events-none">
            <div className="bg-charcoal rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden pointer-events-auto glass-card border-gold-500/30">
              {/* Image */}
              <div className="relative h-56 md:h-72">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  decoding="async"
                  className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
                  onLoad={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

                {/* Close button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center"
                  aria-label="Cerrar"
                  ref={closeButtonRef}>
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                {/* Featured badge */}
                {item.isFeatured && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-gold-500 text-charcoal text-sm font-bold rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    Destacado
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                className="p-6 overflow-y-auto max-h-[calc(90vh-14rem)]"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}>
                {/* Title & Price */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2
                    id={titleId}
                    className="text-2xl font-bold text-white font-display">
                    {item.name}
                  </h2>
                  <span className="text-gold-400 font-bold text-2xl">
                    {formatCurrency(item.price, item.currency)}
                  </span>
                </div>

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-gold-500/20 text-gold-400 rounded-full border border-gold-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className="text-white/70 text-base leading-relaxed mb-6">
                  {item.fullDescription || item.description}
                </p>

                {/* Ingredients */}
                {item.ingredients && item.ingredients.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-2">
                      Ingredientes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.map((ingredient, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-sm bg-white/10 text-white/70 rounded-lg">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {/* Quantity selector */}
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      aria-label="Disminuir cantidad">
                      <Minus className="w-4 h-4 text-white" />
                    </button>
                    <span className="w-8 text-center text-white font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      aria-label="Aumentar cantidad">
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Add button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdd}
                    className="flex-1 py-3 px-6 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Plus className="w-5 h-5" />
                    Agregar -{" "}
                    {formatCurrency(item.price * quantity, item.currency)}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ItemModal;

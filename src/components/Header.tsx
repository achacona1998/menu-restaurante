import { motion } from 'framer-motion';
import { ShoppingCart, Utensils } from 'lucide-react';

interface HeaderProps {
  restaurantName: string;
  totalItems: number;
  onCartClick: () => void;
}

// Header component with logo, restaurant name, and cart icon
export function Header({ restaurantName, totalItems, onCartClick }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-charcoal/80 backdrop-blur-lg border-b border-white/5"
    >
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
            <Utensils className="w-5 h-5 text-charcoal" />
          </div>
          <span className="text-gold-400 font-display text-lg tracking-wide hidden sm:block">
            {restaurantName}
          </span>
        </div>

        {/* Center - Restaurant Name (mobile) */}
        <span className="text-gold-400 font-display text-lg tracking-wide sm:hidden">
          {restaurantName}
        </span>

        {/* Cart Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onCartClick}
          className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          aria-label="Abrir carrito"
        >
          <ShoppingCart className="w-5 h-5 text-white" />
          
          {/* Cart Badge */}
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-charcoal text-xs font-bold rounded-full flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}

export default Header;

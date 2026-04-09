import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { MenuItem } from "../types/menu";
import { formatCurrency } from "../utils/currency";

interface MenuCardProps {
  item: MenuItem;
  index: number;
  onClick: () => void;
  onQuickAdd?: () => void;
}

// Individual menu item card with hover animations
export function MenuCard({ item, index, onClick, onQuickAdd }: MenuCardProps) {
  // Map tags to CSS classes
  const getTagClass = (tag: string) => {
    const tagMap: Record<string, string> = {
      vegano: "tag-vegano",
      "sin-gluten": "tag-gluten",
      picante: "tag-picante",
      premium: "tag-premium",
      destacado: "tag-premium",
      popular: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
      saludable: "bg-green-500/20 text-green-400 border border-green-500/30",
      alcohol: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
      "sin-alcohol": "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
      ligero: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
      clásico: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
      chocolate: "bg-amber-700/20 text-amber-600 border border-amber-700/30",
      casero: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
      familiar: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
    };
    return (
      tagMap[tag.toLowerCase()] ||
      "bg-white/10 text-white/70 border border-white/20"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative p-4 transition-all duration-300 cursor-pointer group glass-card hover:border-gold-500/30">
      {/* Featured badge */}
      {item.isFeatured && (
        <div className="absolute -top-2 -right-2 z-10">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.08 }}
            className="flex gap-1 items-center px-2 py-1 text-xs font-bold rounded-full shadow-lg bg-gold-500 text-charcoal">
            <Star className="w-3 h-3 fill-current" />
            Chef's Choice
          </motion.span>
        </div>
      )}

      <div className="flex gap-4">
        {/* Image */}
        <div className="overflow-hidden relative flex-shrink-0 w-24 h-24 rounded-xl">
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full opacity-0 transition-opacity transition-transform duration-500 group-hover:scale-110"
            onLoad={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/50" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 justify-between items-start">
            <h3 className="text-base font-semibold leading-tight text-white truncate">
              {item.name}
            </h3>
            <span className="flex-shrink-0 text-lg font-bold text-gold-400">
              {formatCurrency(item.price, item.currency)}
            </span>
          </div>

          <p className="mt-1 text-sm leading-relaxed text-white/50 line-clamp-2">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={`tag-badge ${getTagClass(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover add button */}
      {onQuickAdd && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd();
          }}
          className="flex absolute right-4 bottom-4 justify-center items-center w-9 h-9 rounded-full shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-gold-500 hover:bg-gold-400"
          aria-label={`Agregar ${item.name}`}>
          <Plus className="w-4 h-4 text-charcoal" />
        </button>
      )}
    </motion.div>
  );
}

export default MenuCard;

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Header } from "../components/Header";
import { SectionTabs } from "../components/SectionTabs";
import { MenuCard } from "../components/MenuCard";
import { ItemModal } from "../components/ItemModal";
import { Cart } from "../components/Cart";
import { MenuSkeleton } from "../components/MenuSkeleton";
import { menuData } from "../data/menuData";
import { MenuItem } from "../types/menu";
import { useCart } from "../hooks/useCart";
import heroImg from "../assets/hero.png";
import { formatCurrency } from "../utils/currency";

// Get URL params for table number
function getTableNumber(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("mesa") || params.get("table") || null;
}

export function MenuPage() {
  const [activeSection, setActiveSection] = useState(
    menuData.sections[0]?.id || "",
  );
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const featuredScrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollFeaturedLeft, setCanScrollFeaturedLeft] = useState(false);
  const [canScrollFeaturedRight, setCanScrollFeaturedRight] = useState(false);
  const [toast, setToast] = useState<{
    title: string;
    subtitle?: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null>(null);
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    showAddAnimation,
  } = useCart();

  const tableNumber = getTableNumber();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Set document language from config for better i18n (currency, etc.)
  useEffect(() => {
    if (menuData.locale) {
      document.documentElement.lang = menuData.locale;
    }
  }, []);

  // Get current section data
  const currentSection = menuData.sections.find((s) => s.id === activeSection);
  const featuredItems = useMemo(() => {
    const all = menuData.sections.flatMap((s) => s.items);
    return all.filter((i) => i.isFeatured).slice(0, 10);
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    for (const section of menuData.sections) {
      for (const item of section.items) {
        for (const t of item.tags) tags.add(t);
      }
    }
    return Array.from(tags).sort((a, b) => a.localeCompare(b, "es"));
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const activeItems = useMemo(
    () => currentSection?.items ?? [],
    [currentSection],
  );
  const filteredItems = useMemo(() => {
    const hasQuery = normalizedQuery.length > 0;
    const hasTags = selectedTags.length > 0;
    if (!hasQuery && !hasTags) return activeItems;

    return activeItems.filter((item) => {
      if (hasTags) {
        const itemTags = new Set(item.tags.map((t) => t.toLowerCase()));
        const ok = selectedTags.some((t) => itemTags.has(t.toLowerCase()));
        if (!ok) return false;
      }

      if (!hasQuery) return true;

      const haystack = [
        item.name,
        item.description,
        item.fullDescription ?? "",
        (item.ingredients ?? []).join(" "),
        item.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [activeItems, normalizedQuery, selectedTags]);

  useEffect(() => {
    const el = featuredScrollerRef.current;
    if (!el) return;

    const update = () => {
      const left = el.scrollLeft;
      const maxLeft = el.scrollWidth - el.clientWidth;
      setCanScrollFeaturedLeft(left > 0);
      setCanScrollFeaturedRight(left < maxLeft - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [featuredItems.length]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    const prevQuantity = cart.find((c) => c.id === item.id)?.quantity ?? 0;
    addToCart(item, quantity);
    setToast({
      title: "Añadido al pedido",
      subtitle: `${item.name} · +${quantity}`,
      actionLabel: "Deshacer",
      onAction: () => {
        if (prevQuantity <= 0) {
          removeFromCart(item.id);
          return;
        }
        updateQuantity(item.id, prevQuantity);
      },
    });
  };

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <Header
        restaurantName={menuData.restaurantName}
        totalItems={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Table Banner (if applicable) */}
      {tableNumber && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-1/2 z-30 px-4 py-2 rounded-full border backdrop-blur-md -translate-x-1/2 bg-gold-500/20 border-gold-500/30">
          <span className="text-sm font-medium text-gold-400">
            Mesa {tableNumber}
          </span>
        </motion.div>
      )}

      {/* +1 Animation */}
      <AnimatePresence>
        {showAddAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -50 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            transition={{ duration: 0.4 }}
            className="fixed right-8 top-24 z-50 px-4 py-2 font-bold rounded-full shadow-lg bg-gold-500 text-charcoal">
            +1
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Tabs */}
      <div className="pt-16">
        <SectionTabs
          sections={menuData.sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Menu Content */}
      <div className="px-4 py-6 mx-auto max-w-4xl">
        <div className="overflow-hidden relative mb-6 rounded-3xl border border-white/10 bg-white/5">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `url(${heroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r to-transparent from-charcoal via-charcoal/70" />
          <div className="relative p-6 md:p-8">
            <div className="inline-flex gap-2 items-center px-3 py-1 rounded-full border backdrop-blur-md bg-black/40 border-white/10">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-xs text-white/80">
                Menú digital · {menuData.restaurantName}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl font-display">
              Experiencia premium, sin esperas.
            </h1>
            <p className="mt-2 max-w-xl text-white/60">
              Descubre nuestros platos destacados y arma tu pedido con un toque.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-2 font-semibold rounded-xl transition-colors bg-gold-500 hover:bg-gold-400 text-charcoal">
                Ver pedido
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedTags([]);
                  setIsFiltersOpen(false);
                }}
                className="px-4 py-2 rounded-xl border transition-colors bg-white/5 hover:bg-white/10 border-white/10 text-white/80">
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>

        {featuredItems.length > 0 && (
          <div className="mb-8">
            <div className="flex gap-3 justify-between items-center mb-3">
              <h2 className="flex gap-2 items-center text-lg font-semibold text-white">
                <Sparkles className="w-5 h-5 text-gold-400" />
                Destacados
              </h2>
              <span className="text-xs text-white/40">
                {featuredItems.length} recomendados
              </span>
            </div>

            <div className="relative">
              {canScrollFeaturedLeft && (
                <button
                  type="button"
                  onClick={() => {
                    featuredScrollerRef.current?.scrollBy({
                      left: -320,
                      behavior: "smooth",
                    });
                  }}
                  className="flex absolute left-2 top-1/2 z-10 justify-center items-center w-10 h-10 rounded-2xl border backdrop-blur-md -translate-y-1/2 bg-charcoal/80 hover:bg-charcoal border-white/10"
                  aria-label="Ver destacados anteriores">
                  <ChevronLeft className="w-5 h-5 text-white/80" />
                </button>
              )}

              {canScrollFeaturedRight && (
                <button
                  type="button"
                  onClick={() => {
                    featuredScrollerRef.current?.scrollBy({
                      left: 320,
                      behavior: "smooth",
                    });
                  }}
                  className="flex absolute right-2 top-1/2 z-10 justify-center items-center w-10 h-10 rounded-2xl border backdrop-blur-md -translate-y-1/2 bg-charcoal/80 hover:bg-charcoal border-white/10"
                  aria-label="Ver más destacados">
                  <ChevronRight className="w-5 h-5 text-white/80" />
                </button>
              )}

              <div
                ref={featuredScrollerRef}
                className="flex overflow-x-auto gap-3 pr-10 pb-2 scrollbar-hide scroll-smooth">
                {featuredItems.map((item) => (
                  <button
                    key={`featured-${item.id}`}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="min-w-[260px] max-w-[260px] text-left glass-card overflow-hidden border border-white/10 hover:border-gold-500/30 transition-colors">
                    <div className="relative h-32">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full opacity-0 transition-opacity duration-300"
                        onLoad={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t to-transparent from-charcoal/90" />
                      <div className="flex absolute right-3 bottom-3 left-3 gap-3 justify-between items-center">
                        <span className="font-semibold text-white truncate">
                          {item.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-semibold">
                          {formatCurrency(item.price, item.currency)}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-white/50 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex gap-2 justify-between items-center mt-3">
                        <span className="text-xs text-white/40">
                          {item.tags.slice(0, 2).join(" · ")}
                        </span>
                        <span className="text-xs font-semibold text-gold-400">
                          Ver más
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar platos, ingredientes, etiquetas…"
                className="py-3 pr-10 pl-10 w-full text-white rounded-2xl border bg-white/5 border-white/10 placeholder:text-white/30 focus:outline-none focus:border-gold-500/40"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="flex absolute right-3 top-1/2 justify-center items-center w-8 h-8 rounded-xl -translate-y-1/2 bg-white/5 hover:bg-white/10"
                  aria-label="Limpiar búsqueda">
                  <X className="w-4 h-4 text-white/60" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsFiltersOpen((v) => !v)}
              className="flex justify-center items-center w-12 h-12 rounded-2xl border bg-white/5 hover:bg-white/10 border-white/10"
              aria-label="Abrir filtros">
              <SlidersHorizontal className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-3 mt-3 rounded-2xl border bg-white/5 border-white/10">
                <div className="flex gap-3 justify-between items-center mb-3">
                  <div className="text-sm text-white/70">
                    Filtros por etiqueta
                  </div>
                  {selectedTags.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedTags([])}
                      className="text-sm text-white/50 hover:text-white/80">
                      Limpiar
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={`tag-${tag}`}
                        type="button"
                        onClick={() => {
                          setSelectedTags((prev) =>
                            prev.includes(tag)
                              ? prev.filter((t) => t !== tag)
                              : [...prev, tag],
                          );
                        }}
                        className={[
                          "px-3 py-1.5 rounded-full text-sm border transition-colors",
                          active
                            ? "bg-gold-500 text-charcoal border-gold-400"
                            : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white",
                        ].join(" ")}>
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {(normalizedQuery.length > 0 || selectedTags.length > 0) && (
            <div className="mt-3 text-sm text-white/50">
              Mostrando {filteredItems.length} de {activeItems.length}
            </div>
          )}
        </div>

        {/* Section Title */}
        <motion.div
          key={`title-${activeSection}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6">
          <h2 className="flex gap-3 items-center text-2xl font-bold text-white font-display">
            {currentSection?.icon && <span>{currentSection.icon}</span>}
            {currentSection?.title}
          </h2>
          <p className="mt-1 text-sm text-white/40">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "plato" : "platos"}
          </p>
        </motion.div>

        {/* Menu Items Grid */}
        {isLoading ? (
          <MenuSkeleton />
        ) : (
          <motion.div
            key={`items-${activeSection}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center glass-card">
                <p className="text-lg font-semibold text-white/70">
                  No hay resultados
                </p>
                <p className="mt-2 text-white/40">
                  Prueba con otra búsqueda o quita filtros.
                </p>
                <div className="flex gap-2 justify-center items-center mt-5">
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="px-4 py-2 rounded-xl border transition-colors bg-white/5 hover:bg-white/10 border-white/10 text-white/80">
                    Limpiar búsqueda
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    className="px-4 py-2 rounded-xl border transition-colors bg-white/5 hover:bg-white/10 border-white/10 text-white/80">
                    Quitar filtros
                  </button>
                </div>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => setSelectedItem(item)}
                  onQuickAdd={() => handleAddToCart(item, 1)}
                />
              ))
            )}
          </motion.div>
        )}
      </div>

      {/* Item Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={(item, quantity) => handleAddToCart(item, quantity)}
      />

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        currency={menuData.currency}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 -translate-x-1/2 z-[60] bottom-24 w-[calc(100%-2rem)] max-w-md">
            <div className="flex gap-3 justify-between items-center px-4 py-3 border glass-card border-white/10">
              <div className="min-w-0">
                <div className="font-semibold text-white">{toast.title}</div>
                {toast.subtitle && (
                  <div className="text-sm truncate text-white/50">
                    {toast.subtitle}
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center">
                {toast.onAction && toast.actionLabel && (
                  <button
                    type="button"
                    onClick={() => {
                      toast.onAction?.();
                      setToast(null);
                    }}
                    className="px-3 py-2 rounded-xl border bg-white/5 hover:bg-white/10 border-white/10 text-white/80">
                    {toast.actionLabel}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="flex justify-center items-center w-10 h-10 rounded-xl border bg-white/5 hover:bg-white/10 border-white/10"
                  aria-label="Cerrar aviso">
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            className="fixed right-0 bottom-0 left-0 z-50 px-4 pt-3 pb-4">
            <div className="mx-auto max-w-4xl">
              <div className="flex gap-3 justify-between items-center px-4 py-3 border glass-card border-white/10">
                <div className="min-w-0">
                  <div className="text-sm text-white/60">
                    {totalItems} {totalItems === 1 ? "item" : "items"} en tu
                    pedido
                  </div>
                  <div className="font-semibold text-white truncate">
                    {formatCurrency(totalPrice, menuData.currency)}
                    <span className="font-normal text-white/40">
                      {" "}
                      · IVA incl.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="px-4 py-3 font-bold rounded-2xl transition-colors bg-gold-500 hover:bg-gold-400 text-charcoal">
                  Ver pedido
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MenuPage;

import { motion } from "framer-motion";
import { MenuSection } from "../types/menu";

interface SectionTabsProps {
  sections: MenuSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

// Horizontal scrolling tab navigation for menu sections
export function SectionTabs({
  sections,
  activeSection,
  onSectionChange,
}: SectionTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="sticky top-16 z-40 bg-charcoal/90 backdrop-blur-md border-b border-white/5">
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide max-w-4xl mx-auto">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              transition-all duration-300 ease-out
              ${
                activeSection === section.id
                  ? "text-charcoal bg-gold-500"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }
            `}
            whileTap={{ scale: 0.95 }}
            aria-current={activeSection === section.id ? "true" : undefined}>
            {section.icon && <span>{section.icon}</span>}
            {section.title}

            {/* Active indicator */}
            {activeSection === section.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gold-400 rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default SectionTabs;

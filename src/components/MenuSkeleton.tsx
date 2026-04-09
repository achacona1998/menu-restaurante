import { motion } from 'framer-motion';

interface SkeletonCardProps {
  className?: string;
}

// Skeleton loading card for smooth loading experience
export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex gap-4">
        {/* Image skeleton */}
        <div className="w-24 h-24 rounded-xl bg-white/5 overflow-hidden">
          <motion.div
            animate={{ 
              backgroundPosition: ['200% 0', '-200% 0']
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            className="w-full h-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]"
          />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-2">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-5 w-3/4 bg-white/10 rounded"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="h-4 w-full bg-white/5 rounded"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            className="h-4 w-2/3 bg-white/5 rounded"
          />
          <div className="flex gap-2 mt-2">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              className="h-5 w-12 bg-white/10 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
              className="h-5 w-16 bg-white/10 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for the entire menu section
export function MenuSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default SkeletonCard;
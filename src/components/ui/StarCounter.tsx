import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StarCounterProps {
  count: number;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  animateOnChange?: boolean; // Nueva prop para animar cuando cambia el valor
}

export const StarCounter: React.FC<StarCounterProps> = ({
  count,
  animated = false,
  size = "md",
  animateOnChange = false,
}) => {
  // const [isAnimating, setIsAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(count);

  const sizeStyles = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  // Detectar cambios en el count y activar animación
  useEffect(() => {
    if (animateOnChange && count !== prevCount) {
      // setIsAnimating(true);
      setPrevCount(count);

      // Resetear la animación después de que termine
      // const timer = setTimeout(() => {
      //   setIsAnimating(false);
      // }, 600);

      // return () => clearTimeout(timer);
    }
  }, [count, prevCount, animateOnChange]);

  const Component = animated ? motion.div : "div";
  const animationProps = animated
    ? {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring" as const, stiffness: 200, damping: 10 },
      }
    : {};

  return (
    <Component
      {...animationProps}
      className="flex items-center gap-2 bg-linear-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full shadow-lg"
    >
      {/* <motion.div
        animate={
          isAnimating
            ? {
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, -10, 0],
              }
            : { scale: 1, rotate: 0 }
        }
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Star size={iconSizes[size]} fill="currentColor" />
      </motion.div> */}

      <AnimatePresence mode="wait">
        <motion.span
          key={count} // Key cambia cuando count cambia, forzando re-render
          initial={animateOnChange ? { scale: 0.5, y: -10, opacity: 0 } : false}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={animateOnChange ? { scale: 1.5, y: 10, opacity: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          className={`font-bold ${sizeStyles[size]} flex items-center gap-2`}
        >
          <Star size={iconSizes[size]} fill="currentColor" />
          <span>{count}</span>
        </motion.span>
      </AnimatePresence>
    </Component>
  );
};

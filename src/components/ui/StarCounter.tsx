import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface StarCounterProps {
  count: number;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
}

export const StarCounter: React.FC<StarCounterProps> = ({
  count,
  animated = false,
  size = "md",
}) => {
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
      className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full shadow-lg"
    >
      <Star size={iconSizes[size]} fill="currentColor" />
      <span className={`font-bold ${sizeStyles[size]}`}>{count}</span>
    </Component>
  );
};

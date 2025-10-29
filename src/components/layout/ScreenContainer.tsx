import React from 'react';
import { motion } from 'framer-motion';

interface ScreenContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 ${className}`}
    >
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </motion.div>
  );
};

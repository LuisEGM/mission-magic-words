import React from "react";
import { motion } from "framer-motion";

interface BridgeProgressProps {
  current: number;
  total: number;
}

export const BridgeProgress: React.FC<BridgeProgressProps> = ({
  current,
  total,
}) => {
  const percentage = (current / total) * 100;

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Progreso del Puente</span>
          <span className="text-yellow-300 font-bold">
            {current} / {total} Desafíos
          </span>
        </div>
        <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          />
        </div>
        <p className="text-white/70 text-sm mt-2 text-center">
          Cada desafío fortalece el puente
        </p>
      </div>
    </div>
  );
};

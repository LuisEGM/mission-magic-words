import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import type { InspirationImage } from "../../types";

interface InspirationSelectorProps {
  images: InspirationImage[];
  onSelect: (imageId: number) => void;
}

export const InspirationSelector: React.FC<InspirationSelectorProps> = ({
  images,
  onSelect,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Elige tu Inspiración
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Selecciona una imagen que te inspire para crear tu historia
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => onSelect(image.id)}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg border-4 border-transparent group-hover:border-purple-500 transition-all">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    Seleccionar
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                {image.alt}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

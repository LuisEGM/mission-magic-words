import React from "react";
import { motion } from "framer-motion";

interface ShinyButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  onClick,
  children,
  disabled = false,
  loading = false,
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className="relative group px-8 py-4 rounded-xl font-bold text-lg overflow-visible disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Fondo degradado animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient rounded-xl" />

      {/* Borde del botón */}
      <div className="absolute inset-0 rounded-xl border border-purple-400/30" />

      {/* Efecto de luz que recorre al hacer hover */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute -inset-full top-0 block h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />
      </div>

      {/* Contenido del botón */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-white">
        {loading ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Evaluando...
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};

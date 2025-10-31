import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioService } from "../../services/audioService";

export const AudioControls: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(audioService.isEnabled());
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Sync with audioService state
    setIsEnabled(audioService.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = audioService.toggle();
    setIsEnabled(newState);
    audioService.play("click");
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          relative p-3 rounded-full transition-all duration-300
          ${
            isEnabled
              ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-600 hover:bg-gray-400"
          }
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isEnabled ? "Desactivar sonido" : "Activar sonido"}
      >
        {/* Sound Icon */}
        <div className="w-6 h-6 flex items-center justify-center">
          {isEnabled ? (
            // Volume On Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            // Volume Off Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          )}
        </div>

        {/* Pulse animation when enabled */}
        {isEnabled && (
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-400 opacity-30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-50"
          >
            {isEnabled ? "🔊 Sonido activado" : "🔇 Sonido desactivado"}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface UnlockAnimationProps {
  magicWord: string;
  badge: string;
  onComplete: () => void;
}

export const UnlockAnimation: React.FC<UnlockAnimationProps> = ({
  magicWord,
  badge,
  onComplete,
}) => {
  useEffect(() => {
    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#667eea", "#764ba2", "#f093fb", "#ffd200"],
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#667eea", "#764ba2", "#f093fb", "#ffd200"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Auto-complete after 3.5 seconds
    const timer = setTimeout(onComplete, 7500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-linear-to-br from-purple-600 to-indigo-700 p-12 rounded-3xl shadow-2xl text-center flex flex-col gap-y-2"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6"
        >
          <div className="text-6xl mx-auto">🎉</div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
        >
          ¡Palabra Desbloqueada!
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl mb-6"
        >
          <p className="text-6xl font-black text-yellow-300 drop-shadow-lg tracking-wider">
            {magicWord}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-3"
        >
          {/* <Award size={32} className="text-yellow-300" /> */}
          <div className="text-3xl">🎖️</div>
          <p className="text-2xl font-semibold text-white">{badge}</p>
        </motion.div>

        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/80 mt-6"
        >
          Preparándose para el siguiente nivel...
        </motion.p> */}
      </motion.div>
    </div>
  );
};

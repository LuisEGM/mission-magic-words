import React from "react";
import { motion } from "framer-motion";

interface CharacterDialogueProps {
  text: string;
  characterName?: string;
  characterImage?: string;
  position?: "left" | "right";
  className?: string;
}

export const CharacterDialogue: React.FC<CharacterDialogueProps> = ({
  text,
  characterName = "Guardián de las Historias",
  characterImage,
  position = "left",
  className = "",
}) => {
  // Placeholder character image - a wise guardian/wizard character
  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgb(139,92,246);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgb(109,40,217);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='95' fill='url(%23grad1)'/%3E%3Ctext x='100' y='130' font-size='80' text-anchor='middle' fill='white'%3E🧙‍♂️%3C/text%3E%3C/svg%3E";

  const isLeft = position === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } items-start gap-4 ${className}`}
    >
      {/* Character Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="shrink-0"
      >
        <div className="relative">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg bg-linear-to-br from-purple-500 to-purple-700">
            {/* <img
              src={characterImage || defaultImage}
              alt={characterName}
              className="w-full h-full object-cover"
            /> */}
            <div className="text-7xl text-center mt-3">🧙‍♂️</div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-purple-400 opacity-20 blur-xl animate-pulse"></div>
        </div>
      </motion.div>

      {/* Dialogue Bubble */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
        className="flex-1 relative"
      >
        {/* Character Name Tag */}
        <div
          className={`inline-block px-4 py-1 mb-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 shadow-md ${
            isLeft ? "" : "ml-auto"
          }`}
        >
          <span className="text-white font-bold text-sm md:text-base">
            {characterName}
          </span>
        </div>

        {/* Speech Bubble */}
        <div className="relative bg-white rounded-2xl shadow-xl border-2 border-purple-200 p-6 md:p-8">
          {/* Triangle pointer */}
          <div
            className={`absolute top-4 ${
              isLeft ? "-left-3" : "-right-3"
            } w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent ${
              isLeft
                ? "border-r-16 border-r-purple-200"
                : "border-l-16 border-l-purple-200"
            }`}
          ></div>
          <div
            className={`absolute top-4 ${
              isLeft ? "-left-2" : "-right-2"
            } w-0 h-0 border-t-10 border-t-transparent border-b-10 border-b-transparent ${
              isLeft
                ? "border-r-14 border-r-white"
                : "border-l-14 border-l-white"
            }`}
          ></div>

          {/* Dialogue Text */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line m-0">
              {text}
            </p>
          </div>

          {/* Decorative sparkles */}
          <div className="absolute -top-2 -right-2 text-yellow-400 text-3xl animate-pulse">
            ✨
          </div>
          <div className="absolute -bottom-2 -left-2 text-purple-400 text-3xl animate-pulse delay-300">
            ✨
          </div>
        </div>

        {/* Typing indicator animation (optional - can be used for future enhancements) */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -bottom-6 left-4 flex gap-1"
        >
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full delay-100"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full delay-200"></div>
        </motion.div> */}
      </motion.div>
    </motion.div>
  );
};

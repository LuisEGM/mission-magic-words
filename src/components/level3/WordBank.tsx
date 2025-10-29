import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface WordBankProps {
  words: string[];
  usedWords: string[];
}

export const WordBank: React.FC<WordBankProps> = ({ words, usedWords }) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="text-purple-600" size={20} />
        <h3 className="font-semibold text-gray-800">Banco de Palabras Mágicas</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Intenta usar al menos 3 de estas palabras en tu historia
      </p>
      <div className="flex flex-wrap gap-2">
        {words.map((word, index) => {
          const isUsed = usedWords.includes(word.toLowerCase());
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isUsed
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-purple-700 border border-purple-300'
              }`}
            >
              {word}
              {isUsed && ' ✓'}
            </motion.span>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Palabras usadas: {usedWords.length} / 3 mínimo
      </p>
    </div>
  );
};

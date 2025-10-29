import React from 'react';
import { motion } from 'framer-motion';

interface QuestionOptionProps {
  id: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const QuestionOption: React.FC<QuestionOptionProps> = ({
  id,
  text,
  isSelected,
  isCorrect,
  showResult,
  onClick,
  disabled
}) => {
  const getClassName = () => {
    let baseClass = 'w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ';

    if (showResult) {
      if (isSelected && isCorrect) {
        return baseClass + 'bg-green-100 border-green-500 text-green-900';
      }
      if (isSelected && !isCorrect) {
        return baseClass + 'bg-red-100 border-red-500 text-red-900';
      }
      if (!isSelected && isCorrect) {
        return baseClass + 'bg-green-50 border-green-300 text-green-800';
      }
      return baseClass + 'bg-gray-50 border-gray-300 text-gray-500';
    }

    if (isSelected) {
      return baseClass + 'bg-purple-100 border-purple-500 text-purple-900 font-semibold';
    }

    return baseClass + 'bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50 text-gray-800 cursor-pointer';
  };

  return (
    <motion.button
      whileHover={!disabled && !showResult ? { scale: 1.02 } : {}}
      whileTap={!disabled && !showResult ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={getClassName()}
    >
      <span className="font-bold mr-3 text-lg">{id.toUpperCase()}.</span>
      <span className="text-base">{text}</span>
    </motion.button>
  );
};

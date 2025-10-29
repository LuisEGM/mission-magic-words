import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface FeedbackProps {
  isCorrect: boolean;
  message: string;
  stars?: number;
}

export const Feedback: React.FC<FeedbackProps> = ({
  isCorrect,
  message,
  stars
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg flex items-start gap-3 ${
        isCorrect
          ? 'bg-green-100 border border-green-300'
          : 'bg-red-100 border border-red-300'
      }`}
    >
      {isCorrect ? (
        <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
      ) : (
        <XCircle className="text-red-600 flex-shrink-0" size={24} />
      )}
      <div className="flex-1">
        <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
          {message}
        </p>
        {isCorrect && stars !== undefined && (
          <p className="text-sm text-green-700 mt-1">
            ¡Has ganado {stars} estrellas!
          </p>
        )}
      </div>
    </motion.div>
  );
};

import React from 'react';
import { StarCounter } from '../ui/StarCounter';

interface GameHeaderProps {
  levelName: string;
  currentStars: number;
  showProgress?: boolean;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  levelName,
  currentStars,
  showProgress = true
}) => {
  return (
    <div className="w-full bg-white/10 backdrop-blur-sm border-b border-white/20 py-4 px-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">
            {levelName}
          </h2>
        </div>
        {showProgress && (
          <StarCounter count={currentStars} size="md" />
        )}
      </div>
    </div>
  );
};

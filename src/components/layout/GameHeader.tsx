import React from "react";
import { StarCounter } from "../ui/StarCounter";
import { AudioControls } from "./AudioControls";

interface GameHeaderProps {
  levelName: string;
  currentStars: number;
  showProgress?: boolean;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  levelName,
  currentStars,
  showProgress = true,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-b border-white/20 py-4 px-6 rounded-xl">
      <div className="max-w-4xl mx-auto flex justify-between items-center min-h-12 gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">
            {levelName}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          {showProgress && (
            <StarCounter
              count={currentStars}
              size="md"
              animateOnChange={true}
            />
          )}
          <AudioControls />
        </div>
      </div>
    </div>
  );
};

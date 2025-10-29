import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showLabel = true,
  color = 'bg-gradient-to-r from-purple-500 to-indigo-500'
}) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progreso
          </span>
          <span className="text-sm font-bold text-gray-900">
            {current} / {total}
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

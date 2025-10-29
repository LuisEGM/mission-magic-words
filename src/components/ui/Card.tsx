import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  elevation = 'md'
}) => {
  const elevationStyles = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  return (
    <div className={`bg-white rounded-xl ${elevationStyles[elevation]} ${className}`}>
      {children}
    </div>
  );
};

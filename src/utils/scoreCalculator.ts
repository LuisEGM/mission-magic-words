export function calculateLevelProgress(currentStars: number, maxStars: number): number {
  return Math.round((currentStars / maxStars) * 100);
}

export function getStarColor(stars: number, maxStars: number): string {
  const percentage = (stars / maxStars) * 100;
  if (percentage >= 80) return 'text-yellow-400';
  if (percentage >= 60) return 'text-blue-400';
  return 'text-gray-400';
}

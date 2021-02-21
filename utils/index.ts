export const calculateWinPercentage = (winCount: number, matchCount: number): string => {
  return ((winCount / matchCount) * 100).toFixed(2);
};

export const timeHandler = (minutes: number): string => {
  const hours: number = Math.round(minutes / 60);
  if (hours < 1) return (`${minutes} minutes`);
  return `${hours} hours ${minutes % 60} minutes`;
};

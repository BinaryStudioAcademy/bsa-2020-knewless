export function minutesToDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  if (hours === 0) return { timeUnit: 'Minutes', duration: minutes };
  return { timeUnit: 'Hours', duration: hours };
}

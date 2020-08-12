import { IDuration } from './index';

export function minutesToDuration(minutes: number): IDuration {
  const hours = Math.floor(minutes / 60);
  if (hours === 0) return { timeUnit: 'Minutes', duration: minutes };
  return { timeUnit: 'Hours', duration: hours };
}

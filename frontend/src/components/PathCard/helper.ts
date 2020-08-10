import { IDuration } from './index';

export function minutesToDuration(minutes: number): IDuration {
  const hours = Math.floor(minutes / 60);
  if (hours === 0) return { timeUnit: 'Minutes', duration: minutes };
  const days = Math.floor(hours / 24);
  if (days === 0) return { timeUnit: 'Hours', duration: hours };
  const weeks = Math.floor(days / 7);
  if (weeks === 0) return { timeUnit: 'Days', duration: days };
  return { timeUnit: 'Weeks', duration: weeks };
}

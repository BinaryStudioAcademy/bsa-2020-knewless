export function secondsFormatted(secondsOverall: number): string {
  const hours = Math.floor(secondsOverall / 3600);
  const minutes = Math.floor((secondsOverall - (hours * 3600)) / 60);
  const seconds = secondsOverall - (hours * 3600) - (minutes * 60);
  const hoursFmt = hours < 10 ? `0${hours}` : hours;
  const minutesFmt = minutes < 10 ? `0${minutes}` : minutes;
  const secondsFmt = seconds < 10 ? `0${seconds}` : seconds;
  return `${hoursFmt}:${minutesFmt}:${secondsFmt}`;
}

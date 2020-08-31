export function secondsFormatted(secondsOverall: number) {
  return new Date(secondsOverall * 1000).toISOString().substr(11, 8);
}

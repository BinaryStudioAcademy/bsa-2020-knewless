export enum ComplexityLevel {
  BEGINNER='BEGINNER',
  INTERMEDIATE='INTERMEDIATE',
  ADVANCED='ADVANCED'
}

export const levelOptions = Object.keys(ComplexityLevel).map(level => (
  { text: level.substring(0, 1).toUpperCase() + level.substring(1).toLowerCase(),
    value: level.toUpperCase() }
));

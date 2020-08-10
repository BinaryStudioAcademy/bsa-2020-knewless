import { ComplexityLevel } from './levelsEnum';

export const levelOptions = Object.keys(ComplexityLevel).filter(k => typeof ComplexityLevel[k as any] === 'number')
  .map(k => ({ key: ComplexityLevel[k as any], text: k, value: k }));

import { ILecture } from './ILecture';
import { ComplexityLevel } from './helper';

export interface ICourse {
    authorId: string;
    name: string;
    lectures: Array<ILecture>;
    level: ComplexityLevel;
    description: string;
}
import { ILecture } from './ILecture';

export interface ICourse {
    userId: string;
    name: string;
    lectures: Array<string>;
    level: string;
    description: string;
    isReleased: boolean
}
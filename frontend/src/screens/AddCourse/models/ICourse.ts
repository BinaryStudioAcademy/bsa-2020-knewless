import { ILecture } from './ILecture';

export interface ICourse {
    authorId: string;
    name: string;
    lectures: Array<ILecture>;
    level: string;
    description: string;
}
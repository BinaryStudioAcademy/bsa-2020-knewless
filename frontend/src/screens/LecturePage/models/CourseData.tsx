import {ICourse} from 'screens/LecturePage/models/ICourse';
import {ILectures} from 'screens/LecturePage/models/ILectures';
import {IAuthor} from 'screens/LecturePage/models/IAuthor';

export interface CourseData {
    id: string;
    name: string;
    lectures: ILectures[];
    author: IAuthor;
}
import { ILectures } from 'screens/LecturePage/models/ILectures';
import { IAuthor } from 'screens/LecturePage/models/IAuthor';

export interface ICourseData {
  id: string;
  name: string;
  lectures: ILectures[];
  author: IAuthor;
}

import { ICourseItem } from './ICourseItem';
import { ITag } from './ITag';

export interface ICoursesData {
  courses: ICourseItem[];
  continueCourses: ICourseItem[];
  tags: ITag[];
}
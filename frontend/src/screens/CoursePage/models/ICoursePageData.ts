import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';
import { IAuthor } from '@screens/AuthorMainPage/models/IAuthor';

export interface ICoursePageData {
  course: IFullCourseData;
  author: IAuthor;
}

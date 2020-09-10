import { IAuthor } from './IAuthor';
import { IPathCardProps } from '@components/PathCard';
import { ICourseCardProps } from '@components/CourseCard';

export interface IAuthorMainPageData {
  author: IAuthor;
  authorCourses: ICourseCardProps[];
  authorPaths: IPathCardProps[];
  pathsLoaded: boolean;
  coursesLoaded: boolean;
  authorLoaded: boolean;
}

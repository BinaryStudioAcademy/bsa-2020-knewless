import { IAuthor } from './IAuthor';
import { IAuthorCourseCardProps } from '../components/AuthorCourseCard';
import { IPathCardProps } from '@components/PathCard';

export interface IAuthorMainPageData {
  author: IAuthor;
  authorCourses: IAuthorCourseCardProps[];
  authorPaths: IPathCardProps[];
  pathsLoaded: boolean;
  coursesLoaded: boolean;
  authorLoaded: boolean;
}

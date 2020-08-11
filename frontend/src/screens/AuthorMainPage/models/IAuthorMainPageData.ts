import { IAuthor } from './IAuthor';
import { IAuthorCourseCardProps } from '../components/AuthorCourseCard';
import { IAuthorPathCardProps } from '../components/AuthorPathCard';

export interface IAuthorMainPageData {
  author: IAuthor;
  authorCourses: IAuthorCourseCardProps[];
  authorPaths: IAuthorPathCardProps[];
}

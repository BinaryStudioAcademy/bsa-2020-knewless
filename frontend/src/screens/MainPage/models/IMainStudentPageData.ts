import { ICourseCardProps } from 'components/CourseCard';
import { IPathCardProps } from 'components/PathCard';
import { IStudent } from './IStudent';

export interface IMainPageData {
  student: IStudent;
  continueCourses: ICourseCardProps[];
  recommendedCourses: ICourseCardProps[];
  paths: IPathCardProps[];
}

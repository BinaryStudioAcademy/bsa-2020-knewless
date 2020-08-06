import { ICourseCardProps } from '../components/CourseCard';
import { IPathCardProps } from '../components/PathCard';
import { INavigationSectionProps } from '../components/NavigationSection';

export interface ILandingData {
  courses: ICourseCardProps[];
  paths: IPathCardProps[];
  navigations: INavigationSectionProps[];
}

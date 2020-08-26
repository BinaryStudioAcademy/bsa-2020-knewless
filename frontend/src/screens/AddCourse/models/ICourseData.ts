import { ILecture } from '../models/ILecture';
import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';

export interface ICourseData {
  lectures: Array<ILecture>,
  editCourse: IFullCourseData,
  isLecturesLoaded: boolean,
  courseId: string
}
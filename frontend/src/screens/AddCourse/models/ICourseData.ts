import { ILecture } from '../models/ILecture';

export interface ICourseData {
  lectures: Array<ILecture>,
  isLecturesLoaded: boolean,
  courseId: string
}
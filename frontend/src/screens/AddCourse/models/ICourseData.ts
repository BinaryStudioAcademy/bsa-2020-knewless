import { ILecture } from './ILecture';
import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';
import { ITag } from '@screens/AddPath/models/domain';
import { ILectureUpdate } from './ILectureUpdate';

export interface ICourseData {
  tags: ITag[];
  lectures: Array<ILecture>;
  editCourse: IFullCourseData;
  isLecturesLoaded: boolean;
  courseId: string;
  lectureUpdate: ILectureUpdate;
}

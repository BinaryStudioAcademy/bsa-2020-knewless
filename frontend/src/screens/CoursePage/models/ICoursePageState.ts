import { IRequestState } from '@models/IRequestState';
import { ICoursePageData } from '@screens/CoursePage/models/ICoursePageData';

export interface ICoursePageState {
  requests: {
    dataRequest: IRequestState;
  };
  courseData: ICoursePageData;
}

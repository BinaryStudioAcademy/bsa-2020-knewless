import { ICoursesData } from './ICoursesData';
import { IRequestState } from '@models/IRequestState';

export interface ICoursesState {
  requests: {
    coursesRequest: IRequestState;
    coursesByTagRequest: IRequestState;
    allCoursesRequest: IRequestState;
    allAuthorCoursesRequest: IRequestState;
    allTagsRequest: IRequestState;
  };
  data: ICoursesData;
}

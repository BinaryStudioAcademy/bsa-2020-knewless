import { IRequestState } from '@models/IRequestState';
import { IMainPageData } from './IMainStudentPageData';

export interface IMainStudentPageState {
  requests: {
    continueCoursesRequest: IRequestState;
    recommendedCoursesRequest: IRequestState;
    pathsRequest: IRequestState;
  };
  mainPageData: IMainPageData;
}

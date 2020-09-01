import { ICoursesData } from './ICoursesData';
import { IRequestState } from '@models/IRequestState';
import { IAppState } from '@models/AppState';

export interface ICoursesState {
  requests: {
    coursesRequest: IRequestState;
    coursesByTagRequest: IRequestState;
    allCoursesRequest: IRequestState;
    allAuthorCoursesRequest: IRequestState;
    allTagsRequest: IRequestState;
    dataForStudentsRequest: IRequestState;
  };
  data: ICoursesData;
}

export const extractCoursesLoading = (state: IAppState) => state.coursesPage.requests.coursesRequest.loading;
export const extractCoursesByTagLoading = (state: IAppState) => state.coursesPage.requests.coursesByTagRequest.loading;
// eslint-disable-next-line max-len
export const extractDataForStudentLoading = (state: IAppState) => state.coursesPage.requests.dataForStudentsRequest.loading;
export const extractAllCoursesLoading = (state: IAppState) => state.coursesPage.requests.allCoursesRequest.loading;

import { IRequestState } from '@models/IRequestState';
import { IMainPageData } from './IMainStudentPageData';
import { IAppState } from '@models/AppState';

export interface IMainStudentPageState {
  requests: {
    studentRequest: IRequestState;
    continueCoursesRequest: IRequestState;
    recommendedCoursesRequest: IRequestState;
    pathsRequest: IRequestState;
    allGoalsRequest: IRequestState;
    currentGoalProgressRequest: IRequestState;
    setCurrentGoalRequest: IRequestState;
  };
  mainPageData: IMainPageData;
}

export const extractGoalsLoading = (state: IAppState) => state.mainPage.requests.allGoalsRequest.loading;
export const extractCurrentGoalLoading = (state: IAppState) => state.mainPage.requests
  .currentGoalProgressRequest.loading;
export const extractSetGoalLoading = (state: IAppState) => state.mainPage.requests.setCurrentGoalRequest.loading;
export const extractStudentLoading = (state: IAppState) => state.mainPage.requests.studentRequest.loading;

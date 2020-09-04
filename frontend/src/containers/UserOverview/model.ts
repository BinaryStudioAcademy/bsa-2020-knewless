import { IRequestState } from '@models/IRequestState';
import { IAppState } from '@models/AppState';

export interface IUserOverviewState {
  data: IUserOverviewData;
  requests: {
    studentRequest: IRequestState;
    authorRequest: IRequestState;
  };
}

export interface IUserOverviewData {
  student: IBriefStudentInfo;
  author: IBriefAuthorInfo;
}

export const extractAuthor = (state: IAppState) => state.userOverview.data.author;
export const extractStudent = (state: IAppState) => state.userOverview.data.student;
export const extractLoading = (state: IAppState) => state.userOverview.requests.authorRequest.loading
  || state.userOverview.requests.studentRequest.loading;

export interface IBriefPersonInfo {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface IBriefStudentInfo extends IBriefPersonInfo {
  job: string;
}

export interface IBriefAuthorInfo extends IBriefPersonInfo {
  schoolInfo: {
    id: string;
    name: string;
    logo: string;
    membersCount: number;
  };
  followers: number;
}

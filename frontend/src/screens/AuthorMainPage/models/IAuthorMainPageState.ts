import { IRequestState } from '@models/IRequestState';
import { IAuthorMainPageData } from './IAuthorMainPageData';

export interface IAuthorMainPageState {
  requests: {
    authorCoursesRequest: IRequestState;
    authorPathsRequest: IRequestState;
  };
  data: IAuthorMainPageData;
}

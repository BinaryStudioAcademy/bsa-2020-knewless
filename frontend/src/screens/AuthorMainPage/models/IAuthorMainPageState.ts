import { IRequestState } from '../../../models/IRequestState';
import { IAuthorMainPageData } from './IAuthorMainPageData';

export interface IAuthorMainPageState {
  requests: {
    dataRequest: IRequestState;
  };
  data: IAuthorMainPageData;
}

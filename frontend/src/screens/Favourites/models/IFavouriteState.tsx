import { IRequestState } from '@models/IRequestState';
import { IFavouriteData } from './IFavouriteData';

export interface IFavouriteState {
  requests: {
    authorsRequest: IRequestState;
    lecturesRequest: IRequestState;
    coursesRequest: IRequestState;
    pathsRequest: IRequestState;
    articlesRequest: IRequestState;
  };
  data: IFavouriteData;
}

import { IAddArticleData } from './AddArticleData';
import { IRequestState } from '@models/IRequestState';
import { IAppState } from '@models/AppState';

export interface IAddArticleState {
  requests: {
    saveArticleRequest: IRequestState;
  };
  data: IAddArticleData;
}

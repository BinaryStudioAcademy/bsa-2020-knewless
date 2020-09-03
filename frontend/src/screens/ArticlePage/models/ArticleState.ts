import { IArticleData } from './ArticleData';
import { IRequestState } from '@models/IRequestState';
import { IAppState } from '@models/AppState';

export interface IArticleState {
  requests: {
    fetchArticleRequest: IRequestState;
  };
  articleData: IArticleData;
}

import { IArticleData } from './ArticleData';
import { IRequestState } from '@models/IRequestState';

export interface IArticleState {
  requests: {
    fetchArticleRequest: IRequestState;
  };
  articleData: IArticleData;
}

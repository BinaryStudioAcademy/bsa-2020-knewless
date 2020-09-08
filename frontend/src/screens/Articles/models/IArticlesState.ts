import { IArticlesData } from './IArticlesData';
import { IRequestState } from '@models/IRequestState';
import { IAppState } from '@models/AppState';

export interface IArticlesState {
  requests: {
    articlesRequest: IRequestState;
  };
  data: IArticlesData;
}

export const extractArticleLoading = (state: IAppState) => state.articlesPage.requests.articlesRequest.loading;
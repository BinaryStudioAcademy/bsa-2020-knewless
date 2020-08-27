import { IRequestState } from '@models/IRequestState';
import { ISearchPageData } from './ISearchPageData';
import { IAppState } from '@models/AppState';

export interface ISearchPageState {
  requests: {
    fetchSearchRequest: IRequestState;
  };
  data: ISearchPageData;
}

export const extractSearchResults = (state: IAppState) => (state.searchPage.data.results);
export const extractTotalResults = (state: IAppState) => (state.searchPage.data.total);
export const extractIsFetching = (state: IAppState) => (state.searchPage.requests.fetchSearchRequest.loading);
export const extractTags = (state: IAppState) => (state.searchPage.data.tags);


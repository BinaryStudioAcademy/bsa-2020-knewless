import {IRequestState} from '@models/IRequestState';
import {ISearchData} from '@screens/Search/models/ISearchData';

export interface ISearchState {
  requests: {
    fetchSearchRequest: IRequestState;
  };
  search: ISearchData;
}

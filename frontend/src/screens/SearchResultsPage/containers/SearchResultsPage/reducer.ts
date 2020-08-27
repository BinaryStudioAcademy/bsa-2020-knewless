import { Routine } from 'redux-saga-routines';
import { ISearchPageData } from '@screens/SearchResultsPage/models/ISearchPageData';
import { fetchSearchRoutine, fetchTagsRoutine } from '@screens/SearchResultsPage/routines';

export const data = (state: ISearchPageData = { results: [], total: 0, tags: [] }, action: Routine<any>) => {
  switch (action.type) {
    case fetchSearchRoutine.SUCCESS:
      return {
        ...state,
        results: action.payload.results,
        total: action.payload.total
      };
    case fetchTagsRoutine.SUCCESS:
      return {
        ...state,
        tags: action.payload
      };
    default:
      return state;
  }
};

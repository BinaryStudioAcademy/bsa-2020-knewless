import { Routine } from 'redux-saga-routines';
import { IArticlesData } from '../../models/IArticlesData';
import {
  fetchArticlesRoutine,
} from '../../routines';

export const data = (state: IArticlesData = { articles: [] }, action: Routine<any>) => {
  switch (action.type) {
    case fetchArticlesRoutine.SUCCESS:
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
};

import { Routine } from 'redux-saga-routines';
import { IArticleData } from '../../models/ArticleData';
import { fetchArticleDataRoutine } from '../../routines';

const initialState = {
    article: { } as IArticleData
  };
  
export const articleData = (state = initialState , action: Routine<any>) => {
  switch (action.type) {
    case fetchArticleDataRoutine.SUCCESS:
      return {
        ...state,
        article: action.payload
      };
    default:
      return state;
  }
};

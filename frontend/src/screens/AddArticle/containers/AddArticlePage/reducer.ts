import { Routine } from 'redux-saga-routines';
import { IAddArticleData } from '../../models/AddArticleData';
import { saveArticleRoutine, fetchArticleEditRoutine } from '../../routines';

const initialState = {
    article: { } as IAddArticleData
  };
  
export const data = (state = initialState , action: Routine<any>) => {
  switch (action.type) {
    case saveArticleRoutine.SUCCESS:
      return {
        ...state,
        article: action.payload
      };
    case fetchArticleEditRoutine.SUCCESS:
        return {
          ...state,
          article: action.payload
        };
    default:
      return state;
  }
};

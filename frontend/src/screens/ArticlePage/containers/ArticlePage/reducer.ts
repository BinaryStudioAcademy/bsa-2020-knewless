import { Routine } from 'redux-saga-routines';
import { IArticleData } from '../../models/ArticleData';
import {
  fetchArticleDataRoutine,
  changeFavouriteArticleStateRoutine,
  checkFavouriteArticleStateRoutine
} from '../../routines';

const initialState = {
  article: { } as IArticleData
};

export const articleData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchArticleDataRoutine.SUCCESS:
      return {
        ...state,
        article: action.payload
      };
    case changeFavouriteArticleStateRoutine.SUCCESS: {
      return {
        ...state,
        favourite: action.payload
      };
    }
    case checkFavouriteArticleStateRoutine.SUCCESS: {
      return {
        ...state,
        favourite: action.payload
      };
    }
    default:
      return state;
  }
};

import { Routine } from 'redux-saga-routines';
import {
  fetchFavouriteArticlesRoutine,
  fetchFavouriteAuthorsRoutine,
  fetchFavouriteCoursesRoutine,
  fetchFavouriteLecturesRoutine,
  fetchFavouritePathsRoutine,
  removeArticleFavouriteRoutine,
  removeAuthorFavouriteRoutine,
  removeCourseFavouriteRoutine,
  removeLectureFavouriteRoutine,
  removePathFavouriteRoutine
} from 'screens/Favourites/routines';
import { IFavouriteData } from '../../models/IFavouriteData';

const initialState = {
  isAuthorsFetched: false,
  isLecturesFetched: false,
  isCoursesFetched: false,
  isPathsFetched: false,
  isArticlesFetched: false,
  courses: [],
  lectures: [],
  authors: [],
  paths: [],
  articles: []
};

export const data = (state: IFavouriteData = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchFavouriteAuthorsRoutine.SUCCESS:
      return {
        ...state,
        isAuthorsFetched: true,
        authors: action.payload
      };
    case fetchFavouriteCoursesRoutine.SUCCESS:
      return {
        ...state,
        isCoursesFetched: true,
        courses: action.payload
      };
    case fetchFavouriteLecturesRoutine.SUCCESS:
      return {
        ...state,
        isLecturesFetched: true,
        lectures: action.payload
      };
    case fetchFavouritePathsRoutine.SUCCESS:
      return {
        ...state,
        isPathsFetched: true,
        paths: action.payload
      };
    case fetchFavouriteArticlesRoutine.SUCCESS:
      return {
        ...state,
        isArticlesFetched: true,
        articles: action.payload
      };
    case removeLectureFavouriteRoutine.SUCCESS:
      return {
        ...state,
        lectures: action.payload
      };
    case removeCourseFavouriteRoutine.SUCCESS:
      return {
        ...state,
        courses: action.payload
      };
    case removeAuthorFavouriteRoutine.SUCCESS:
      return {
        ...state,
        authors: action.payload
      };
    case removePathFavouriteRoutine.SUCCESS:
      return {
        ...state,
        paths: action.payload
      };
    case removeArticleFavouriteRoutine.SUCCESS:
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
};

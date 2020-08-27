import { Routine } from 'redux-saga-routines';
import { fetchFavouriteAuthorsRoutine, removeCourseFavouriteRoutine,
  fetchFavouriteCoursesRoutine, fetchFavouriteLecturesRoutine } from 'screens/Favourites/routines';
import { IFavouriteData } from '../../models/IFavouriteData';

export const data = (state: IFavouriteData = { 
  isAuthorsFetched: false,
  isLecturesFetched: false,
  isCoursesFetched: false,
  courses: [],
  lectures: [],
  authors: []
 },
  action: Routine<any>) => {
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
    case removeCourseFavouriteRoutine.SUCCESS:
      return {
        ...state,
        courses: action.payload
      };
      case fetchFavouriteLecturesRoutine.SUCCESS:
        return {
          ...state,
          isLecturesFetched: true,
          lectures: action.payload
        };
    default:
      return state;
  }
};

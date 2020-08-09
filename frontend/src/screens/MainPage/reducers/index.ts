import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { studentMainPageData } from '../containers/MainStudentPage/reducer';
import {
  fetchContinueCoursesRoutine, fetchPathsRoutine, fetchRecommendedCoursesRoutine
} from '../routines';

const requests = combineReducers({
  continueCoursesRequest: reducerCreator(
    [fetchContinueCoursesRoutine.TRIGGER]
  ),
  recommendedCoursesRequest: reducerCreator(
    [fetchRecommendedCoursesRoutine.TRIGGER]
  ),
  pathsRequest: reducerCreator(
    [fetchPathsRoutine.TRIGGER]
  )
});

export default combineReducers({
  data: studentMainPageData,
  requests
});

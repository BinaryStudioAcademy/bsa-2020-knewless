import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { mainPageData } from '../containers/MainStudentPage/reducer';
import {
  fetchAllGoalsRoutine,
  fetchContinueCoursesRoutine,
  fetchCurrentGoalProgressRoutine,
  fetchPathsRoutine,
  fetchRecommendedCoursesRoutine,
  fetchStudentRoutine,
  setCurrentGoalRoutine
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
  ),
  studentRequest: reducerCreator(
    [fetchStudentRoutine.TRIGGER]
  ),
  allGoalsRequest: reducerCreator([fetchAllGoalsRoutine.TRIGGER]),
  currentGoalProgressRequest: reducerCreator([fetchCurrentGoalProgressRoutine.TRIGGER]),
  setCurrentGoalRequest: reducerCreator([setCurrentGoalRoutine.TRIGGER])
});

export default combineReducers({
  mainPageData,
  requests
});

import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { fetchCourseDataRoutine } from '@screens/CoursePage/routines';
import { courseData } from '@screens/CoursePage/containers/CoursePage/reducer';
import { saveCourseReviewRoutine } from '@screens/LecturePage/routines';

const requests = combineReducers({
  dataRequest: reducerCreator(
    [fetchCourseDataRoutine.TRIGGER]
  ),
  saveReviewRequest: reducerCreator([saveCourseReviewRoutine.TRIGGER])
});

export default combineReducers({
  courseData,
  requests
});

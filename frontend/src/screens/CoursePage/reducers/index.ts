import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { fetchCourseDataRoutine } from '@screens/CoursePage/routines';
import { courseData } from '@screens/CoursePage/containers/CoursePage/reducer';

const requests = combineReducers({
  dataRequest: reducerCreator(
    [fetchCourseDataRoutine.TRIGGER]
  )
});

export default combineReducers({
  courseData,
  requests
});

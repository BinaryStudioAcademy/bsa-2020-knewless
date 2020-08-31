import { combineReducers } from 'redux';
import {
  fetchCoursesRoutine,
  fetchCoursesByTagRoutine,
  fetchAllCoursesRoutine,
  fetchAllAuthorCoursesRoutine,
  fetchAllTagsRoutine
} from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/CoursesPage/reducer';

const requests = combineReducers({
  coursesRequest: reducerCreator([fetchCoursesRoutine.TRIGGER]),
  coursesByTagRequest: reducerCreator([fetchCoursesByTagRoutine.TRIGGER]),
  allCoursesRequest: reducerCreator([fetchAllCoursesRoutine.TRIGGER]),
  allAuthorCoursesRequest: reducerCreator([fetchAllAuthorCoursesRoutine.TRIGGER]),
  allTagsRequest: reducerCreator([fetchAllTagsRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

import { combineReducers } from 'redux';
import {
  fetchTagsRoutine,
  fetchLecturesRoutine,
  saveCourseRoutine,
  saveLectureRoutine,
  fetchEditCourseRoutine,
  updateCourseRoutine
} from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/AddCoursePage/reducer';

const requests = combineReducers({
  tagsRequest: reducerCreator([fetchTagsRoutine.TRIGGER]),
  dataRequest: reducerCreator([fetchLecturesRoutine.TRIGGER]),
  saveCourseRequest: reducerCreator([saveCourseRoutine.TRIGGER]),
  saveLectureRequest: reducerCreator([saveLectureRoutine.TRIGGER]),
  editCourseRequest: reducerCreator([fetchEditCourseRoutine.TRIGGER]),
  savingEditedCourseRequest: reducerCreator([updateCourseRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

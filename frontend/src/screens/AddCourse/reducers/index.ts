import { combineReducers } from 'redux';
import { fetchLecturesRoutine, saveCourseRoutine, saveLectureRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/AddCoursePage/reducer';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchLecturesRoutine.TRIGGER]),
  saveCourseRequest: reducerCreator([saveCourseRoutine.TRIGGER]),
  saveLectureRequest: reducerCreator([saveLectureRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

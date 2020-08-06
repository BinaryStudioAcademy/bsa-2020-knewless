import { combineReducers } from 'redux';
import { fetchLecturesRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { courseRed } from '../containers/AddCoursePage/reducer';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchLecturesRoutine.TRIGGER])
});

export default combineReducers({
  courseRed,
  requests
});

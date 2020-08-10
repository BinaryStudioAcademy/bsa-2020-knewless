import { combineReducers } from 'redux';
import { fetchLecturesRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/AddCoursePage/reducer';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchLecturesRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { data } from './reducer';
import { fetchAuthorRoutine, fetchStudentRoutine } from '@containers/UserOverview/routines';

const requests = combineReducers({
  studentRequest: reducerCreator([fetchStudentRoutine.TRIGGER]),
  authorRequest: reducerCreator([fetchAuthorRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

import { combineReducers } from 'redux';
import { fetchCoursesRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/CoursesPage/reducer';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchCoursesRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

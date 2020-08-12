import { combineReducers } from 'redux';
import { fetchCoursesRoutine, fetchTagsRoutine, savePathRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/AddPathPage/reducer';

const requests = combineReducers({
  fetchCoursesRequest: reducerCreator([fetchCoursesRoutine.TRIGGER]),
  fetchTagsRequest: reducerCreator([fetchTagsRoutine.TRIGGER]),
  savePathRequest: reducerCreator([savePathRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

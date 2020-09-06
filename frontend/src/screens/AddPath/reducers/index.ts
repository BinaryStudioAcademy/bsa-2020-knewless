import { combineReducers } from 'redux';
import { fetchCoursesRoutine, fetchTagsRoutine, savePathRoutine, fetchPathToEditRoutine, updatePathRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/AddPathPage/reducer';

const requests = combineReducers({
  fetchCoursesRequest: reducerCreator([fetchCoursesRoutine.TRIGGER]),
  fetchTagsRequest: reducerCreator([fetchTagsRoutine.TRIGGER]),
  savePathRequest: reducerCreator([savePathRoutine.TRIGGER]),
  fetchEditPathRequest: reducerCreator([fetchPathToEditRoutine.TRIGGER]),
  updatePathRequest: reducerCreator([updatePathRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

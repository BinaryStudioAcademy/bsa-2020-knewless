import { combineReducers } from 'redux';
import { fetchSearchCoursesRoutine, fetchSearchRoutine } from '@screens/Search/routines/routines';
import { reducerCreator } from '@helpers/reducer.helper';
import { searchReducer } from '@screens/Search/containers/reducer';

const requests = combineReducers({
  fetchSearchRequest: reducerCreator([fetchSearchRoutine.TRIGGER, fetchSearchRoutine.FULFILL,
    fetchSearchCoursesRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  search: searchReducer
});

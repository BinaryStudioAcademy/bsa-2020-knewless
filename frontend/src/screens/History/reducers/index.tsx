import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/HistoryPage/reducer';
import { fetchHistoryRoutine } from '../routines';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchHistoryRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});
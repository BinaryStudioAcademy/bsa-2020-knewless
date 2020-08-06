import { combineReducers } from 'redux';
import { fetchDataRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/LandingPage/reducer';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchDataRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

import { combineReducers } from 'redux';
import { fetchIsLinkValidRoutine, savePasswordRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/SavePasswordPage/reducer';

const requests = combineReducers({
  savePasswordRequest: reducerCreator([savePasswordRoutine.TRIGGER]),
  checkLinkRequest: reducerCreator([fetchIsLinkValidRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

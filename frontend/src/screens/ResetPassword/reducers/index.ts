import { combineReducers } from 'redux';
import { fetchResetLinkRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/ForgotPasswordPage/reducer';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchResetLinkRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

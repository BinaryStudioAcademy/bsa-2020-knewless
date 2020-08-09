import { loginReducer } from '../containers/LoginPage/reducer';
import { combineReducers } from 'redux';
import { reducerCreator } from '../../../helpers/reducer.helper';
import { loginRoutine } from '../../Home/routines';

const requests = combineReducers({
  loginRequest: reducerCreator([loginRoutine.TRIGGER, loginRoutine.SUCCESS])
});

export default combineReducers({
  login: loginReducer,
  requests
});

import { authReducer } from '../containers/reducer';
import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { loginRoutine, registerRoutine } from '../../Home/routines';

const requests = combineReducers({
  loginRequest: reducerCreator([loginRoutine.TRIGGER, loginRoutine.SUCCESS]),
  registerRequest: reducerCreator([registerRoutine.TRIGGER])
});

export default combineReducers({
  auth: authReducer,
  requests
});

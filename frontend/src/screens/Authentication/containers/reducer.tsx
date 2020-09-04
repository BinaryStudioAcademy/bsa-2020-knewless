import { Routine } from 'redux-saga-routines';
import { loginRoutine, registerRoutine, setNoAuthorizedRoutine } from '../../Home/routines';
import { IDataAuth } from '../models/IDataAuth';

const initialState: IDataAuth = {
  isAuthorized: false
};

export const authReducer = (state: IDataAuth = initialState, action: Routine<any>) => {
  switch (action.type) {
    case loginRoutine.SUCCESS:
    case registerRoutine.SUCCESS:
      return {
        ...state,
        isAuthorized: true
      };
    case setNoAuthorizedRoutine.TRIGGER:
      return {
        ...state,
        isAuthorized: false
      }

    default:
      return state;
  }
};

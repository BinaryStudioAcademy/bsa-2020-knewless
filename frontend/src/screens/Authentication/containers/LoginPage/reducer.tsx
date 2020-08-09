import { Routine } from 'redux-saga-routines';
import { loginRoutine } from '../../../Home/routines';
import { IDataLogin } from '../../models/IDataLogin';

const initialState: IDataLogin = {
  isAuthorized: false
};

export const loginReducer = (state: IDataLogin = initialState, action: Routine<any>) => {
  switch (action.type) {
    case loginRoutine.SUCCESS:
      return {
        ...state,
        isAuthorized: true
      };

    default:
      return state;
  }
};

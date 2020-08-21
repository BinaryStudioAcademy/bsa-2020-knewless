import { Routine } from 'redux-saga-routines';
import { fetchResetLinkRoutine } from 'screens/ResetPassword/routines';
import { IResetData } from '../../models/IResetData';

export const data = (state: IResetData = { isValidEmail: true, isFetched: false, isLoading: false },
  action: Routine<any>) => {
  switch (action.type) {
    case fetchResetLinkRoutine.SUCCESS:
      return {
        ...state,
        isFetched: true,
        isValidEmail: action.payload,
        isLoading: false
      };
    case fetchResetLinkRoutine.REQUEST:
      return {
        ...state,
        isLoading: true
      };
      case fetchResetLinkRoutine.FAILURE:
        return {
          ...state,
          isLoading: false
        };
    default:
      return state;
  }
};

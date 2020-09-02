import { IHistoryData } from '@screens/History/models/IHistoryData';
import { Routine } from 'redux-saga-routines';
import { fetchHistoryRoutine } from '@screens/History/routines';

export const data = (state: IHistoryData = { history: [] }, action: Routine<any>) => {
  switch (action.type) {
    case fetchHistoryRoutine.SUCCESS:
      return {
        ...state,
        history: action.payload
      };
    default:
      return state;
  }
};

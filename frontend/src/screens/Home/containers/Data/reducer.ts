import { Routine } from 'redux-saga-routines';
import { fetchDataRoutine } from 'screens/Home/routines';

export const data = (state = null, action: Routine<any>) => {
  switch (action.type) {
    case fetchDataRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

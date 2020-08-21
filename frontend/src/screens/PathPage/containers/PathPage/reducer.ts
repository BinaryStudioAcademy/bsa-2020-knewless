import { Routine } from 'redux-saga-routines';
import { fetchPathDataRoutine } from '@screens/PathPage/routines';

const initialState = {
  course: ''
};

export const pathData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchPathDataRoutine.SUCCESS: {
      return {
        ...state,
        course: action.payload
      };
    }
    default:
      return state;
  }
};

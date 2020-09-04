import { Routine } from 'redux-saga-routines';
import { fetchAuthorRoutine, fetchStudentRoutine } from '@containers/UserOverview/routines';

const initialState = {
  connection: undefined
};

export const data = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchAuthorRoutine.SUCCESS: {
      return {
        author: action.payload
      };
    }
    case fetchStudentRoutine.SUCCESS: {
      return {
        student: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

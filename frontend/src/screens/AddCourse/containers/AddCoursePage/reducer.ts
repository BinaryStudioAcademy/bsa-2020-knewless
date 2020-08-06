import { Routine } from 'redux-saga-routines';
import { fetchLecturesRoutine } from 'screens/AddCourse/routines';

export const courseRed = (state: {}, action: Routine<any>) => {
  switch (action.type) {
    case fetchLecturesRoutine.SUCCESS:
      return {
        ...state,
        lectures: action.payload
      }
    default:
      return state;
  }
};

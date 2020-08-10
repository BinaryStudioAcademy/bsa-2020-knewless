import { Routine } from 'redux-saga-routines';
import { fetchLecturesRoutine } from 'screens/AddCourse/routines';
import { ICourseData } from '../../models/ICourseData';

export const data = (state: ICourseData = { lectures: [], isLecturesLoaded: false }, action: Routine<any>) => {
  switch (action.type) {
    case fetchLecturesRoutine.SUCCESS:
      return {
        ...state,
        lectures: action.payload,
        isLecturesLoaded: true
      };
    default:
      return state;
  }
};

import { Routine } from 'redux-saga-routines';
import { fetchLecturesRoutine } from 'screens/AddCourse/routines';
import { ICourseData } from '../../models/ICourseData';

export const data = (state: ICourseData = { lectures: [] }, action: Routine<any>) => {
  switch (action.type) {
    case fetchLecturesRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

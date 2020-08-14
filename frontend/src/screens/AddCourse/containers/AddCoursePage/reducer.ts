import { Routine } from 'redux-saga-routines';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import { ICourseData } from '../../models/ICourseData';

export const data = (state: ICourseData = { lectures: [], isLecturesLoaded: false, courseId: '' },
  action: Routine<any>) => {
  switch (action.type) {
    case fetchLecturesRoutine.SUCCESS:
      return {
        ...state,
        lectures: action.payload,
        isLecturesLoaded: true
      };
    case saveCourseRoutine.SUCCESS:
      return {
        ...state,
        courseId: action.payload.id
      };
    default:
      return state;
  }
};

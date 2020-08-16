import { Routine } from 'redux-saga-routines';
import { fetchLecturesRoutine, saveCourseRoutine, saveLectureRoutine } from 'screens/AddCourse/routines';
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
    case saveLectureRoutine.SUCCESS:
      const { lectures } = state;
      const { id } = action.payload;
      const updated = [...lectures.filter(l => l.id !== id), action.payload];
      return {
        ...state,
        lectures: updated
      };
    default:
      return state;
  }
};

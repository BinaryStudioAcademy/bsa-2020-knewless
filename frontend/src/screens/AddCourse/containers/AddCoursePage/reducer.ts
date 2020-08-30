import { Routine } from 'redux-saga-routines';
import {
  fetchLecturesRoutine,
  saveCourseRoutine,
  saveLectureRoutine,
  fetchEditCourseRoutine,
  clearCourseRoutine
} from 'screens/AddCourse/routines';
import { ICourseData } from '../../models/ICourseData';
import { fetchTagsRoutine } from '@screens/AddPath/routines';

const initialState: ICourseData = {
  tags: [],
  lectures: [],
  editCourse: undefined,
  isLecturesLoaded: false,
  courseId: ''
};

export const data = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchTagsRoutine.SUCCESS:
      return {
        ...state,
        tags: action.payload,
        isTagsLoaded: true
      };
    case fetchLecturesRoutine.SUCCESS:
      return {
        ...state,
        lectures: action.payload,
        isLecturesLoaded: true
      };
    case fetchEditCourseRoutine.SUCCESS:
      return {
        ...state,
        editCourse: action.payload
      };
    case saveCourseRoutine.SUCCESS:
      return {
        ...state,
        courseId: action.payload.id
      };
    case clearCourseRoutine.TRIGGER:
      return {
        ...state,
        editCourse: undefined
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

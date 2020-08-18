import { Routine } from 'redux-saga-routines';
import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';
import { fetchCourseDataRoutine } from '@screens/CoursePage/routines';

const initialState = {
  course: { } as IFullCourseData
};

export const courseData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchCourseDataRoutine.SUCCESS: {
      return {
        ...state,
        course: action.payload
      };
    }
    default:
      return state;
  }
};

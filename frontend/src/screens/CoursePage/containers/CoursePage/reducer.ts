import { Routine } from 'redux-saga-routines';
import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';
import { fetchCourseDataRoutine, fetchAuthorInfoRoutine } from '@screens/CoursePage/routines';
import { saveCourseReviewRoutine } from '@screens/LecturePage/routines';

const initialState = {
  course: { } as IFullCourseData,
  author: undefined
};

export const courseData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchCourseDataRoutine.SUCCESS: {
      return {
        ...state,
        course: action.payload
      };
    }
    case fetchAuthorInfoRoutine.SUCCESS: {
      return {
        ...state,
        author: action.payload
      };
    }
    case saveCourseReviewRoutine.SUCCESS: {
      return {
        ...state,
        course: {
          ...state.course,
          rating: action.payload.rating,
          review: action.payload.review,
          ratingCount: state.course.ratingCount + 1
        }
      };
    }
    default:
      return state;
  }
};

import { Routine } from 'redux-saga-routines';
import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';
import { fetchCourseDataRoutine, changeFavouriteStateRoutine, checkFavouriteStateRoutine } from '@screens/CoursePage/routines';
import { saveCourseReviewRoutine } from '@screens/LecturePage/routines';

const initialState = {
  course: { } as IFullCourseData
};

export const courseData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchCourseDataRoutine.SUCCESS: {
      const course = action.payload;
      course.favourite = state.course.favourite;
      return {
        ...state,
        course
      };
    }
    case changeFavouriteStateRoutine.SUCCESS: {
      const { course } = state;
      course.favourite = action.payload;
      return {
        ...state,
        course
      };
    }
    case checkFavouriteStateRoutine.SUCCESS: {
      const { course } = state;
      course.favourite = action.payload;
      return {
        ...state,
        course
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

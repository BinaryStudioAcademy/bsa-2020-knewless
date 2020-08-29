import { Routine } from 'redux-saga-routines';
import { IFullCourseData } from '@screens/CoursePage/models/IFullCourseData';
import { fetchCourseDataRoutine, changeFavouriteCourseStateRoutine, checkFavouriteCourseStateRoutine,
   changeFavouriteLectureStateRoutine } from '@screens/CoursePage/routines';
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
    case changeFavouriteCourseStateRoutine.SUCCESS: {
      const { course } = state;
      course.favourite = action.payload;
      return {
        ...state,
        course
      };
    }
    case checkFavouriteCourseStateRoutine.SUCCESS: {
      const { course } = state;
      course.favourite = action.payload;
      return {
        ...state,
        course
      };
    }
    case changeFavouriteLectureStateRoutine.SUCCESS: {
      const { course } = state;
      const { lectures } = course;
      const { favourite, id } = action.payload;
      const mapper = (lecture) => {
        if (lecture.id !== id) return lecture;
        lecture.favourite = favourite;
        return lecture;
      }
      const updated = lectures.map(l => mapper(l));
      return {
        ...state,
        course: {
          ...state.course,
          lectures: updated
        }
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

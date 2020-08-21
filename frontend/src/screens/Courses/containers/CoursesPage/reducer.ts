import { Routine } from 'redux-saga-routines';
import { ICoursesData } from '../../models/ICoursesData';
import { fetchCoursesRoutine, fetchCoursesByTagRoutine, fetchAllCoursesRoutine, fetchAllAuthorCoursesRoutine, fetchAllTagsRoutine } from '../../routines';

export const data = (state: ICoursesData = { courses: [], continueCourses: [], tags: [] }, action: Routine<any>) => {
  switch (action.type) {
    case fetchCoursesRoutine.SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case fetchCoursesByTagRoutine.SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case fetchAllTagsRoutine.SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case fetchAllCoursesRoutine.SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case fetchAllAuthorCoursesRoutine.SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case fetchCoursesByTagRoutine.FAILURE:
      return {
        ...state,
        courses: []
      }
    case fetchAllCoursesRoutine.FAILURE:
      return {
        ...state,
        courses: []
      }
    default:
      return state;
  }
};

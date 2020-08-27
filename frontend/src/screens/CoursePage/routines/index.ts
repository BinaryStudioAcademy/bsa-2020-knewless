import { createRoutine } from 'redux-saga-routines';

export const fetchCourseDataRoutine = createRoutine('FETCH_COURSE_DATA',
  (courseId: string) => courseId);

export const changeFavouriteStateRoutine = createRoutine('COURSE_FAVOURITE_ACTION');

export const checkFavouriteStateRoutine = createRoutine('CHECK_COURSE_FAVOURITE');
export const startCourseRoutine = createRoutine('START_COURSE',
  (courseId: string) => courseId);

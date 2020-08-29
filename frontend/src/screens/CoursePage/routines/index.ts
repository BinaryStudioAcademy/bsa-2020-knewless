import { createRoutine } from 'redux-saga-routines';

export const fetchCourseDataRoutine = createRoutine('FETCH_COURSE_DATA',
  (courseId: string) => courseId);

export const changeFavouriteCourseStateRoutine = createRoutine('COURSE_FAVOURITE_ACTION');

export const changeFavouriteLectureStateRoutine = createRoutine('LECTURE_FAVOURITE_ACTION');

export const checkFavouriteCourseStateRoutine = createRoutine('CHECK_COURSE_FAVOURITE');

export const startCourseRoutine = createRoutine('START_COURSE',
  (courseId: string) => courseId);

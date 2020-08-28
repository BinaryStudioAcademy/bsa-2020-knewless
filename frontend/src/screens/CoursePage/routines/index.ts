import { createRoutine } from 'redux-saga-routines';

export const fetchCourseDataRoutine = createRoutine('FETCH_COURSE_DATA',
  (courseId: string) => courseId);
export const startCourseRoutine = createRoutine('START_COURSE',
  (courseId: string) => courseId);

export const fetchAuthorInfoRoutine = createRoutine('FETCH_AUTHOR_INFO');

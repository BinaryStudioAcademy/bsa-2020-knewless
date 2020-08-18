import { createRoutine } from 'redux-saga-routines';

export const fetchCourseDataRoutine = createRoutine('FETCH_COURSE_DATA',
  (courseId: string) => courseId);

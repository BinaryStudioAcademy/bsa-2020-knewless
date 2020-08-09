import { createRoutine } from 'redux-saga-routines';

export const fetchContinueCoursesRoutine = createRoutine(
  'FETCH_CONTINUE_COURSES_DATA',
  (id: string) => id
);
export const fetchRecommendedCoursesRoutine = createRoutine(
  'FETCH_RECOMMENDED_COURSES_DATA',
  (id: string) => id
);
export const fetchPathsRoutine = createRoutine('FETCH_PATHS_DATA');

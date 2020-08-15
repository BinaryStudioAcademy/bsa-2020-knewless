import { createRoutine } from 'redux-saga-routines';

export const fetchAuthorRoutine = createRoutine('FETCH_AUTHOR');

export const fetchAuthorCoursesRoutine = createRoutine(
  'FETCH_AUTHOR_COURSES_DATA',
  (id: string) => id
);

export const fetchAuthorPathsRoutine = createRoutine(
  'FETCH_AUTHOR_PATHS_DATA',
  (id: string) => id
);

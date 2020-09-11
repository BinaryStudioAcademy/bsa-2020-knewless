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

export const fetchStudentRoutine = createRoutine('FETCH_STUDENT');

export const fetchAllGoalsRoutine = createRoutine('STUDENT_MAIN_PAGE:FETCH_ALL_GOALS');
export const fetchCurrentGoalProgressRoutine = createRoutine('STUDENT_MAIN_PAGE:FETCH_CURRENT_GOAL_PROGRESS');
export const setCurrentGoalRoutine = createRoutine('STUDENT_MAIN_PAGE:SET_CURRENT_GOAL');
export const setCongratsShownRoutine = createRoutine('STUDENT_MAIN_PAGE:SET_CONGRATS_SHOWN');

import { createRoutine } from 'redux-saga-routines';

export const fetchFavouriteCoursesRoutine = createRoutine('FETCH_FAVOURITE_COURSES');
export const fetchFavouriteAuthorsRoutine = createRoutine('FETCH_FAVOURITE_AUTHORS');
export const fetchFavouriteLecturesRoutine = createRoutine('FETCH_FAVOURITE_LECTURES');
export const fetchFavouritePathsRoutine = createRoutine('FETCH_FAVOURITE_PATHS');
export const removeCourseFavouriteRoutine = createRoutine('COURSE_FAVOURITE_REMOVE');
export const removeAuthorFavouriteRoutine = createRoutine('AUTHOR_FAVOURITE_REMOVE');
export const removeLectureFavouriteRoutine = createRoutine('LECTURE_FAVOURITE_REMOVE');
export const removePathFavouriteRoutine = createRoutine('PATH_FAVOURITE_REMOVE');
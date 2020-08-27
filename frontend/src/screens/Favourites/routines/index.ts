import { createRoutine } from 'redux-saga-routines';

export const fetchFavouriteCoursesRoutine = createRoutine('FETCH_FAVOURITE_COURSES');
export const fetchFavouriteAuthorsRoutine = createRoutine('FETCH_FAVOURITE_AUTHORS');
export const fetchFavouriteLecturesRoutine = createRoutine('FETCH_FAVOURITE_LECTURES');
export const removeCourseFavouriteRoutine = createRoutine('COURSE_FAVOURITE_REMOVE');

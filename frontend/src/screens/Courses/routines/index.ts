import { createRoutine } from 'redux-saga-routines';

export const fetchCoursesRoutine = createRoutine('FETCH_COURSES_DATA');
export const fetchCoursesByTagRoutine = createRoutine('FETCH_COURSES_BY_TAG_DATA');
export const fetchAllCoursesRoutine = createRoutine('FETCH_ALL_COURSES_DATA');
export const fetchAllTagsRoutine = createRoutine('FETCH_ALL_TAGS_DATA');
export const fetchAllAuthorCoursesRoutine = createRoutine('FETCH_ALL_AUTHOR_COURSES_DATA');
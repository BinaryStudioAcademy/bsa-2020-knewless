import { createRoutine } from 'redux-saga-routines';

const prefix = 'COURSES_PAGE:';
export const fetchCoursesRoutine = createRoutine(`${prefix}:FETCH_COURSES_DATA`);
export const fetchCoursesByTagRoutine = createRoutine(`${prefix}FETCH_COURSES_BY_TAG_DATA`);
export const fetchAllCoursesRoutine = createRoutine(`${prefix}FETCH_ALL_COURSES_DATA`);
export const fetchAllTagsRoutine = createRoutine(`${prefix}FETCH_ALL_TAGS_DATA`);
export const fetchAllAuthorCoursesRoutine = createRoutine(`${prefix}FETCH_ALL_AUTHOR_COURSES_DATA`);
export const fetchDataForStudentRoutine = createRoutine(`${prefix}FETCH_ALL_DATA_FOR_STUDENT`);

import { createRoutine } from 'redux-saga-routines';

export const fetchLecturesRoutine = createRoutine('FETCH_LECTURES');
export const fetchTagsRoutine = createRoutine('FETCH_TAGS');
export const fetchEditCourseRoutine = createRoutine('FETCH_EDIT_COURSE');
export const saveCourseRoutine = createRoutine('SAVE_COURSE');
export const updateCourseRoutine = createRoutine('UPDATE_COURSE');
export const clearCourseRoutine = createRoutine('CLEAR_COURSE');
export const saveLectureRoutine = createRoutine('SAVE_LECTURE');

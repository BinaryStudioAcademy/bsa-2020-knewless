import { createRoutine } from 'redux-saga-routines';

export const fetchLecturesRoutine = createRoutine('FETCH_LECTURES');
export const saveCourseRoutine = createRoutine('SAVE_COURSE');
export const saveLectureRoutine = createRoutine('SAVE_LECTURE');

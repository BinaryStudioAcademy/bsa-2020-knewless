import { createRoutine } from 'redux-saga-routines';

export const fetchCourseDtoRoutine = createRoutine('FETCH_COURSE_DTO');
export const saveCourseReviewRoutine = createRoutine('SAVE_COURSE_REVIEW');

export const setMenuActiveItemRoutine = createRoutine('SET_MENU_ACTIVE_ITEM');
export const chooseVideoRoutine = createRoutine('CHOOSE_VIDEO');
export const chooseVideoQualityRoutine = createRoutine('CHOOSE_QUALITY');

export const saveWatchTimeRoutine = createRoutine('SAVE_WATCH_TIME');

export const changeFavouriteLectureStateRoutine = createRoutine('CHANGE_FAVOURITE_LECTURE');

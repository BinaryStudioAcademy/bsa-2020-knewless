import { createRoutine } from 'redux-saga-routines';
import { IPath } from '../models/domain';

export const fetchCoursesRoutine = createRoutine('FETCH_COURSES');
export const fetchTagsRoutine = createRoutine('FETCH_TAGS');
export const fetchPathToEditRoutine = createRoutine('FETCH_PATH_TO_EDIT');
export const updatePathRoutine = createRoutine('UPDATE_PATH');
export const savePathRoutine = createRoutine('SAVE_PATH', (path: IPath) => path);

import { createRoutine } from 'redux-saga-routines';
import { IPath } from '../models/domain';

export const fetchCoursesRoutine = createRoutine('FETCH_COURSES');
export const fetchTagsRoutine = createRoutine('FETCH_TAGS');
export const savePathRoutine = createRoutine('SAVE_PATH', (path: IPath) => path);

import { createRoutine } from 'redux-saga-routines';

export const fetchPathsAndTagsRoutine = createRoutine('FETCH_PATHS_TAGS_AND_MY_PATHS');
export const fetchPathsByTagRoutine = createRoutine('FETCH_PATHS_BY_TAG_DATA');
export const fetchAllPathsRoutine = createRoutine('FETCH_ALL_PATHS_DATA');
export const fetchAllTagsRoutine = createRoutine('FETCH_ALL_TAGS_DATA');
export const fetchAllAuthorPathsRoutine = createRoutine('FETCH_ALL_AUTHOR_PATHS_DATA');

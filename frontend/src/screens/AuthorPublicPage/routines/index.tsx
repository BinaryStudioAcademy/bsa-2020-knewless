import { createRoutine } from 'redux-saga-routines';

export const fetchAuthorDataRoutine = createRoutine('FETCH_AUTHOR_DATA');

export const setAuthorMenuActiveItemRoutine = createRoutine('SET_PUBLIC_AUTHOR_NAME_ITEM');

export const followAuthorRoutine = createRoutine('FOLLOW_AUTHOR');

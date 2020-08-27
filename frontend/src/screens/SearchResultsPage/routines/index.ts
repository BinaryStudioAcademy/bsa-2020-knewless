import { createRoutine } from 'redux-saga-routines';

export const fetchSearchRoutine = createRoutine('SEARCH_PAGE:SEARCH');
export const fetchTagsRoutine = createRoutine('SEARCH_PAGE:GET_TAGS');

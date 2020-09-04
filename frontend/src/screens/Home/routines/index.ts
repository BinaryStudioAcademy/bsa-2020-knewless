import { createRoutine } from 'redux-saga-routines';

export const fetchDataRoutine = createRoutine('FETCH_DATA');
export const loginRoutine = createRoutine('LOGIN');
export const registerRoutine = createRoutine('REGISTER');
export const setNoAuthorizedRoutine = createRoutine('NO_AUTHORIZED');

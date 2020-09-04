import { createRoutine } from 'redux-saga-routines';

export const fetchPathDataRoutine = createRoutine('FETCH_PATH_DATA',
  (pathId: string) => pathId);

export const changeFavouritePathStateRoutine = createRoutine('PATH_FAVOURITE_ACTION');

export const checkFavouritePathStateRoutine = createRoutine('CHECK_PATH_FAVOURITE');

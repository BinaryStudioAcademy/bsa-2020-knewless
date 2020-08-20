import { createRoutine } from 'redux-saga-routines';

export const fetchPathDataRoutine = createRoutine('FETCH_PATH_DATA',
  (pathId: string) => pathId);

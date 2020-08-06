import { Routine } from 'redux-saga-routines';
import { ILandingData } from '../../models/ILandingData';
import { fetchDataRoutine } from '../../routines';

export const data = (state: ILandingData = { courses: [], navigations: [], paths: [] }, action: Routine<any>) => {
  switch (action.type) {
    case fetchDataRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

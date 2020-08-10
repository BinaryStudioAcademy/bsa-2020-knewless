import { Routine } from 'redux-saga-routines';
import { IAddPathData } from '../../models/AddPathData';
import { fetchCoursesRoutine } from '../../routines';

export const data = (state: IAddPathData = { message: '' }, action: Routine<any>) => {
  switch (action.type) {
    case fetchCoursesRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

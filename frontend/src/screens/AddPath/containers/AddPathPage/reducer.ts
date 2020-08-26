import { Routine } from 'redux-saga-routines';
import { IAddPathData } from '../../models/AddPathData';
import { fetchCoursesRoutine, fetchTagsRoutine, fetchPathToEditRoutine } from '../../routines';

export const data = (state: IAddPathData = { courses: [], tags: [], editPath: undefined }, action: Routine<any>) => {
  switch (action.type) {
    case fetchCoursesRoutine.SUCCESS:
      return {
        ...state,
        courses: action.payload
      };
    case fetchTagsRoutine.SUCCESS:
      return {
        ...state,
        tags: action.payload
      };
    case fetchPathToEditRoutine.SUCCESS:
      return {
        ...state,
        editPath: action.payload
      };
    default:
      return state;
  }
};

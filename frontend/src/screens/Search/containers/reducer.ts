import {ISearchData} from '@screens/Search/models/ISearchData';
import {Routine} from 'redux-saga-routines';
import {fetchSearchRoutine} from '@screens/Search/routines/routines';

const initialState: ISearchData = {
  data: []
};

export const searchReducer = (state: ISearchData = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchSearchRoutine.FAILURE:
      return {
        ...state,
        data: []
      };
    case fetchSearchRoutine.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case fetchSearchRoutine.FULFILL:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
};

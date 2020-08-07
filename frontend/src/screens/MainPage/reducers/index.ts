import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { mainPageData } from '../containers/MainStudentPage/reducer';
import { fetchDataRoutine } from '../routines';

const requests = combineReducers({
  dataRequest: reducerCreator(
    [fetchDataRoutine.TRIGGER]
  )
});

export default combineReducers({
  mainPageData,
  requests
});

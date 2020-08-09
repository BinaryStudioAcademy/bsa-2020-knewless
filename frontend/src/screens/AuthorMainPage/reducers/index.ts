import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { authorMainPageData } from '../containers/MainPage/reducer';
import { fetchAuthorDataRoutine } from '../routines';

const requests = combineReducers({
  dataRequest: reducerCreator(
    [fetchAuthorDataRoutine.TRIGGER]
  )
});

export default combineReducers({
  data: authorMainPageData,
  requests
});

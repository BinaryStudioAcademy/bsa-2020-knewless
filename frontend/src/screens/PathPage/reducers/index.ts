import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { fetchPathDataRoutine } from '@screens/PathPage/routines';
import { pathData } from '@screens/PathPage/containers/PathPage/reducer';

const requests = combineReducers({
  dataRequest: reducerCreator(
    [fetchPathDataRoutine.TRIGGER]
  )
});

export default combineReducers({
  pathData,
  requests
});

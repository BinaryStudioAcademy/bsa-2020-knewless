import { combineReducers } from 'redux';
import { fetchPathsRoutine, fetchPathsByTagRoutine, fetchAllPathsRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/PathsPage/reducer';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchPathsRoutine.TRIGGER]),
  pathsByTagRequest: reducerCreator([fetchPathsByTagRoutine.TRIGGER]),
  allPathsRequest: reducerCreator([fetchAllPathsRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

import { combineReducers } from 'redux';
import {
  fetchPathsAndTagsRoutine,
  fetchPathsByTagRoutine,
  fetchAllPathsRoutine,
  fetchAllAuthorPathsRoutine,
  fetchAllTagsRoutine
} from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/PathsPage/reducer';

const requests = combineReducers({
  pathsAndTagsRequest: reducerCreator([fetchPathsAndTagsRoutine.TRIGGER]),
  pathsByTagRequest: reducerCreator([fetchPathsByTagRoutine.TRIGGER]),
  allPathsRequest: reducerCreator([fetchAllPathsRoutine.TRIGGER]),
  authorPathsRequest: reducerCreator([fetchAllAuthorPathsRoutine.TRIGGER]),
  allTagsRequest: reducerCreator([fetchAllTagsRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

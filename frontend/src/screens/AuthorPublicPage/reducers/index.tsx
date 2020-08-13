import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { authorData, authorMenu } from '../containers/AuthorPublicPage/reducers';
import { fetchAuthorDataRoutine } from '../routines';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchAuthorDataRoutine.TRIGGER])
});

export default combineReducers({
  authorData,
  authorMenu,
  requests
});

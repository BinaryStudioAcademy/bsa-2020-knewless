 import { combineReducers } from 'redux';
import { saveArticleRoutine} from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/AddArticlePage/reducer';

const requests = combineReducers({
  saveArticleRequest: reducerCreator([saveArticleRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

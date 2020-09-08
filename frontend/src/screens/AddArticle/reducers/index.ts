 import { combineReducers } from 'redux';
import { saveArticleRoutine, fetchArticleEditRoutine} from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/AddArticlePage/reducer';

const requests = combineReducers({
  saveArticleRequest: reducerCreator([saveArticleRoutine.TRIGGER]) ,
  fetchArticleEditRequest: reducerCreator([fetchArticleEditRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

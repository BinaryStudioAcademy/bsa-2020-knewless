 import { combineReducers } from 'redux';
import { fetchArticleDataRoutine} from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { articleData } from '../containers/ArticlePage/reducer';

const requests = combineReducers({
  fetchArticleRequest: reducerCreator([fetchArticleDataRoutine.TRIGGER])
});

export default combineReducers({
  articleData,
  requests
});

import { combineReducers } from 'redux';
import {
  fetchArticlesRoutine,
} from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/ArticlesPage/reducer';

const requests = combineReducers({
  articlesRequest: reducerCreator([fetchArticlesRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/SearchResultsPage/reducer';
import { fetchSearchRoutine } from '@screens/SearchResultsPage/routines';

const requests = combineReducers({
  // as you add more fields, please update screens\Home\models\ISearchPageState.ts
  fetchSearchRequest: reducerCreator([fetchSearchRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

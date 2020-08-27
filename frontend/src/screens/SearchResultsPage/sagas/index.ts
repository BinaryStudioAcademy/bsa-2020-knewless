import { all } from 'redux-saga/effects';
import searchPageSagas from '@screens/SearchResultsPage/containers/SearchResultsPage/sagas';

export default function* homeSagas() {
  yield all([
    searchPageSagas()
  ]);
}

 import { all } from 'redux-saga/effects';
import articleSagas from '../containers/AddArticlePage/sagas';

export default function* addArticleSagas() {
  yield all([
    articleSagas()
  ]);
}

 import { all } from 'redux-saga/effects';
import articleSagas from '../containers/ArticlePage/sagas';

export default function* articlePageSagas() {
  yield all([
    articleSagas()
  ]);
}

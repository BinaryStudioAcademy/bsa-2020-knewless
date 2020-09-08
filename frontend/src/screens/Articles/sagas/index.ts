import { all } from 'redux-saga/effects';
import articlesPageContainerSagas from '../containers/ArticlesPage/sagas';

export default function* articlesPageSagas() {
  yield all([
    articlesPageContainerSagas()
  ]);
}

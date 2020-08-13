import { all } from 'redux-saga/effects';
import authorSagas from '../containers/AuthorPublicPage/sagas';

export default function* authroPublicSagas() {
  yield all([
    authorSagas()
  ]);
}

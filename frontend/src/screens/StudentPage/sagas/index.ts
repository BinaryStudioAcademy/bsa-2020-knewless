import { all } from 'redux-saga/effects';
import studentProfileSagas from '../containers/StudentProfilePage/sagas';

export default function* homeSagas() {
  yield all([
    studentProfileSagas()
  ]);
}

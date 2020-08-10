import { all } from 'redux-saga/effects';
import pathSagas from '../containers/AddPathPage/sagas';

export default function* addPathSagas() {
  yield all([
    pathSagas()
  ]);
}

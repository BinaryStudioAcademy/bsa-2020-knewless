import { all } from 'redux-saga/effects';
import dataSagas from '../containers/Lectures/sagas';

export default function* lecturesSagas() {
  yield all([
    dataSagas()
  ]);
}

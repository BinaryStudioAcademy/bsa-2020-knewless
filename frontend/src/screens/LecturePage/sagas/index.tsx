import { all } from 'redux-saga/effects';
import { dataSagas, playerSagas } from '../containers/Lectures/sagas';

export default function* lecturesSagas() {
  yield all([
    dataSagas(),
    playerSagas()
  ]);
}

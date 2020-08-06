import { all } from 'redux-saga/effects';
import dataSagas from '../containers/LandingPage/sagas';

export default function* landingSagas() {
  yield all([
    dataSagas()
  ]);
}

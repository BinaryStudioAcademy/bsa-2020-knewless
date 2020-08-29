import { all } from 'redux-saga/effects';
import pathDataSagas from '@screens/PathPage/containers/PathPage/sagas';

export default function* pathPageSagas() {
  yield all([
    pathDataSagas()
  ]);
}

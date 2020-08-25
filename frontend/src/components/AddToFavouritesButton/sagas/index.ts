import { all } from 'redux-saga/effects';
import favouriteButtonSagas from '../component/sagas';

export default function* favouriteStateSagas() {
  yield all([
    favouriteButtonSagas()
  ]);
}

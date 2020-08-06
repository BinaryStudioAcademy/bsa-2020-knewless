import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import landingSagas from 'screens/Landing/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    landingSagas()
  ]);
}

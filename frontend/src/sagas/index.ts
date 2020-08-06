import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import addCourseSagas from 'screens/AddCourse/sagas';

export default function* rootSaga() {
  yield all([
    homeSagas(),
    addCourseSagas()
  ]);
}

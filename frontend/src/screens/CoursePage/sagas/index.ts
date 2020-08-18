import { all } from 'redux-saga/effects';
import courseDataSagas from '@screens/CoursePage/containers/CoursePage/sagas';

export default function* coursePageSagas() {
  yield all([
    courseDataSagas()
  ]);
}

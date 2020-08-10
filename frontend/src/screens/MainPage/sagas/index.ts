import { all } from 'redux-saga/effects';
import studentMainPageSagas from '../containers/MainStudentPage/sagas';

export default function* homeSagas() {
  yield all([
    studentMainPageSagas()
  ]);
}

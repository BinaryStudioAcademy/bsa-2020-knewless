import { all } from 'redux-saga/effects';
import mainStudentPageSagas from '../containers/MainStudentPage/sagas';

export default function* homeSagas() {
  yield all([
    mainStudentPageSagas()
  ]);
}

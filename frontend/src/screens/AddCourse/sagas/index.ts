import { all } from 'redux-saga/effects';
import lectureSagas from '../containers/AddCoursePage/sagas';

export default function* addCourseSagas() {
  yield all([
    lectureSagas()
  ]);
}

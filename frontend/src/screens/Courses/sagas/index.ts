import { all } from 'redux-saga/effects';
import coursesPageContainerSagas from '../containers/CoursesPage/sagas';

export default function* coursesPageSagas() {
  yield all([
    coursesPageContainerSagas()
  ]);
}
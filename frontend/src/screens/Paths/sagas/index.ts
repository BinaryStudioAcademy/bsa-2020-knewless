import { all } from 'redux-saga/effects';
import pathsPageContainerSagas from '../containers/PathsPage/sagas';

export default function* pathsPageSagas() {
  yield all([
    pathsPageContainerSagas()
  ]);
}
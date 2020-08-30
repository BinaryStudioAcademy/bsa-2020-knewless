import { all } from 'redux-saga/effects';
import historyPageContainerSagas from '../containers/HistoryPage/sagas';

export default function* historyPageSagas() {
  yield all([
    historyPageContainerSagas()
  ]);
}
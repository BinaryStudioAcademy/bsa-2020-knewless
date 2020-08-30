import { fetchHistoryRoutine } from "@screens/History/routines";
import { takeEvery, call, put, all } from "redux-saga/effects";
import * as historyService from '../../services/history.page.service';

function* getHistory() {
  try {
    const history = yield call(historyService.getHistory);

    yield put(fetchHistoryRoutine.success(history));
  } catch (error) {
    yield put(fetchHistoryRoutine.failure(error?.message));
  }
}

function* watchGetHistoryRequest() {
  yield takeEvery(fetchHistoryRoutine.TRIGGER, getHistory);
}

export default function* historyPageContainerSagas() {
  yield all([
    watchGetHistoryRequest()
  ]);
}
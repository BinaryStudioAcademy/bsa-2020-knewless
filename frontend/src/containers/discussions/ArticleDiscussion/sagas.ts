import { all, takeEvery, call, put } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import {
  fetchMessagesRoutine,
  sendMessageRoutine
} from '@containers/discussions/ArticleDiscussion/routines';
import { getMessagesForArticle, sendMessage } from '@containers/discussions/ArticleDiscussion/service';
import { toastr } from 'react-redux-toastr';

function* tryFetchMessages({ payload }: AnyAction) {
  try {
    const messages = yield call(getMessagesForArticle, payload);
    yield put(fetchMessagesRoutine.success(messages));
  } catch (error) {
    toastr.error(error.message);
    yield put(fetchMessagesRoutine.failure(error.message));
  }
}

function* watchTryFetchMessages() {
  yield takeEvery(fetchMessagesRoutine.TRIGGER, tryFetchMessages);
}

function* trySendMessage({ payload }: AnyAction) {
  try {
    const sentMessage = yield call(sendMessage, payload);
    yield put(sendMessageRoutine.success(sentMessage));
  } catch (error) {
    toastr.error(error.message);
    yield put(sendMessageRoutine.failure(error.message || 'Server not responding'));
  }
}

function* watchTrySendMessage() {
  yield takeEvery(sendMessageRoutine.TRIGGER, trySendMessage);
}

export default function* articleDiscussionSagas() {
  yield all([
    watchTryFetchMessages(),
    watchTrySendMessage()
  ]);
}

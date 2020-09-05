import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchArticleDataRoutine } from '../../routines';
import * as articleService from '../../services/article.service';
import { AnyAction } from 'redux';

function* getArticle({ payload }: AnyAction) {
  try {
    const response = yield call(articleService.getArticle, payload);
    yield put(fetchArticleDataRoutine.success(response));
  } catch (error) {
    yield put(fetchArticleDataRoutine.failure(error?.message || error));
  }
}

function* watchFetchArticleTriggers() {
  yield takeEvery(fetchArticleDataRoutine.TRIGGER, getArticle);
}

export default function* articleSagas() {
  yield all([
    watchFetchArticleTriggers()
  ]);
}

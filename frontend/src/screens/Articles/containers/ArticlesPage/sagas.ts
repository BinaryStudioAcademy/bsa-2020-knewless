import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchArticlesRoutine
} from '../../routines';
import * as articlesService from '../../services/articles.page.service';
import { Routine } from 'redux-saga-routines';

function* getArticles() {
  try {
    const response = yield call(articlesService.getArticles);

    yield put(fetchArticlesRoutine.success(response));
  } catch (error) {
    yield put(fetchArticlesRoutine.failure(error?.message));
  }
}

function* watchGetArticlesRequest() {
  yield takeEvery(fetchArticlesRoutine.TRIGGER, getArticles);
}

export default function* articlesPageContainerSagas() {
  yield all([
    watchGetArticlesRequest()
  ]);
}

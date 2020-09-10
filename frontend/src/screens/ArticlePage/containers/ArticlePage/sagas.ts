import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchArticleDataRoutine,
  changeFavouriteArticleStateRoutine,
  checkFavouriteArticleStateRoutine
} from '../../routines';
import * as articleService from '../../services/article.service';
import { AnyAction } from 'redux';
import { Routine } from 'redux-saga-routines';

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

function* changeFavouriteArticle({ payload }: AnyAction) {
  try {
    const response = yield call(articleService.changeFavouriteState, payload);
    yield put(changeFavouriteArticleStateRoutine.success(response));
  } catch (error) {
    yield put(changeFavouriteArticleStateRoutine.failure(error?.message || error));
  }
}

function* watchChangeFavouriteArticleTriggers() {
  yield takeEvery(changeFavouriteArticleStateRoutine.TRIGGER, changeFavouriteArticle);
}

function* checkFavouriteArticleState(action: Routine<any>) {
  try {
    const response = yield call(articleService.checkFavouriteState, action.payload);
    yield put(checkFavouriteArticleStateRoutine.success(response));
  } catch (error) {
    yield put(checkFavouriteArticleStateRoutine.failure(error?.message || error));
  }
}

function* watchCheckFavouriteArticleState() {
  yield takeEvery(checkFavouriteArticleStateRoutine.TRIGGER, checkFavouriteArticleState);
}

export default function* articleSagas() {
  yield all([
    watchFetchArticleTriggers(),
    watchChangeFavouriteArticleTriggers(),
    watchCheckFavouriteArticleState()
  ]);
}

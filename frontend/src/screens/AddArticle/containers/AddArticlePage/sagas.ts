 import { all, call, put, takeEvery } from 'redux-saga/effects';
import { saveArticleRoutine , fetchArticleEditRoutine} from '../../routines';
import * as addArticleService from '../../services/add-article.service';
import * as imageService from 'services/image.service';
import { AnyAction } from 'redux';
import { Routine } from 'redux-saga-routines';
import { history } from '@helpers/history.helper';


function* saveArticle({ payload }: AnyAction) {
  try {
    const article = payload;
    if (article?.uploadImage) {
      const { link } = yield call(() => imageService.uploadImage(article.uploadImage));
      article.image = link;
    }
    const response = yield call(addArticleService.saveArticle, payload);
    yield put(saveArticleRoutine.success(response));
    addArticleService.forwardArticles();
  } catch (error) {
    yield put(saveArticleRoutine.failure(error?.message));
  }
}

function* watchSaveArticleTriggers() {
  yield takeEvery(saveArticleRoutine.TRIGGER, saveArticle);
}
function* getArticle(action: Routine<any>) {
  try {
    const response = yield call(addArticleService.getArticleById, action.payload);
    yield put(fetchArticleEditRoutine.success(response));
    } catch (error) {
    history.push('/');
    yield put(fetchArticleEditRoutine.failure(error?.message));
  }
}

function* watchGetArticleRequest() {
  yield takeEvery(fetchArticleEditRoutine.TRIGGER, getArticle);
}
export default function* articleSagas() {
  yield all([
    watchSaveArticleTriggers(),
    watchGetArticleRequest()
  ]);
}

 import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { saveArticleRoutine } from '../../routines';
import * as addArticleService from '../../services/add-article.service';
import * as imageService from 'services/image.service';
import { AnyAction } from 'redux';



function* saveArticle({ payload }: AnyAction) {
  try {
    const article = payload;
    if (article?.uploadImage) {
      const { link } = yield call(() => imageService.uploadImage(article.uploadImage));
      article.image = link;
    }
    const response = yield call(addArticleService.saveArticle, payload);
    yield put(saveArticleRoutine.success(response));
  } catch (error) {
    yield put(saveArticleRoutine.failure(error?.message));
  }
}

function* watchSaveArticleTriggers() {
  yield takeEvery(saveArticleRoutine.TRIGGER, saveArticle);
}

export default function* articleSagas() {
  yield all([
    watchSaveArticleTriggers()
  ]);
}

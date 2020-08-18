import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import * as publicAuthorPageService from 'screens/AuthorPublicPage/services/publicAuthorPageService';
import { Routine } from 'redux-saga-routines';
import { fetchAuthorDataRoutine, followAuthorRoutine } from 'screens/AuthorPublicPage/routines';

function* getAuthorData(action: Routine<any>) {
  try {
    const response = yield call(publicAuthorPageService.getData, action.payload);
    yield put(fetchAuthorDataRoutine.success(response));
  } catch (error) {
    yield put(fetchAuthorDataRoutine.failure(error?.message));
    toastr.error('Oops... there was some problems :(');
  }
}

function* followAuthor(action: Routine<any>) {
  try {
    const response = yield call(publicAuthorPageService.followAuthor, action.payload);
    console.log('followAuthor saga: ', action.payload);
    yield put(followAuthorRoutine.success(response));
  } catch (error) {
    yield put(followAuthorRoutine.failure(error?.message));
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchAuthorDataRoutine.TRIGGER, getAuthorData);
  yield takeEvery(followAuthorRoutine.TRIGGER, followAuthor);
}

export default function* dataSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}

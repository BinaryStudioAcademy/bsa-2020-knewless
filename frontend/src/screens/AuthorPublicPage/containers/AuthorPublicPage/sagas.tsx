import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import * as publicAuthorPageService from 'screens/AuthorPublicPage/services/publicAuthorPageService';
import { Routine } from 'redux-saga-routines';
import { fetchAuthorDataRoutine, followAuthorRoutine, unfollowAuthorRoutine } from 'screens/AuthorPublicPage/routines';

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
    const subscription = {
      sourceId: action.payload,
      sourceType: 'AUTHOR'
    };
    const response = yield call(publicAuthorPageService.followAuthor, subscription);
    yield put(followAuthorRoutine.success(response));
  } catch (error) {
    yield put(followAuthorRoutine.failure(error?.message));
  }
}

function* unfollowAuthor(action: Routine<any>) {
  try {
    const subscription = {
      sourceId: action.payload,
      sourceType: 'AUTHOR'
    };
    const response = yield call(publicAuthorPageService.unfollowAuthor, subscription);
    yield put(unfollowAuthorRoutine.success(response));
  } catch (error) {
    yield put(unfollowAuthorRoutine.failure(error?.message));
  }
}
function* watchGetDataRequest() {
  yield takeEvery(fetchAuthorDataRoutine.TRIGGER, getAuthorData);
  yield takeEvery(followAuthorRoutine.TRIGGER, followAuthor);
  yield takeEvery(unfollowAuthorRoutine.TRIGGER, unfollowAuthor);
}

export default function* dataSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}

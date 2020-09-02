import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import * as publicAuthorPageService from 'screens/AuthorPublicPage/services/publicAuthorPageService';
import { Routine } from 'redux-saga-routines';
import { fetchAuthorDataRoutine, followAuthorRoutine,
  unfollowAuthorRoutine, changeFavouriteAuthorStateRoutine, checkFavouriteAuthorStateRoutine } from 'screens/AuthorPublicPage/routines';

function* getAuthorData(action: Routine<any>) {
  try {
    const response = yield call(publicAuthorPageService.getData, action.payload);
    console.log(response);
    yield put(fetchAuthorDataRoutine.success(response));
  } catch (error) {
    yield put(fetchAuthorDataRoutine.failure(error?.message));
    toastr.error('An error occurred while loading information about author.');
  }
}

function* followAuthor(action: Routine<any>) {
  try {
    const subscription = {
      sourceId: action.payload,
      sourceType: 'AUTHOR'
    };
    yield call(publicAuthorPageService.followAuthor, subscription);
    yield put(followAuthorRoutine.success());
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
    yield call(publicAuthorPageService.unfollowAuthor, subscription);
    yield put(unfollowAuthorRoutine.success());
  } catch (error) {
    yield put(unfollowAuthorRoutine.failure(error?.message));
  }
}
function* watchGetDataRequest() {
  yield takeEvery(fetchAuthorDataRoutine.TRIGGER, getAuthorData);
  yield takeEvery(followAuthorRoutine.TRIGGER, followAuthor);
  yield takeEvery(unfollowAuthorRoutine.TRIGGER, unfollowAuthor);
}

function* changeFavouriteAuthorState(action: Routine<any>) {
  try {
    const response = yield call(publicAuthorPageService.changeFavouriteState, action.payload);
    yield put(changeFavouriteAuthorStateRoutine.success(response));
  } catch (error) {
    yield put(changeFavouriteAuthorStateRoutine.failure(error?.message));
  }
}

function* watchChangeFavouriteAuthorState() {
  yield takeEvery(changeFavouriteAuthorStateRoutine.TRIGGER, changeFavouriteAuthorState);
}

function* checkFavouriteAuthorState(action: Routine<any>) {
  try {
    const response = yield call(publicAuthorPageService.checkFavouriteState, action.payload);
    yield put(checkFavouriteAuthorStateRoutine.success(response));
  } catch (error) {
    yield put(checkFavouriteAuthorStateRoutine.failure(error?.message));
  }
}

function* watchCheckFavouriteAuthorState() {
  yield takeEvery(checkFavouriteAuthorStateRoutine.TRIGGER, checkFavouriteAuthorState);
}


export default function* dataSagas() {
  yield all([
    watchGetDataRequest(),
    watchChangeFavouriteAuthorState(),
    watchCheckFavouriteAuthorState()
  ]);
}

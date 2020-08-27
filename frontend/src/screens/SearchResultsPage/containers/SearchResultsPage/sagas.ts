import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchSearchRoutine, fetchTagsRoutine } from '@screens/SearchResultsPage/routines';
import { AnyAction } from 'redux';
import { advancedSearch, getAllTags } from '@screens/SearchResultsPage/services/search.service';
import { toastr } from 'react-redux-toastr';

function* trySearch({ payload }: AnyAction) {
  try {
    yield put(fetchSearchRoutine.request());
    const resp = yield call(advancedSearch, payload);
    yield put(fetchSearchRoutine.success(resp));
  } catch (e) {
    yield put(fetchSearchRoutine.failure(e?.message));
    toastr.error(e.message);
  }
}

function* watchSearchRequest() {
  yield takeEvery(fetchSearchRoutine.TRIGGER, trySearch);
}

function* tryGetTags() {
  try {
    yield put(fetchTagsRoutine.request());
    const resp = yield call(getAllTags);
    yield put(fetchTagsRoutine.success(resp));
  } catch (e) {
    yield put(fetchTagsRoutine.failure(e.message));
    toastr.error(e.message);
  }
}

function* watchTagsRequest() {
  yield takeEvery(fetchTagsRoutine.TRIGGER, tryGetTags);
}

export default function* searchPageSagas() {
  yield all([
    watchSearchRequest(),
    watchTagsRequest()
  ]);
}

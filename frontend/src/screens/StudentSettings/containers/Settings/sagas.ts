import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import * as imageService from 'services/image.service';
import { toastr } from 'react-redux-toastr';
import { fetchUserRoutine } from 'containers/AppRouter/routines';
import { fetchStudentRoutine } from '@screens/MainPage/routines';
import * as settingsService from '../../services/settings.service';
import { fetchGetStudentSettingsRoutine, fetchSetStudentSettingsRoutine, fetchAllTagsRoutine } from '../../routines';

function* getSettings() {
  try {
    const response = yield call(settingsService.getSettings);
    if (response !== null) {
      yield put(fetchGetStudentSettingsRoutine.success(response));
    }
  } catch (error) {
    const msg = error?.message || 'An error occurred while loading your settings.';
    yield put(fetchGetStudentSettingsRoutine.failure(msg));
    toastr.error(msg);
  }
}

function* watchGetStudentSettingsRequest() {
  yield takeEvery(fetchGetStudentSettingsRoutine.TRIGGER, getSettings);
}

function* setSettings(action: Routine<any>) {
  try {
    const author = action.payload;
    if (author?.uploadImage) {
      const { link } = yield call(() => imageService.uploadImage(author.uploadImage));
      author.avatar = link;
    }
    const response = yield call(() => settingsService.setSettings(action.payload));
    yield put(fetchStudentRoutine.trigger());
    yield put(fetchUserRoutine.trigger());
    if (response !== null) {
      yield put(fetchSetStudentSettingsRoutine.success(response.message));
      toastr.success(response.message);
    }
  } catch (error) {
    const msg = error?.message || 'An error occurred while saving your changes.';
    yield put(fetchSetStudentSettingsRoutine.failure(msg));
    toastr.error(msg);
  }
}

function* watchSetStudentSettingsRequest() {
  yield takeEvery(fetchSetStudentSettingsRoutine.TRIGGER, setSettings);
}

function* getTags() {
  try {
    const response = yield call(settingsService.getTags);
    yield put(fetchAllTagsRoutine.success(response));
  } catch (error) {
    const msg = error?.message || 'An error occurred while loading your interests.';
    yield put(fetchAllTagsRoutine.failure(msg));
    toastr.error(msg);
  }
}

function* watchGetAllTagsRequest() {
  yield takeEvery(fetchAllTagsRoutine.TRIGGER, getTags);
}

export default function* studentSettingsSagas() {
  yield all([
    watchGetStudentSettingsRequest(),
    watchSetStudentSettingsRequest(),
    watchGetAllTagsRequest()
  ]);
}

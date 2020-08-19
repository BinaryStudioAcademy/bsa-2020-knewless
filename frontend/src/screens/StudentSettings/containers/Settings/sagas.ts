import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import * as imageService from 'services/image.service';
import { toastr } from 'react-redux-toastr';

import { fetchUserRoutine } from 'containers/AppRouter/routines';
import { fetchStudentRoutine } from '@screens/MainPage/routines';
import * as settingsService from '../../services/settings.service';
import { fetchGetStudentSettingsRoutine, fetchSetStudentSettingsRoutine } from '../../routines';
import { fetchAllTagsRoutine } from '../../routines/index';

function* getSettings() {
  try {
    const response = yield call(settingsService.getSettings);
    if (response !== null) {
      yield put(fetchGetStudentSettingsRoutine.success(response));
    }
  } catch (error) {
    yield put(fetchGetStudentSettingsRoutine.failure(error?.message));
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
    yield call(() => settingsService.setSettings(action.payload));
    yield put(fetchStudentRoutine.trigger());
    yield put(fetchUserRoutine.trigger());
  } catch (error) {
    toastr('Updating student failed :(')
  }
}

function* watchSetStudentSettingsRequest() {
  yield takeEvery(fetchSetStudentSettingsRoutine.TRIGGER, setSettings);
}

function* getTags() {
  try {
    const response = yield call(settingsService.getTags);
    yield put(fetchAllTagsRoutine.success(response));
    console.log('saga works: ', response);
  } catch (error) {
    yield put(fetchAllTagsRoutine.failure(error?.message));
    toastr.error('Loading failed!');
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

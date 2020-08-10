import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as settingsService from '../../services/settings.service';
import { fetchSetStudentSettingsRoutine, fetchGetStudentSettingsRoutine } from '../../routines';
import { Routine } from 'redux-saga-routines';
import * as imageService from 'services/image.service';

function* getSettings() {
  try {
    const response = yield call(settingsService.getSettings);
    yield put(fetchGetStudentSettingsRoutine.success(response));
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
    const response = yield call(() => settingsService.setSettings(action.payload));
  } catch (error) {
    console.log('Set settings failed!');
  }
}

function* watchSetStudentSettingsRequest() {
  yield takeEvery(fetchSetStudentSettingsRoutine.TRIGGER, setSettings);
}

export default function* studentSettingsSagas() {
  yield all([
    watchGetStudentSettingsRequest(),
    watchSetStudentSettingsRequest()
  ]);
}

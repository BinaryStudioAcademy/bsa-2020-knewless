import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchDataRoutine } from 'screens/Home/routines';
import * as settingsService from '../../services/settings.service';
import { fetchSetSettingsRoutine, fetchGetSettingsRoutine } from '../../routines';
import { Routine } from 'redux-saga-routines';

function* getSettings() {
  try {
    const response = yield call(settingsService.getSettings);
    yield put(fetchGetSettingsRoutine.success(response));
    toastr.success('Settings loaded!');
  } catch (error) {
    yield put(fetchGetSettingsRoutine.failure(error?.message));
    toastr.error('Loading failed!');
  }
}

function* watchGetSettingsRequest() {
  yield takeEvery(fetchGetSettingsRoutine.TRIGGER, getSettings);
}

function* setSettings(action: Routine<any>) {
  try {
    const response = yield call(() => settingsService.setSettings(action.payload));
    yield put(fetchDataRoutine.success(response));
    toastr.success('Settings loaded!');
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Loading failed!');
  }
}

function* watchSetSettingsRequest() {
  yield takeEvery(fetchSetSettingsRoutine.TRIGGER, setSettings);
}

export default function* settingsSagas() {
  yield all([
    watchGetSettingsRequest(),
    watchSetSettingsRequest()
  ]);
}

import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchDataRoutine } from 'screens/Home/routines';
import * as settingsService from '../../services/settings.service';
import { fetchSetAuthorSettingsRoutine, fetchGetAuthorSettingsRoutine } from '../../routines';
import { Routine } from 'redux-saga-routines';

function* getSettings() {
  try {
    // const id = 'ef7ece86-445f-4ad1-b0b1-901c74fc0591';
    const response = yield call(settingsService.getSettings);
    console.log(response);
    yield put(fetchGetAuthorSettingsRoutine.success(response));
    toastr.success('Settings loaded!');
  } catch (error) {
    yield put(fetchGetAuthorSettingsRoutine.failure(error?.message));
    console.log(error?.message);
    toastr.error('Loading failed!');
  }
}

function* watchGetAuthorSettingsRequest() {
  yield takeEvery(fetchGetAuthorSettingsRoutine.TRIGGER, getSettings);
}

function* setSettings(action: Routine<any>) {
  try {
    console.log('set');
    console.log(action.payload);
    const response = yield call(() => settingsService.setSettings(action.payload));
    toastr.success('Settings loaded!');
  } catch (error) {
    toastr.error('Loading failed!');
  }
}

function* watchSetAuthorSettingsRequest() {
  yield takeEvery(fetchSetAuthorSettingsRoutine.TRIGGER, setSettings);
}

export default function* authorSettingsSagas() {
  yield all([
    watchGetAuthorSettingsRequest(),
    watchSetAuthorSettingsRequest()
  ]);
}

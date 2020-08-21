import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as settingsService from '../../services/settings.service';
import { fetchGetAuthorSettingsRoutine, fetchSetAuthorSettingsRoutine } from '../../routines';
import { Routine } from 'redux-saga-routines';
import * as imageService from 'services/image.service';
import { fetchUserRoutine } from 'containers/AppRouter/routines';
import { fetchAuthorRoutine } from '@screens/AuthorMainPage/routines';
import { toastr } from 'react-redux-toastr';

function* getSettings() {
  try {
    const response = yield call(settingsService.getSettings);
    if (response !== null) {
      yield put(fetchGetAuthorSettingsRoutine.success(response));
    }
  } catch (error) {
    const msg = error?.message || 'An error occurred while loading your settings.';
    yield put(fetchGetAuthorSettingsRoutine.failure(msg));
    toastr.error(msg);
  }
}

function* watchGetAuthorSettingsRequest() {
  yield takeEvery(fetchGetAuthorSettingsRoutine.TRIGGER, getSettings);
}

function* setSettings(action: Routine<any>) {
  try {
    const author = action.payload;
    if (author?.uploadImage) {
      const { link } = yield call(() => imageService.uploadImage(author.uploadImage));
      author.avatar = link;
    }
    const response = yield call(() => settingsService.setSettings(action.payload));
    yield put(fetchAuthorRoutine.trigger());
    yield put(fetchUserRoutine.trigger());
    if (response !== null) {
      yield put(fetchGetAuthorSettingsRoutine.success(response.message));
      toastr.success(response.message);
    }
  } catch (error) {
    const msg = error?.message || 'An error occurred while saving your changes.';
    yield put(fetchSetAuthorSettingsRoutine.failure(msg));
    toastr.error(msg);
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

import { all, call, put, takeEvery, actionChannel } from 'redux-saga/effects';
import { IUser } from './models/IUser';
import * as appRouterService from './service';
import { fetchUserRoutine, setRoleLoadingRoutine, setSettingsModeRoutine, setUserRoleRoutine, checkSettingsRoutine } from './routines';
import { AnyAction } from 'redux';
import { loginRoutine } from '@screens/Home/routines';
import { fetchAuthorInfoRoutine } from '@screens/CoursePage/routines';
import * as studentSettingsService from '@screens/StudentSettings/services/settings.service';
import * as authorSettingsService from '@screens/AuthorSettings/services/settings.service';


function* getCurrentUser() {
  try {
    const result: IUser = yield call(appRouterService.getCurrentUser);
    if (result?.role?.name === 'AUTHOR') {
      yield put(fetchAuthorInfoRoutine.success());
    }
    yield put(fetchUserRoutine.success(result));
    yield put(loginRoutine.success());
  } catch (error) {
    yield put(fetchUserRoutine.failure(error?.message));
  }
}

function* watchGetCurrentUser() {
  yield takeEvery(fetchUserRoutine.TRIGGER, getCurrentUser);
}

function* setUserRole({ payload }: AnyAction) {
  try {
    yield put(setRoleLoadingRoutine.trigger());
    yield call(() => appRouterService.setUserRole(payload));
    yield put(fetchUserRoutine.trigger());
  } catch (error) {
    yield put(setSettingsModeRoutine.failure(error?.message));
  }
}

function* watchSetUserRole() {
  yield takeEvery(setUserRoleRoutine.TRIGGER, setUserRole);
}

function* checkSettings({ payload }: AnyAction) {
  try {
    var filled = false;
    if (payload === 'AUTHOR') {
      const settings = yield call(authorSettingsService.getSettings);
      if (settings.lastName) filled = true;
    }
    if (payload === 'USER') {
      const settings = yield call(studentSettingsService.getSettings);
      if (settings.lastName) filled = true;
    }
    yield put(checkSettingsRoutine.success(filled));
  } catch (error) {
    yield put(checkSettingsRoutine.failure(error?.message));
  }
}

function* watchCheckSettings() {
  yield takeEvery(checkSettingsRoutine.TRIGGER, checkSettings);
}


export default function* appRouterSagas() {
  yield all([
    watchGetCurrentUser(),
    watchSetUserRole(),
    watchCheckSettings()
  ]);
}

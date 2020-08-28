import { all, call, put, takeEvery } from 'redux-saga/effects';
import { IUser } from './models/IUser';
import * as appRouterService from './service';
import { fetchUserRoutine, setRoleLoadingRoutine, setSettingsModeRoutine, setUserRoleRoutine } from './routines';
import { AnyAction } from 'redux';
import { loginRoutine } from '@screens/Home/routines';

function* getCurrentUser() {
  try {
    const result: IUser = yield call(appRouterService.getCurrentUser);
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

export default function* appRouterSagas() {
  yield all([
    watchGetCurrentUser(),
    watchSetUserRole()
  ]);
}

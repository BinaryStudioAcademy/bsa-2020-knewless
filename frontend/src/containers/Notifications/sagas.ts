import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {
  getUnreadNotifications, readNotification,
  deleteNotification, deleteAllNotifications, readAllNotifications, getAllNotifications
} from './service';
import {
  fetchUnreadNotificationsRoutine,
  readNotificationRoutine, deleteNotificationRoutine,
  deleteAllNotificationsRoutine, readAllNotificationsRoutine, getAllNotificationsRoutine
} from './routines';
import { INotification } from './model/INotification';

function* getUnread(action) {
  try {
    const { userId } = action.payload;
    const result: Array<INotification> = yield call(() => getUnreadNotifications(userId));
    yield put(fetchUnreadNotificationsRoutine.success({ notifications: result }));
  } catch (error) {
    yield put(fetchUnreadNotificationsRoutine.failure(error?.message));
    toastr.error('Autenthification failed!');
  }
}

function* watchGetRequest() {
  yield takeEvery(fetchUnreadNotificationsRoutine.TRIGGER, getUnread);
}

function* readNotif(action) {
  const { id } = action.payload;
  try {
    yield put(readNotificationRoutine.request(id));
    yield call(() => readNotification(id));
  } catch (error) {
    yield put(readNotificationRoutine.failure(id));
    toastr.error('Fail to read');
  }
}

function* watchReadNotification() {
  yield takeEvery(readNotificationRoutine.TRIGGER, readNotif);
}

function* deleteNotif(action) {
  const { id } = action.payload;
  try {
    yield put(deleteNotificationRoutine.request(id));
    yield call(() => deleteNotification(id));
    yield put(deleteNotificationRoutine.success(id));
  } catch (error) {
    yield put(deleteNotificationRoutine.failure(id));
    toastr.error('Fail to delete');
  }
}

function* watchDeleteNotification() {
  yield takeEvery(deleteNotificationRoutine.TRIGGER, deleteNotif);
}

function* deleteAllNotif(action) {
  try {
    yield put(deleteAllNotificationsRoutine.request());
    const { userId } = action.payload;
    yield put(deleteAllNotificationsRoutine.success());
    yield call(() => deleteAllNotifications(userId));
  } catch (error) {
    yield put(deleteAllNotificationsRoutine.failure());
    toastr.error('Fail to delete');
  }
}

function* watchDeleteAllNotifications() {
  yield takeEvery(deleteAllNotificationsRoutine.TRIGGER, deleteAllNotif);
}

function* readAllNotif(action) {
  try {
    const { userId } = action.payload;
    yield put(readAllNotificationsRoutine.request());
    yield call(() => readAllNotifications(userId));
    yield put(readAllNotificationsRoutine.success());
  } catch (error) {
    yield put(readAllNotificationsRoutine.failure());
    toastr.error('Fail to read all');
  }
}

function* watchReadAllNotifications() {
  yield takeEvery(readAllNotificationsRoutine.TRIGGER, readAllNotif);
}

function* getAllNotif(action) {
  try {
    const { userId } = action.payload;
    yield put(getAllNotificationsRoutine.request());
    const result = yield call(() => getAllNotifications(userId));
    yield put(getAllNotificationsRoutine.success({ notifs: result }));
  } catch (error) {
    yield put(getAllNotificationsRoutine.failure());
    toastr.error('Fail to read all');
  }
}

function* watchGetAllNotifications() {
  yield takeEvery(getAllNotificationsRoutine.TRIGGER, getAllNotif);
}

export default function* notifySagas() {
  yield all([
    watchGetRequest(),
    watchReadNotification(),
    watchDeleteNotification(),
    watchDeleteAllNotifications(),
    watchReadAllNotifications(),
    watchGetAllNotifications()
  ]);
}

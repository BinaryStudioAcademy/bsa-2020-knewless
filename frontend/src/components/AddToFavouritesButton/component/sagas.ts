import { takeEvery, put, call, all } from 'redux-saga/effects';
import { changeFavouriteStateRoutine, checkFavouriteStateRoutine } from '@components/AddToFavouritesButton/routines';
import * as favouriteService from '@components/AddToFavouritesButton/services/favourite.button.service';
import { toastr } from 'react-redux-toastr';
import { Routine } from 'redux-saga-routines';

function* checkFavourite(action: Routine<any>) {
  try {
    const response = yield call(favouriteService.isComponentFavourite, action.payload);
    yield put(checkFavouriteStateRoutine.success(response));
  } catch (error) {
    yield put(checkFavouriteStateRoutine.failure(error?.message));
  }
}

function* watchCheckFavourite() {
  yield takeEvery(checkFavouriteStateRoutine.TRIGGER, checkFavourite);
}

function* changeFavourite(action: Routine<any>) {
  try {
    const response = yield call(favouriteService.changeFavouriteAction, action.payload);
    yield put(changeFavouriteStateRoutine.success(response));
  } catch (error) {
    yield put(changeFavouriteStateRoutine.failure(error?.message));
  }
}

function* watchChangeFavourite() {
  yield takeEvery(changeFavouriteStateRoutine.TRIGGER, changeFavourite);
}


export default function* favouriteButtonSagas() {
  yield all([
    watchCheckFavourite(),
    watchChangeFavourite()
  ]);
}

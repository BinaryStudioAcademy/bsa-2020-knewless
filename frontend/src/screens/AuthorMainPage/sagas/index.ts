import { all } from 'redux-saga/effects';
import authorMainPageSagas from '../containers/MainPage/sagas';

export default function* homeSagas() {
  yield all([
    authorMainPageSagas()
  ]);
}

import { all } from 'redux-saga/effects';
import favouriteItemSagas from '../containers/FavouritesPage/sagas';

export default function* favouriteSagas() {
  yield all([
    favouriteItemSagas()
  ]);
}

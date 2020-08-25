import { Routine } from 'redux-saga-routines';
import { checkFavouriteStateRoutine, changeFavouriteStateRoutine } from '@components/AddToFavouritesButton/routines';
import { IAddToFavouritesButtonData } from '../models/IAddToFavouritesButtonData';

export const data = (state: IAddToFavouritesButtonData = { isFavourite: false },
  action: Routine<any>) => {
  switch (action.type) {
    case checkFavouriteStateRoutine.SUCCESS:
      return {
        ...state,
        isFavourite: action.payload
      };
    case changeFavouriteStateRoutine.SUCCESS:
      return {
        ...state,
        isFavourite: action.payload
      };
    default:
      return state;
  }
};

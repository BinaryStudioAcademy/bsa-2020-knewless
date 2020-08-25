import { IRequestState } from '@models/IRequestState';
import { IAddToFavouritesButtonData } from './IAddToFavouritesButtonData';

export interface IAddToFavouritesButtonState {
    requests: {
      checkFavourite: IRequestState;
    };
    data: IAddToFavouritesButtonData;
  }
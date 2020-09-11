import { ILoginModalState } from './models/ILoginModalState';
import { Routine } from 'redux-saga-routines';
import { openLoginModalRoutine } from './routines';
import {setNoAuthorizedRoutine} from "@screens/Home/routines";

export const loginModal = (state: ILoginModalState = { open: false, redirectTo: '' }, action: Routine<any>) => {
  switch (action.type) {
    case openLoginModalRoutine.TRIGGER: {
      return {
        open: !state.open,
        redirectTo: action.payload
      };
    }
    case openLoginModalRoutine.SUCCESS: {
      return {
        open: false,
        redirectTo: ''
      };
    }
    case setNoAuthorizedRoutine.TRIGGER:
      return {
        open: false,
        redirectTo: ''
      };
    default: {
      return state;
    }
  }
};

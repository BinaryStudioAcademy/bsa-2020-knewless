import { Routine } from 'redux-saga-routines';
import { savePasswordRoutine, fetchIsLinkValidRoutine } from 'screens/SavePassword/routines';
import { ISavePasswordData } from '../../models/ISavePasswordData';

export const data = (state: ISavePasswordData = { 
  isValidLink: false,
  userEmail: "",
  isSavedSuccessfull: undefined,
  saveMessage: "",
  saveLoading: false },
  action: Routine<any>) => {
  switch (action.type) {
    case fetchIsLinkValidRoutine.SUCCESS:
      return {
        ...state,
        isValidLink: action.payload.validLink,
        userEmail: action.payload.email
      };
    case savePasswordRoutine.SUCCESS:
      return {
        ...state,
        isSavedSuccessfull: action.payload.isSuccessfull,
        saveMessage: action.payload.comment,
        saveLoading: false
      };
    default:
      return state;
  }
};

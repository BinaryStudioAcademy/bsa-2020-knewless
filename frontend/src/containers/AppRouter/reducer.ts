import { IAppRouterState } from './models/IAppRouterState';
import { IUser } from './models/IUser';
import { Routine } from 'redux-saga-routines';
import { fetchUserRoutine, resetSettingsModeRoutine, setRoleLoadingRoutine, setSettingsModeRoutine } from './routines';

const initialState: IAppRouterState = {
  user: { } as IUser,
  settingsMode: null,
  roleLoading: false,
  userLoading: true
};

export const appRouter = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchUserRoutine.SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userLoading: false,
        roleLoading: false
      };
    }
    case fetchUserRoutine.FAILURE: {
      return {
        ...state,
        userLoading: false
      };
    }
    case setSettingsModeRoutine.TRIGGER: {
      return {
        ...state,
        settingsMode: action.payload
      };
    }
    case resetSettingsModeRoutine.TRIGGER: {
      return {
        ...state,
        settingsMode: null
      };
    }
    case setRoleLoadingRoutine.TRIGGER: {
      return {
        ...state,
        roleLoading: true
      };
    }
    default: {
      return state;
    }
  }
};

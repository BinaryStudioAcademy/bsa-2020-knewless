import { createRoutine } from 'redux-saga-routines';

export const fetchUserRoutine = createRoutine('FETCH_USER');
export const setUserRoleRoutine = createRoutine('SET_USER_ROLE');
export const setSettingsModeRoutine = createRoutine('SET_SETTINGS_MODE');
export const setRoleLoadingRoutine = createRoutine('SET_ROLE_LOADING');
export const resetSettingsModeRoutine = createRoutine('RESET_SETTINGS_MODE');
export const checkSettingsRoutine = createRoutine('CHECK_SETTINGS');

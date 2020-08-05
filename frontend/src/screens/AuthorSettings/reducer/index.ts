import { combineReducers } from 'redux';
import { fetchGetSettingsRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { settings } from '../containers/Settings/reducer';

const requests = combineReducers({
  settingsRequest: reducerCreator([fetchGetSettingsRoutine.TRIGGER])
});

export default combineReducers({
  settings,
  requests
});

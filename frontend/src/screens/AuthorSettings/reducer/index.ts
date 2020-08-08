import { combineReducers } from 'redux';
import { fetchGetAuthorSettingsRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { authorSettings } from '../containers/Settings/reducer';

const requests = combineReducers({
  authorSettingsRequest: reducerCreator([fetchGetAuthorSettingsRoutine.TRIGGER])
});

export default combineReducers({
  authorSettings,
  requests
});

import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { connectWebsocketRoutine } from '@containers/WebsocketConnector/routines';
import { websocketData } from '@containers/WebsocketConnector/reducer';

const requests = combineReducers({
  connectWebsocket: reducerCreator([connectWebsocketRoutine.TRIGGER])
});

export default combineReducers({
  websocketData,
  requests
});

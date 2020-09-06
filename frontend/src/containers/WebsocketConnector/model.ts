import { IRequestState } from '@models/IRequestState';
import { IAppState } from '@models/AppState';

export interface IWebsocketConnectorState {
  requests: {
    connectWebsocket: IRequestState;
  };
  websocketData: IWebsocketConnectorData;
}
export interface IWebsocketConnectorData {
  connection: any;
}

export const extractWSConnection = (state: IAppState) => state.websocket.websocketData.connection;

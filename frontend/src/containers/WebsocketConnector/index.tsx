import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IBindingAction } from '@models/Callbacks';
import { connectWebsocketRoutine } from '@containers/WebsocketConnector/routines';
import { IUser } from '@containers/AppRouter/models/IUser';
import { IAppState } from '@models/AppState';

export interface IWebsocketConnectorProps {
  connectToWS: IBindingAction;
  currentUser: IUser;
  connection: any;
}

export const WebsocketConnector: React.FC<IWebsocketConnectorProps> = ({ connectToWS, currentUser, connection }) => {
  useEffect(() => {
    if (connection?.connected) {
      connection.disconnect();
    }
    if (currentUser?.email) {
      connectToWS();
    }
  }, [connectToWS, currentUser]);

  return <div />;
};

const mapStateToProps = (state: IAppState) => ({
  connection: state.websocket.websocketData.connection
});

const mapDispatchToProps = {
  connectToWS: connectWebsocketRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsocketConnector);

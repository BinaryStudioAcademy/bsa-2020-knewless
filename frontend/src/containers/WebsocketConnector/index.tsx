import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IBindingAction } from '@models/Callbacks';
import { connectWebsocketRoutine } from '@containers/WebsocketConnector/routines';

export interface IWebsocketConnectorProps {
  connectToWS: IBindingAction;
}

export const WebsocketConnector: React.FC<IWebsocketConnectorProps> = ({ connectToWS }) => {
  useEffect(() => {
    connectToWS();
  }, [connectToWS]);

  return <div />;
};

const mapDispatchToProps = {
  connectToWS: connectWebsocketRoutine
};

export default connect(null, mapDispatchToProps)(WebsocketConnector);

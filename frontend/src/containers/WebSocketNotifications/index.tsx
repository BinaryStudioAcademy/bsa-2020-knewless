import React, { useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { INotification } from '../Notifications/model/INotification';
import { connect } from 'react-redux';
import { receiveNotificationRoutine } from '../Notifications/routines';
import { IAppState } from '@models/AppState';

interface IWebSocketNotificationsProps {
  connection: any;
  newNotification: ({ notification: INotification }) => void;
}

const WebSocketNotifications: React.FC<IWebSocketNotificationsProps> = ({
  connection,
  newNotification: notify
}) => {
  useEffect(() => {
    if (connection) {
      connection.on('notification', (message: INotification) => {
        NotificationManager.info(message.text);
        notify({ notification: message });
      });
    }
    return () => {
      if (connection) {
        connection.removeAllListeners('notification');
      }
    };
  }, [connection]);

  return <NotificationContainer />;
};

const mapDispatchToProps = {
  newNotification: receiveNotificationRoutine
};

const mapStateToProps = (state: IAppState) => ({
  connection: state.websocket.websocketData.connection
});

export default connect(mapStateToProps, mapDispatchToProps)(WebSocketNotifications);

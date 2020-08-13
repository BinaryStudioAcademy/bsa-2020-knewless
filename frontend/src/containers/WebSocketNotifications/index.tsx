import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { INotification } from '../Notifications/model/INotification';
import { connect } from 'react-redux';
import { addNotificationRoutine } from '../Notifications/routines';

interface IWebSocketNotificationsProps {
  token: string;
  newNotification: ({ notification: INotification }) => void;
}

const WebSocketNotifications: React.FC<IWebSocketNotificationsProps> = ({
  token,
  newNotification: notify
}) => {
  const [socket] = useState(io('/socket.io', { query: { token } }));

  useEffect(() => {
    socket.on('notification', (message: INotification) => {
      NotificationManager.info(message.text);
      notify({ notification: message });
    });
    //  diconnect and delete from pool at logout
    return () => {
      socket.close();
    };
  });

  return <NotificationContainer />;
};

const mapDispatchToProps = {
  newNotification: addNotificationRoutine
};

export default connect(null, mapDispatchToProps)(WebSocketNotifications);

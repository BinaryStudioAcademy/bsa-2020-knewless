import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { addUsersToSocketPoolRoutine } from './routines';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { INotification } from '../../containers/Notifications/model/INotification';
import { connect } from 'react-redux';
import { addNotificationRoutine } from '../../containers/Notifications/routines';

const WebSocketNotifications = ({
  isConnected,
  readyToConnect,
  user,
  addUserToPool: add,
  newNotification: notify }) => {
  const [stompClient] = useState(Stomp.over(new SockJS('/ws')));

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    if (!isConnected) {
      add({ username: user.username });
    }

    if (readyToConnect) {
      return stompClient.connect({ username: user.username }, () => {
        stompClient.subscribe('/user/queue/notification', message => {
          const notif: INotification = JSON.parse(message.body);
          NotificationManager.info(`New notification ${notif.text}`);
          notify({ notification: notif });
        });
        //  some others subscribtions
      });
    }
    //  diconnect and delete from pool at logout
    return undefined;
  });

  return <NotificationContainer />;
};

WebSocketNotifications.defaultProps = {
  user: undefined
};

WebSocketNotifications.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  addUserToPool: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
  isConnected: rootState.socket.isInPool,
  readyToConnect: rootState.socket.readyToBeConnect
});

const mapDispatchToProps = {
  addUserToPool: addUsersToSocketPoolRoutine,
  newNotification: addNotificationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(WebSocketNotifications);

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Popup, Button, Label, Icon } from 'semantic-ui-react';
import NotificationItem from './NotificatonItem';
import {
  fetchUnreadNotificationsRoutine,
  readNotificationRoutine, deleteNotificationRoutine,
  deleteAllNotificationsRoutine, readAllNotificationsRoutine,
  getAllNotificationsRoutine,
  viewLessNotificationsRoutine
} from './routines';
import { connect } from 'react-redux';
import styles from './styles.module.sass';

const Notifications = ({ user, notifications, fetchNotifications: fetch,
  readNotif: read, deleteNotification: deleteNotif, deleteAllNotifications: deleteAll,
  readAllNotifs: readAll, getAllNotifs: getAll, viewLessNotifs: viewLess, styleName, deleting, reading, fetching }) => {
  const [viewingAll, setViewingAll] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    fetch({ userId: user.id });
  }, []);

  function viewAll(payload) {
    if (viewingAll) {
      viewLess();
    } else {
      getAll(payload);
    }
  }

  return (
    <Popup
      onMount={() => { if (notifications.length > 0) { ref.current.scrollIntoView(); } }}
      className={styles.popup}
      trigger={(
        <Label
          basic
          size="tiny"
          className={styleName}
        >
          <Icon name="bell" size="large" inverted />
        </Label>
      )}
      on="click"
      position="bottom right"
    >
      <div className={styles.title}>Notifications</div>
      {notifications.length > 0
        ? (
          <div>
            <div className={styles.notifications}>
              {notifications.map(item => (
                <NotificationItem
                  notification={item}
                  key={item.id}
                  readNotif={read}
                  deleteNotif={deleteNotif}
                />
              ))}
              <div ref={ref} />
            </div>
            <Button
              loading={fetching}
              className={styles.action}
              onClick={() => { viewAll({ userId: user.id }); setViewingAll(!viewingAll); }}
              basic
              disabled={deleting || reading}
            >
              {viewingAll ? 'View Less' : 'View All'}
            </Button>
            <Button
              className={styles.action}
              onClick={() => readAll({ userId: user.id })}
              loading={reading}
              basic
              disabled={deleting || fetching}
            >
              Read All
            </Button>
            <Button
              className={styles.action}
              onClick={() => deleteAll({ userId: user.id })}
              loading={deleting}
              basic
              disabled={reading || fetching}
            >
              Delete All
            </Button>
          </div>
        )
        : <div>You have got no notifications</div>}
    </Popup>
  );
};

Notifications.defaultProps = {
  user: undefined
};

Notifications.propTypes = {
  user: PropTypes.objectOf(PropTypes.any)
};

const mapStateToProps = rootState => ({
  notifications: rootState.notify.notifications,
  deleting: rootState.notify.deleting,
  reading: rootState.notify.reading,
  fetching: rootState.notify.fetching
});

const mapDispatchToProps = {
  fetchNotifications: fetchUnreadNotificationsRoutine,
  readNotif: readNotificationRoutine,
  deleteNotification: deleteNotificationRoutine,
  deleteAllNotifications: deleteAllNotificationsRoutine,
  readAllNotifs: readAllNotificationsRoutine,
  getAllNotifs: getAllNotificationsRoutine,
  viewLessNotifs: viewLessNotificationsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

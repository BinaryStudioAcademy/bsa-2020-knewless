import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Label, Popup } from 'semantic-ui-react';
import NotificationItem from './NotificatonItem';
import imgMessage from '@images/giphy.gif';
import {
  deleteAllNotificationsRoutine,
  fetchUnreadNotificationsRoutine,
  readAllNotificationsRoutine,
  readNotificationRoutine
} from './routines';
import { connect } from 'react-redux';
import styles from './styles.module.sass';

const Notifications = ({ userId, notifications, fetchNotifications: fetch,
  readNotif: read, deleteAllNotifications: deleteAll,
  readAllNotifs: readAll, styleName, role }) => {
  const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    if (userId) {
      fetch({ userId });
    }
  }, [fetch, userId]);

  function countUnread() {
    return notifications.filter(n => n.read === false).length > 0;
  }

  return (
    <Popup
      onMount={() => { if (ref.current) ref.current.scrollTo(0, -ref.current.scrollHeight); }}
      className={styles.popup}
      trigger={(
        <Label basic className={styleName}>
          <Icon name="bell" size="large" inverted />
          {countUnread() && <Label name="circle" color="red" className={styles.label} circular size="tiny" empty />}
        </Label>
      )}
      on="click"
      position="bottom right"
    >
      {notifications.length > 0
        ? (
          <div>
            <div className={styles.title}>
              <p className={styles.titleHeader}>Notifications</p>
              <div className={styles.action}>
                <Dropdown icon="ellipsis vertical">
                  <Dropdown.Menu>
                    <Dropdown.Item icon="eye" text="Read all" onClick={() => readAll({ userId })} />
                    <Dropdown.Item icon="trash" text="Delete all" onClick={() => deleteAll({ userId })} />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className={styles.notifications} ref={ref}>
              {notifications.map(item => (
                <NotificationItem
                  notification={item}
                  key={item.id}
                  readNotif={read}
                  role={role}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <img src={imgMessage} alt="Waiting..." />
            <h3 className={styles.emptyTitle}>It&apos;s empty here...</h3>
            <p>Check back later for some awesome stuff</p>
          </div>
        )}
    </Popup>
  );
};

Notifications.defaultProps = {
  userId: undefined
};

Notifications.propTypes = {
  userId: PropTypes.string
};

const mapStateToProps = rootState => ({
  notifications: rootState.notify.notifications
});

const mapDispatchToProps = {
  fetchNotifications: fetchUnreadNotificationsRoutine,
  readNotif: readNotificationRoutine,
  deleteAllNotifications: deleteAllNotificationsRoutine,
  readAllNotifs: readAllNotificationsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

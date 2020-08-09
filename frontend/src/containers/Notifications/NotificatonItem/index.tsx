import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.sass';
import { timeComparator } from '../../../helpers/date.helper';
import { Label, Icon } from 'semantic-ui-react';

const NotificationItem = ({ notification, readNotif, deleteNotif }) => (
  <div
    className={`${styles.item} ${!notification.read ? styles.unread : ''}`}
    onPointerOverCapture={() => { if (!notification.read) { readNotif({ id: notification.id }); } }}
  >
    <div className={styles.content}>
      <Icon name="bullhorn" />
      <div className={styles.text}>
        <a href={notification.link} target="_tab" className={styles.link}>{notification.sourceName}</a>
        {notification.text}
      </div>
      <Label
        icon={notification.deleting ? 'spinner' : 'close'}
        className={styles.deleteBtn}
        onClick={() => deleteNotif({ id: notification.id })}
        basic
      />
    </div>
    <div className={styles.time}>{timeComparator(notification.date)}</div>
  </div>
);

NotificationItem.defaultProps = {
  notification: undefined,
  readNotif: undefined
};

NotificationItem.propTypes = {
  notification: PropTypes.objectOf(PropTypes.any),
  readNotif: PropTypes.func
};

export default NotificationItem;

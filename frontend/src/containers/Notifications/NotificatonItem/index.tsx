import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.sass';
import { timeComparator } from '@helpers/date.helper';
import { Icon } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';

const NotificationItem = ({ notification, readNotif, role }) => {
  const history = useHistory();
  const isAuthor = notification.sourceType?.toLowerCase() === "author";
  const isCourse = notification.sourceType?.toLowerCase() === "course";
  const isLecture = notification.sourceType?.toLowerCase() === "lecture";
  const isArticle = notification.sourceType?.toLowerCase() === "article";
  const handleClick = () => {
    if (isAuthor && role === "AUTHOR") return;
    if ((isCourse || isArticle) && role === "AUTHOR") {
      history.push({pathname: `/${notification.sourceType?.toLowerCase()}/${notification.sourceId}`, state: { toDiscussion: true }});
      return;
    };
    if (isLecture && role === "AUTHOR") {
      return;
    };
    history.push(`/${notification.sourceType?.toLowerCase()}/${notification.sourceId}`);
  };

  return (
  <div
    className={`${styles.item} ${!notification.read ? styles.unread : ''}`}
    onPointerOverCapture={() => { if (!notification.read) { readNotif({ id: notification.id }); } }}
  >
    <div className={styles.content}>
      {/* eslint-disable max-len*/}
      <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24">
        <g>
          <path opacity="0.35" fill="#A5ACB4" d="M10.5,16.4c0,0,6.1-3.5,10.7-1.5l-7-12.1c-0.6,5-6.7,8.5-6.7,8.5l-0.9,0.5l3,5.3L10.5,16.4z" />
          <g><path opacity="0.35" d="M10.1,17.8l-1.7,1c-1.9,1.1-4.4,0.4-5.5-1.5l0,0c-1.1-1.9-0.4-4.4,1.5-5.5l1.7-1L10.1,17.8z" /></g>
          <path fill="#DB3041" d="M5.4,13.6l2,3.5l-0.9,0.5c-0.2,0.1-0.3,0.1-0.5,0.1c-0.4,0-0.7-0.2-0.9-0.5l-1-1.7C3.9,15,4,14.4,4.5,14.1L5.4,13.6 M6.1,10.8l-2.6,1.5c-1.4,0.8-1.9,2.7-1.1,4.1l1,1.7C4,19.1,5,19.7,6,19.7c0.5,0,1-0.1,1.5-0.4l2.6-1.5L6.1,10.8L6.1,10.8z" />
          <path fill="#A5ACB4" d="M22,14.4L15,2.3c-0.3-0.5-0.9-0.6-1.4-0.4c-0.3,0.2-0.4,0.4-0.5,0.7l0,0C12.6,7,7,10.3,7,10.3l0,0l-0.9,0.5l1,1.7L8,12.1v0c0.2-0.1,4.7-2.8,6.5-6.8l4.7,8.1c-4.4-0.5-8.9,2.1-9.1,2.2h0L9.1,16l1,1.7l0.9-0.5l0,0l1.5,2.6c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1c0.5-0.3,0.6-0.9,0.4-1.4l-1.4-2.5c0.5-0.2,1-0.4,1.6-0.6c1.7-0.5,4.3-1,6.4-0.1l0,0c0.3,0.1,0.6,0.1,0.9,0C22.1,15.5,22.3,14.9,22,14.4z" />
        </g>
      </svg>
      {/* eslint-enable max-len*/}
      <div className={styles.text}>
        {!(isLecture && role === "AUTHOR") &&
        (<div
          onClick={() => handleClick()}
          className={isAuthor && role === "AUTHOR" ? styles.inactive : styles.link}
        >
          {notification.text}
        </div>)}
        {(isLecture && role === "AUTHOR") &&
        (<Link
          to={{ pathname: `/${notification.sourceType?.toLowerCase()}/${notification.sourceId}?tab=discussion` }}
          target="_blank"
          className={styles.link}
        >
          {notification.text}
        </Link>)}
        <p className={styles.time}>{timeComparator(notification.date)}</p>
      </div>
      <Icon
        className={notification.read ? `${styles.radioRead}` : `${styles.radioRead} ${styles.unread}`}
        name="circle"
      />
    </div>
  </div>
);
}

NotificationItem.defaultProps = {
  notification: undefined,
  readNotif: undefined
};

NotificationItem.propTypes = {
  notification: PropTypes.objectOf(PropTypes.any),
  readNotif: PropTypes.func
};

export default NotificationItem;

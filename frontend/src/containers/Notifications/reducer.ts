import {
  addNotificationRoutine, fetchUnreadNotificationsRoutine,
  readNotificationRoutine, deleteNotificationRoutine,
  deleteAllNotificationsRoutine, readAllNotificationsRoutine, getAllNotificationsRoutine, viewLessNotificationsRoutine
} from './routines';
import { INotification } from './model/INotification';

const initialState = {
  notifications: Array<INotification>(),
  buffer: Array<string>(),
  deleting: false,
  reading: false,
  fetching: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case addNotificationRoutine.TRIGGER: {
      const { notification } = action.payload;
      if (state.notifications[0]?.read) {
        state.notifications.shift();
      }
      return ({
        ...state,
        notifications: [...state.notifications, notification]
      });
    }

    case fetchUnreadNotificationsRoutine.SUCCESS: {
      const { notifications } = action.payload;
      return ({
        ...state,
        notifications: [...notifications]
      });
    }

    case readNotificationRoutine.REQUEST: {
      const notifId = action.payload;
      const newNotifs = state.notifications.map(n => (n.id === notifId ? { ...n, read: true } : n));
      return ({
        ...state,
        notifications: newNotifs
      });
    }

    case readNotificationRoutine.FAILURE: {
      const notifId = action.payload;
      const newNotifs = state.notifications.map(n => (n.id === notifId ? { ...n, read: false } : n));
      return ({
        ...state,
        notifications: newNotifs
      });
    }

    case deleteNotificationRoutine.REQUEST: {
      const notifId = action.payload;
      const newNotifs = state.notifications.map(n => (n.id === notifId ? { ...n, deleting: true } : n));
      return ({
        ...state,
        notifications: newNotifs
      });
    }

    case deleteNotificationRoutine.SUCCESS: {
      const notifId = action.payload;
      const newNotifs = state.notifications.filter(n => n.id !== notifId);
      return ({
        ...state,
        notifications: newNotifs
      });
    }

    case deleteNotificationRoutine.FAILURE: {
      const notifId = action.payload;
      const newNotifs = state.notifications.map(n => (n.id === notifId ? { ...n, deleting: false } : n));
      return ({
        ...state,
        notifications: newNotifs
      });
    }

    case deleteAllNotificationsRoutine.REQUEST: {
      return ({
        ...state,
        deleting: true
      });
    }

    case deleteAllNotificationsRoutine.SUCCESS: {
      return ({
        ...state,
        deleting: false,
        notifications: []
      });
    }

    case readAllNotificationsRoutine.REQUEST: {
      return ({
        ...state,
        reading: true
      });
    }

    case readAllNotificationsRoutine.SUCCESS: {
      const newNotifs = state.notifications.map(n => (n.read === false ? { ...n, read: true } : n));
      return ({
        ...state,
        notifications: newNotifs,
        reading: false
      });
    }

    case getAllNotificationsRoutine.SUCCESS: {
      const { notifs } = action.payload;
      return ({
        ...state,
        notifications: notifs,
        fetching: false
      });
    }

    case getAllNotificationsRoutine.REQUEST: {
      return ({
        ...state,
        fetching: true
      });
    }

    case viewLessNotificationsRoutine.TRIGGER: {
      const newUnread = state.notifications.filter(n => n.read === false);
      const unreadNum = 10 - newUnread.length;
      let newRead: Array<INotification>;
      if (unreadNum > 0) {
        newRead = state.notifications.filter(n => n.read === true).slice(-unreadNum);
      }
      return ({
        ...state,
        notifications: [...newRead, ...newUnread]
      });
    }

    default:
      return state;
  }
}

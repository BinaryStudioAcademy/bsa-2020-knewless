import { callApi } from 'helpers/api.helper';

export const getUnreadNotifications = async id => {
  const res = await callApi({
    endpoint: '/api/notification/init',
    type: 'Get',
    queryParams: { userId: id }
  });

  return res.json();
};

export const readNotification = async notifId => {
  await callApi({
    endpoint: '/api/notification/read',
    type: 'Put',
    queryParams: { id: notifId }
  });
};

export const deleteNotification = async notifId => {
  await callApi({
    endpoint: '/api/notification',
    type: 'Delete',
    queryParams: { id: notifId }
  });
};

export const deleteAllNotifications = async id => {
  await callApi({
    endpoint: '/api/notification/all',
    type: 'Delete',
    queryParams: { userId: id }
  });
};

export const readAllNotifications = async id => {
  await callApi({
    endpoint: '/api/notification/read-all',
    type: 'Put',
    queryParams: { userId: id }
  });
};

export const getAllNotifications = async id => {
  const result = await callApi({
    endpoint: '/api/notification/all',
    type: 'Get',
    queryParams: { userId: id }
  });

  return result.json();
};

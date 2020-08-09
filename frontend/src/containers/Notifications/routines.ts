import { createRoutine } from 'redux-saga-routines';

export const addNotificationRoutine = createRoutine('ADD_NOTIFICATION');
export const fetchUnreadNotificationsRoutine = createRoutine('FETCH_UNREAD_NOTIFICATIONS');
export const readNotificationRoutine = createRoutine('READ_NOTIFICATION');
export const readAllNotificationsRoutine = createRoutine('READ_ALL_NOTIFICATIONS');
export const deleteNotificationRoutine = createRoutine('DELETE_NOTIFICATION');
export const deleteAllNotificationsRoutine = createRoutine('DELETE_ALL_NOTIFICATIONS');
export const getAllNotificationsRoutine = createRoutine('GET_ALL_NOTIFICATIONS');
export const viewLessNotificationsRoutine = createRoutine('VIEW_LESS');

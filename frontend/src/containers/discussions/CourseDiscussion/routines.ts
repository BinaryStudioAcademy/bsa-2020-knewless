import { createRoutine } from 'redux-saga-routines';

export const fetchMessagesRoutine = createRoutine('COURSE_DISCUSSION:FETCH_MESSAGES');
export const sendMessageRoutine = createRoutine('COURSE_DISCUSSION:SEND_MESSAGE');
export const receiveNewMessageRoutine = createRoutine('COURSE_DISCUSSION:RECEIVE_MESSAGE');

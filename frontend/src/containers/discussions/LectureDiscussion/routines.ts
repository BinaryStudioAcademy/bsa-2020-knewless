import { createRoutine } from 'redux-saga-routines';

export const fetchMessagesRoutine = createRoutine('LECTURE_DISCUSSION:FETCH_MESSAGES');
export const sendMessageRoutine = createRoutine('LECTURE_DISCUSSION:SEND_MESSAGE');
export const receiveNewMessageRoutine = createRoutine('LECTURE_DISCUSSION:RECEIVE_MESSAGE');

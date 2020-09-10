import { createRoutine } from 'redux-saga-routines';

export const fetchMessagesRoutine = createRoutine('ARTICLE_DISCUSSION:FETCH_MESSAGES');
export const sendMessageRoutine = createRoutine('ARTICLE_DISCUSSION:SEND_MESSAGE');
export const receiveNewMessageRoutine = createRoutine('ARTICLE_DISCUSSION:RECEIVE_MESSAGE');

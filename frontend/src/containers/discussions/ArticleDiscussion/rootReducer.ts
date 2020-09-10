import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import {
  fetchMessagesRoutine,
  receiveNewMessageRoutine,
  sendMessageRoutine
} from '@containers/discussions/ArticleDiscussion/routines';
import { data } from '@containers/discussions/ArticleDiscussion/reducer';
import { IAppState } from '@models/AppState';

const requests = combineReducers({
  fetchMessages: reducerCreator([fetchMessagesRoutine.TRIGGER]),
  sendMessage: reducerCreator([sendMessageRoutine.TRIGGER]),
  receiveMessage: reducerCreator([receiveNewMessageRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

export const extractMessagesFetching = (state: IAppState) => state.articleDiscussion.requests.fetchMessages.loading;
export const extractMessageSending = (state: IAppState) => state.articleDiscussion.requests.sendMessage.loading;
export const extractMessageSendingError = (state: IAppState) => state.articleDiscussion.requests.sendMessage.error;

export const extractMessages = (state: IAppState) => state.articleDiscussion.data.messages;

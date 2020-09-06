import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import {
  fetchMessagesRoutine,
  receiveNewMessageRoutine,
  sendMessageRoutine
} from '@containers/discussions/LectureDiscussion/routines';
import { data } from '@containers/discussions/LectureDiscussion/reducer';
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

export const extractMessagesFetching = (state: IAppState) => state.lectureDiscussion.requests.fetchMessages.loading;
export const extractMessageSending = (state: IAppState) => state.lectureDiscussion.requests.sendMessage.loading;
export const extractMessageSendingError = (state: IAppState) => state.lectureDiscussion.requests.sendMessage.error;

export const extractMessages = (state: IAppState) => state.lectureDiscussion.data.messages;

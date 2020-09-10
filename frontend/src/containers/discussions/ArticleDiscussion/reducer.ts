import { Routine } from 'redux-saga-routines';
import { IMessage } from '@components/discussion/model';
import {
  fetchMessagesRoutine,
  receiveNewMessageRoutine
} from '@containers/discussions/ArticleDiscussion/routines';
import moment from 'moment';

const initialState = {
  messages: [] as IMessage[]
};

export const data = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchMessagesRoutine.TRIGGER: {
      return {
        ...state,
        messages: []
      };
    }
    case fetchMessagesRoutine.SUCCESS: {
      return {
        ...state,
        messages: action.payload.sort((m1, m2) => moment(m2.createdAt).diff(m1.createdAt))
      };
    }
    case fetchMessagesRoutine.FAILURE: {
      return {
        ...state,
        messages: []
      };
    }
    case receiveNewMessageRoutine.TRIGGER: {
      return {
        ...state,
        messages: [action.payload, ...state.messages]
      };
    }
    default: {
      return state;
    }
  }
};

import { Routine } from 'redux-saga-routines';
import { connectWebsocketRoutine } from '@containers/WebsocketConnector/routines';

const initialState = {
  connection: undefined
};

export const websocketData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case connectWebsocketRoutine.SUCCESS: {
      return {
        ...state,
        connection: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

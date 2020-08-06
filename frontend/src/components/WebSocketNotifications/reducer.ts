import { addUsersToSocketPoolRoutine } from './routines';

const initialState = {
  isInPool: false,
  readyToBeConnect: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case addUsersToSocketPoolRoutine.SUCCESS: {
      return ({
        isInPool: true,
        readyToBeConnect: true
      });
    }
    default:
      return state;
  }
}

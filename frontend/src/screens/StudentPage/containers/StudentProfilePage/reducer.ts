import { Routine } from 'redux-saga-routines';
import { IStudentProfile } from '../../models/IStudentProfile';
import {cleanFollowList, fetchGetStudentProfileRoutine} from 'screens/StudentPage/routines';
import {followAuthorRoutine, unfollowAuthorRoutine} from "@screens/AuthorPublicPage/routines";

const initProfile = {
  totalContentWatched: 0,
  courses: [],
  subscriptions: []
};

export const studentProfile = (state: IStudentProfile = initProfile, action: Routine<any>) => {
  switch (action.type) {
    case fetchGetStudentProfileRoutine.SUCCESS: {
      return {
        ...action.payload,
        subscriptions: action.payload.subscriptions.reverse()
      };
    }
    case cleanFollowList.SUCCESS: {
      return {
        ...state,
        subscriptions: state.subscriptions.filter(author => author.follow)
      };
    }
    case followAuthorRoutine.SUCCESS: {
      return {
        ...state,
        subscriptions: state.subscriptions.map(author => {
          if (author.id === action.payload) {
            author.follow = true;
          }
          return author;
        })
      };
    }
    case unfollowAuthorRoutine.SUCCESS: {
      return {
        ...state,
        subscriptions: state.subscriptions.map(author => {
          if (author.id === action.payload) {
            author.follow = false;
          }
          return author;
        })
      };
    }
    default:
      return state;
  }
};

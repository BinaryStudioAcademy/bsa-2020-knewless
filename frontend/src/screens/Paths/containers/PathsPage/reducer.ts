import { Routine } from 'redux-saga-routines';
import { IPathsData } from '@screens/Paths/models/IPathsData';
import {
  fetchPathsAndTagsRoutine,
  fetchPathsByTagRoutine,
  fetchAllTagsRoutine,
  fetchAllPathsRoutine,
  fetchAllAuthorPathsRoutine
} from '@screens/Paths/routines';

export const data = (state: IPathsData = { paths: [], myPaths: [], tags: [], isMyPathsLoaded: false }, action: Routine<any>) => {
  switch (action.type) {
    case fetchPathsAndTagsRoutine.SUCCESS:
      return {
        ...state,
        isMyPathsLoaded: true,
        ...action.payload,
      };
    case fetchPathsByTagRoutine.SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case fetchAllTagsRoutine.SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case fetchAllPathsRoutine.SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case fetchAllAuthorPathsRoutine.SUCCESS:
      return {
        ...state,
        isMyPathsLoaded: true,
        ...action.payload
      };
    case fetchPathsByTagRoutine.FAILURE:
      return {
        ...state,
        paths: []
      };
    case fetchAllPathsRoutine.FAILURE:
      return {
        ...state,
        paths: []
      };
    default:
      return state;
  }
};

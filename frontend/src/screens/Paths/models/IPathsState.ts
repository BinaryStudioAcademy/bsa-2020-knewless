import { IPathsData } from './IPathsData';
import { IRequestState } from '@models/IRequestState';
import { IAppState } from '@models/AppState';

export interface IPathsState {
  requests: {
    pathsAndTagsRequest: IRequestState;
    pathsByTagRequest: IRequestState;
    allPathsRequest: IRequestState;
    authorPathsRequest: IRequestState;
    allTagsRequest: IRequestState;
  };
  data: IPathsData;
}

export const extractPathsAndTagsLoading = (state: IAppState) => state.pathsPage.requests.pathsAndTagsRequest.loading;
export const extractPathsByTagsLoading = (state: IAppState) => state.pathsPage.requests.pathsByTagRequest.loading;
export const extractAllPathsLoading = (state: IAppState) => state.pathsPage.requests.allPathsRequest.loading;
export const extractAuthorPathsLoading = (state: IAppState) => state.pathsPage.requests.authorPathsRequest.loading;
export const extractAllTagsLoading = (state: IAppState) => state.pathsPage.requests.allTagsRequest.loading;

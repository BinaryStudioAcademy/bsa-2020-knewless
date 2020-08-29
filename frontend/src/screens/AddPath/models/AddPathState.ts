import { IAddPathData } from './AddPathData';
import { IRequestState } from '@models/IRequestState';
import { IAppState } from '@models/AppState';

export interface IAddPathState {
  requests: {
    // as you add more fields, please update screens\AddPath\models\IRequestState.ts
    fetchTagsRequest: IRequestState;
    fetchCoursesRequest: IRequestState;
    savePathRequest: IRequestState;
    fetchEditPathRequest: IRequestState;
  };
  data: IAddPathData;
}

export const areTagsLoading = (state: IAppState) => state.addPathPage.requests.fetchTagsRequest.loading;
export const areCoursesLoading = (state: IAppState) => state.addPathPage.requests.fetchCoursesRequest.loading;
export const isPathUploading = (state: IAppState) => state.addPathPage.requests.savePathRequest.loading;
export const isEditPathLoading = (state: IAppState) => state.addPathPage.requests.fetchEditPathRequest.loading;

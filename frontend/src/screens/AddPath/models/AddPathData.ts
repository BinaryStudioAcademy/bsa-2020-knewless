import { ICourse, ITag, IPathDetails } from './domain';
import { IAppState } from '@models/AppState';

export interface IAddPathData {
  tags: ITag[];
  courses: ICourse[];
  editPath: IPathDetails;
}

export const extractTags = (state: IAppState) => state.addPathPage.data.tags;
export const extractCourses = (state: IAppState) => state.addPathPage.data.courses;
export const extractEditPath = (state: IAppState) => state.addPathPage.data.editPath;

import { ICourse, ITag } from './domain';
import { IAppState } from '../../../models/AppState';

export interface IAddPathData {
  tags: ITag[];
  courses: ICourse[];
}

export const extractTags = (state: IAppState) => state.addPathPage.data.tags;
export const extractCourses = (state: IAppState) => state.addPathPage.data.courses;

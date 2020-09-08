import { ITag } from '@screens/AddPath/models/domain';
export interface ILectureUpdate {
    id: string;
    name: string;
    description: string;
    video?: string;
    link?: string;
    tags: ITag[];
    duration: number;
  }
  
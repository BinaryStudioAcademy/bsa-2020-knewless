import { ITag } from '@screens/Courses/models/ITag';
import { IPathCardProps } from '@components/PathCard';

export interface IPathsData {
  paths: IPathCardProps[];
  myPaths: IPathCardProps[];
  tags: ITag[];
}
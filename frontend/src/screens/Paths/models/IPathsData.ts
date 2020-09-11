import { IPathCardProps } from '@components/PathCard';
import { ITagData } from '@screens/CoursePage/models/ITagData';

export interface IPathsData {
  paths: IPathCardProps[];
  myPaths: IPathCardProps[];
  tags: ITagData[];
  isMyPathsLoaded: boolean;
}

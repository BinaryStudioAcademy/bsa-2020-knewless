import { EsDataType } from '@screens/Search/models/EsDataTypes';
import { ComplexityLevel } from '@models/LevelsEnum';

// backend/core/src/main/java/com/knewless/core/elasticsearch/model/EsMapper.java

export interface ISearchResult {
  id: string;
  name: string;
  sourceId: string;
  metadata?: object;
  type: EsDataType;
  tags: string[];
}

export interface ICourseSearchResult extends ISearchResult {
  metadata: {
    // full name
    author: string;
    authorId: string;
    date: string;
    level: ComplexityLevel;
    ['total minutes']: number;
    rating: number;
    image: string;
    lectures: number;
    description: string;
  };
}

export interface IPathSearchResult extends ISearchResult {
  metadata: {
    ['total minutes']: number;
    image: string;
    courses: number;
  };
}

export interface ISchoolSearchResult extends ISearchResult {
  metadata: {
    ['authors number']: number;
  };
}

export type IAuthorSearchResult = ISearchResult;

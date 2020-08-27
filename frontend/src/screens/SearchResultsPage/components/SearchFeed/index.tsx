import {
  IAuthorSearchResult,
  ICourseSearchResult,
  IPathSearchResult,
  ISchoolSearchResult,
  ISearchResult
} from '@screens/SearchResultsPage/models/EsModels';
import React, { useEffect, useState } from 'react';
import { EsDataType } from '@screens/Search/models/EsDataTypes';
import { PathSegment } from '@screens/SearchResultsPage/components/path/Segment';
import { CourseSegment } from '@screens/SearchResultsPage/components/course/Segment';
import { AuthorSegment } from '@screens/SearchResultsPage/components/author/Segment';
import { SchoolSegment } from '@screens/SearchResultsPage/components/school/Segment';
import styles from './styles.module.sass';

export interface ISearchFeedProps {
  results: ISearchResult[];
  category: EsDataType;
}

export const SearchFeed: React.FC<ISearchFeedProps> = ({ results, category }) => {
  const [courses, setCourses] = useState<ICourseSearchResult[]>([]);
  const [paths, setPaths] = useState<IPathSearchResult[]>([]);
  const [authors, setAuthors] = useState<IAuthorSearchResult[]>([]);
  const [schools, setSchools] = useState<ISchoolSearchResult[]>([]);

  useEffect(() => {
    const coursesList = [];
    const pathsList = [];
    const authorsList = [];
    const schoolsList = [];

    results.forEach(result => {
      switch (result.type) {
        case EsDataType.COURSE:
          coursesList.push(result);
          break;
        case EsDataType.PATH:
          pathsList.push(result);
          break;
        case EsDataType.SCHOOL:
          schoolsList.push(result);
          break;
        case EsDataType.AUTHOR:
          authorsList.push(result);
          break;
        default:
          break;
      }
    });
    setCourses(coursesList);
    setPaths(pathsList);
    setAuthors(authorsList);
    setSchools(schoolsList);
  }, [results]);

  return (
    <div className={styles.container}>
      {paths.length !== 0 && <PathSegment results={paths} category={category} /> }
      {courses.length !== 0 && <CourseSegment results={courses} category={category} /> }
      {authors.length !== 0 && <AuthorSegment results={authors} category={category} /> }
      {schools.length !== 0 && <SchoolSegment results={schools} category={category} /> }
    </div>
  );
};

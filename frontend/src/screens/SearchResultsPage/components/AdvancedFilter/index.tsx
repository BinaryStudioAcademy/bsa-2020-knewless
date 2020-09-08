import React from 'react';
import styles from './styles.module.sass';
import { EsDataType } from '@screens/Search/models/EsDataTypes';
import { IFilterProps } from '@screens/SearchResultsPage/components/model';
import { CourseFilter } from '@screens/SearchResultsPage/components/course/Filter/CourseFilter';
import { PathFilter } from '@screens/SearchResultsPage/components/path/Filter/PathFilter';
import { AuthorFilter } from '@screens/SearchResultsPage/components/author/Filter/AuthorFilter';
import { SchoolFilter } from '@screens/SearchResultsPage/components/school/Filter/SchoolFilter';
import { Tag } from '@components/TagSelector';

export interface IAdvancedFilterProps extends IFilterProps {
  category: EsDataType;
  className?: string;
  fetchedTags: Tag[];
}

export const AdvancedFilter: React.FC<IAdvancedFilterProps> = (
  { category, visualFilters, updateVisualFilters, updateMatchFilters, updateRangeFilters,
    className, updateSorting, setSortingOptions, expanded, fetchedTags }
) => (
  <div className={`${expanded ? styles.container : styles.container_hidden} ${className || ''}`}>
    <CourseFilter
      expanded={category === EsDataType.COURSE && expanded}
      visualFilters={visualFilters as any}
      updateVisualFilters={updateVisualFilters}
      updateMatchFilters={updateMatchFilters}
      updateRangeFilters={updateRangeFilters}
      updateSorting={updateSorting}
      setSortingOptions={setSortingOptions}
      fetchedTags={fetchedTags}
    />
    <SchoolFilter
      expanded={category === EsDataType.SCHOOL && expanded}
      visualFilters={visualFilters as any}
      updateVisualFilters={updateVisualFilters}
      updateMatchFilters={updateMatchFilters}
      updateRangeFilters={updateRangeFilters}
      updateSorting={updateSorting}
      setSortingOptions={setSortingOptions}
      fetchedTags={fetchedTags}
    />
    <PathFilter
      expanded={category === EsDataType.PATH && expanded}
      visualFilters={visualFilters as any}
      updateVisualFilters={updateVisualFilters}
      updateMatchFilters={updateMatchFilters}
      updateRangeFilters={updateRangeFilters}
      updateSorting={updateSorting}
      setSortingOptions={setSortingOptions}
      fetchedTags={fetchedTags}
    />
    <AuthorFilter
      expanded={category === EsDataType.AUTHOR && expanded}
      visualFilters={visualFilters as any}
      updateVisualFilters={updateVisualFilters}
      updateMatchFilters={updateMatchFilters}
      updateRangeFilters={updateRangeFilters}
      updateSorting={updateSorting}
      setSortingOptions={setSortingOptions}
    />
  </div>
);

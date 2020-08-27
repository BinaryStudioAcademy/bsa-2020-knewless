import React from 'react';
import styles from './styles.module.sass';
import { EsDataType } from '@screens/Search/models/EsDataTypes';
import { IFilterProps } from '@screens/SearchResultsPage/components/model';
import { CourseFilter } from '@screens/SearchResultsPage/components/course/Filter';
import { PathFilter } from '@screens/SearchResultsPage/components/path/Filter';
import { AuthorFilter } from '@screens/SearchResultsPage/components/author/Filter';
import { SchoolFilter } from '@screens/SearchResultsPage/components/school/Filter';
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
    {category === EsDataType.COURSE && (
    <CourseFilter
      expanded={expanded}
      visualFilters={visualFilters as any}
      updateVisualFilters={updateVisualFilters}
      updateMatchFilters={updateMatchFilters}
      updateRangeFilters={updateRangeFilters}
      updateSorting={updateSorting}
      setSortingOptions={setSortingOptions}
      fetchedTags={fetchedTags}
    />
    )}
    {category === EsDataType.SCHOOL && (
    <SchoolFilter
      expanded={expanded}
      visualFilters={visualFilters as any}
      updateVisualFilters={updateVisualFilters}
      updateMatchFilters={updateMatchFilters}
      updateRangeFilters={updateRangeFilters}
      updateSorting={updateSorting}
      setSortingOptions={setSortingOptions}
      fetchedTags={fetchedTags}
    />
    )}
    {category === EsDataType.PATH && (
    <PathFilter
      expanded={expanded}
      visualFilters={visualFilters as any}
      updateVisualFilters={updateVisualFilters}
      updateMatchFilters={updateMatchFilters}
      updateRangeFilters={updateRangeFilters}
      updateSorting={updateSorting}
      setSortingOptions={setSortingOptions}
      fetchedTags={fetchedTags}
    />
    )}
    {category === EsDataType.AUTHOR && (
    <AuthorFilter
      expanded={expanded}
      visualFilters={visualFilters as any}
      updateVisualFilters={updateVisualFilters}
      updateMatchFilters={updateMatchFilters}
      updateRangeFilters={updateRangeFilters}
      updateSorting={updateSorting}
      setSortingOptions={setSortingOptions}
    />
    )}
  </div>
);

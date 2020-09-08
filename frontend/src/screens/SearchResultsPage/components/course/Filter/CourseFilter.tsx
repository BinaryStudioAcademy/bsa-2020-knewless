import React, { useEffect, useState } from 'react';
import { IFilterProps, IFilters } from '@screens/SearchResultsPage/components/model';
import { ComplexityLevel, levelOptions } from '@models/LevelsEnum';
import { OutlineDropdown } from '@components/Dropdown';
import styles from './styles.module.sass';
import { IRangeBoundary, RangeBoundaryType, SortOrder } from '@screens/SearchResultsPage/services/search.service';
import { EsDataType } from '@screens/Search/models/EsDataTypes';
import { Tag } from '@components/TagSelector';
import { SearchFilteringTagSelector } from '@screens/SearchResultsPage/components/SearchFilteringTagSelector';

export interface ICourseFilterProps extends IFilterProps {
  visualFilters: ICourseFilters;
  fetchedTags: Tag[];
}

export interface ICourseFilters extends IFilters {
  // level
  l: ComplexityLevel;
  // minimal rating
  rMin: string;
  // maximal rating
  rMax: string;
}

const ratingOptions = [
  { text: '1', value: 1 },
  { text: '2', value: 2 },
  { text: '3', value: 3 },
  { text: '4', value: 4 },
  { text: '5', value: 5 }
];

enum SortOptions {
  RATING = 'rating_desc',
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc'
}

const sortOptions = [
  { text: 'Rating', value: SortOptions.RATING },
  { text: 'Name A-Z ↓', value: SortOptions.NAME_ASC },
  { text: 'Name Z-A ↑', value: SortOptions.NAME_DESC }
];

export const CourseFilter: React.FC<ICourseFilterProps> = (
  {
    visualFilters, updateVisualFilters, updateMatchFilters, updateRangeFilters, updateSorting,
    setSortingOptions, expanded, fetchedTags
  }
) => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setActive(visualFilters.c === EsDataType.COURSE);
  }, [visualFilters.c]);

  useEffect(() => {
    if (isActive) {
      setSortingOptions(sortOptions);
    }
  }, [isActive]);

  useEffect(() => {
    const field = 'metadata.level';
    const value = visualFilters.l;
    updateMatchFilters(prev => {
      const otherFields = prev.filter(f => f.field !== field);
      if (value !== undefined) {
        return [...otherFields, { field, value }];
      }
      return otherFields;
    });
  }, [visualFilters.l]);

  useEffect(() => {
    const field = 'metadata.rating';
    const conditions: IRangeBoundary[] = [];
    if (visualFilters.rMin !== undefined) conditions.push({ type: RangeBoundaryType.GTE, value: visualFilters.rMin });
    if (visualFilters.rMax !== undefined) conditions.push({ type: RangeBoundaryType.LTE, value: visualFilters.rMax });
    updateRangeFilters(prev => [...prev.filter(f => f.field !== field), { field, rangeBoundaries: conditions }]);
  }, [visualFilters.rMin, visualFilters.rMax]);

  useEffect(() => {
    if (isActive) {
      switch (visualFilters.s) {
        case SortOptions.NAME_DESC:
          updateSorting(() => [{ order: SortOrder.DESC, field: 'name.keyword' }]);
          break;
        case SortOptions.NAME_ASC:
          updateSorting(() => [{ order: SortOrder.ASC, field: 'name.keyword' }]);
          break;
        case SortOptions.RATING:
          updateSorting(() => [{ order: SortOrder.DESC, field: 'metadata.rating' }]);
          break;
        default:
          updateSorting(() => []);
          break;
      }
    }
  }, [visualFilters.s]);

  return (
    <>
      {expanded && (
        <div className={styles.container}>
          <div className={styles.label_container}><span className={styles.label}>Level</span></div>
          <OutlineDropdown
            options={levelOptions}
            clearable
            placeholder="Level"
            value={visualFilters.l}
            onChange={(_, { value }) => updateVisualFilters(prev => ({ ...prev, l: ComplexityLevel[value as string] }))}
          />
          <div className={`${styles.label_container} ${styles.left_space}`}>
            <span className={styles.label}>Min rating</span>
          </div>
          <OutlineDropdown
            options={ratingOptions}
            clearable
            className={styles.rating_picker}
            placeholder=".."
            value={visualFilters.rMin ? Number.parseInt(visualFilters.rMin, 10) : undefined}
            onChange={(_, { value }) => updateVisualFilters(pr => ({ ...pr, rMin: value === '' ? undefined : value }))}
          />
          <div className={`${styles.label_container} ${styles.left_space}`}>
            <span className={styles.label}>Max rating</span>
          </div>
          <OutlineDropdown
            options={ratingOptions}
            clearable
            placeholder=".."
            className={styles.rating_picker}
            value={visualFilters.rMax ? Number.parseInt(visualFilters.rMax, 10) : undefined}
            onChange={(_, { value }) => updateVisualFilters(pr => ({ ...pr, rMax: value === '' ? undefined : value }))}
          />
          <div className={styles.tag_selector}>
            <div className={`${styles.label_container}`}>
              <span className={`${styles.label} ${styles.tags_label}`}>Tags:</span>
            </div>
            <SearchFilteringTagSelector
              fetchedTags={fetchedTags}
              updateMatchFilters={updateMatchFilters}
              updateVisualFilters={updateVisualFilters as any}
              visualFilters={visualFilters}
            />
          </div>
        </div>
      )}
    </>
  );
};

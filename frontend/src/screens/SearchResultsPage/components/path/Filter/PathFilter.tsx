import React, { useEffect, useState } from 'react';
import { IFilterProps, IFilters } from '@screens/SearchResultsPage/components/model';
import styles from './styles.module.sass';
import { EsDataType } from '@screens/Search/models/EsDataTypes';
import { SortOrder } from '@screens/SearchResultsPage/services/search.service';
import { Tag } from '@components/TagSelector';
import { SearchFilteringTagSelector } from '@screens/SearchResultsPage/components/SearchFilteringTagSelector';

export interface IPathFilterProps extends IFilterProps {
  visualFilters: IPathFilters;
  fetchedTags: Tag[];
}

export interface IPathFilters extends IFilters {
  t: string;
}

enum SortOptions {
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc'
}

const sortOptions = [
  { text: 'Name A-Z ↓', value: SortOptions.NAME_ASC },
  { text: 'Name Z-A ↑', value: SortOptions.NAME_DESC }
];

export const PathFilter: React.FC<IPathFilterProps> = (
  {
    updateMatchFilters, updateSorting, updateVisualFilters, visualFilters,
    setSortingOptions, expanded, fetchedTags
  }
) => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setActive(visualFilters.c === EsDataType.PATH);
  }, [visualFilters.c]);

  useEffect(() => {
    if (isActive) {
      setSortingOptions(sortOptions);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      switch (visualFilters.s) {
        case SortOptions.NAME_DESC:
          updateSorting(() => [{ order: SortOrder.DESC, field: 'name.keyword' }]);
          break;
        case SortOptions.NAME_ASC:
          updateSorting(() => [{ order: SortOrder.ASC, field: 'name.keyword' }]);
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
          <div className={`${styles.label_container}`}>
            <span className={`${styles.label} ${styles.tags_label}`}>Tags:</span>
          </div>
          <div className={styles.tag_selector}>
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

import React, { useEffect } from 'react';
import { IFilterProps, IFilters } from '@screens/SearchResultsPage/components/model';
import styles from './styles.module.sass';
import { EsDataType } from '@screens/Search/models/EsDataTypes';
import { SortOrder } from '@screens/SearchResultsPage/services/search.service';
import { SearchFilteringTagSelector } from '@screens/SearchResultsPage/components/SearchFilteringTagSelector';
import { Tag } from '@components/TagSelector';

export interface ISchoolFilterProps extends IFilterProps {
  visualFilters: ISchoolFilters;
  fetchedTags: Tag[];
}

export type ISchoolFilters = IFilters;

enum SortOptions {
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc'
}

const sortOptions = [
  { text: 'Name A-Z ↓', value: SortOptions.NAME_ASC },
  { text: 'Name Z-A ↑', value: SortOptions.NAME_DESC }
];

export const SchoolFilter: React.FC<ISchoolFilterProps> = (
  {
    updateSorting, visualFilters, setSortingOptions, expanded, updateVisualFilters, updateMatchFilters, fetchedTags
  }
) => {
  useEffect(() => {
    setSortingOptions(sortOptions);
  }, []);

  useEffect(() => {
    if (visualFilters.c === EsDataType.SCHOOL.valueOf()) {
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
          <div className={styles.label_container}><span className={styles.label}>Tags:</span></div>
          <div className={styles.tag_selector}>
            <SearchFilteringTagSelector
              fetchedTags={fetchedTags}
              updateMatchFilters={updateMatchFilters}
              updateVisualFilters={updateVisualFilters as any}
            />
          </div>
        </div>
      )}
    </>
  );
};

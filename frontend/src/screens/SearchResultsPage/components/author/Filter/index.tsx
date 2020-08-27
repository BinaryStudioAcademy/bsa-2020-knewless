import React, { useEffect } from 'react';
import { IFilterProps, IFilters } from '@screens/SearchResultsPage/components/model';
import styles from './styles.module.sass';
import { EsDataType } from '@screens/Search/models/EsDataTypes';
import { SortOrder } from '@screens/SearchResultsPage/services/search.service';

export interface IAuthorFilterProps extends IFilterProps {
  visualFilters: IAuthorFilters;
}

export type IAuthorFilters = IFilters

enum SortOptions {
  SUBSCRIBERS='subs_desc',
  NAME_ASC='name_asc',
  NAME_DESC='name_desc'
}

const sortOptions = [
  { text: 'Subscribers', value: SortOptions.SUBSCRIBERS },
  { text: 'Name A-Z ↓', value: SortOptions.NAME_ASC },
  { text: 'Name Z-A ↑', value: SortOptions.NAME_DESC }
];

export const AuthorFilter: React.FC<IAuthorFilterProps> = (
  { updateSorting, visualFilters, expanded, setSortingOptions }
) => {
  useEffect(() => {
    if (visualFilters.c === EsDataType.AUTHOR) {
      setSortingOptions(sortOptions);
    }
  }, [visualFilters.c]);

  useEffect(() => {
    if (visualFilters.c === EsDataType.AUTHOR.valueOf()) {
      switch (visualFilters.s) {
        case SortOptions.NAME_DESC:
          updateSorting(() => [{ order: SortOrder.DESC, field: 'name.keyword' }]);
          break;
        case SortOptions.NAME_ASC:
          updateSorting(() => [{ order: SortOrder.ASC, field: 'name.keyword' }]);
          break;
        case SortOptions.SUBSCRIBERS:
          updateSorting(() => [{ order: SortOrder.DESC, field: 'metadata.subscribers' }]);
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
          <span>No filters available</span>
        </div>
      )}
    </>
  );
};

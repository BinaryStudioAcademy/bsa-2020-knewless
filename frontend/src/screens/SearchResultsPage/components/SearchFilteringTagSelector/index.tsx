import { Tag } from '@components/TagSelector';
import React from 'react';
import { ISearchMatchFilter } from '@screens/SearchResultsPage/services/search.service';
import { IFilters } from '@screens/SearchResultsPage/components/model';
import { StatefulTagSelector } from '@components/StatefulTagSelector';

export interface ISearchFilteringTagSelectorProps {
  fetchedTags: Tag[];
  updateMatchFilters: (filters: (prev: ISearchMatchFilter[]) => ISearchMatchFilter[]) => void;
  updateVisualFilters: (filters: (prev: ITagFilters) => ITagFilters) => void;
}

export interface ITagFilters extends IFilters {
  t: string;
}

export const SearchFilteringTagSelector: React.FC<ISearchFilteringTagSelectorProps> = (
  { fetchedTags, updateMatchFilters, updateVisualFilters }
) => {
  function handleTagSelectionChange(tags: Tag[]) {
    const tagsAsString = tags.map(t => t.name).join(' ');
    updateMatchFilters(prev => {
      const otherFields = prev.filter(filter => filter.field !== 'tags');
      if (tags.length > 0) {
        return [...otherFields, { field: 'tags', value: tagsAsString }];
      }
      return otherFields;
    });

    updateVisualFilters((prev: ITagFilters) => ({ ...prev, t: tagsAsString }));
  }

  return (<StatefulTagSelector fetchedTags={fetchedTags} onChange={handleTagSelectionChange} />);
};

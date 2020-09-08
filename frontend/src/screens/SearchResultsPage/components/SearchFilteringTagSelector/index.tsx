import { Tag } from '@components/TagSelector';
import React, { useEffect, useState } from 'react';
import { ISearchMatchFilter } from '@screens/SearchResultsPage/services/search.service';
import { IFilters } from '@screens/SearchResultsPage/components/model';
import { StatefulTagSelector } from '@components/StatefulTagSelector';

export interface ISearchFilteringTagSelectorProps {
  fetchedTags: Tag[];
  updateMatchFilters: (filters: (prev: ISearchMatchFilter[]) => ISearchMatchFilter[]) => void;
  updateVisualFilters: (filters: (prev: ITagFilters) => ITagFilters) => void;
  visualFilters: any;
}

export interface ITagFilters extends IFilters {
  t: string;
}

export const SearchFilteringTagSelector: React.FC<ISearchFilteringTagSelectorProps> = (
  { fetchedTags, updateMatchFilters, updateVisualFilters, visualFilters }
) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleTagSelectionChange(tags: Tag[]) {
    const tagsAsString = tags.map(t => t.name).join(' ');
    if (isMounted) {
      updateMatchFilters(prev => {
        const prevTags = prev.find(f => f.field === 'tags')?.value;
        if ((prevTags || '') === tagsAsString) {
          return prev;
        }
        const otherFilters = prev.filter(filter => filter.field !== 'tags');
        return tagsAsString !== '' ? [...otherFilters, { field: 'tags', value: tagsAsString }] : [...otherFilters];
      });

      updateVisualFilters((prev: ITagFilters) => {
        if (prev.t === tagsAsString) return prev;
        return { ...prev, t: tagsAsString };
      });
    }
  }

  return (
    <StatefulTagSelector
      fetchedTags={fetchedTags}
      onChange={handleTagSelectionChange}
      selectedTagNames={visualFilters.t?.split(' ')}
    />
  );
};

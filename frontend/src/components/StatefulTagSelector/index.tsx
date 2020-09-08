import { Tag, TagSelector } from '@components/TagSelector';
import React, { useEffect, useState } from 'react';

export interface IFilteringTagSelectorProps {
  fetchedTags: Tag[];
  onChange: (tags: Tag[]) => void;
  selectedTagNames: string[] | undefined;
}

export const StatefulTagSelector: React.FC<IFilteringTagSelectorProps> = (
  { fetchedTags, onChange, selectedTagNames }
) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [storedTags, setStoredTags] = useState<Tag[]>([]);

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    const selected = fetchedTags.filter(tag => selectedTagNames?.includes(tag.name));
    const stored = fetchedTags.filter(tag => !selectedTagNames?.includes(tag.name));
    setSelectedTags(selected);
    setStoredTags(stored);
  }, [fetchedTags, selectedTagNames]);

  function selectedToStored(i: number) {
    const deletedTag = selectedTags[i];
    if (deletedTag) {
      setSelectedTags(prev => prev.filter((_, index) => index !== i));
      setStoredTags(prev => [...prev, deletedTag]);
    }
  }

  function storedToSelected(tag: Tag) {
    setSelectedTags(prev => [...prev, tag]);
    setStoredTags(prev => prev.filter(t => t.id !== tag.id));
  }

  return (
    <TagSelector
      onDelete={selectedToStored}
      onAddition={storedToSelected}
      suggestions={storedTags}
      tags={selectedTags}
      placeholderText="Filter by tags..."
    />
  );
};

import { Tag, TagSelector } from '@components/TagSelector';
import React, { useEffect, useState } from 'react';

export interface IFilteringTagSelectorProps {
  fetchedTags: Tag[];
  onChange: (tags: Tag[]) => void;
}

export const StatefulTagSelector: React.FC<IFilteringTagSelectorProps> = (
  { fetchedTags, onChange }
) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [storedTags, setStoredTags] = useState<Tag[]>([]);

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    setSelectedTags([]);
    setStoredTags(fetchedTags);
  }, [fetchedTags]);

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

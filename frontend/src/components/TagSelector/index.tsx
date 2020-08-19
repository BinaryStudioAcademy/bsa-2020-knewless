import './react_tags.sass';
import ReactTags from 'react-tag-autocomplete';
import React from 'react';

interface ITagSelectorProps {
  onDelete: (i: number) => void;
  onAddition: (tag: Tag) => void;
  suggestions: Tag[];
  tags: Tag[];
  // needed to change styles locally
  id?: string;
  noSuggestionsText?: string;
  // to apply tag-control manually: ref.addTag(), ref.removeTag() etc.
  ref?: React.Ref<unknown>;
  minQueryLength?: number;
  placeholderText?: string
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface Tag {
  id: number;
  name: string;
}

// Note: if you need more props - add them with default values
// Usage example: screens\AddPath\containers\AddPathPage\index.tsx
export const TagSelector: React.FC<ITagSelectorProps> = ({
  onDelete, onAddition, id, noSuggestionsText = 'Tag not found',
  tags, suggestions, ref, minQueryLength = 1, placeholderText = 'Add new tag'
}) => (
  <ReactTags
    ref={ref}
    onDelete={onDelete}
    onAddition={onAddition}
    suggestions={suggestions}
    tags={tags}
    noSuggestionsText={noSuggestionsText}
    id={id}
    autoresize={false}
    minQueryLength={minQueryLength}
    placeholderText={placeholderText}
  />
);

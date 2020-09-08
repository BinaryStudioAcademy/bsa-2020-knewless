import { ISearchResult } from '@screens/SearchResultsPage/models/EsModels';
import {
  ISearchMatchFilter,
  ISearchRangeFilter,
  ISearchSorting
} from '@screens/SearchResultsPage/services/search.service';
import { EsDataType } from '@screens/Search/models/EsDataTypes';

export interface ISearchSegmentProps {
  results: ISearchResult[];
  category: EsDataType;
}

export interface IFilters {
  q?: string;
  // category
  c?: EsDataType;
  // sorting
  s?: string;
}

interface ITextOption {
  text: string;
  value: string;
}

export interface IFilterProps {
  visualFilters: IFilters;
  updateVisualFilters: (visualFilters: (prev: IFilters) => IFilters) => void;
  updateMatchFilters: (filters: (prev: ISearchMatchFilter[]) => ISearchMatchFilter[]) => void;
  updateRangeFilters: (filters: (prev: ISearchRangeFilter[]) => ISearchRangeFilter[]) => void;
  updateSorting: (sort: (prev: ISearchSorting[]) => ISearchSorting[]) => void;
  setSortingOptions: (sortOptions: ITextOption[]) => void;
  expanded: boolean;
}

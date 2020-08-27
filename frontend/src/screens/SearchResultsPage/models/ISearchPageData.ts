import { ISearchResult } from '@screens/SearchResultsPage/models/EsModels';
import { Tag } from '@components/TagSelector';

export interface ISearchPageData {
  results: ISearchResult[];
  total: number;
  tags: Tag[];
}

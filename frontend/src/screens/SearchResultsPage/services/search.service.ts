import { callApi } from '@helpers/api.helper';

export interface IAdvancedSearchRequest {
  query: string;
  size?: number;
  page?: number;
  matchFilters?: ISearchMatchFilter[];
  rangeFilters?: ISearchRangeFilter[];
  sorting?: ISearchSorting[];
}

interface IFieldFilter {
  /**
   * Full field name that corresponds to ElasticSearch document field name
   */
  field: string;
}

export interface ISearchMatchFilter extends IFieldFilter {
  value: string;
}

export interface ISearchRangeFilter extends IFieldFilter {
  rangeBoundaries: IRangeBoundary[];
}

export interface IRangeBoundary {
  type: RangeBoundaryType;
  value: string;
}

export enum RangeBoundaryType {
  LT='LT',
  LTE='LTE',
  GT='GT',
  GTE='GTE'
}

export interface ISearchSorting {
  field: string;
  order: SortOrder;
}

export enum SortOrder {
  ASC='ASC',
  DESC='DESC'
}

export const advancedSearch = async (request: IAdvancedSearchRequest) => {
  console.log('request', request);
  const response = await callApi({
    type: 'POST',
    endpoint: '/api/es/search/advanced',
    requestData: request
  });
  return response.json();
};

export const getAllTags = async () => {
  const response = await callApi({
    type: 'GET',
    endpoint: '/api/tags'
  });
  return response.json();
};

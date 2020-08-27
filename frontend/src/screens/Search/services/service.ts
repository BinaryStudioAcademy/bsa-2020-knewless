import { callApi } from '@helpers/api.helper';
import { ISearchResult } from '@screens/SearchResultsPage/models/EsModels';

const processResponse = response => response.then((data: ISearchResult[]) => {
  const result = Object.create(null);
  data.forEach(item => {
    result[item.type] = result[item.type] || Object.create(null);
    result[item.type].name = result[item.type].name || item.type;
    result[item.type].results = result[item.type].results || [];
    result[item.type].results.push(item);
  });
  return result;
});

export const searchData = async (query: string) => {
  const response = await callApi({ endpoint: '/api/es/search', queryParams: { query }, type: 'GET' });
  return processResponse(response.json());
};

export const searchCourses = async (query: string) => {
  const response = await callApi({ endpoint: '/api/es/search/courses', queryParams: { query }, type: 'GET' });
  return processResponse(response.json());
};

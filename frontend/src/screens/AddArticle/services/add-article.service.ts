import { callApi } from 'helpers/api.helper';

export const saveArticle = async request => {
    const response = await callApi({
      endpoint: '/api/article/',
      type: 'POST',
      requestData: request
    });
    return response.json();
  };
  export const getArticleById = async (id: string) => {
    const response = await callApi({
      endpoint: `/api/article/${id}/edit`,
      type: 'GET'
    });
    return response.json();
  };
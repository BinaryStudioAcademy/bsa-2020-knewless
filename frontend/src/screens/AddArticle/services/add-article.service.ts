import { callApi } from 'helpers/api.helper';

export const saveArticle = async request => {
    const response = await callApi({
      endpoint: '/api/article/',
      type: 'POST',
      requestData: request
    });
    return response.json();
  };
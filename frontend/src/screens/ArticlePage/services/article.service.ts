import { callApi } from 'helpers/api.helper';

export const getArticle = async id=> {
    const response = await callApi({
      endpoint: `/api/article/${id}`,
      type: 'GET'
    });
    return response.json();
  };
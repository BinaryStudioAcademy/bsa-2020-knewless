import { callApi } from 'helpers/api.helper';
import { history } from '@helpers/history.helper';

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

export function forwardHome() {
    history.push('/');
};
  
export function forwardArticles() {
    history.push('/articles');
};

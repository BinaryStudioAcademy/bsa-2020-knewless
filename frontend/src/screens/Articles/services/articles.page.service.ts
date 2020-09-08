import { callApi } from 'helpers/api.helper';


export async function getArticles() {
  const response = await callApi({
    endpoint: '/api/article/author',
    type: 'GET'
  });
  return response.json();
}


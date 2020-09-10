import { callApi } from 'helpers/api.helper';

export const getArticle = async id => {
  const response = await callApi({
    endpoint: `/api/article/${id}`,
    type: 'GET'
  });
  return response.json();
};

export const changeFavouriteState = async request => {
  const response = await callApi({
    endpoint: '/api/favorite/change',
    type: 'POST',
    queryParams: request
  });
  return response.json();
};

export const checkFavouriteState = async request => {
  const response = await callApi({
    endpoint: '/api/favorite',
    type: 'GET',
    queryParams: request
  });
  return response.json();
};

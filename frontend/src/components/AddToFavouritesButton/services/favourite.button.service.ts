import { callApi } from 'helpers/api.helper';

export const isComponentFavourite = async page => {
  const response = await callApi({
    endpoint: '/api/favorite',
    queryParams: {id: page.id, type: page.type},
    type: 'GET'
  });
  return response.json();
};

export const changeFavouriteAction = async page => {
  const response = await callApi({
    type: 'POST',
    endpoint: '/api/favorite/change',
    queryParams: {id: page.id, type: page.type}
  });
  return response.json();
};


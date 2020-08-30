import { callApi } from 'helpers/api.helper';

export const getData = async (authorId: string) => {
  const response = await callApi({
    endpoint: `/api/author/overview/${authorId}`,
    type: 'GET'
  });
  return response.json();
};

export const followAuthor = async source => {
  await callApi({
    endpoint: '/api/subscription/subscribe',
    type: 'POST',
    requestData: source
  });
};

export const unfollowAuthor = async source => {
  await callApi({
    endpoint: '/api/subscription/unsubscribe',
    type: 'POST',
    requestData: source
  });
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


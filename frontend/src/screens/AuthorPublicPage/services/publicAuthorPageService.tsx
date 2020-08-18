import { callApi } from 'helpers/api.helper';

export const getData = async (authorId: string) => {
  const response = await callApi({
    endpoint: `/api/author/overview/${authorId}`,
    type: 'GET'
  });

  return response.json();
};

export const followAuthor = async source => {
  const response = await callApi({
    endpoint: '/api/subscription/subscribe',
    type: 'POST',
    requestData: source
  });

  return response.json();
};

export const unfollowAuthor = async source => {
  console.log(source);
  const response = await callApi({
    endpoint: '/api/subscription/unsubscribe',
    type: 'POST',
    requestData: source
  });

  return response.json();
};

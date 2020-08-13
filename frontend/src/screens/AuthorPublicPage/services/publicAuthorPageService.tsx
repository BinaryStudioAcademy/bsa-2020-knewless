import { callApi } from 'helpers/api.helper';

export const getData = async (authorId: string) => {
  const response = await callApi({
    endpoint: `/api/author/overview/${authorId}`,
    type: 'GET'
  });

  return response.json();
};

export const followAuthor = async (authorId: string) => {
  const response = await callApi({
    endpoint: `api/author/overview/${authorId}/follow`,
    type: 'GET'
  });

  return response.json();
};

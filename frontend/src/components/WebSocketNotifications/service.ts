import { callApi } from 'helpers/api.helper';

export const postUserToPool = async name => {
  await callApi({
    endpoint: '/api/user-connect',
    type: 'Post',
    queryParams: { username: name }
  });
};

export const removeUserFromPool = async name => {
  await callApi({
    endpoint: '/api/user-disconnect',
    type: 'Post',
    queryParams: { username: name }
  });
};

import { callApi } from 'helpers/api.helper';

export const setSettings = async request => {
  const response = await callApi({
    endpoint: '/api/student/',
    type: 'POST',
    requestData: request

  });
  return response.json();
};

export const getSettings = async () => {
  const response = await callApi({
    endpoint: '/api/student/',
    type: 'GET'
  });
  return response.json();
};

export const getTags = async () => {
  const response = await callApi({
    endpoint: 'api/tags',
    type: 'GET'
  });
  return response.json();
};

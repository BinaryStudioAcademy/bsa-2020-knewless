import { callApi } from 'helpers/api.helper';

export const validateLink = async (id: string) => {
  const response = await callApi({
    type: 'GET',
    endpoint: '/api/auth/checkreset',
    queryParams: {id: id}
  });
  return response.json();
};

export const savePassword = async (request) => {
  const response = await callApi({
    type: 'POST',
    endpoint: '/api/auth/savepassword',
    requestData: request
  });
  return response.json();
};

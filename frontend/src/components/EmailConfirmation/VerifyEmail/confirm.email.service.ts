import { callApi } from 'helpers/api.helper';

export const confirmEmail = async (id: string) => {
  const response = await callApi({
    type: 'GET',
    endpoint: '/api/auth/verifymail',
    queryParams: {id: id}
  });
  return response.json();
};


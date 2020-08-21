import { callApi } from 'helpers/api.helper';

export const fetchResetLink = async (email: string) => {
  const response = await callApi({
    endpoint: '/api/auth/reset',
    queryParams: {email: email},
    type: 'GET'
  });
  return response.json();
};

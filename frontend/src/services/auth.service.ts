import { callApi } from '../helpers/api.helper';
import { ACCESS_TOKEN } from '../screens/Authentication/constants';

export const authUser = async ({ endpoint, payload }) => {
  const response = await callApi({
    endpoint: `/api/auth/${endpoint}`,
    type: 'POST',
    requestData: payload
  });
  return response.json();
};

export const setToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

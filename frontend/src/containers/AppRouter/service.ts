import { callApi } from '@helpers/api.helper';
import { RoleTypes } from './models/IRole';

export const getCurrentUser = async () => {
  const result = await callApi({
    endpoint: '/api/user/me',
    type: 'GET'
  });

  return result.json();
};

export const setUserRole = async (name: RoleTypes) => {
  await callApi({
    endpoint: '/api/user/me/role',
    type: 'PUT',
    requestData: {
      name
    }
  });
};


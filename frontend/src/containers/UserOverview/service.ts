import { callApi } from '@helpers/api.helper';

export const getStudent = async (userId: string) => {
  const resp = await callApi({
    endpoint: '/api/student/info',
    type: 'GET',
    queryParams: { userId }
  });
  return resp.json();
};

export const getAuthor = async (userId: string) => {
  const resp = await callApi({
    endpoint: '/api/author/self-info',
    type: 'GET',
    queryParams: { userId }
  });
  return resp.json();
};

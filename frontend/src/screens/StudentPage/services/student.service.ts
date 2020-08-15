import { callApi } from 'helpers/api.helper';

export const getStudentProfile = async () => {
  const response = await callApi({
    endpoint: '/api/student/profile/',
    type: 'GET'
  });
  return response.json();
};

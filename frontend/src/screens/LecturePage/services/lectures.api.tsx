import { callApi } from 'helpers/api.helper';

export const getData = async (lectureId: string) => {
  const response = await callApi({
    endpoint: `/api/course/lecture/${lectureId}`,
    type: 'GET'
  });

  return response.json();
};

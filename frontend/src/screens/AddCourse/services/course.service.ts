import { callApi } from 'helpers/api.helper';

export const getLecturesByAuthor = async (id: string) => {
  const response = await callApi({
    endpoint: `/api/lectures/author/${id}`,
    type: 'GET'
  });

  return response.json();
};

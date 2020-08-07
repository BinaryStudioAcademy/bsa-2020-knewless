import { callApi } from 'helpers/api.helper';
import lectures from '../models/lectures.json';

/* export const getLecturesByAuthor = async (id: string) => {
  const response = await callApi({
    endpoint: `/api/lectures/author/${id}`,
    type: 'GET'
  })
  return response.json();
}; */

export const getLecturesByAuthor = async (id: string) => new Promise(resolve => {
  setTimeout(() => resolve({
    lectures
  }), 500);
});

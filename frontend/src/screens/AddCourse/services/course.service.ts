import { callApi } from 'helpers/api.helper';
import lectures from '../models/lectures.json';
import { ICourse } from '../models/ICourse';

export const getLecturesByAuthor = async (id: string) => {
  const response = await callApi({
    endpoint: `api/course/lectures/user/${id}`,
    type: 'GET'
  });
  const result = response.json();
  return result;
};

/* export const getLecturesByAuthor = async (id: string) => new Promise(resolve => {
  setTimeout(() => resolve({
    lectures
  }), 500);
}); */

export const saveCourse = async (course: ICourse) => {
  const response = await callApi({
    type: 'POST',
    endpoint: 'api/course',
    requestData: course
  });
  return response.json();
};

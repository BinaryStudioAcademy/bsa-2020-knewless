import { callApi } from 'helpers/api.helper';
import { ICourse } from '../models/ICourse';
import { IUpdateCourse } from '../models/IUpdateCourse';

export const getLecturesByUser = async () => {
  const response = await callApi({
    endpoint: `/api/lecture/user`,
    type: 'GET'
  });
  return response.json();
};

export async function getCourseById(id: string) {
  const response = await callApi({
    endpoint: `/api/course/${id}/info`,
    type: 'GET'
  });
  return response.json();
};

export const updateCourse = async (course: IUpdateCourse) => {
  const response = await callApi({
    type: 'PUT',
    endpoint: `/api/course/${course.id}`,
    requestData: course
  });
  return response.json();
};

export const saveCourse = async (course: ICourse) => {
  const response = await callApi({
    type: 'POST',
    endpoint: 'api/course/create',
    requestData: course
  });
  return response.json();
};

export const saveLectureVideo = async lecture => {
  const response = await callApi({
    type: 'POST',
    endpoint: `api/lecture/save`,
    queryParams: {id: lecture.id, duration: lecture.duration},
    attachment: lecture.video
  });
  return response.json();
};

export const addLectureToDb = async lecture => {
  const response = await callApi({
    type: 'POST',
    endpoint: 'api/lecture',
    requestData: lecture
  });
  return response.json();
};

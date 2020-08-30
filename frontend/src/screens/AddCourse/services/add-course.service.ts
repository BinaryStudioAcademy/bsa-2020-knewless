import { callApi } from 'helpers/api.helper';
import { ICourse } from '../models/ICourse';
import { IUpdateCourse } from '../models/IUpdateCourse';
import { history } from '@helpers/history.helper';

export const getLecturesByUser = async () => {
  const response = await callApi({
    endpoint: '/api/lecture/user',
    type: 'GET'
  });
  return response.json();
};

export const getCourseById = async (id: string) => {
  const response = await callApi({
    endpoint: `/api/course/${id}/edit`,
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
    endpoint: '/api/course/create',
    requestData: course
  });
  return response.json();
};

export const saveLectureVideo = async lecture => {
  const response = await callApi({
    type: 'POST',
    endpoint: '/api/lecture/save',
    queryParams: { id: lecture.id, duration: lecture.duration },
    attachment: lecture.video
  });
  return response.json();
};

export const addLectureToDb = async lecture => {
  const response = await callApi({
    type: 'POST',
    endpoint: '/api/lecture',
    requestData: {
      name: lecture.name,
      description: lecture.description,
      duration: lecture.duration,
      tagsIds: lecture.tags.map(t => t.id)
    }
  });
  return response.json();
};

export function forwardHome() {
  history.push('/');
}

export const saveLectureWithUrl = async lecture => {
  const response = await callApi({
    type: 'POST',
    endpoint: '/api/lecture/url',
    requestData: lecture 
  });
    return response.json();
  };

export const getTags = async () => {
  const response = await callApi({
    endpoint: '/api/tags',
    type: 'GET'
  });
  return response.json();
};

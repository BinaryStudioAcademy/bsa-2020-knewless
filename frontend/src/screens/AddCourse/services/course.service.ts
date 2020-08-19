import { callApi } from 'helpers/api.helper';
import { ICourse } from '../models/ICourse';
import { ISaveLecture } from '../components/UploadLectureModal';

export const getLecturesByUser = async () => {
  const response = await callApi({
    endpoint: `api/lecture/user`,
    type: 'GET'
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

import { callApi } from 'helpers/api.helper';
import { ICourse } from '../models/ICourse';
import { ISaveLecture } from '../components/UploadLectureModal';

export const getLecturesByUser = async () => {
  const response = await callApi({
    endpoint: `api/lecture/user`,
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
  console.log(course);
  const response = await callApi({
    type: 'POST',
    endpoint: 'api/course',
    requestData: course
  });
  const result = response.json();
  console.log(result);
  return result;
};

// export const saveLectureVideo = async lecture => {
//   const request = { id: lecture.id, duration: lecture.duration };
//   const response = await callApi({
//     type: 'POST',
//     endpoint: 'api/lecture/upload',
//     requestData: request,
//     attachment: lecture.video
//   });
//   return response.json();
// };

export const saveLectureVideo = async lecture => {
  const request = { id: lecture.id, duration: lecture.duration };
  const response = await callApi({
    type: 'POST',
    endpoint: `api/lecture/${lecture.id}`,
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

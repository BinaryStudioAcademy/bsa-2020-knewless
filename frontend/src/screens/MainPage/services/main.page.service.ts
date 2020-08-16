import { callApi } from '@helpers/api.helper';

export async function getContinueCourses(id: string) {
  console.log(id);
  const response = await callApi({
    endpoint: `/api/course/continue/${id}`,
    type: 'GET'
  });

  return response.json();
}

export async function getRecommendedCourses(id: string) {
  const response = await callApi({
    endpoint: `/api/course/recommended/${id}`,
    type: 'GET'
  });

  return response.json();
}

export async function getPaths() {
  const response = await callApi({
    endpoint: '/api/paths/',
    type: 'GET'
  });
  return response.json();
}

export async function getStudent() {
  const response = await callApi({
    endpoint: '/api/student/info/',
    type: 'GET'
  });
  return response.json();
}

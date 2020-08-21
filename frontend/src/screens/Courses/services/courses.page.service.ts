import { callApi } from 'helpers/api.helper';

export async function getCourses() {
  const response = await callApi({
    endpoint: '/api/course/all',
    type: 'GET',
    queryParams: { page: 0, size: 10 }
  });
  return response.json();
}

export async function getAuthorCourses() {
  const response = await callApi({
    endpoint: '/api/course/author/user',
    type: 'GET'
  });
  return response.json();
}

export async function getCoursesByTag(tagId: string) {
  const response = await callApi({
    endpoint: `/api/course/lecture/tag/${tagId}`,
    type: 'GET',
    queryParams: { page: 0, size: 10 }
  });
  return response.json();
}

export async function getContinueCourses() {
  const response = await callApi({
    endpoint: '/api/course/continue',
    type: 'GET'
  });
  return response.json();
}

export async function getTags() {
  const response = await callApi({
    endpoint: '/api/tags',
    type: 'GET'
  });
  return response.json();
}

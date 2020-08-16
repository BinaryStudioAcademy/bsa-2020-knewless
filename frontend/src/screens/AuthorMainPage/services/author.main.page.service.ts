import { callApi } from '@helpers/api.helper';

export async function getAuthor() {
  const response = await callApi({
    endpoint: '/api/author/self-info',
    type: 'GET'
  });
  return response.json();
}

export async function getAuthorCourses(id: string) {
  const response = await callApi({
    endpoint: `/api/course/author/${id}`,
    type: 'GET'
  });
  return response.json();
}

export async function getAuthorPaths(id: string) {
  const response = await callApi({
    endpoint: `/api/paths/author/${id}`,
    type: 'GET'
  });
  return response.json();
}


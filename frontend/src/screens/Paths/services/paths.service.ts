import { callApi } from 'helpers/api.helper';

export async function getAllPathsRequest() {
  const response = await callApi({
    endpoint: '/api/paths/all',
    type: 'GET'
  });
  return response.json();
}

export async function getAllAuthorPathsRequest() {
  const response = await callApi({
    endpoint: '/api/paths/author',
    type: 'GET'
  });
  return response.json();
}

export async function getAllStudentPathsRequest() {
  const response = await callApi({
    endpoint: '/api/paths/student',
    type: 'GET'
  });
  return response.json();
}

export async function getPathsByTagRequest(tagId: string) {
  const response = await callApi({
    endpoint: `/api/paths/tag/${tagId}`,
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

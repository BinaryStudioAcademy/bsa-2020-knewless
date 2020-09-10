import { callApi } from 'helpers/api.helper';

export const fetchCourses = async () => {
  const response = await callApi({
    endpoint: '/api/favorite/courses',
    type: 'GET'
  });
  return response.json();
};

export const fetchPaths = async () => {
  const response = await callApi({
    endpoint: '/api/favorite/paths',
    type: 'GET'
  });
  return response.json();
};

export const fetchAuthors = async () => {
  const response = await callApi({
    endpoint: '/api/favorite/authors',
    type: 'GET'
  });
  return response.json();
};

export const fetchLectures = async () => {
  const response = await callApi({
    endpoint: '/api/favorite/lectures',
    type: 'GET'
  });
  return response.json();
};

export const fetchArticles = async () => {
  const response = await callApi({
    endpoint: '/api/favorite/articles',
    type: 'GET'
  });
  return response.json();
};

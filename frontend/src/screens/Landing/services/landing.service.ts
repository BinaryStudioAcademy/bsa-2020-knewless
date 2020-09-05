import { callApi } from 'helpers/api.helper';
import { navigations } from './mock';

async function coursesRequest() {
  const response = await callApi({
    endpoint: '/api/course',
    type: 'GET',
    queryParams: { page: 0, size: 3 }
  });
  return response.json();
}

async function pathsRequest() {
  const response = await callApi({
    endpoint: '/api/paths',
    type: 'GET',
    queryParams: { page: 0, size: 3 }
  });
  return response.json();
}

async function popularCoursesRequest() {
  const response = await callApi({
    endpoint: '/api/course/popular',
    type: 'GET',
    queryParams: { page: 0, size: 3 }
  });
  return response.json();
}

export const getPopularCourses = async () => popularCoursesRequest();
export const getPaths = async () => pathsRequest();

function mockNavigations() {
  return Promise.resolve(navigations);
}

export const getNavigations = async () => mockNavigations();

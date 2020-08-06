import { callApi } from 'helpers/api.helper';
import { courses, navigations, paths } from './mock';

async function properRequest() {
  const response = await callApi({
    endpoint: '/api/data/',
    type: 'GET'
  });

  return response.json();
}

async function mockRequest() {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      courses,
      paths,
      navigations
    }), 500);
  });
}

export const getData = async () => mockRequest();

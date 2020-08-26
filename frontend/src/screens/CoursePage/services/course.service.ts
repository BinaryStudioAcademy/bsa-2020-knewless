import { callApi } from 'helpers/api.helper';

export async function getData(id) {
  const response = await callApi({
    endpoint: `/api/course/${id}/info`,
    type: 'GET'
  });

  return response.json();
}
export async function startCourse(request) {
  const response = await callApi({
    endpoint: `/api/course/continue/start`,
    type: 'POST',
    requestData: request
  });

  return response.json();
}

import { callApi } from 'helpers/api.helper';

async function properRequest() {
  const response = await callApi({
    endpoint: '/api/data/',
    type: 'GET'
  });

  return response.json();
}

export const getData = async () => properRequest();

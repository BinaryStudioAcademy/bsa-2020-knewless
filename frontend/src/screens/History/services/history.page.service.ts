import { callApi } from 'helpers/api.helper';

export async function getHistory() {
  const response = await callApi({
    endpoint: '/api/watch_history/user',
    type: 'GET'
  });
  return response.json();
}
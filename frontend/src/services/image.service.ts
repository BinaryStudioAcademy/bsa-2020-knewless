import { callApi } from 'helpers/api.helper';

export const uploadImage = async image => {
  const response = await callApi({
    endpoint: '/api/image/',
    type: 'POST',
    attachment: image
  });
  return response.json();
};

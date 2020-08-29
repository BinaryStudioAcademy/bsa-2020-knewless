import { callApi } from 'helpers/api.helper';

export const getPathData  = async (id:string) => {
  const response = await callApi({
    endpoint: `/api/paths/page/${id}`,
    type: 'GET'
  });
  return response.json();
};

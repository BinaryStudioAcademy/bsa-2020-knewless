import { callApi } from 'helpers/api.helper';

export async function getData(id) {
  const response = await callApi({
    endpoint: `/api/course/${id}/info`,
    type: 'GET'
  });
  return response.json();
}

export async function getAuthorInfo() {
  const response = await callApi({
    endpoint: '/api/author/self-info',
    type: 'GET'
  });

  return response.json();
}

export async function saveReview({ courseId, rating }) {
  const response = await callApi({
    endpoint: `/api/course/reaction/${courseId}`,
    type: 'POST',
    requestData: rating
  });
  return response.json();
}

export async function startCourse(request) {
  const response = await callApi({
    endpoint: '/api/course/continue/start',
    type: 'POST',
    requestData: request
  });

  return response.json();
}

export const changeFavouriteState = async request => {
  const response = await callApi({
    endpoint: '/api/favorite/change',
    type: 'POST',
    queryParams: request
  });
  return response.json();
};

export const checkFavouriteState = async request => {
  const response = await callApi({
    endpoint: '/api/favorite',
    type: 'GET',
    queryParams: request
  });
  return response.json();
};

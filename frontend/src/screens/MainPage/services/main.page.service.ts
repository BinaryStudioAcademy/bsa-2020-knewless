import { callApi } from '@helpers/api.helper';

export async function getContinueCourses(id: string) {
  const response = await callApi({
    endpoint: `/api/course/continue/${id}`,
    type: 'GET'
  });

  return response.json();
}

export async function getRecommendedCourses() {
  const response = await callApi({
    endpoint: '/api/course/recommended/',
    type: 'GET'
  });

  return response.json();
}

export async function getRecommendedPaths() {
  const response = await callApi({
    endpoint: '/api/paths/recommended/',
    type: 'GET'
  });

  return response.json();
}

export async function getPaths() {
  const response = await callApi({
    endpoint: '/api/paths/',
    type: 'GET'
  });
  return response.json();
}

export async function getStudent() {
  const response = await callApi({
    endpoint: '/api/student/info/',
    type: 'GET'
  });
  return response.json();
}

export async function getPersonalGoalProgress() {
  const resp = await callApi({
    endpoint: '/api/student/goal',
    type: 'GET'
  });
  return resp.json();
}

export async function setPersonalGoal(goalId: string) {
  await callApi({
    endpoint: '/api/student/goal',
    type: 'POST',
    requestData: {
      goalId
    }
  });
}

export async function getAllGoals() {
  const resp = await callApi({
    endpoint: '/api/goals',
    type: 'GET'
  });
  return resp.json();
}

export async function setCongratsShown() {
  await callApi({
    endpoint: '/api/student/goal/shown',
    type: 'PUT'
  });
}

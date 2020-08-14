import { callApi } from 'helpers/api.helper';
import { IPath } from '../models/domain';
import { history } from '../../../helpers/history.helper';

export async function getCourses() {
  const response = await callApi({
    endpoint: 'api/course/author',
    type: 'GET'
  });

  return response.json();
}

export async function getTags() {
  const response = await callApi({
    endpoint: 'api/tags',
    type: 'GET'
  });

  return response.json();
}

export async function uploadPath(path: IPath) {
  const response = await callApi({
    endpoint: 'api/paths/create',
    type: 'PUT',
    requestData: {
      name: path.name,
      description: path.description,
      tags: path.tags.map(t => t.id),
      courses: path.courses.map(c => c.id),
      imageTag: path.imageTag?.id
    }
  });
  return response.json();
}

export function forwardHome() {
  history.push('/');
}

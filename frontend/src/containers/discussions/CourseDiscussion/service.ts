import { callApi } from '@helpers/api.helper';

export const getMessagesForCourse = async (courseId: string) => {
  const result = await callApi({
    endpoint: `/api/course_comment/of/${courseId}`,
    type: 'GET',
    queryParams: { size: 200 }
  });

  return result.json();
};

export interface ISendMessageArgument {
  text: string;
  resourceId: string;
}

export const sendMessage = async (data: ISendMessageArgument) => {
  const resp = await callApi({
    endpoint: '/api/course_comment',
    type: 'POST',
    requestData: {
      text: data.text,
      courseId: data.resourceId
    }
  });

  return resp.json();
};


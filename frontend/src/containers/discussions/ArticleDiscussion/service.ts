import { callApi } from '@helpers/api.helper';
import { ISendMessageArgument } from '@containers/discussions/CourseDiscussion/service';

export const getMessagesForArticle = async (courseId: string) => {
  const result = await callApi({
    endpoint: `/api/article_comment/of/${courseId}`,
    type: 'GET',
    queryParams: { size: 200 }
  });

  return result.json();
};

export const sendMessage = async (data: ISendMessageArgument) => {
  const resp = await callApi({
    endpoint: '/api/article_comment',
    type: 'POST',
    requestData: {
      text: data.text,
      articleId: data.resourceId
    }
  });

  return resp.json();
};


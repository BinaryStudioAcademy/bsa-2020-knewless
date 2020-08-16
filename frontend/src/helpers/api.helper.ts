import * as queryString from 'query-string';
import { toastr } from 'react-redux-toastr';
import { IFetchArgsData } from 'models/IFetchArgsData';
import { IFetchArgs } from 'models/IFetchArgs';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'screens/Authentication/constants';

const getFetchUrl = ({ endpoint, queryParams }: IFetchArgsData) => `${endpoint}${
  queryParams ? `?${queryString.stringify(queryParams)}` : ''
}`;

const getInitHeaders = (contentType = 'application/json', hasContent = true) => {
  const headers: HeadersInit = new Headers();
  if (hasContent) {
    headers.set('Content-Type', contentType);
  }
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

const getFetchArgs = (args: IFetchArgsData): IFetchArgs => {
  const headers = args.attachment ? getInitHeaders('multipart/form-data', false) : getInitHeaders();
  let body;
  if (args.attachment) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support attachments.');
    }
    const formData = new FormData();
    formData.append('image', args.attachment);
    body = formData;
  } else if (args.requestData) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.requestData);
  }

  if (args.attachment && args.requestData) {
    const formData = new FormData();
    formData.append('image', args.attachment);
    const blob = new Blob([JSON.stringify(args.requestData)], {
      type: 'application/json'
    });
    formData.append('request', blob);
    body = formData;
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return {
    method: args.type,
    headers,
    ...(args.requestData === 'GET' ? {} : { body })
  };
};

const throwIfResponseFailed = async (res: Response) => {
  if (!res.ok) {
    if (res.status === 401) {
      // logout
    }
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`An error occurred: ${err}`);
      toastr.error('Error!', err);
    }
    throw parsedException;
  }
};

const refreshToken = async () => {
  const token = localStorage.getItem(REFRESH_TOKEN);

  const headers = getInitHeaders();
  if (token) {
    headers.set('Refresh-token', token);
  }

  const response = await fetch('/api/auth/refresh', { headers, method: 'POST' });
  return response.json();
};

export const callApi = async (args: IFetchArgsData): Promise<Response> => {
  let res = await fetch(getFetchUrl(args), getFetchArgs(args));

  if (res.status === 401 && localStorage.getItem(REFRESH_TOKEN)) {
    const tokenRefreshResponse = await refreshToken();

    if (tokenRefreshResponse.accessToken) {
      localStorage.setItem(ACCESS_TOKEN, tokenRefreshResponse.accessToken);
      res = await fetch(getFetchUrl(args), getFetchArgs(args));
    }
  }
  await throwIfResponseFailed(res);
  return res;
};

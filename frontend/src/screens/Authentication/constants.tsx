import { env } from '../../env';

export const ACCESS_TOKEN = 'accessToken';

const API_BASE_URL = env.apiBaseUrl;
const OAUTH2_REDIRECT_URI = `${env.clientBaseUrl}/oauth2/redirect`;

export const GOOGLE_AUTH_URL = `${API_BASE_URL}/oauth2/authorize/google?redirect_uri=${OAUTH2_REDIRECT_URI}`;
export const FACEBOOK_AUTH_URL = `${API_BASE_URL}/oauth2/authorize/facebook?redirect_uri=${OAUTH2_REDIRECT_URI}`;

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

const OAUTH2_REDIRECT_URI = 'oauth/redirect';

export const GOOGLE_AUTH_URL = `${window.origin}/oauth2/authorize/google?redirect_uri=${window.origin}/${OAUTH2_REDIRECT_URI}`;
export const FACEBOOK_AUTH_URL = `${window.origin}oauth2/authorize/facebook?redirect_uri=${window.origin}/${OAUTH2_REDIRECT_URI}`;

import { createRoutine } from 'redux-saga-routines';
export const fetchArticleDataRoutine = createRoutine('GET_ARTICLE', (articleId: string) => articleId);

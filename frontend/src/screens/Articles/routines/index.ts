import { createRoutine } from 'redux-saga-routines';

const prefix = 'ARTICLE_PAGE:';
export const fetchArticlesRoutine = createRoutine(`${prefix}:FETCH_ARTICLES_DATA`);
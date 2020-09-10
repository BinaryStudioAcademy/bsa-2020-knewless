import { createRoutine } from 'redux-saga-routines';

export const fetchArticleDataRoutine = createRoutine('GET_ARTICLE', (articleId: string) => articleId);

export const changeFavouriteArticleStateRoutine = createRoutine('ARTICLE_FAVOURITE_ACTION');

export const checkFavouriteArticleStateRoutine = createRoutine('CHECK_IS_ARTICLE_FAVOURITE');

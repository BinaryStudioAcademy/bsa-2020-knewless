import { createRoutine } from 'redux-saga-routines';
import { IArticle } from '../models/domain';

export const saveArticleRoutine = createRoutine('SAVE_ARTICLE', (article: IArticle) => article);
export const fetchArticleEditRoutine = createRoutine('FETCH_ARTICLE_EDIT', ( id: string) => id);

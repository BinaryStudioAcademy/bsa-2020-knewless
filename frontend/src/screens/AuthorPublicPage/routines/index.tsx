import { createRoutine } from 'redux-saga-routines';

export const fetchAuthorDataRoutine = createRoutine('FETCH_AUTHOR_DATA');

export const setAuthorMenuActiveItemRoutine = createRoutine('SET_PUBLIC_AUTHOR_NAME_ITEM');

export const followAuthorRoutine = createRoutine('FOLLOW_AUTHOR');

export const unfollowAuthorRoutine = createRoutine('UNFOLLOW_AUTHOR');

export const changeFavouriteAuthorStateRoutine = createRoutine('AUTHOR_FAVOURITE_ACTION');

export const checkFavouriteAuthorStateRoutine = createRoutine('CHECK_AUTHOR_FAVOURITE');
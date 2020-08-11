import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { authorMainPageData } from '../containers/MainPage/reducer';
import { fetchAuthorCoursesRoutine, fetchAuthorPathsRoutine } from '../routines';

const requests = combineReducers({
  authorCoursesRequest: reducerCreator(
    [fetchAuthorCoursesRoutine.TRIGGER]
  ),
  authorPathsRequest: reducerCreator(
    [fetchAuthorPathsRoutine.TRIGGER]
  )
});

export default combineReducers({
  data: authorMainPageData,
  requests
});

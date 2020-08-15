import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { authorMainPageData } from '../containers/MainPage/reducer';
import { fetchAuthorRoutine, fetchAuthorCoursesRoutine, fetchAuthorPathsRoutine } from '../routines';

const requests = combineReducers({
  authorRequest: reducerCreator(
    [fetchAuthorRoutine.TRIGGER]
  ),
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

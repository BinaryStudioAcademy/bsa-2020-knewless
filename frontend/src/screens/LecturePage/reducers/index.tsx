import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { chosenVideo, lectureDto, lectureMenu } from '../containers/Lectures/reducers';
import { fetchCourseDtoRoutine } from '../routines';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchCourseDtoRoutine.TRIGGER])
});

export default combineReducers({
  lectureDto,
  lectureMenu,
  chosenVideo,
  requests
});

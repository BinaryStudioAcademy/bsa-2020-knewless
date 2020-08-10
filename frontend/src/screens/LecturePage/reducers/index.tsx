import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { lectureDto, lectureMenu, choosedVideo } from '../containers/Lectures/reducers';
import { fetchCourseDtoRoutine } from '../routines';

const requests = combineReducers({
  dataRequest: reducerCreator([fetchCourseDtoRoutine.TRIGGER])
});

export default combineReducers({
  lectureDto,
  lectureMenu,
  choosedVideo,
  requests
});

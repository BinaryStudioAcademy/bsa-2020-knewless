import { combineReducers } from 'redux';
import { changeFavouriteStateRoutine, checkFavouriteStateRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../component/reducer';

const requests = combineReducers({
  checkFavourite: reducerCreator([checkFavouriteStateRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});

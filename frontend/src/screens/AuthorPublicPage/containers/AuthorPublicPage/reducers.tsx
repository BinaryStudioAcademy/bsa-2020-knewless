import { Routine } from 'redux-saga-routines';
import { IAuthorData } from 'screens/AuthorPublicPage/models/IAuthorData';
import { fetchAuthorDataRoutine, setAuthorMenuActiveItemRoutine,
  changeFavouriteAuthorStateRoutine, checkFavouriteAuthorStateRoutine } from 'screens/AuthorPublicPage/routines';
import { IAuthorMenu } from 'screens/AuthorPublicPage/models/IAuthorMenu';

const basicAuthorData = {
  userId: '',
  avatar: '',
  firstName: '',
  lastName: '',
  biography: '',
  schoolName: '',
  schoolId: '',
  numberOfSubscribers: 0,
  courses: [{
    id: '',
    name: '',
    level: '',
    author: '',
    category: '',
    imageSrc: '',
    duration: 0
  }],
  articles: [{
    id: '',
    name: ''
  }],
  favourite: false,
  printFollowButton: false
};

export const authorData = (state: IAuthorData = basicAuthorData, action: Routine<any>) => {
  switch (action.type) {
    case fetchAuthorDataRoutine.SUCCESS:
      const { favourite } = state;
      action.payload.favourite = favourite;
      return action.payload;
    case changeFavouriteAuthorStateRoutine.SUCCESS: {
      return {
        ...state,
        favourite: action.payload
      };
    }
    case checkFavouriteAuthorStateRoutine.SUCCESS: {
      return {
        ...state,
        favourite: action.payload
      };
    }
    default:
      return state;
  }
};

const basicIAuthorMenu = {
  activeItem: 'Courses'
};

export const authorMenu = (state: IAuthorMenu = basicIAuthorMenu, action: Routine<any>) => {
  switch (action.type) {
    case setAuthorMenuActiveItemRoutine.TRIGGER:
      return action.payload;
    default:
      return state;
  }
};


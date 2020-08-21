import { Routine } from 'redux-saga-routines';

import { IAuthorData } from 'screens/AuthorPublicPage/models/IAuthorData';
import { fetchAuthorDataRoutine, setAuthorMenuActiveItemRoutine } from 'screens/AuthorPublicPage/routines';
import { IAuthorMenu } from 'screens/AuthorPublicPage/models/IAuthorMenu';

const basicAuthorData = {
  userId: '',
  avatar: 'https://i.imgur.com/rGqrhwK.jpg',
  firstName: 'Unspecified',
  lastName: 'author',
  biography: 'unspecified information about author',
  schoolName: '',
  schoolId: 'incorrect id',
  numberOfSubscribers: 0,
  courses: [{
    id: 'qwe',
    name: 'qwe',
    level: 'qwe',
    author: 'qwe',
    category: 'qwe',
    imageSrc: 'qwe',
    duration: 0
  }],
  articles: [{
    id: '',
    name: ''
  }],
  printFollowButton: false
};

export const authorData = (state: IAuthorData = basicAuthorData, action: Routine<any>) => {
  switch (action.type) {
    case fetchAuthorDataRoutine.SUCCESS:
      return action.payload;
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


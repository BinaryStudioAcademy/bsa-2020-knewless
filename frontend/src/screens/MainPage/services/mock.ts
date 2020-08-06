import sqlImage from '../../../assets/images/card_image_sql.png';
import { ICourseCardProps } from '../../../components/CourseCard';
import { IPathCardProps } from '../../../components/PathCard';
import { IStudent } from '../models/IStudent';

export const courses: ICourseCardProps[] = [
  {
    imageSrc: sqlImage,
    level: 'Intermediate',
    duration: '2h 53m',
    author: 'Xavier Morera',
    name: 'T-SQL Data Manipulation Playbook',
    category: {
      name: 'Programming',
      // eslint-disable-next-line no-console
      onClick: () => (console.log('click category'))
    },
    rating: 3,
    // eslint-disable-next-line no-console
    onOpenClick: () => (console.log('click open'))
  },
  {
    imageSrc: sqlImage,
    level: 'Intermediate',
    duration: '2h 53m',
    author: 'Xavier Morera',
    name: 'T-SQL Data Manipulation Playbook',
    category: {
      name: 'Programming',
      // eslint-disable-next-line no-console
      onClick: () => (console.log('click category'))
    },
    rating: 3,
    // eslint-disable-next-line no-console
    onOpenClick: () => (console.log('click open'))
  },
  {
    imageSrc: sqlImage,
    level: 'Intermediate',
    duration: '2h 53m',
    author: 'Xavier Morera',
    name: 'T-SQL Data Manipulation Playbook',
    category: {
      name: 'Programming',
      // eslint-disable-next-line no-console
      onClick: () => (console.log('click category'))
    },
    rating: 3,
    // eslint-disable-next-line no-console
    onOpenClick: () => (console.log('click open'))
  }
];

export const paths: IPathCardProps[] = [
  {
    name: 'Javascript Core Language',
    // eslint-disable-next-line max-len
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
    courses: 69,
    duration: {
      duration: 189,
      timeUnit: 'Hours'
    }
  },
  {
    name: 'Java Language',
    // eslint-disable-next-line max-len
    logoSrc: 'https://i.imgur.com/HB79yTL.png',
    courses: 180,
    duration: {
      duration: 2,
      timeUnit: 'Weeks'
    }
  },
  {
    name: 'PHP Core Language',
    logoSrc: 'https://miro.medium.com/max/4096/1*Y1hq9sHXG26Fyhys81z8rg.png',
    courses: 228,
    duration: {
      duration: 15,
      timeUnit: 'Days'
    }
  }
];

export const student: IStudent = {
  id: '1',
  firstName: 'Shawn',
  lastName: 'LastName',
  email: 'email@gmail.com',
  roleName: 'Angular web developer',
  avatar: 'https://i1.wp.com/www.playtimes.com.hk/wp-content/uploads/2016/11/600x-shutterstock_88750303.jpg?ssl=1',
  nickname: 'shawn'
};

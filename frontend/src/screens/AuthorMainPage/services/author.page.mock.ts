import sqlImage from '../../../assets/images/card_image_sql.png';
import { IPathCardProps } from '../../../components/PathCard';
import { IAuthor } from '../models/IAuthor';
import { ISchool } from '../models/ISchool';
import { IAuthorCourseCardProps } from '../components/AuthorCourseCard';

export const courses: IAuthorCourseCardProps[] = [
  {
    imageSrc: sqlImage,
    name: 'T-SQL Data Manipulation Playbook',
    onOpenClick: () => (console.log('click open'))
  },
  {
    name: 'T-SQL Data Manipulation Playbook',
    imageSrc: sqlImage,
    onOpenClick: () => (console.log('click open'))
  },
  {
    imageSrc: sqlImage,
    name: 'T-SQL Data Manipulation Playbook',
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

const school: ISchool = {
  id: '1',
  name: 'Web developers school',
  logoLink: 'https://sewoveritstitchschool.co.uk/wp-content/uploads/2019/04/soi-stitch-school.png',
  membersCount: '5'
};

export const author: IAuthor = {
  id: '1',
  name: 'Xavier Morera',
  roleName: 'Author',
  avatar: 'https://pluralsight.imgix.net/author/lg/dan-bunker-v1.jpg',
  school,
  followers: 726
};

import { ICourseCardProps } from 'components/CourseCard';
import javaImage from '../../../assets/images/card_image_java.png';
import { IPathCardProps } from 'components/PathCard';
import { INavigationSectionProps } from '../components/NavigationSection';

export const courses: Array<ICourseCardProps> = [
  {
    imageSrc: javaImage,
    level: 'Intermediate',
    duration: '1h 12m',
    author: 'Quipex',
    name: 'Java courses',
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
    imageSrc: javaImage,
    level: 'Intermediate',
    duration: '1h 12m',
    author: 'Quipex',
    name: 'Java courses',
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
    imageSrc: javaImage,
    level: 'Intermediate',
    duration: '1h 12m',
    author: 'Quipex',
    name: 'Java courses qwe wqwe qwe qweqwe qwe qwe',
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

export const paths: Array<IPathCardProps> = [
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
    name: 'Java Language qweqdq qe wqe qweqw wqe qwewqqw eqwe qwe wqeq ',
    // eslint-disable-next-line max-len
    logoSrc: 'https://i.imgur.com/HB79yTL.png',
    courses: 180,
    duration: {
      duration: 2,
      timeUnit: 'Weeks'
    }
  }
  // {
  //   name: 'PHP Core Language',
  //   logoSrc: 'https://miro.medium.com/max/4096/1*Y1hq9sHXG26Fyhys81z8rg.png',
  //   courses: 228,
  //   duration: {
  //     duration: 15,
  //     timeUnit: 'Days'
  //   }
  // }
];

export const navigations: INavigationSectionProps[] = [
  {
    title: 'Courses',
    links: [
      { text: 'Java Script beginner', url: '' },
      { text: 'PHP advance', url: '' },
      { text: 'Java Basic', url: '' },
      { text: '.NET advance', url: '' }
    ]
  },
  {
    title: 'Paths',
    links: [
      { text: 'Java', url: '' },
      { text: 'JavaScript', url: '' },
      { text: '.NET', url: '' },
      { text: 'PHP', url: '' }
    ]
  },
  {
    title: 'Support',
    links: [
      { text: 'Contact Us', url: '' },
      { text: 'FAQs', url: '' },
      { text: 'Live Chat', url: '' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { text: 'Twitter', url: '', icon: 'twitter' },
      { text: 'Facebook', url: '', icon: 'facebook' }
    ]
  }
];

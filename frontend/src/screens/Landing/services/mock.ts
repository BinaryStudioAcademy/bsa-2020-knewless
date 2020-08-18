import { INavigationSectionProps } from '../components/NavigationSection';

export const navigations: INavigationSectionProps[] = [
  {
    title: 'Courses',
    links: [
      { id: '1', text: 'Java Script beginner', url: '' },
      { id: '2', text: 'PHP advance', url: '' },
      { id: '3', text: 'Java Basic', url: '' },
      { id: '4', text: '.NET advance', url: '' }
    ]
  },
  {
    title: 'Paths',
    links: [
      { id: '5', text: 'Java', url: '' },
      { id: '6', text: 'JavaScript', url: '' },
      { id: '7', text: '.NET', url: '' },
      { id: '8', text: 'PHP', url: '' }
    ]
  },
  {
    title: 'Support',
    links: [
      { id: '9', text: 'Contact Us', url: '' },
      { id: '10', text: 'FAQs', url: '' },
      { id: '11', text: 'Live Chat', url: '' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { id: '12', text: 'Twitter', url: '', icon: 'twitter' },
      { id: '13', text: 'Facebook', url: '', icon: 'facebook' }
    ]
  }
];

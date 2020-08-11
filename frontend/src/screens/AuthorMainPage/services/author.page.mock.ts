import { IAuthor } from '../models/IAuthor';
import { ISchool } from '../models/ISchool';

const school: ISchool = {
  id: '1',
  name: 'Web developers school',
  logoLink: 'https://sewoveritstitchschool.co.uk/wp-content/uploads/2019/04/soi-stitch-school.png',
  membersCount: '5'
};

export const author: IAuthor = {
  id: 'ef7ece86-445f-4ad1-b0b1-901c74fc0591',
  name: 'Xavier Morera',
  roleName: 'Author',
  avatar: 'https://pluralsight.imgix.net/author/lg/dan-bunker-v1.jpg',
  school,
  followers: 726
};

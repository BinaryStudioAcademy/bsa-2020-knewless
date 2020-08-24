import countryList from 'react-select-country-list';

export const MIN_YEAR_OF_BIRTH = 1950;
export const MIN_EXPERIENCE_YEAR = 0;
const THIS_YEAR = new Date().getFullYear();
const MAX_EXPERIENCE_YEAR = THIS_YEAR - MIN_YEAR_OF_BIRTH;

export const yearOptions = [];
for (let i = MIN_YEAR_OF_BIRTH; i <= THIS_YEAR; i += 1) {
  const year = {
    key: i,
    value: i,
    text: i
  };
  yearOptions.push(year);
}
export const experienceOptions = [];
for (let i = MIN_EXPERIENCE_YEAR; i <= MAX_EXPERIENCE_YEAR; i += 1) {
  const year = {
    key: i,
    value: i,
    text: i
  };
  experienceOptions.push(year);
}
export const educationOptions = [
  { key: 0, value: 'Middle School', text: 'Middle School' },
  { key: 1, value: 'High School', text: 'High School' },
  { key: 2, value: 'Bachelor\'s degree', text: 'Bachelor\'s degree' },
  { key: 3, value: 'Master\'s degree', text: 'Master\'s degree' }
];
export const levelOptions = [
  { key: 0, value: 'Beginner', text: 'Beginner' },
  { key: 1, value: 'Intermediate', text: 'Intermediate' },
  { key: 2, value: 'Advanced', text: 'Advanced' }
];
export const directionOptions = [
  { key: 0, value: 'Developer', text: 'Developer' },
  { key: 1, value: 'IT Professional', text: 'IT Professional' },
  { key: 2, value: 'Creative', text: 'Creative' },
  { key: 3, value: 'Other', text: 'Other' }
];
export const locationOptions = countryList().getData()
  .map(item => ({ key: item.label, value: item.label, text: item.label }));
export const employmentOptions = [
  { key: 0, value: 'Employee', text: 'Employee' },
  { key: 1, value: 'Self-employed', text: 'Self-employed' }
];
export const industryOptions = [
  { key: 0, value: 'Consulting', text: 'Consulting' },
  { key: 1, value: 'Web Services', text: 'Web Services' },
  { key: 2, value: 'Software Products', text: 'Software Products' },
  { key: 3, value: 'Telecommunications', text: 'Telecommunications' },
  { key: 4, value: 'Government', text: 'Government' },
  { key: 5, value: 'Education', text: 'Education' }
];
export const roleOptions = [
  { key: 0, value: 'DevOps', text: 'DevOps' },
  { key: 1, value: 'IT Support', text: 'IT Support' },
  { key: 2, value: 'Game Dev', text: 'Game Dev' },
  { key: 3, value: 'Mobile Dev', text: 'Mobile Dev' },
  { key: 4, value: 'Manager', text: 'Manager' },
  { key: 5, value: 'QA', text: 'QA' }
];

import countryList from 'react-select-country-list';

export const locationOptions = countryList()
  .getData()
  .map(item => ({ key: item.label, value: item.label, text: item.label }));

export const experienceOptions = [];
for (let i = 0; i <= 80; i += 1) {
  const year = {
    key: i,
    value: i,
    text: i
  };
  experienceOptions.push(year);
}

export const yearOptions = [];
for (let i = 1950; i <= 2020; i += 1) {
  const year = {
    key: i,
    value: i,
    text: i
  };
  yearOptions.push(year);
}

export const levelOptions = [
  { key: 0, value: 'Beginner', text: 'Beginner' },
  { key: 1, value: 'Intermediate', text: 'Intermediate' },
  { key: 2, value: 'Advanced', text: 'Advanced' }
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
export const employmentOptions = [
  { key: 0, value: 'Employee', text: 'Employee' },
  { key: 1, value: 'Self-employed', text: 'Self-employed' }
];
export const educationOptions = [
  { key: 0, value: 'Middle School', text: 'Middle School' },
  { key: 1, value: 'High School', text: 'High School' },
  { key: 2, value: 'Bachelor`s degree', text: 'Bachelor`s degree' },
  { key: 3, value: 'Master`s degree', text: 'Master`s degree' }
];

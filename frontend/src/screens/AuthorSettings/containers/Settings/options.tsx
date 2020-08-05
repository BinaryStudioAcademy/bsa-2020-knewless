import countryList from 'react-select-country-list';

export const locationOptions = countryList()
  .getData()
  .map(item => ({ key: item.label, value: item.label, text: item.label }));

export const yearOptions = [];
for (let i = 1950; i <= 2020; i += 1) {
  const year = {
    key: i,
    text: i
  };
  yearOptions.push(year);
}
export const levelOptions = [
  { key: 0, value: 'Begginer', text: 'Begginer' },
  { key: 1, value: 'Intermediate', text: 'Intermediate' },
  { key: 2, value: 'Advanced', text: 'Advanced' }
];

export const industryOptions = [
  { key: 0, value: 'Data Services', text: 'Data Services' },
  { key: 1, value: 'Information Security', text: 'Information Security' },
  { key: 2, value: 'Software', text: 'Software' },
  { key: 3, value: 'Hardware', text: 'Hardware' }
];
export const roleOptions = [
  { key: 0, value: 'PM', text: 'PM' },
  { key: 1, value: 'Designer', text: 'Designer' },
  { key: 2, value: 'Developer', text: 'Developer' }
];
export const employmentOptions = [
  { key: 0, value: 'Employee', text: 'Employee' },
  { key: 1, value: 'Self-employed', text: 'Self-employed' }
];
export const educationOptions = [
  { key: 0, value: 'Middle School', text: 'Middle School' },
  { key: 1, value: 'High School', text: 'High School' },
  { key: 2, value: 'Barchelor', text: 'Barchelor' },
  { key: 3, value: 'Master', text: 'Master' }
];

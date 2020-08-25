import countryList from 'react-select-country-list';

export const locationOptions = countryList()
  .getData()
  .map(item => ({
    key: item.label,
    value: item.label,
    text: item.label
  }));

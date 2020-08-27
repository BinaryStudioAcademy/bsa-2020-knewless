export enum Sort {
  ASCENDING='ASCENDING',
  DESCENDING='DESCENDING'
}

export const sortOptions = Object.keys(Sort).map(sort => (
  { text: sort.substring(0, 1).toUpperCase() + sort.substring(1).toLowerCase(),
    value: sort.toUpperCase() }
));

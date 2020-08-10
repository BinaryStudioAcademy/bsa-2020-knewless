import { IFilterableItem } from './index';

export const filterByName = (item: IFilterableItem, filterValue: string): boolean => {
  if (!(typeof filterValue !== 'undefined' && filterValue)) {
    return true;
  }
  const name: string = item.name.toUpperCase();
  const value: string = filterValue.toUpperCase();
  return name.includes(value);
};

export function compareName(a: IFilterableItem, b: IFilterableItem): number {
  if (a.name.toLowerCase() < b.name.toLocaleLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
}

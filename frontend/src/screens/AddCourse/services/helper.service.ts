import { IFilterableItem } from '../../../components/FilterableList';

export const filter = (element: IFilterableItem, filterValue: string): any => {
  if (!(typeof filterValue !== 'undefined' && filterValue)) {
    return element;
  }
  const name: string = element.name.toUpperCase();
  const value: string = filterValue.toUpperCase();
  if (name.includes(value)) return element;
  return undefined;
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

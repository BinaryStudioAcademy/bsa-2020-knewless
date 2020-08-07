import { IItem } from './sharedInterface/IItem';

export const filter = (element: IItem, filterValue: string): any => {
  if (!(typeof filterValue !== 'undefined' && filterValue)) {
    return element;
  }
  const name: string = element.name.toUpperCase();
  const value: string = filterValue.toUpperCase();
  if (name.includes(value)) return element;
  return undefined;
};

export function compareName(a: IItem, b: IItem): number {
  if (a.name.toLowerCase() < b.name.toLocaleLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
}

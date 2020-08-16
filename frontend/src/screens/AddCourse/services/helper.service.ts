import { IFilterableItem } from '../../../components/FilterableList';
import { ILecture } from '../models/ILecture';

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

export function getMinutes(lectures: Array<ILecture>): number {
  if (lectures.length === 0) return 0;
  if (lectures.length === 1) return lectures[0].timeMinutes;
  return lectures.map(l => l.timeMinutes).reduce((t1, t2) => t1 + t2);
}

export function getExtension(filename: string) {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}

export function isImage(filename: string) {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'png':
    case 'jpeg':
      return true;
    default:
  }
  return false;
}

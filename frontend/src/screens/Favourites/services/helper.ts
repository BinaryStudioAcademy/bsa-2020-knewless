export function convertFromSeconds(seconds: number): string {
  const minutes: number = Math.round(seconds / 60);
  if (minutes < 60 && seconds % 60 !== 0) return (`${minutes} m ${seconds % 60} s`);
  if (minutes < 60 && seconds % 60 === 0) return (`${minutes} m`);
  const hours: number = Math.round(minutes / 60);
  if (hours < 24 && minutes % 60 !== 0) return (`${hours} h ${minutes % 60} m`);
  if (hours < 24 && minutes % 60 === 0) return (`${hours} h`);
  return hours === 24 ? '1 day' : (`${Math.round(hours / 24)} d ${hours % 24} h`);
}

export const parseDate = (date: Date): string => {
  const dt = new Date(date.toString());
  return dt.toLocaleDateString();
};

export const filterByName = (item: any, filterValue: string): boolean => {
  if (!(typeof filterValue !== 'undefined' && filterValue)) {
    return true;
  }
  const name: string = item.name.toUpperCase();
  const value: string = filterValue.toUpperCase();
  return name.includes(value);
};

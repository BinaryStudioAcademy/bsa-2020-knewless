import moment from 'moment';

export function timeComparator(date: string): string {
  return moment(new Date(date)).fromNow();
}

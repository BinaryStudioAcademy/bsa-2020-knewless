export interface INotification {
  text: string,
  link: string,
  sourceName: string,
  id: string,
  read: boolean,
  date: string,
  deleting?: boolean
}
export interface INotification {
  text: string,
  id: string,
  read: boolean,
  sourceType: string,
  sourceId: string,
  date: string,
  deleting?: boolean
}
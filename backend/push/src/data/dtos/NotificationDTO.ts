import { NotificationType } from '../enums/NotificationType';
import { NotificationBody } from './NotificationBody';

export interface INotificationDTO {
    receiverId: string,
    body: NotificationBody,
    type: NotificationType,
    payloadType?: PayloadType
}

export enum PayloadType {
    UpdateUser = 0,
    UpdateRequestStatus
}
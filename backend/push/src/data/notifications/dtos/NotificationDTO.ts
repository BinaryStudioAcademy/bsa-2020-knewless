import { NotificationType } from '../enums/NotificationType';
import { NotificationBody } from './NotificationBody';
import { CourseMessageBody } from './CourseMessageBody';

export interface INotificationDTO {
    receiverId: string,
    body: NotificationBody | CourseMessageBody,
    type: NotificationType,
    payloadType?: PayloadType
}

export enum PayloadType {
    UpdateUser = 0,
    UpdateRequestStatus
}

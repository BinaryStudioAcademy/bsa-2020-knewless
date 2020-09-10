import { socketService } from '../websockets/socket.service';
import { NotificationType } from '../data/notifications/enums/NotificationType';
import { INotificationDTO } from '../data/notifications/dtos/NotificationDTO';

export function pushQueueHandler(msg: string) {
  let data: INotificationDTO;
  try {
    data = JSON.parse(msg);
  } catch (e) {
    console.error('error', e)
  }
  console.log("Received:", msg);
  switch(data.type) {
    case NotificationType.GLOBAL:
      socketService.pushToAllClients('notification', data.body);
      break;
    case NotificationType.GROUP:
      // socketService.pushToClientByRoomName(data.groupName, data.body);
      console.warn('Not exist groups users')
      break;
    case NotificationType.PERSONAL:
      socketService.pushToClientById(data.receiverId, data.body);
      break;
    case NotificationType.COURSE:
      socketService.pushToDiscussionParticipants(`course:${data.receiverId}`, data.body as any);
      break;
    case NotificationType.LECTURE:
      socketService.pushToDiscussionParticipants(`lecture:${data.receiverId}`, data.body as any);
      break;
    case NotificationType.PATH:
      socketService.pushToDiscussionParticipants(`path:${data.receiverId}`, data.body as any);
      break;
    case NotificationType.ARTICLE:
      socketService.pushToDiscussionParticipants(`article:${data.receiverId}`, data.body as any);
      break;
    default:
      console.error('something was wrong ' + data.type + NotificationType.PERSONAL);
      break;
  }
}

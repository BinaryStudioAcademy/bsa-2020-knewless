import { Service } from 'typedi';
import { PayloadType } from '../data/notifications/dtos/NotificationDTO';
import { getUserIdFromToken } from '../auth/auth';
import { handleToken } from './handshake.handlers';
import { CourseMessageBody } from '../data/notifications/dtos/CourseMessageBody';

@Service()
export class SocketService {
    socketIo: any;
    io: any;
    private connectedUsers: { [key: string]: string[] } = {};

    create(server: any) {
        this.socketIo = require('socket.io');
        this.io = this.socketIo(server);

        this.io.use((socket: any, next: any) => {
            const { token } = socket.handshake.query;
            if (token && token !== 'null') return handleToken(token, next);
            next();
        });

        this.io.on("connection", (socket: any) => {
            const token = socket.handshake.query.token;
            if (token && token != 'null') {
                const { id } = getUserIdFromToken(token);
                this.addUser(id, socket.id)
            }

            socket.on("disconnect", async () => {
                this.deleteUser(socket.id);
            });

            socket.on("manual-disconnection", async () => {
                this.deleteUser(socket.id);
            });
        });
        this.io.on('connect_failed', () => console.log('Connection failed'));

        this.io.on('error', () => console.log('Some error'));
    }

    addUser(userId: string, socketId: string) {
        if (userId) {
            if (this.connectedUsers[userId]) {
                this.connectedUsers[userId] = this.connectedUsers[userId].concat([
                    socketId
                ]);
            } else {
                this.connectedUsers[userId] = [socketId];
            }
        }
        console.log('Connected users:', this.connectedUsers)
    }

    deleteUser(socketId: string) {
        Object.keys(this.connectedUsers).forEach(key => {
            const filteredConnections = this.connectedUsers[key].filter(
                existedSocketId => existedSocketId !== socketId
            );
            if (filteredConnections.length) {
                this.connectedUsers[key] = filteredConnections;
            } else {
                delete this.connectedUsers[key];
            }
        });
        console.log('Connected users:', this.connectedUsers)
    }

    pushToAllClients = (name: string, payload: any) => {
        this.io.emit(name, payload);
    }

    pushToClientById = (userId: string, payload: any, payloadType?: PayloadType) => {
        const socketIds = this.connectedUsers[userId];

        if (!socketIds) return;

        const sendData = (socketName: string, payload: any) =>
            socketIds.forEach(id => this.io.to(`${id}`).emit(socketName, payload));

        switch (payloadType) {
            case PayloadType.UpdateUser:
                sendData('updateUserData', payload);
                break;
            default:
                sendData('notification', payload);
                break;
        }
    }

    pushToDiscussionParticipants(roomName: string, body: CourseMessageBody) {
        console.log(`sending to [${roomName}]: ${body}`)
        this.io.emit(roomName, body);
    }
}

export const socketService = new SocketService();

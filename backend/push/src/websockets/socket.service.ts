import { Service } from 'typedi';
import { PayloadType } from '../data/dtos/NotificationDTO';
import { isValid, getUserIdFromToken } from '../auth/auth';

@Service()
export class SocketService {
    socketIo: any;
    io: any;
    private connectedUsers: { [key: string]: string[] } = {};

    create(server: any) {
        this.socketIo = require('socket.io');
        this.io = this.socketIo(server);
        
        this.io.use((socket: any, next: any) => {
            const token = socket.handshake.query.token;
            const { valid, error } = isValid(token);
            if (valid) {
                return next();
            }
            console.log(`While connecting user with token: ${token} an error was caught: ${error}`);
            return next(error);
        });

        this.io.on("connection", (socket: any) => {
            const token = socket.handshake.query.token;
            const { id } = getUserIdFromToken(token);
            this.addUser(id, socket.id);

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

    addUser(userId: string, socketId: string){
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

        switch(payloadType) {
            case PayloadType.UpdateUser:
                sendData('updateUserData', payload);
                break;
            default:
                sendData('notification', payload);
                break;
        }
    }

    pushToClientByRoomName = (roomName: string, payload: any) => {
        this.io.to(roomName).emit('notification', payload)
    }
}

export const socketService = new SocketService();

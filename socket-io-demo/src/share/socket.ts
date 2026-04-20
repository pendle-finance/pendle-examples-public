import { io, Socket } from 'socket.io-client';
import { SOCKET_NAMESPACE, SOCKET_URL } from './constants';

export function connect(): Socket {
  return io(`${SOCKET_URL}${SOCKET_NAMESPACE}`, { transports: ['websocket'] });
}

export function subscribe(socket: Socket, room: string) {
  socket.emit('subscribe', room);
}

export function unsubscribe(socket: Socket, room: string) {
  socket.emit('unsubscribe', room);
}

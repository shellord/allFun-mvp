import React from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;
export const socket = io(SOCKET_URL);

socket.on('error', (error) => {
  console.log('error', window.alert(error));
});

export const SocketContext = React.createContext<Socket | null>(null);

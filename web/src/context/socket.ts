import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io('ws://localhost:1337');

socket.on('error', (error) => {
  console.log('error', window.alert(error));
});

export const SocketContext = React.createContext<Socket | null>(null);

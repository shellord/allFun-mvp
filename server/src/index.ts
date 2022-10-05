import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';
import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import { Server } from 'socket.io';
import * as Game from './services/game';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  socket.on('createGame', () => {
    const roomId = Math.random().toString(36).substring(7);
    socket.emit('gameCreated', roomId);
    Game.createGame(roomId);
  });

  socket.on('joinRoom', ({ roomId, playerName }) => {
    try {
      const game = Game.joinGame(roomId, playerName);
      console.log(game);
      if (!game) {
        return socket.emit('error', 'Game Error!');
      }
      const { scrambledWord } = game;
      socket.join(roomId);
      // @ts-ignore
      socket.name = playerName;
      socket.emit('joinedRoom', roomId);
      socket.emit('scrambledWord', scrambledWord);
      io.to(roomId).emit('gameUpdate', game);
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      }
      socket.emit('error', message);
    }
  });

  socket.on('leaveRoom', ({ roomId, playerName }) => {
    const game = Game.leaveGame(roomId, playerName);
    socket.leave(roomId);
    io.to(roomId).emit('gameUpdate', game);
  });

  socket.on('submitWord', ({ roomId, word }) => {
    const game = Game.getGame(roomId);
    if (!game) {
      return socket.emit('error', 'Game Error!');
    }
    const { word: correctWord } = game;
    console.log(correctWord, word);
    if (word === correctWord) {
      //@ts-ignore
      game.winner = socket.name;
      game.finished = true;
      io.to(roomId).emit('gameUpdate', game);
    }
  });

  socket.on('disconnecting', () => {
    const rooms = socket.rooms;
    rooms.forEach((roomId) => {
      if (roomId === socket.id) return;
      // @ts-ignore
      const game = Game.leaveGame(roomId, socket.name);
      io.to(roomId).emit('gameUpdate', game);
      console.log(game);
    });
  });

  socket.on('disconnect', () => {
    socket.disconnect();
  });
});

io.listen(1337);

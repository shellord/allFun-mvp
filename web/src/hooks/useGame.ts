import React from 'react';
import { SocketContext } from '../context/socket';
import type { TGame } from '../../../common/types/types';

const useGame = (roomId: string, playerName: string) => {
  const [scrambledWord, setScrambledWord] = React.useState<string>();
  const [game, setGame] = React.useState<TGame>();
  const socket = React.useContext(SocketContext);
  const ref = React.useRef(false);

  React.useEffect(() => {
    if (ref.current) {
      return;
    }

    if (!roomId || !socket || !playerName) return;
    ref.current = true;

    socket.emit('joinRoom', { roomId, playerName });

    socket.on('joinedRoom', (roomId: string) => {
      console.log('joined room', roomId);
    });

    socket.on('scrambledWord', (scrambledWord) => {
      setScrambledWord(scrambledWord);
    });

    socket.on('gameUpdate', (game: TGame) => {
      setGame(game);
    });
  }, [roomId, playerName, socket]);

  const submitWord = (word: string) => {
    socket?.emit('submitWord', { roomId, word });
  };
  return { scrambledWord, game, submitWord };
};

export default useGame;

import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useGame from '../hooks/useGame';

const Room: NextPage = () => {
  const router = useRouter();
  const playerName = router.query.name as string;
  const roomId = router.query.roomId as string;
  const { scrambledWord, game, submitWord } = useGame(roomId, playerName);
  const [word, setWord] = React.useState('');

  if (game?.finished) {
    return (
      <div>
        <p>Game Over</p>
        <p>Winner is {game.winner}</p>
      </div>
    );
  }

  return (
    <div className='flex h-[100vh] flex-1 flex-col '>
      <div>
        <h1 className='text-xl font-bold'>Players</h1>
        <div className=''>
          {game?.players.map((player) => (
            <div key={player}>
              <p>{player}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center flex-1 mt-52 flex-col'>
        <p className='font-bold'>Unscramble word</p>
        <div className='mt-3' />
        <p className='text-4xl tracking-widest font-light'>
          {scrambledWord?.toUpperCase()}
        </p>
        <div className='flex flex-col space-y-10'>
          <input
            type='text'
            className='border-2 border-gray-300 rounded-md p-2 mt-3'
            onChange={(e) => {
              setWord(e.target.value);
            }}
          />
          <button onClick={() => submitWord(word)}>Submit Word</button>
        </div>
      </div>
    </div>
  );
};

export default Room;

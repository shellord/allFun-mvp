import React from 'react';
import { NextPage } from 'next';
import Container from '../components/Container';
import { SocketContext } from '../context/socket';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const socket = React.useContext(SocketContext);
  const [name, setName] = React.useState<null | string>(null);
  const router = useRouter();

  const createGameHandler = () => {
    if (!socket) return;
    if (!name) return alert('Please enter your name');

    socket.emit('createGame');

    socket.on('gameCreated', (roomId) => {
      socket.off('gameCreated');
      router.push(`/${roomId}?name=${name}`);
    });
  };

  return (
    <Container>
      <input
        placeholder='enter your name'
        onChange={(event) => setName(event.target.value)}
      />
      <button onClick={createGameHandler}>
        <u>Create a game</u>
      </button>
    </Container>
  );
};

export default Home;

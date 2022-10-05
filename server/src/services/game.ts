import type { TGame } from '../../../common/types/types';

const WORDS = ['hello', 'world', 'pilot', 'snake', 'dragon'];

const games = new Map<string, TGame>();

export const createGame = (roomId: string) => {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];

  const scrambledWord = word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  const game = {
    word,
    scrambledWord,
    players: [],
    started: false,
    finished: false,
    winner: null,
  };

  games.set(roomId, game);

  return game;
};

export const getAllGames = () => {
  return Array.from(games.values());
};

export const joinGame = (roomId: string, name: string) => {
  console.log(name);
  const game = games.get(roomId);
  if (!game) {
    throw new Error('Game not found');
  }
  if (game.players.includes(name)) {
    throw new Error('Player already joined!');
  }
  game.players.push(name);
  return game;
};

export const leaveGame = (roomId: string, name: string) => {
  const game = games.get(roomId);
  if (!game) {
    throw new Error('Game not found');
  }
  if (!game.players.includes(name)) {
    throw new Error('Player not found!');
  }
  game.players = game.players.filter((player) => player !== name);
  console.log(game);
  return game;
};

export const getGame = (roomId: string) => {
  return games.get(roomId);
};

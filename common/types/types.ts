export type TGame = {
  word: string;
  scrambledWord: string;
  players: string[];
  started: boolean;
  finished: boolean;
  winner: string | null;
};

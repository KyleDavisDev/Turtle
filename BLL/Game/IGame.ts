export interface IGame {
  newGame(): void;

  guessWord(word: string): String[];

  getBoardState(): String[][];
}

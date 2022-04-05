export interface IGame {
  guessWord: (word: string) => string[];

  getBoardState(): string[][];
}

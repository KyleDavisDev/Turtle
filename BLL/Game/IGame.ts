export interface IGame {
  guessWord(word: string): String[];

  getBoardState(): String[][];
}

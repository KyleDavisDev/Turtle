export type GuessResponse = "Y" | "G" | "/";

export interface IGame {
  guessWord: (word: string) => GuessResponse[];

  getBoardState(): string[][];
}

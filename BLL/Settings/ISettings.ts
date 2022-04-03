export interface ISettings {
  getWordLength: number;

  setWordLength(val: number);

  getMaxGuesses: number;

  setMaxGuesses(val: number);

  getGameName: string;
}

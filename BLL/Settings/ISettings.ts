export interface ISettings {
  getWordLength: number;

  setWordLength: (val: number) => void;

  getMaxGuesses: number;

  setMaxGuesses: (val: number) => void;

  getGameName: string;
}

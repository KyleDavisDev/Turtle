import { ISettings } from "../Settings/ISettings";
import { IGame } from "./IGame";
import { IValidateWordStrategy } from "../Strategies/ValidateWordStrategy/IValidateWordStrategy";

export interface GameParams {
  settings: ISettings;
  wordToGuess: string;
}

class Game implements IGame {
  private _settings: ISettings;
  private _boardState: string[][];
  private _curRow: Number;
  private _wordToGuess: string;
  private _wordValidator: IValidateWordStrategy;

  constructor(params: GameParams) {
    this._settings = params.settings;
    this._wordToGuess = params.wordToGuess;
    this._boardState = this.getEmptyBoard();
    this._curRow = 0;
  }

  private getEmptyBoard(): string[][] {
    return Array.from({ length: this._settings.getMaxGuesses }, () =>
      Array.from({ length: this._settings.getWordLength }, () => {
        return "";
      })
    );
  }

  public guessWord(word: string) {
    this.verifyWord(word.trim());
    this.validateWord(word.trim());

    let results = [];

    return results;
  }

  // Confirm that the word follows the rules of the game
  private verifyWord(word: string) {
    if (word.length < this._settings.getWordLength) throw new Error("Guess too short!");
    if (word.length > this._settings.getWordLength) throw new Error("Guess too long!");
  }

  // Confirm that the word exists
  private validateWord(word: string): void {
    if (!this._wordValidator.isValidWord(word)) {
      throw new Error("Your word is not valid.");
    }
  }

  getBoardState(): string[][] {
    return this._boardState;
  }
}

export { Game };

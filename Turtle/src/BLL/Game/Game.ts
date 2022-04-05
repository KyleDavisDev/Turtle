import { ISettings } from "../Settings/ISettings";
import { IGame } from "./IGame";
import { IValidateWordStrategy } from "../Strategies/ValidateWordStrategy/IValidateWordStrategy";

export interface IGameParams {
  settings: ISettings;
  wordToGuess: string;
  validateWordStrategy: IValidateWordStrategy;
}

class Game implements IGame {
  private _settings: ISettings;
  private _boardState: string[][];
  private _curRow: Number;
  private _wordToGuess: string;
  private _wordValidator: IValidateWordStrategy;

  constructor(params: IGameParams) {
    this._settings = params.settings;
    this._wordToGuess = params.wordToGuess;
    this._boardState = this.getEmptyBoard();
    this._curRow = 0;
    this._wordValidator = params.validateWordStrategy;
  }

  private getEmptyBoard(): string[][] {
    return Array.from({ length: this._settings.getMaxGuesses() }, () =>
      Array.from({ length: this._settings.getWordLength() }, () => {
        return "";
      })
    );
  }

  public guessWord(word: string): string[] {
    this.validateWord(word.trim());
    this.verifyWord(word);

    let results: string[] = [this._wordToGuess];

    return results;
  }

  // Confirm that the word follows the rules of the game
  private validateWord(word: string): void {
    if (word.length === 0) throw new Error("You must provide a non-empty word to guess!");
    if (word.length < this._settings.getWordLength()) throw new Error("Guess too short!");
    if (word.length > this._settings.getWordLength()) throw new Error("Guess too long!");
  }

  // Confirm that the word exists
  private verifyWord(word: string) {
    if (!this._wordValidator.isValidWord(word)) {
      throw new Error("Your word is not valid.");
    }
  }

  getBoardState(): string[][] {
    return this._boardState;
  }
}

export { Game };

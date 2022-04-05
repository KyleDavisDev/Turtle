import { ISettings } from "../Settings/ISettings";
import { GuessResponse, IGame } from "./IGame";
import { IValidateWordStrategy } from "../Strategies/ValidateWordStrategy/IValidateWordStrategy";

export interface IGameParams {
  settings: ISettings;
  wordToGuess: string;
  validateWordStrategy: IValidateWordStrategy;
}

class Game implements IGame {
  private _settings: ISettings;
  private _boardState: string[][];
  private _curRow: number;
  private _wordToGuess: string;
  private _wordValidator: IValidateWordStrategy;

  constructor(params: IGameParams) {
    this._settings = params.settings;
    this._wordToGuess = params.wordToGuess.toLowerCase();
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

  public guessWord(userGuess: string): GuessResponse[] {
    this.validateWord(userGuess.trim());
    this.verifyWord(userGuess);

    userGuess = userGuess.toLowerCase();
    let results: GuessResponse[] = [];
    for (let i = 0, len = userGuess.length; i < len; i++) {
      if (userGuess[i] === this._wordToGuess[i]) {
        // Letter in right place
        results[i] = "G";
      } else if (this._wordToGuess.includes(userGuess[i]) && results[i] !== "G") {
        // Letter in wrong place but exists in the answer
        results[i] = "Y";
      } else {
        // Letter does not exist in the answer
        results[i] = "/";
      }
    }

    this._boardState[this._curRow] = results;
    this._curRow += 1;

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

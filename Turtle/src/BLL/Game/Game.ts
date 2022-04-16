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
    this.validateWord(userGuess);
    this.verifyWord(userGuess);
    userGuess = userGuess.trim().toLowerCase();
    let wordToGuessCopy = this._wordToGuess; // going to be removing letters from the copy as letters are found

    let results: GuessResponse[] = Array.from({ length: this._settings.getWordLength() }, () => {
      return "/";
    });

    // Search for matching letters first!
    for (let i = 0; i < userGuess.length; i++) {
      if (userGuess[i] === this._wordToGuess[i]) {
        results[i] = "G";

        wordToGuessCopy = this.removeLetterAtIndex(wordToGuessCopy, wordToGuessCopy.indexOf(userGuess[i]));
      }
    }

    // Check if person has guessed correctly
    if (wordToGuessCopy.length === 0) {
      this._boardState[this._curRow] = results;
      this._winnerWinnerChickenDinner();
      return results;
    }

    // Search for misplaced letters next
    for (let i = 0; i < userGuess.length; i++) {
      if (wordToGuessCopy.includes(userGuess[i]) && results[i] !== "G") {
        results[i] = "Y";
        wordToGuessCopy = this.removeLetterAtIndex(wordToGuessCopy, wordToGuessCopy.indexOf(userGuess[i]));
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

  getWordLength() {
    return this._wordToGuess.length;
  }

  private removeLetterAtIndex = (s: string, i: number): string => {
    return s.slice(0, i) + s.slice(i + 1);
  };

  private _winnerWinnerChickenDinner() {
    // Should I need to do anything here?
  }
}

export { Game };

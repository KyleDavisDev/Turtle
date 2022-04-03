import { ISettings } from "../Settings/ISettings";
import { Settings } from "../Settings/Settings";
import { IGame } from "./IGame";

export interface GameParams {
  settings: ISettings;
  wordToGuess: string;
}

class Game implements IGame {
  private _settings: ISettings;
  private _boardState: String[][];
  private _curRow: Number;
  private _wordToGuess: string;

  constructor(params: GameParams) {
    this._settings = params.settings;
    this._wordToGuess = params.wordToGuess;
    this._boardState = this.getEmptyBoard();
    this._curRow = 0;
  }

  public newGame(): void {
    // reset the board
    this._boardState = this.getEmptyBoard();
    this._curRow = 0;
    this._wordToGuess = this.newWord();
  }

  private getEmptyBoard(): String[][] {
    return Array.from({ length: this._settings.getMaxGuesses }, () =>
      Array.from({ length: this._settings.getWordLength }, () => {
        return "";
      })
    );
  }

  public guessWord(word: string) {
    this.validateWordGuess(word.trim());

    let results = [];

    return results;
  }

  private validateWordGuess(word: string): void {
    if (!word) throw new Error("You must provide a guess!");
    if (word.length < this._settings.getWordLength) throw new Error("Guess too short!");
    if (word.length > this._settings.getWordLength) throw new Error("Guess too long!");
  }

  getBoardState(): String[][] {
    return this._boardState;
  }

  private newWord() {
    // TODO: generate(?) word here
    return "cheese";
  }
}

export { Game };

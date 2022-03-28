import { IConstant } from "../Constants/IConstant";
import { Constants } from "../Constants/Constants";
import { IGame } from "./IGame";

export interface GameParams {
  constants?: IConstant;
  word?: string;
}

class Game implements IGame {
  private _constants: IConstant;
  private _boardState: String[][];
  private _curRow: Number;
  private _word: string;

  constructor(params: GameParams) {
    this._constants = params?.constants ?? new Constants();
    this._word = params?.word ?? this.newWord();
    this._boardState = this.getEmptyBoard();
    this._curRow = 0;
  }

  public newGame(): void {
    // reset the board
    this._boardState = this.getEmptyBoard();
    this._curRow = 0;
    this._word = this.newWord();
  }

  private getEmptyBoard(): String[][] {
    return Array.from({ length: this._constants.maxGuesses }, () =>
      Array.from({ length: this._constants.wordLength }, () => {
        return "";
      })
    );
  }

  public guessWord(word: string) {
    this.validateWordGuess(word.trim());

    let results = [];

    return results;
  }

  private validateWordGuess(word: string) {
    if (!word) throw new Error("You must provide a guess!");
    if (word.length < this._constants.wordLength) throw new Error("Guess too short!");
    if (word.length > this._constants.wordLength) throw new Error("Guess too long!");
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

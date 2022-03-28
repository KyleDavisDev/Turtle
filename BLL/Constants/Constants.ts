import { IConstant } from "./IConstant";

const DEFAULT_WORD_LENGTH = 5;
const DEFAULT_MAX_GUESSES = 6;
const GAME_NAME = "Turtle";

class Constants implements IConstant {
  private _wordLength = DEFAULT_WORD_LENGTH;
  private _maxGuesses = DEFAULT_MAX_GUESSES;
  private _gameName = GAME_NAME;

  public get wordLength(): number {
    return this._wordLength;
  }

  public set setWordLength(val: number) {
    if (val < 1 || val > 9) {
      throw new Error("The word size must be greater than 0 and less than 10.");
    }
    this._wordLength = val;
  }

  public get maxGuesses() {
    return this._maxGuesses;
  }

  public set setMaxGuesses(guesses: number) {
    if (guesses < 1 || guesses > 9) {
      throw new Error("The guess size must be greater than 0 and less than 10.");
    }

    this._maxGuesses = guesses;
  }

  public get gameName() {
    return this._gameName;
  }
}

export { Constants };

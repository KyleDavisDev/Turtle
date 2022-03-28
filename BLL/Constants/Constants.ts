const DEFAULT_WORD_LENGTH = 5;
const DEFAULT_MAX_GUESSES = 6;
const GAME_NAME = "Turtle";

class Constants {
  private _wordLength = DEFAULT_WORD_LENGTH;
  private _maxGuesses = DEFAULT_MAX_GUESSES;
  private _gameName = GAME_NAME;

  public get wordLength(): number {
    return this._wordLength;
  }

  public get maxGuesses() {
    return this._maxGuesses;
  }

  public set wordLength(value: number) {
    if (value < 1 || value > 9) {
      throw new Error("The word size must be greater than 0 and less than 10.");
    }

    this._wordLength = value;
  }

  public set maxGuesses(guesses: number) {
    if (guesses < 0 || guesses > 10) {
      throw new Error("The guess size must be greater than 0 and less than 10.");
    }

    this._maxGuesses = guesses;
  }

  public get gameName() {
    return this._gameName;
  }
}

export { Constants };

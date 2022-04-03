import { IValidateWordStrategy } from "../IValidateWordStrategy";

// words from https://github.com/benjamincrom/scrabble/blob/master/scrabble/dictionary.json
import scrabbleWords from "./words.json";

class ValidateWordFileStrategy implements IValidateWordStrategy {
  private _words: Set<string>;

  constructor() {
    this._words = new Set<string>(scrabbleWords);
  }

  isValidWord(word?: string): boolean {
    if (!word) return false;

    return this._words.has(word);
  }
}

export { ValidateWordFileStrategy };

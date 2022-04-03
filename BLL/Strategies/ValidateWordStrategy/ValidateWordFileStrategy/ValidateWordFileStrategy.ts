import { IValidateWordStrategy } from "../IValidateWordStrategy";

// words from https://github.com/benjamincrom/scrabble/blob/master/scrabble/dictionary.json
import scrabbleWords from "./scrabbleWords.json";

export interface ValidateWordFileStrategyParams {
  possibleWords?: string[];
}

class ValidateWordFileStrategy implements IValidateWordStrategy {
  private _words: Set<string>;

  constructor(params: ValidateWordFileStrategyParams) {
    this._words = new Set<string>(params?.possibleWords ?? scrabbleWords);
  }

  isValidWord(word?: string): boolean {
    if (!word) throw new Error("You must provide a word to validate against");

    return this._words.has(word.toLowerCase());
  }
}

export { ValidateWordFileStrategy };

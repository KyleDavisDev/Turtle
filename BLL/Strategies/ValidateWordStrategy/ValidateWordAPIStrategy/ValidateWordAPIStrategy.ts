import { IValidateWordStrategy } from "../IValidateWordStrategy";

class ValidateWordAPIStrategy implements IValidateWordStrategy {
  isValidWord(word: string): boolean {
    return false;
  }
}

export { ValidateWordAPIStrategy };

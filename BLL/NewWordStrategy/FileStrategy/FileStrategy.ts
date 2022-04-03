import { INewWordStrategy } from "../INewWordStrategy";

class FileStrategy implements INewWordStrategy {
  getWord(length: number): string {
    return "";
  }
}

export { FileStrategy };

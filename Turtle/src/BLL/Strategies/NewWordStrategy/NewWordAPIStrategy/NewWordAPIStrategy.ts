import { INewWordStrategy } from "../INewWordStrategy";

class NewWordAPIStrategy implements INewWordStrategy {
  getWord(): string {
    return "";
  }
}

export { NewWordAPIStrategy };

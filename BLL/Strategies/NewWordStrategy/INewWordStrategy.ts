export interface INewWordStrategy {
  getWord: (length: number) => string;
}

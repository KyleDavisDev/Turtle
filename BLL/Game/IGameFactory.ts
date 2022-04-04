import { IGame } from "./IGame";

export interface IGameFactory {
  standardGame: () => IGame;
  offlineMode: () => IGame;
  badWordsMode: () => IGame;
  onlineMode: () => IGame;
  newGame: () => IGame;
}

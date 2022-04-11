import { IGame } from "../Game/IGame";

export interface IGameFactory {
  standardGame: () => IGame;
  offlineMode: () => IGame;
  spanishMode: () => IGame;
  onlineMode: () => IGame;
  newGame: () => IGame;
}

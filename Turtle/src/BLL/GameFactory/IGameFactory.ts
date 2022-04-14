import { IGame } from "../Game/IGame";

export interface IGameFactory {
  standardGame: () => IGame;
  offlineMode: () => IGame;
  spanishMode: () => IGame;
  vanderbiltMode: () => IGame;
  onlineMode: () => IGame;
  newGame: () => IGame;
}

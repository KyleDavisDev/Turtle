import { IConstant } from "../Constants/IConstant";
import { Constants } from "../Constants/Constants";

export interface GameParams {
  constants?: IConstant;
}

class Game {
  private _constants: IConstant;

  constructor(params: GameParams) {
    this._constants = params.constants ?? new Constants();
  }

  public emptyGameBoard(): String[][] {
    return Array.from({ length: this._constants.maxGuesses }, () =>
      Array.from({ length: this._constants.wordLength }, () => {
        return "";
      })
    );
  }
}

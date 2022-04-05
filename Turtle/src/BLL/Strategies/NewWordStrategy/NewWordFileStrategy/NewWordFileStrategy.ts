import { INewWordStrategy } from "../INewWordStrategy";
import { ISettings } from "../../../Settings/ISettings";

export interface NewWordFileStrategyParams {
  possibleWords?: string[];
  settings: ISettings;
}

class NewWordFileStrategy implements INewWordStrategy {
  private _possibleWords: string[];
  private _settings: ISettings;

  constructor(params: NewWordFileStrategyParams) {
    this._possibleWords = params?.possibleWords;
    this._settings = params.settings;
  }

  getWord(): string {
    const wordsByLength = this._possibleWords.filter(word => word.length === this._settings.getWordLength);

    if (!wordsByLength.length || wordsByLength.length === 0) {
      throw new Error("Cannot find any words with that length");
    }

    return wordsByLength[Math.floor(Math.random() * wordsByLength.length)];
  }
}

export { NewWordFileStrategy };

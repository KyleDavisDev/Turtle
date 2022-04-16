import { IGame } from "../Game/IGame";
import { Game } from "../Game/Game";
import { INewWordStrategy } from "../Strategies/NewWordStrategy/INewWordStrategy";
import { IValidateWordStrategy } from "../Strategies/ValidateWordStrategy/IValidateWordStrategy";
import { Settings } from "../Settings/Settings";
import {
  ValidateWordFileStrategy
} from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/ValidateWordFileStrategy";
import { ISettings } from "../Settings/ISettings";
import { NewWordFileStrategy } from "../Strategies/NewWordStrategy/NewWordFileStrategy/NewWordFileStrategy";

import {
  ValidateWordAPIStrategy
} from "../Strategies/ValidateWordStrategy/ValidateWordAPIStrategy/ValidateWordAPIStrategy";
import { NewWordAPIStrategy } from "../Strategies/NewWordStrategy/NewWordAPIStrategy/NewWordAPIStrategy";
import { IGameFactory } from "./IGameFactory";

import wordsToGuessFrom from "../Strategies/NewWordStrategy/NewWordFileStrategy/words.json";
// words from https://github.com/benjamincrom/scrabble/blob/master/scrabble/dictionary.json
import scrabbleWords from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/scrabbleWords.json";
// words from https://github.com/lorenbrichter/Words
import spanishWords from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/spanishWords.json";
import vanderbiltWords from "../Strategies/NewWordStrategy/NewWordFileStrategy/vanderbiltWords.json";

enum gameModes {
  standard = "standard",
  spanish = "spanish",
  vanderbilt = "vanderbilt",
  offline = "offline",
  online = "online",
}

class GameFactory implements IGameFactory {
  private _gameModesSelected: gameModes[] = [];
  private _settings: ISettings;

  constructor() {
    this._settings = new Settings();
  }

  standardGame = (): IGame => {
    const newWordStrategy: INewWordStrategy = new NewWordFileStrategy({
      possibleWords: scrabbleWords,
      settings: this._settings
    });
    const validateWordStrat: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: scrabbleWords });

    const wordToGuess: string = newWordStrategy.getWord();
    console.log(wordToGuess);
    const game: IGame = new Game({ wordToGuess, settings: this._settings, validateWordStrategy: validateWordStrat });

    this._gameModesSelected.push(gameModes.standard);

    return game;
  };

  spanishMode = (): IGame => {
    const newWordStrategy: INewWordStrategy = new NewWordFileStrategy({
      possibleWords: (spanishWords as string[]),
      settings: this._settings
    });
    // @ts-ignore
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: spanishWords });

    const wordToGuess: string = newWordStrategy.getWord();
    console.log(wordToGuess);

    const game: IGame = new Game({ wordToGuess, settings: this._settings, validateWordStrategy: possibleWords });

    this._gameModesSelected.push(gameModes.spanish);

    return game;
  };

  vanderbiltMode = (): IGame => {
    const newWordStrategy: INewWordStrategy = new NewWordFileStrategy({
      possibleWords: vanderbiltWords,
      settings: this._settings
    });
    const wordToGuess: string = newWordStrategy.getWord();
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: scrabbleWords.concat(wordToGuess) });

    const game: IGame = new Game({ wordToGuess, settings: this._settings, validateWordStrategy: possibleWords });

    this._gameModesSelected.push(gameModes.vanderbilt);

    return game;
  };

  offlineMode = (): IGame => {
    const newWordStrategy: INewWordStrategy = new NewWordFileStrategy({
      possibleWords: scrabbleWords,
      settings: this._settings
    });
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: scrabbleWords });

    const wordToGuess: string = newWordStrategy.getWord();
    const game: IGame = new Game({ wordToGuess, settings: this._settings, validateWordStrategy: possibleWords });

    this._gameModesSelected.push(gameModes.offline);
    return game;
  };

  onlineMode = (): IGame => {
    const newWordStrategy: INewWordStrategy = new NewWordAPIStrategy();
    const possibleWords: IValidateWordStrategy = new ValidateWordAPIStrategy();

    const wordToGuess: string = newWordStrategy.getWord();
    const game: IGame = new Game({ wordToGuess, settings: this._settings, validateWordStrategy: possibleWords });

    this._gameModesSelected.push(gameModes.online);

    return game;
  };

  newGame = (): IGame => {
    const lastModePlayed: gameModes = this._gameModesSelected[this._gameModesSelected.length - 1];

    if (lastModePlayed === "standard") return this.standardGame();
    if (lastModePlayed === "offline") return this.offlineMode();
    if (lastModePlayed === "online") return this.onlineMode();
    if (lastModePlayed === "spanish") return this.spanishMode();
    if (lastModePlayed === "vanderbilt") return this.vanderbiltMode();

    return this.standardGame();
  };


  setWordLength = (num: number): void => {
    this._settings.setWordLength(num);
  };
  setGuessLength = (num: number): void => {
    this._settings.setMaxGuesses(num);
  };

}

export { GameFactory };

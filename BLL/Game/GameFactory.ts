import { IGame } from "./IGame";
import { Game } from "./Game";
import { INewWordStrategy } from "../Strategies/NewWordStrategy/INewWordStrategy";
import { IValidateWordStrategy } from "../Strategies/ValidateWordStrategy/IValidateWordStrategy";
import { Settings } from "../Settings/Settings";
import { ValidateWordFileStrategy } from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/ValidateWordFileStrategy";
import { ISettings } from "../Settings/ISettings";
import { NewWordFileStrategy } from "../Strategies/NewWordStrategy/NewWordFileStrategy/NewWordFileStrategy";

import wordsToGuessFrom from "../Strategies/NewWordStrategy/NewWordFileStrategy/words.json";

// words from https://github.com/benjamincrom/scrabble/blob/master/scrabble/dictionary.json
import scrabbleWords from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/scrabbleWords.json";

// list from https://github.com/MauriceButler/badwords
import badwords from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/badWords.json";
import { ValidateWordAPIStrategy } from "../Strategies/ValidateWordStrategy/ValidateWordAPIStrategy/ValidateWordAPIStrategy";
import { NewWordAPIStrategy } from "../Strategies/NewWordStrategy/NewWordAPIStrategy/NewWordAPIStrategy";
import { IGameFactory } from "./IGameFactory";

enum gameModes {
  standard = "standard",
  offline = "offline",
  online = "online",
  badWords = "badWords"
}

class GameFactory implements IGameFactory {
  private _wordToFind: INewWordStrategy;
  private _possibleWords: IValidateWordStrategy;
  private _gameModesSelected: gameModes[];

  constructor() {}

  standardGame = (): IGame => {
    const settings: ISettings = new Settings();
    const wordToFind: INewWordStrategy = new NewWordFileStrategy({ possibleWords: wordsToGuessFrom, settings });
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: scrabbleWords });

    const wordToGuess: string = wordToFind.getWord();
    const game: IGame = new Game({ wordToGuess, settings });

    this._gameModesSelected.push(gameModes.standard);

    return game;
  };

  offlineMode = (): IGame => {
    const settings: ISettings = new Settings();
    const wordToFind: INewWordStrategy = new NewWordFileStrategy({ possibleWords: wordsToGuessFrom, settings });
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: scrabbleWords });

    const wordToGuess: string = wordToFind.getWord();
    const game: IGame = new Game({ wordToGuess, settings });

    this._gameModesSelected.push(gameModes.offline);
    return game;
  };

  badWordsMode = (): IGame => {
    const settings: ISettings = new Settings();
    const wordToFind: INewWordStrategy = new NewWordFileStrategy({ possibleWords: wordsToGuessFrom, settings });
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: badwords });

    const wordToGuess: string = wordToFind.getWord();
    const game: IGame = new Game({ wordToGuess, settings });

    this._gameModesSelected.push(gameModes.badWords);

    return game;
  };

  onlineMode = (): IGame => {
    const settings: ISettings = new Settings();
    const wordToFind: INewWordStrategy = new NewWordAPIStrategy();
    const possibleWords: IValidateWordStrategy = new ValidateWordAPIStrategy();

    const wordToGuess: string = wordToFind.getWord();
    const game: IGame = new Game({ wordToGuess, settings });

    this._gameModesSelected.push(gameModes.online);

    return game;
  };

  newGame = (): IGame => {
    const lastModePlayed: gameModes = this._gameModesSelected[this._gameModesSelected.length - 1];

    if (lastModePlayed === "standard") return this.standardGame();
    if (lastModePlayed === "offline") return this.offlineMode();
    if (lastModePlayed === "online") return this.onlineMode();
    if (lastModePlayed === "badWords") return this.badWordsMode();

    return this.standardGame();
  };
}

export { GameFactory };

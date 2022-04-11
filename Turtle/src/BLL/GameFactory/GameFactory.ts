import { IGame } from "../Game/IGame";
import { Game } from "../Game/Game";
import { INewWordStrategy } from "../Strategies/NewWordStrategy/INewWordStrategy";
import { IValidateWordStrategy } from "../Strategies/ValidateWordStrategy/IValidateWordStrategy";
import { Settings } from "../Settings/Settings";
import { ValidateWordFileStrategy } from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/ValidateWordFileStrategy";
import { ISettings } from "../Settings/ISettings";
import { NewWordFileStrategy } from "../Strategies/NewWordStrategy/NewWordFileStrategy/NewWordFileStrategy";

import wordsToGuessFrom from "../Strategies/NewWordStrategy/NewWordFileStrategy/words.json";

// words from https://github.com/benjamincrom/scrabble/blob/master/scrabble/dictionary.json
import scrabbleWords from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/scrabbleWords.json";

// words from https://github.com/lorenbrichter/Words
import spanishWords from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/spanishWords.json";
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
  private _gameModesSelected: gameModes[] = [];

  constructor() {}

  standardGame = (): IGame => {
    const settings: ISettings = new Settings();
    const newWordStrategy: INewWordStrategy = new NewWordFileStrategy({ possibleWords: scrabbleWords, settings });
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: scrabbleWords });

    const wordToGuess: string = newWordStrategy.getWord();
    console.log(wordToGuess);
    const game: IGame = new Game({ wordToGuess, settings, validateWordStrategy: possibleWords });

    this._gameModesSelected.push(gameModes.standard);

    return game;
  };

  offlineMode = (): IGame => {
    const settings: ISettings = new Settings();
    const newWordStrategy: INewWordStrategy = new NewWordFileStrategy({ possibleWords: scrabbleWords, settings });
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: scrabbleWords });

    const wordToGuess: string = newWordStrategy.getWord();
    const game: IGame = new Game({ wordToGuess, settings, validateWordStrategy: possibleWords });

    this._gameModesSelected.push(gameModes.offline);
    return game;
  };

  spanishMode = (): IGame => {
    const settings: ISettings = new Settings();
    // @ts-ignore
    const newWordStrategy: INewWordStrategy = new NewWordFileStrategy({ possibleWords: spanishWords, settings });
    // @ts-ignore
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: spanishWords });

    const wordToGuess: string = newWordStrategy.getWord();
    console.log(wordToGuess);

    const game: IGame = new Game({ wordToGuess, settings, validateWordStrategy: possibleWords });

    this._gameModesSelected.push(gameModes.badWords);

    return game;
  };

  onlineMode = (): IGame => {
    const settings: ISettings = new Settings();
    const newWordStrategy: INewWordStrategy = new NewWordAPIStrategy();
    const possibleWords: IValidateWordStrategy = new ValidateWordAPIStrategy();

    const wordToGuess: string = newWordStrategy.getWord();
    const game: IGame = new Game({ wordToGuess, settings, validateWordStrategy: possibleWords });

    this._gameModesSelected.push(gameModes.online);

    return game;
  };

  newGame = (): IGame => {
    const lastModePlayed: gameModes = this._gameModesSelected[this._gameModesSelected.length - 1];

    if (lastModePlayed === "standard") return this.standardGame();
    if (lastModePlayed === "offline") return this.offlineMode();
    if (lastModePlayed === "online") return this.onlineMode();
    if (lastModePlayed === "badWords") return this.spanishMode();

    return this.standardGame();
  };
}

export { GameFactory };

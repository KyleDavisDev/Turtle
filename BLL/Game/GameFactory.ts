import { INewWordStrategy } from "../Strategies/NewWordStrategy/INewWordStrategy";
import { IValidateWordStrategy } from "../Strategies/ValidateWordStrategy/IValidateWordStrategy";
import { IGame } from "./IGame";
import { Game } from "./Game";
import { NewWordFileStrategy } from "../Strategies/NewWordStrategy/NewWordFileStrategy/NewWordFileStrategy";

import wordsToGuessFrom from "../Strategies/NewWordStrategy/NewWordFileStrategy/words.json";

// words from https://github.com/benjamincrom/scrabble/blob/master/scrabble/dictionary.json
import scrabbleWords from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/scrabbleWords.json";

// list from https://github.com/MauriceButler/badwords
import badwords from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/badWords.json";
import { Settings } from "../Settings/Settings";
import { ValidateWordFileStrategy } from "../Strategies/ValidateWordStrategy/ValidateWordFileStrategy/ValidateWordFileStrategy";
import { ISettings } from "../Settings/ISettings";

class GameFactory {
  private _wordToFind: INewWordStrategy;
  private _possibleWords: IValidateWordStrategy;

  constructor() {}

  standardGame = (): IGame => {
    const settings: ISettings = new Settings();
    const wordToFind: INewWordStrategy = new NewWordFileStrategy({ possibleWords: wordsToGuessFrom, settings });
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: scrabbleWords });

    const wordToGuess: string = wordToFind.getWord();
    const game: IGame = new Game({ wordToGuess, settings });

    return game;
  };

  offlineMode = (): IGame => {
    const settings: ISettings = new Settings();
    const wordToFind: INewWordStrategy = new NewWordFileStrategy({ possibleWords: wordsToGuessFrom, settings });
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: scrabbleWords });

    const wordToGuess: string = wordToFind.getWord();
    const game: IGame = new Game({ wordToGuess, settings });

    return game;
  };

  badWordsMode = (): IGame => {
    const settings: ISettings = new Settings();
    const wordToFind: INewWordStrategy = new NewWordFileStrategy({ possibleWords: wordsToGuessFrom, settings });
    const possibleWords: IValidateWordStrategy = new ValidateWordFileStrategy({ possibleWords: badwords });

    const wordToGuess: string = wordToFind.getWord();
    const game: IGame = new Game({ wordToGuess, settings });

    return game;
  };
}

export { GameFactory };

import { ISettings } from "../Settings/ISettings";
import { createMock } from "ts-auto-mock";
import { IValidateWordStrategy } from "../Strategies/ValidateWordStrategy/IValidateWordStrategy";
import { IGameParams } from "./Game";

const { Game } = require("./Game.ts");

describe("Game", () => {
  it("should initialize without error", () => {
    // Given
    const moqSettings = createMock<ISettings>();
    const moqWordValidationStrat = createMock<IValidateWordStrategy>();
    const wordToGuess = "temp";
    const params: IGameParams = { settings: moqSettings, wordToGuess, validateWordStrategy: moqWordValidationStrat };
    const sut = new Game(params);

    // Then
    expect(sut).not.toBe(null);
  });

  it("should throw error on empty guesses", () => {
    // Given
    const guess = "";
    const moqSettings = createMock<ISettings>();
    const moqWordValidationStrat = createMock<IValidateWordStrategy>();
    const wordToGuess = "temp";
    const params: IGameParams = { settings: moqSettings, wordToGuess, validateWordStrategy: moqWordValidationStrat };
    const sut = new Game(params);

    expect(() => {
      sut.guessWord(guess);
    }).toThrow();
  });

  it("should throw error when guess is shorter than expected", () => {
    // Given
    const guess = "test";
    const moqSettings = createMock<ISettings>();
    moqSettings.getWordLength = guess.length + 1;
    const moqWordValidationStrat = createMock<IValidateWordStrategy>();
    const wordToGuess = "temp";
    const params: IGameParams = { settings: moqSettings, wordToGuess, validateWordStrategy: moqWordValidationStrat };
    const sut = new Game(params);

    expect(() => {
      sut.guessWord(guess);
    }).toThrow();
  });

  it("should throw error when guess is longer than expected", () => {
    // Given
    const guess = "test";
    const moqSettings = createMock<ISettings>();
    moqSettings.getWordLength = guess.length - 1;
    const moqWordValidationStrat = createMock<IValidateWordStrategy>();
    const wordToGuess = "temp";
    const params: IGameParams = { settings: moqSettings, wordToGuess, validateWordStrategy: moqWordValidationStrat };
    const sut = new Game(params);

    expect(() => {
      sut.guessWord(guess);
    }).toThrow();
  });
});

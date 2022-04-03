import { ISettings } from "../Settings/ISettings";
import { createMock } from "ts-auto-mock";

const { Game } = require("./Game.ts");

describe("Game", () => {
  it("should initialize without error", () => {
    // Given
    const moqSettings = createMock<ISettings>();
    const wordToGuess = "temp";
    const sut = new Game({ settings: moqSettings, wordToGuess });

    // Then
    expect(sut).not.toBe(null);
  });

  it("should throw error on empty guess", () => {
    // Given
    const moqSettings = createMock<ISettings>();
    const sut = new Game({ settings: moqSettings });

    expect(() => {
      sut.guessWord();
    }).toThrow();
  });
});

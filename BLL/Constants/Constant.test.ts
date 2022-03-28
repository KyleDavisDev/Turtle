const { Constants } = require("./Constants.ts");

describe("Constants should", () => {
  const DEFAULT_WORD_LENGTH = 5;
  const DEFAULT_MAX_GUESSES = 6;
  const GAME_NAME = "Turtle";

  it("use default word length", () => {
    const sut = new Constants();

    expect(sut.wordLength).toBe(DEFAULT_WORD_LENGTH);
  });

  it("use default max guesses", () => {
    const sut = new Constants();

    expect(sut.maxGuesses).toBe(DEFAULT_MAX_GUESSES);
  });

  it("use default game name", () => {
    const sut = new Constants();

    expect(sut.gameName).toBe(GAME_NAME);
  });

  it("throw error for word length that are too small", () => {
    const sut = new Constants();

    const newLengths = [0, -1, -2, -10];
    newLengths.forEach(newLength => {
      expect(() => {
        sut.wordLength = newLength;
      }).toThrow();
    });
  });

  it("throw error for word length that are too large", () => {
    const sut = new Constants();

    const newLengths = [10, 15, 20, 100, 123123123];
    newLengths.forEach(newLength => {
      expect(() => {
        sut.wordLength = newLength;
      }).toThrow();
    });
  });

  it("allow for word length reassignment", () => {
    const sut = new Constants();

    const newLengths = [1, 5, 7, 6];
    newLengths.forEach(newLength => {
      sut.wordLength = newLength;

      expect(sut.wordLength).toBe(newLength);
    });
  });
});

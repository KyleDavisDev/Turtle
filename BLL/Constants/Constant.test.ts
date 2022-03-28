const { Constants } = require("./Constants.ts");

describe("Constants should", () => {
  const DEFAULT_WORD_LENGTH = 5;
  const DEFAULT_MAX_GUESSES = 6;
  const GAME_NAME = "Turtle";

  it("use default word length", () => {
    const sut = new Constants();

    expect(sut.wordLength).toBe(DEFAULT_WORD_LENGTH);
  })
})

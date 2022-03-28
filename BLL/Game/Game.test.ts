const { Game } = require("./Game.ts");

describe("Game should", () => {
  it("initialize without error", () => {
    const sut = new Game();

    expect(sut).not.toBe(null);
  });
});

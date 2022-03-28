import { IConstant } from "../Constants/IConstant";
import { createMock } from "ts-auto-mock";

const { Game } = require("./Game.ts");

describe("Game should", () => {
  it("initialize without error", () => {
    const sut = new Game();

    expect(sut).not.toBe(null);
  });

  it("throw error on empty guess", () => {
    const moqConstants = createMock<IConstant>();
    // moqConstants.wordLength = 5;

    const sut = new Game({ constants: moqConstants });

    expect(() => {
      sut.guessWord();
    }).toThrow();
    // expect(sut).not.toBe(null);
  });
});

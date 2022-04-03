import { NewWordFileStrategy, NewWordFileStrategyParams } from "./NewWordFileStrategy";
import { createMock } from "ts-auto-mock";
import { ISettings } from "../../../Settings/ISettings";

describe("NewWordFileStrategy should", () => {
  const moqSettings = createMock<ISettings>();
  const emptyList: string[] = [];
  const fourLetterSingleItem: string[] = ["test"];
  const fiveLetterSingleItem: string[] = ["cider"];
  const combinedList = [...fourLetterSingleItem, ...fiveLetterSingleItem];

  it("throw error if no words could be found with expected length", () => {
    moqSettings.getWordLength = 4;
    const params: NewWordFileStrategyParams = { possibleWords: emptyList, settings: moqSettings };
    const sut = new NewWordFileStrategy(params);

    expect(() => {
      sut.getWord();
    }).toThrow();
  });

  it("return word from list at 4 length", () => {
    moqSettings.getWordLength = 4;
    const params: NewWordFileStrategyParams = { possibleWords: fourLetterSingleItem, settings: moqSettings };
    const sut = new NewWordFileStrategy(params);

    const word = sut.getWord();
    expect(word).toEqual(fourLetterSingleItem[0]);
  });

  it("return word from list at 5 length", () => {
    moqSettings.getWordLength = 5;
    const params: NewWordFileStrategyParams = { possibleWords: fiveLetterSingleItem, settings: moqSettings };
    const sut = new NewWordFileStrategy(params);

    const word = sut.getWord();
    expect(word).toEqual(fiveLetterSingleItem[0]);
  });

  it("return word after settings length is updated", () => {
    moqSettings.getWordLength = 4;
    const params: NewWordFileStrategyParams = { possibleWords: combinedList, settings: moqSettings };
    const sut = new NewWordFileStrategy(params);

    let word = sut.getWord();
    expect(combinedList).toContain(word);

    moqSettings.getWordLength = 5;
    word = sut.getWord();
    expect(combinedList).toContain(word);
  });
});

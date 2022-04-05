import { ValidateWordFileStrategy, ValidateWordFileStrategyParams } from "./ValidateWordFileStrategy";

describe("ValidateWordFileStrategy", () => {
  const emptyList: string[] = [];
  const invalidWords = [null, "", undefined];
  const possibleWordList = ["test", "cider", "apple", "hello", "world"];

  it("should throw error when no word is passed", () => {
    // Given
    const params: ValidateWordFileStrategyParams = { possibleWords: emptyList };
    const sut = new ValidateWordFileStrategy(params);
    const invalidWords = [null, "", undefined];


    invalidWords.map(invalidWord => {
      expect(() => {
        sut.isValidWord(invalidWord);
      }).toThrow();
    })

  });

  it("should return false if word is not valid", () => {
    // Given
    const params: ValidateWordFileStrategyParams = { possibleWords: emptyList };
    const sut = new ValidateWordFileStrategy(params);

    // When
    const isValid = sut.isValidWord("absafasdf");

    // Then
    expect(isValid).toBeFalsy();
  });

  it("should return true if the word is valid", () => {
    // Given
    const params: ValidateWordFileStrategyParams = { possibleWords: possibleWordList };
    const sut = new ValidateWordFileStrategy(params);

    // When
    const isValid = sut.isValidWord(possibleWordList[0]);

    // Then
    expect(isValid).toBeTruthy();
  });

  it("should be case-insensitive", () => {
    // Given
    const params: ValidateWordFileStrategyParams = { possibleWords: possibleWordList };
    const sut = new ValidateWordFileStrategy(params);

    // When
    let isValid = sut.isValidWord(possibleWordList[0].toUpperCase());

    // Then
    expect(isValid).toBeTruthy();

    isValid = sut.isValidWord(possibleWordList[0].toLowerCase());
    expect(isValid).toBeTruthy();
  });
});

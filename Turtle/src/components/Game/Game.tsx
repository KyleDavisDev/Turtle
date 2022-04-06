import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Board } from "../Board/Board";
import { IGame } from "../../BLL/Game/IGame";
import { CellColors, ICell } from "../Board/components/Row/Row";
import { KeyboardArea } from "../KeyboardArea/KeyboardArea";

interface IGameProps {
  gameBLL: IGame;
}

const Game = (props: IGameProps) => {
  const { gameBLL } = props;

  const initBoard: ICell[][] = gameBLL.getBoardState().map(row => {
    return row.map(() => {
      return {
        value: "",
        color: CellColors.TRANSPARENT
      };
    });
  });
  const [boardFrame, setBoardFrame] = useState<ICell[][]>(initBoard);
  const [curRow, setCurRow] = useState<number>(0);
  const [shouldAnimateRow, setShouldAnimateRow] = useState<boolean>(false);
  const [shouldAnimateCell, setShouldAnimateCell] = useState<boolean>(false);
  const wordToGuessLength = boardFrame[0].length;

  const onKeyPress = (key: string) => {
    key = key.toLowerCase();

    const userGuess = boardFrame[curRow].reduce((prev, cur) => {
      return prev + cur.value;
    }, "");

    if (key === "Delete".toLowerCase()) {
      onDeletePress(userGuess);
    } else if (key === "Enter".toLowerCase()) {
      onEnterKeyPress(userGuess);
    } else {
      onLetterPress(userGuess, key);
    }
  };

  const onDeletePress = (word: string): void => {
    const newFrame = [...boardFrame];

    const isGuessLongerThanZero = word.length > 0;
    if (isGuessLongerThanZero) {
      // Set last character to empty space
      const index = word.length - 1;
      newFrame[curRow][index].value = "";
    }

    // animations
    // word.length === 0 ? setShouldAnimateRow(true) : setShouldAnimateRow(false);
    setShouldAnimateCell(false);

    setBoardFrame(newFrame);
  };

  const onEnterKeyPress = (word: string): void => {
    const isGuessRequiredLength = word.length === wordToGuessLength;
    if (isGuessRequiredLength) {
      try {
        const guessWord = gameBLL.guessWord(word);
        setCurRow(curRow + 1);
      } catch (e) {
        console.log("Am i here????");
        setShouldAnimateCell(false);
        // setShouldAnimateRow(!shouldAnimateRow);
      }
    } else {
      console.log("inside the enter but length not long enough");
      setShouldAnimateRow(true);
    }
  };

  const onLetterPress = (wordBeingTyped: string, key: string): void => {
    console.log("im not here, right?");
    const newFrame = [...boardFrame];

    // Letters here
    const isGuessBeforeEnd = wordBeingTyped.length < wordToGuessLength;
    if (isGuessBeforeEnd) {
      // set the frame to the letter
      newFrame[curRow][wordBeingTyped.length].value = key.toUpperCase();
      setShouldAnimateCell(true);
      // setShouldAnimateRow(false);
    } else {
      setShouldAnimateCell(false);
      // setShouldAnimateRow(true);
    }

    setBoardFrame(newFrame);
  };

  return (
    <>
      {console.log(shouldAnimateRow)}

      <Board
        frame={boardFrame}
        shouldAnimateCell={shouldAnimateCell}
        shouldAnimateRow={shouldAnimateRow}
        curRow={curRow}
      />
      <KeyboardArea onKeyPress={onKeyPress} disabledKeyList={[]} />
    </>
  );
};

export { Game };

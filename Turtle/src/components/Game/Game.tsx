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
    const newFrame: ICell[][] = [...boardFrame];
    const currentGuess = newFrame[curRow].reduce((prev, cur) => {
      return prev + cur.value;
    }, "");
    key = key.toLowerCase();

    if (key === "Delete".toLowerCase()) {
      const isGuessLongerThanZero = currentGuess.length > 0;
      if (isGuessLongerThanZero) {
        // Set last character to empty space
        const index = currentGuess.length - 1;
        newFrame[curRow][index].value = "";
      }

      // animations
      currentGuess.length === 0 ? setShouldAnimateRow(true) : setShouldAnimateRow(false);
      setShouldAnimateCell(false);
    } else if (key === "Enter".toLowerCase()) {
      const isGuessRequiredLength = currentGuess.length === wordToGuessLength;
      if (isGuessRequiredLength) {
        try {
          const tmp = gameBLL.guessWord(currentGuess);
          console.log(tmp);
        } catch (e) {
          console.log(e);
        }
        // newFrame[curRow] = checkAgainstWord(newFrame[curRow]);
        setCurRow(curRow + 1);
        setShouldAnimateCell(false);
      } else {
        setShouldAnimateCell(false);
        setShouldAnimateRow(true);
      }
    } else {
      // Letters here
      const isGuessBeforeEnd = currentGuess.length < wordToGuessLength;
      if (isGuessBeforeEnd) {
        // set the frame to the letter
        newFrame[curRow][currentGuess.length].value = key.toUpperCase();
        setShouldAnimateCell(true);
      } else {
        setShouldAnimateCell(false);
      }
    }

    // Update frame
    setBoardFrame(newFrame);
  };

  return (
    <>
      <Board frame={boardFrame} shouldAnimateCell={shouldAnimateCell} shouldAnimateRow={shouldAnimateRow} curRow={0} />
      <KeyboardArea onKeyPress={onKeyPress} disabledKeyList={[]} />
    </>
  );
};

export { Game };

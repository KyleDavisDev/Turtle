import React, { useState } from "react";
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
  const [pulseRowAnimation, setPulseRowAnimation] = useState<null | boolean>(null);
  const [pulseCellAnimation, setPulseCellAnimation] = useState<null | boolean>(null);
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

    if (word.length > 0) {
      // Set last character to empty space
      const index = word.length - 1;
      newFrame[curRow][index].value = "";
    }

    // animations
    setPulseCellAnimation(null);
    setPulseRowAnimation(null);

    setBoardFrame(newFrame);
  };

  const onEnterKeyPress = (word: string): void => {
    if (word.length < wordToGuessLength) {
      // animate row
      setPulseRowAnimation(!pulseRowAnimation);
      return;
    }

    try {
      // TODO: Maybe adapter pattern here?
      gameBLL.guessWord(word).forEach((res, ind) => {
        if (res === "/") {
          boardFrame[curRow][ind] = { color: CellColors.GRAY, value: word[ind] };
        } else if (res === "Y") {
          boardFrame[curRow][ind] = { color: CellColors.YELLOW, value: word[ind] };
        } else if (res === "G") {
          boardFrame[curRow][ind] = { color: CellColors.GREEN, value: word[ind] };
        }
      });

      setCurRow(curRow + 1);

      setPulseCellAnimation(null);
    } catch (e) {
      console.log(e);
      setPulseCellAnimation(null);
      setPulseRowAnimation(!pulseRowAnimation);
    }
  };

  const onLetterPress = (wordBeingTyped: string, key: string): void => {
    const newFrame = [...boardFrame];

    // Letters here
    const isGuessBeforeEnd = wordBeingTyped.length < wordToGuessLength;
    if (isGuessBeforeEnd) {
      // set the frame to the letter
      newFrame[curRow][wordBeingTyped.length].value = key.toUpperCase();

      // animations
      setPulseCellAnimation(true);
      setPulseRowAnimation(null);
    } else {
      // animations
      setPulseCellAnimation(false);
      setPulseRowAnimation(!pulseRowAnimation);
    }

    setBoardFrame(newFrame);
  };

  return (
    <>
      <Board
        frame={boardFrame}
        shouldAnimateCell={pulseCellAnimation}
        shouldAnimateRow={pulseRowAnimation}
        curRow={curRow}
      />
      <KeyboardArea onKeyPress={onKeyPress} disabledKeyList={[]} />
    </>
  );
};

export { Game };

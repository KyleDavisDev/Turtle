import React, { useEffect, useState } from "react";
import { Board } from "../Board/Board";
import { IGame } from "../../BLL/Game/IGame";
import { ICell } from "../Board/components/Row/Row";
import { KeyboardArea } from "../KeyboardArea/KeyboardArea";
import { CELL_ANIMATION_DURATION, Colors } from "../../Settings";

interface IGameProps {
  gameBLL: IGame;
  onWin: () => void;
  pauseGame: boolean;
  resetGame: boolean | null;
}

const Game = (props: IGameProps) => {
  const { gameBLL, onWin, pauseGame, resetGame } = props;

  const newBoard = (game: IGame): ICell[][] => {
    return gameBLL.getBoardState().map(row => {
      return row.map(() => {
        return {
          value: "",
          color: Colors.TRANSPARENT
        };
      });
    });
  };

  const [boardFrame, setBoardFrame] = useState<ICell[][]>(newBoard(gameBLL));
  const [curRow, setCurRow] = useState<number>(0);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pulseRowAnimation, setPulseRowAnimation] = useState<null | boolean>(null);
  const [pulseCellAnimation, setPulseCellAnimation] = useState<null | boolean>(true);
  const wordToGuessLength = boardFrame[0].length;


  const onKeyPress = (key: string) => {
    if (isPaused) return;
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

      setPulseRowAnimation(null);
    } else if (word.length === 0) {
      setPulseRowAnimation(!pulseRowAnimation);
    }

    setPulseCellAnimation(null);

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
          boardFrame[curRow][ind] = { color: Colors.DARKGREY, value: word[ind] };
        } else if (res === "Y") {
          boardFrame[curRow][ind] = { color: Colors.YELLOW, value: word[ind] };
        } else if (res === "G") {
          boardFrame[curRow][ind] = { color: Colors.GREEN, value: word[ind] };
        }
      });

      setIsPaused(true);
      setTimeout(() => setIsPaused(false), CELL_ANIMATION_DURATION * wordToGuessLength);
      setCurRow(curRow + 1);
      setUsedLetters([...usedLetters, ...word.split("")]);
      setPulseCellAnimation(!pulseCellAnimation);
      setPulseRowAnimation(null);

      if (isWinner(boardFrame[curRow])) {
        setTimeout(() => {
          setIsPaused(true);
          onIsWinner();
        }, CELL_ANIMATION_DURATION * wordToGuessLength);
        return;
      }
    } catch (e) {
      // TODO: What do we do here?
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
      setPulseCellAnimation(null);
      setPulseRowAnimation(!pulseRowAnimation);
    }

    setBoardFrame(newFrame);
  };

  const isWinner = (row: ICell[]) => {
    return row.every(cell => {
      return cell.color === Colors.GREEN;
    });
  };

  const onIsWinner = () => {
    onWin();
  };

  useEffect(() => {
    setIsPaused(pauseGame);
  }, [pauseGame]);

  useEffect(() => {
    if (resetGame === null) return;

    setBoardFrame(newBoard(gameBLL));
    setCurRow(0);
    setUsedLetters([]);
    setIsPaused(false);
  }, [resetGame]);

  return (
    <>
      <Board
        frame={boardFrame}
        shouldAnimateCell={pulseCellAnimation}
        shouldAnimateRow={pulseRowAnimation}
        curRow={curRow}
      />
      <KeyboardArea onKeyPress={onKeyPress}
                    usedLetters={curRow > 0 ? boardFrame[curRow - 1] : []}
                    isPaused={isPaused} />
    </>
  );
};

export { Game };

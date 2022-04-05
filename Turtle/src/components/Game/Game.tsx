import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Board } from "../Board/Board";
import { IGame } from "../../BLL/Game/IGame";
import { CellColors, ICell } from "../Board/components/Row/Row";

interface IGameProps {
  gameBLL: IGame;
}

const Game = (props: IGameProps) => {
  const { gameBLL } = props;

  const initBoard: ICell[][] = gameBLL.getBoardState().map(row => {
    return row.map(col => {
      return {
        value: col,
        color: CellColors.TRANSPARENT
      };
    });
  });
  const [boardFrame, setBoardFrame] = useState<ICell[][]>(initBoard);

  return (
    <>
      <Board frame={boardFrame} shouldAnimateCell={false} shouldAnimateRow={false} curRow={0} />
    </>
  );
};

export { Game };

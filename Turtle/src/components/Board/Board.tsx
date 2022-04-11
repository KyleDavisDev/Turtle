import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Row, ICell } from "./components/Row/Row";

interface IBoardProps {
  frame: ICell[][];
  curRow: number;
  shouldAnimateRow: null | boolean;
  shouldAnimateCell: null | boolean;
}

const Board = (props: IBoardProps) => {
  const { frame, curRow, shouldAnimateRow, shouldAnimateCell } = props;

  const [lastRow, setLastRow] = useState<number>(curRow);
  const [flipCells, setFlipCells] = useState<boolean>(false);
  useEffect(() => {
    if (lastRow !== curRow) {
      setLastRow(curRow);
      setFlipCells(true);
    } else {
      setFlipCells(false);
    }
  }, [curRow, frame]);

  const shake = useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(shake, { toValue: 3, duration: 45, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -3, duration: 45, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 3, duration: 45, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 45, useNativeDriver: true })
    ]).start();
  });

  return (
    <View>
      {frame.map((cells, index) => {
        const triggerRowAnimation: boolean = shouldAnimateRow !== null && index === curRow;
        const canAnimate = index === curRow || index === curRow - 1;
        const triggerCellShake: boolean = shouldAnimateCell !== null && canAnimate && index === curRow;
        const triggerCellFlip: boolean = canAnimate && index === curRow - 1 && flipCells;

        // if (index > 1) return <></>;
        return (
          <Animated.View
            key={`boardRow-${index}`}
            style={[triggerRowAnimation && { transform: [{ translateX: shake }] }]}
          >
            <Row
              key={`row-${index}`}
              cells={cells}
              canAnimate={canAnimate}
              shakeCell={triggerCellShake}
              flipCell={triggerCellFlip}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

export { Board };

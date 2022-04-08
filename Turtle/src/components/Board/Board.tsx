import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Row, ICell } from "./components/Row/Row";

interface IBoardProps {
  frame: ICell[][];
  curRow: Number;
  shouldAnimateRow: null | boolean;
  shouldAnimateCell: boolean;
}

const Board = (props: IBoardProps) => {
  const { frame, curRow, shouldAnimateRow, shouldAnimateCell } = props;

  // const [animateRow, setAnimateRow] = useState<null | boolean>(null);

  // This will force useEffect to ONLY run on changes to deps and ignore onMount
  // const isInitialMount = useRef(true);
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     console.log(shouldAnimateRow);
  //     setAnimateRow("true");
  //   }
  // }, [shouldAnimateRow]);

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
        const triggerCellAnimation: boolean = shouldAnimateCell && index === curRow;

        return (
          <Animated.View
            key={`boardRow-${index}`}
            style={[triggerRowAnimation && { transform: [{ translateX: shake }] }]}
          >
            <Row key={`row-${index}`} cells={cells} shouldAnimateCell={triggerCellAnimation} />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export { Board };

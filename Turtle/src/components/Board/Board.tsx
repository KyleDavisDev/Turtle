import React, { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Row, ICell } from "./components/Row/Row";

interface IBoardProps {
  frame: ICell[][];
  curRow: Number;
  shouldAnimateRow: boolean;
  shouldAnimateCell: boolean;
}

const Board = (props: IBoardProps) => {
  const { frame, curRow, shouldAnimateRow, shouldAnimateCell } = props;

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
        const animateRow: boolean = shouldAnimateRow && index === curRow;
        const animateCell: boolean = shouldAnimateCell && index === curRow;
        return (
          <Animated.View key={`boardRow-${index}`} style={[animateRow && { transform: [{ translateX: shake }] }]}>
            <Row key={`row-${index}`} cells={cells} shouldAnimateCell={animateCell} />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export { Board };
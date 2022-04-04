import { StyleSheet, Text, View, Animated, Button } from "react-native";
import React, { useRef } from "react";

export interface ICell {
  value: string;
  color: CellColors;
}

export enum CellColors {
  "TRANSPARENT" = "rgba(0,0,0,1)",
  "GREEN" = "rgb(83, 141, 78)",
  "GRAY" = "rgb(58, 58, 60)",
  "YELLOW" = "rgb(181, 159, 59)"
}

export interface RowProps {
  cells: ICell[];
  shouldAnimateCell: boolean;
}

const Row = (props: RowProps) => {
  const { cells, shouldAnimateCell } = props;
  let curCellIndex = 0;
  if (shouldAnimateCell) {
    // No need to loop through if we aren't going to animate the cell anyway
    curCellIndex = cells.length - 1;
    for (let i = cells.length - 1; i >= 0; i--) {
      const cell: ICell = cells[i];
      if (cell.value !== "") {
        curCellIndex = i;
        break;
      }
    }
  }

  const popIn = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(popIn, {
        toValue: 1.08,
        duration: 80,
        useNativeDriver: true
      }),
      Animated.timing(popIn, {
        toValue: 1,
        duration: 60,
        useNativeDriver: true
      })
    ]).start();
  });

  return (
    <View style={styles.row}>
      {cells.map((cell, ind) => {
        const animateCell = shouldAnimateCell && ind === curCellIndex;
        const backgroundColor = cell.color;

        return (
          <Animated.View
            key={`cell-${ind}`}
            style={[
              styles.cell,
              animateCell && {
                transform: [{ scale: popIn }]
              },
              { backgroundColor: backgroundColor }
            ]}
          >
            <Text style={styles.text}>{cell.value}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cell: {
    borderColor: "#3a3a3c",
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    width: 52,
    height: 52
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Helvetica Neue",
    color: "white"
  }
});

export { Row };

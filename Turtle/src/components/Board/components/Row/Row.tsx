import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import React from "react";
import { Colors } from "../../../../../App";

export interface ICell {
  value: string;
  color: Colors;
}

export interface RowProps {
  cells: ICell[];
  canAnimate: boolean;
  shakeCell: boolean;
  flipCell: boolean;
}

const Row = (props: RowProps) => {
  const { cells, canAnimate, shakeCell, flipCell } = props;

  let curCellIndex = cells.length - 1;
  if (canAnimate && shakeCell) {
    for (let i = 0, len = cells.length; i < len; i++) {
      if (cells[i].value === "") {
        curCellIndex = i - 1;
        break;
      }
    }
  }

  const popIn = new Animated.Value(1);
  const flipCardAnimations: Animated.Value[] = [];
  const flipCardColor: Animated.Value[] = [];

  cells.forEach(() => {
    flipCardAnimations.push(new Animated.Value(0));
    flipCardColor.push(new Animated.Value(0));
  });

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(popIn, {
        toValue: 1.08,
        duration: 80,
        useNativeDriver: false
      }),
      Animated.timing(popIn, {
        toValue: 1,
        duration: 60,
        useNativeDriver: false
      })
    ]).start();

    const firstHalf = 175;
    const secondHalf = 175;
    const combined = firstHalf + secondHalf;
    cells.forEach((_, ind) => {
      Animated.sequence([
        Animated.delay(combined * ind),
        Animated.timing(flipCardAnimations[ind], {
          toValue: 0.5,
          duration: firstHalf,
          easing: Easing.linear, // Easing is an additional import from react-native
          useNativeDriver: false
        }),
        Animated.timing(flipCardAnimations[ind], {
          toValue: 0,
          duration: secondHalf,
          useNativeDriver: false
        })
      ]).start();

      Animated.sequence([
        Animated.delay(combined * ind + firstHalf),
        Animated.timing(flipCardColor[ind], {
          toValue: 1,
          duration: 1,
          // easing: Easing.linear, // Easing is an additional import from react-native
          useNativeDriver: false
        })
      ]).start();
    });
  });

  return (
    <View style={styles.row}>
      {cells.map((cell, ind) => {
        const shakeCell2 = canAnimate && shakeCell && ind === curCellIndex;
        const flipCell2 = canAnimate && flipCell;
        // const backgroundColor = cell.color;

        return (
          <Animated.View
            key={`cell-${ind}`}
            style={[
              styles.cell,
              { backgroundColor: cell.color },
              shakeCell2 && {
                transform: [{ scale: popIn }]
              },
              flipCell2 && {
                transform: [
                  {
                    rotateX: flipCardAnimations[ind].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"]
                    })
                  }
                ],
                backgroundColor: flipCardColor[ind].interpolate({
                  inputRange: [0, 1],
                  outputRange: [Colors.TRANSPARENT, cell.color]
                })
              }
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

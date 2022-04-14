import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CELL_ANIMATION_DURATION, Colors } from "../../Settings";

interface KeyboardAreaProps {
  onKeyPress: (char: string) => void;
  usedLetters: string[];
  isPaused: boolean;
}

interface KeyboardLetter {
  value: string;
  displayValue?: string | any;
}

const keyboard: KeyboardLetter[][] = [
  [
    { value: "Q" },
    { value: "W" },
    { value: "E" },
    { value: "R" },
    { value: "T" },
    { value: "Y" },
    { value: "U" },
    { value: "I" },
    { value: "O" },
    { value: "P" }
  ],
  [
    { value: "A" },
    { value: "S" },
    { value: "D" },
    { value: "F" },
    { value: "G" },
    { value: "H" },
    { value: "J" },
    { value: "K" },
    { value: "L" }
  ],
  [
    {
      value: "Enter",
      displayValue: "Enter"
    },
    { value: "Z" },
    { value: "X" },
    { value: "C" },
    { value: "V" },
    { value: "B" },
    { value: "N" },
    { value: "M" },
    {
      value: "DELETE",
      displayValue: <Feather name="delete" size={20} />
    }
  ]
];

const KeyboardArea = (props: KeyboardAreaProps) => {
  const { onKeyPress, usedLetters, isPaused } = props;

  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    if (Platform.OS === "web") {
      const listenToWebKeyboard = (event: KeyboardEvent) => {
        const key = event.key;

        const isAcceptableLetter = /^[A-Za-z]$/.test(key);
        if (isAcceptableLetter) {
          onKeyPress(key);
        } else if (key === "Enter") {
          onKeyPress("Enter");
        } else if (key === "Backspace") {
          onKeyPress("Delete");
        }
      };

      window.addEventListener("keyup", listenToWebKeyboard);
      return () => window.removeEventListener("keyup", listenToWebKeyboard);
    }
  });

  return (
    <View style={[styles.container, { maxWidth: windowWidth, padding: 10 }]}>
      {keyboard.map((row, rowInd) => {
        return (
          <View key={`keyboard-${rowInd}`} style={[styles.row]}>
            {row.map(key => {
              const isUsed = usedLetters.includes(key.value);
              return (
                <Pressable
                  key={`individualKey-${key.value}`}
                  disabled={isPaused}
                  onPress={() => onKeyPress(key.value)}
                >
                  <View
                    style={[
                      styles.cell,
                      {
                        minWidth: windowWidth < 400 ? 28 : 45,
                        minHeight: windowWidth < 400 ? 50 : 60,
                        marginRight: windowWidth < 400 ? 3 : 5,
                        marginLeft: windowWidth < 400 ? 3 : 5,
                        marginBottom: windowWidth < 400 ? 4 : 8
                      },
                      isUsed && styles.cellDisabled
                    ]}
                  >
                    <Text
                      style={[
                        styles.text,
                        isUsed && styles.textDisabled,
                        {
                          fontSize: windowWidth < 400 ? 12 : 16
                        }
                      ]}
                    >
                      {key.displayValue ?? key.value}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  cell: {
    padding: 7,
    marginRight: 3,
    marginLeft: 3,
    marginBottom: 4,
    borderRadius: 5,
    backgroundColor: Colors.GRAY,
    maxHeight: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cellDisabled: {
    borderColor: Colors.GRAY,
    backgroundColor: Colors.DARKGREY
  },
  text: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Helvetica Neue",
    textTransform: "uppercase"
  },
  textDisabled: {
    color: Colors.WHITE
  }
});

export { KeyboardArea };

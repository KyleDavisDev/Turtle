import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../../Settings";

export interface IModalProps {
  onGameModeSelect: (mode: string) => void;
  tiles: string[][];
  title: string;
}

const ModalWinner = (params: IModalProps) => {
  const { onGameModeSelect, tiles, title } = params;

  const onShareResults = () => {

    const textToClipboard = tiles.map(column => {
      const row = column.map(cell => {
        if (cell === "/") {
          return "⬛";
        } else if (cell === "Y") {
          return "🟨";
        } else if (cell === "G") {
          return "🟩";
        }
      }).join("");
      if (row.length > 0) return row + "\n";

      return;
    });

    const prefix = "Turtle " + (textToClipboard.join("").match(/\n/g) || []).length + "/" + textToClipboard.length + "\n\n";
    Clipboard.setString(prefix + textToClipboard.join(""));
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.h1}>{title}</Text>

        <Pressable style={styles.button} onPress={onShareResults}>
          <Text style={styles.buttonText}>Share results!<Entypo name="share" size={24} color={Colors.WHITE} /></Text>
        </Pressable>

        <View style={styles.options}>
          <View style={styles.option}>
            <Pressable style={styles.button} onPress={() => onGameModeSelect("Scrabble")}>
              <Text style={styles.buttonText}>New English Game</Text>
            </Pressable>
          </View>
          <View style={styles.option}>
            <Pressable style={styles.button} onPress={() => onGameModeSelect("Spanish")}>
              <Text style={styles.buttonText}>
                New Spanish Game</Text>
            </Pressable>
          </View>
          <View style={styles.option}>
            <Pressable style={styles.button} onPress={() => onGameModeSelect("Vanderbilt")}>
              <Text style={styles.buttonText}>New Vandy Game</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "100vh",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 300
  },
  container: {
    width: "100%",
    maxWidth: 450,
    padding: 10,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 5,
    backgroundColor: "#222",
    color: "white"
  },
  h1: {
    fontWeight: "bold",
    color: Colors.WHITE,
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 10
  },
  options: {
    marginTop: 10,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },
  option: {
    margin: 5
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.GREEN,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    color: Colors.WHITE,
    fontWeight: "bold"

  }
});

export { ModalWinner };

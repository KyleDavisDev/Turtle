import React from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";

export interface IModalProps {
  onGameModeSelect: (mode: string) => void;
}

const ModalWinner = (params: IModalProps) => {
  const { onGameModeSelect } = params;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.h1}>Winner!</Text>

        <View style={{}}>
          <button id="share-button">Share results!</button>
        </View>

        <View style={styles.options}>
          <View style={styles.option}>
            <Pressable style={styles.button} onPress={() => onGameModeSelect("Standard")}>
              <Text>Standard Game</Text>
            </Pressable>
          </View>
          <View style={styles.option}>
            <Pressable style={styles.button} onPress={() => onGameModeSelect("Spanish")}>
              <Text>Spanish Game</Text>
            </Pressable>
          </View>
          <View style={styles.option}>
            <Pressable style={styles.button}>
              <Text>New Game</Text>
            </Pressable>
          </View>
          <View style={styles.option}>
            <Pressable style={styles.button}>
              <Text>New Game</Text>
            </Pressable>
          </View>
          <View style={styles.option}>
            <Pressable style={styles.button}>
              <Text>New Game</Text>
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
    // width: 300,
    maxWidth: 300,
    padding: "10px",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 5,
    backgroundColor: "#222",
    color: "white"
  },
  h1: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: "10px"
  },
  options: {
    marginTop: "10px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },
  option: {
    margin: "5px"
  },
  button: {
    fontWeight: "bold",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "15px",
    paddingRight: "15px",
    backgroundColor: "rgb(39, 155, 78)"
  }
});

export { ModalWinner };

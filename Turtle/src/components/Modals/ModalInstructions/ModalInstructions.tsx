import React, { useEffect } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../../Settings";

interface IModalInstructions {
  onClose: () => void;
  shouldDisplay: boolean;
}

const ModalInstructions = (props: IModalInstructions) => {
  const { onClose, shouldDisplay } = props;

  const onModalClose = async () => {
    await rememberInstructionsHaveBeenSeen();
    onClose();
  };
  const rememberInstructionsHaveBeenSeen = async () => {
    try {
      await AsyncStorage.setItem("@haveInstructionsBeenSeen", "true");
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    const getHasAlreadyBeenSeen = async () => {
      try {
        const value = await AsyncStorage.getItem("@haveInstructionsBeenSeen");
        if (value !== null) {
          onClose();
        }
      } catch (e) {
        // error reading value
      }
    };

    if (shouldDisplay) {
    } else {
      getHasAlreadyBeenSeen();
    }
  }, []);

  if (!shouldDisplay) {
    return <></>;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.closeContainer}>
          <Pressable onPress={() => onModalClose()}>
            <Text style={styles.closeContainerText}>X</Text>
          </Pressable>
        </View>
        <Text style={styles.h1}>How to Play</Text>
        <Text style={styles.text}>Guess the TURTLE in six tries.</Text>

        <Text style={styles.text}>Each guess must be a valid five-letter word. Hit the enter button to submit.</Text>

        <Text style={styles.text}>
          After each guess, the color of the tiles will change to show how close your guess was to the word.
        </Text>

        <View style={styles.examples}>
          <p>
            <strong>Examples</strong>
          </p>
          <View style={styles.example}>
            <View style={styles.row}>
              <Text style={styles.correctBox}>w</Text>
              <Text style={styles.box}>e</Text>
              <Text style={styles.box}>a</Text>
              <Text style={styles.box}>r</Text>
              <Text style={styles.box}>y</Text>
            </View>
            <p>
              The letter <strong>W</strong> is in the word and in the correct spot.
            </p>
          </View>
          <View style={styles.example}>
            <View style={styles.row}>
              <Text style={styles.box}>p</Text>
              <Text style={styles.wrongSpotBox}>i</Text>
              <Text style={styles.box}>l</Text>
              <Text style={styles.box}>l</Text>
              <Text style={styles.box}>s</Text>
            </View>
            <p>
              The letter <strong>I</strong> is in the word but in the wrong spot.
            </p>
          </View>
          <View style={styles.example}>
            <View style={styles.row}>
              <Text style={styles.box}>v</Text>
              <Text style={styles.box}>a</Text>
              <Text style={styles.box}>g</Text>
              <Text style={styles.absentBox}>u</Text>
              <Text style={styles.box}>e</Text>
            </View>
            <p>
              The letter <strong>U</strong> is not in the word in any spot.
            </p>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Have fun!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    // cursor: "normal",
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
    maxWidth: 400,
    padding: "10px",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 5,
    backgroundColor: "#222",
    color: "white"
  },
  closeContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  closeContainerText: {
    color: "white",
    fontSize: 16,
    padding: 5
  },
  h1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: "10px"
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: "10px"
  },
  examples: {
    borderTopWidth: 1,
    borderTopColor: "rgb(58, 58, 60)",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(58, 58, 60)"
  },
  example: {
    marginTop: 12,
    marginBottom: 12
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  box: {
    borderWidth: 1,
    borderColor: "grey",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textTransform: "uppercase"
  },
  correctBox: {
    backgroundColor: Colors.GREEN,
    borderWidth: 1,
    borderColor: "grey",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textTransform: "uppercase"
  },
  wrongSpotBox: {
    backgroundColor: Colors.YELLOW,
    borderWidth: 1,
    borderColor: "grey",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textTransform: "uppercase"
  },
  absentBox: {
    backgroundColor: Colors.GRAY,
    borderWidth: 1,
    borderColor: "grey",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textTransform: "uppercase"
  }
});

export { ModalInstructions };

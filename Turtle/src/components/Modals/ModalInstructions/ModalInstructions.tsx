import React, { useEffect, useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../../Settings";

interface IModalInstructions {
  onClose: () => void;
  shouldDisplay: boolean;
}

const ModalInstructions = (props: IModalInstructions) => {
  const { onClose, shouldDisplay } = props;
  const [hasCookie, setHasCookie] = useState<boolean>(false);

  const onModalClose = async () => {
    await setInstructionHaveBeenSeen();
    onClose();
  };

  const setInstructionHaveBeenSeen = async () => {
    try {
      await AsyncStorage.setItem("@haveInstructionsBeenSeen", "true");
      setHasCookie(true);
    } catch (e) {
      // saving error
    }
  };


  useEffect(() => {
    const getHaveInstructionsBeenSeen = async () => {
      try {
        const value = await AsyncStorage.getItem("@haveInstructionsBeenSeen");
        if (value !== null) {
          setHasCookie(true);
          onClose();
        }
      } catch (e) {
        // error reading value
      }
    };
    getHaveInstructionsBeenSeen();
  }, []);


  if (hasCookie && !shouldDisplay) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.h1}>How to Play</Text>
          <Pressable style={styles.closeContainer} onPress={() => onClose()}>
            <Text style={styles.closeContainerText}>X</Text>
          </Pressable>
        </View>

        <Text style={styles.text}>Guess the TURTLE in six tries.</Text>

        <Text style={styles.text}>Each guess must be a valid five-letter word. Hit the enter button to submit.</Text>

        <Text style={styles.text}>
          After each guess, the color of the tiles will change to show how close your guess was to the word.
        </Text>

        <View style={styles.examples}>
          <Text style={{ fontWeight: "bold" }}>Examples</Text>

          <View style={styles.example}>
            <View style={styles.row}>
              <Text style={styles.correctBox}>w</Text>
              <Text style={styles.box}>e</Text>
              <Text style={styles.box}>a</Text>
              <Text style={styles.box}>r</Text>
              <Text style={styles.box}>y</Text>
            </View>
            <Text>
              The letter <Text style={{ fontWeight: "bold" }}>W</Text> is in the word and in the correct spot.
            </Text>
          </View>
          <View style={styles.example}>
            <View style={styles.row}>
              <Text style={styles.box}>p</Text>
              <Text style={styles.wrongSpotBox}>i</Text>
              <Text style={styles.box}>l</Text>
              <Text style={styles.box}>l</Text>
              <Text style={styles.box}>s</Text>
            </View>
            <Text>
              The letter <Text style={{ fontWeight: "bold" }}>I</Text> is in the word but in the wrong spot.
            </Text>
          </View>
          <View style={styles.example}>
            <View style={styles.row}>
              <Text style={styles.box}>v</Text>
              <Text style={styles.box}>a</Text>
              <Text style={styles.box}>g</Text>
              <Text style={styles.absentBox}>u</Text>
              <Text style={styles.box}>e</Text>
            </View>
            <Text>
              The letter <Text style={{ fontWeight: "bold" }}>U</Text> is not in the word in any spot.
            </Text>
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
    padding: 10,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 5,
    backgroundColor: "#222",
    color: Colors.WHITE
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  closeContainer: {
    position: "absolute",
    right: 0
  },
  closeContainerText: {
    color: Colors.WHITE,
    fontSize: 16,
    padding: 5
  },
  h1: {
    fontWeight: "bold",
    color: Colors.WHITE,
    fontSize: 16,
    textTransform: "uppercase"
  },
  text: {
    color: Colors.WHITE,
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
    color: Colors.WHITE,
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
    color: Colors.WHITE,
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
    color: Colors.WHITE,
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
    color: Colors.WHITE,
    textTransform: "uppercase"
  }
});

export { ModalInstructions };

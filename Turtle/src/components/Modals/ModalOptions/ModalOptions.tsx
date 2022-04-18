import React from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { Colors } from "../../../Settings";

export interface IModalProps {
  onGameModeSelect: (mode: string) => void;
  onLengthChange: (e: number) => void;
  wordLength: number;
  onGuessLength: (e: number) => void;
  guessLength: number;
  onClose: () => void;
  shouldDisplay: boolean | null;
}

const ModalOptions = (params: IModalProps) => {
  const { onGameModeSelect, onClose, shouldDisplay, wordLength, onLengthChange, guessLength, onGuessLength } = params;

  if (!shouldDisplay) return <></>;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.h1}>Settings</Text>
          <Pressable style={styles.closeContainer} onPress={() => onClose()}>
            <Text style={styles.closeContainerText}>X</Text>
          </Pressable>
        </View>


        <View style={styles.sections}>
          <View style={styles.setting}>
            <View style={styles.text}>
              <Text style={styles.sectionTitle}>Word Length</Text>
              <Text style={styles.sectionDescription}>Adjust how long the word is to guess.</Text>
            </View>
            <View style={styles.control}>
              <Pressable style={[styles.bumper, styles.bumper_l]}
                         onPress={() => onLengthChange(wordLength - 1)}><Text>-</Text></Pressable>
              <Text style={styles.input}>{wordLength}</Text>
              <Pressable style={[styles.bumper, styles.bumper_r]}
                         onPress={() => onLengthChange(wordLength + 1)}><Text>+</Text></Pressable>
            </View>
          </View>
          <View style={styles.setting}>
            <View style={styles.text}>
              <Text style={styles.sectionTitle}>Guess Amount</Text>
              <Text style={styles.sectionDescription}>Adjust how many attempts you have to guess the word.</Text>
            </View>
            <View style={styles.control}>
              <Pressable style={[styles.bumper, styles.bumper_l]}
                         onPress={() => onGuessLength(guessLength - 1)}><Text>-</Text></Pressable>
              <Text style={styles.input}>{guessLength}</Text>
              <Pressable style={[styles.bumper, styles.bumper_r]}
                         onPress={() => onGuessLength(guessLength + 1)}><Text>+</Text></Pressable>
            </View>
          </View>

          <View style={styles.setting}>
            <View style={styles.options}>
              <View style={styles.option}>
                <Pressable style={styles.button} onPress={() => onGameModeSelect("Scrabble")}>
                  <Text>English Game</Text>
                </Pressable>
              </View>
              <View style={styles.option}>
                <Pressable style={styles.button} onPress={() => onGameModeSelect("Spanish")}>
                  <Text>Spanish Game</Text>
                </Pressable>
              </View>
              <View style={styles.option}>
                <Pressable style={styles.button} onPress={() => onGameModeSelect("Vanderbilt")}>
                  <Text>Vandy Game</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ borderTopWidth: 1, borderTopColor: Colors.GRAY, paddingTop: 10 }}></View>
          <View style={styles.setting}>
            <View>
              <Text style={styles.sectionTitle}>Feedback?</Text>
            </View>
            <View style={styles.control}>
              <Text style={styles.controlText}>No Thanks</Text>
            </View>
          </View>
          <View style={styles.setting}>
            <View>
              <Text style={styles.sectionTitle}>Community</Text>
            </View>
            <View style={styles.control}>
              <Text style={styles.controlText}>N/A</Text>
            </View>
          </View>
          <View style={styles.setting}>
            <View>
              <Text style={styles.sectionTitle}>Questions?</Text>
            </View>
            <View style={styles.control}>
              <Text style={styles.controlText}>N/A</Text>
            </View>
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
    borderRadius: 5,
    borderColor: "#444",
    backgroundColor: "#222",
    color: "white"
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
    color: "white",
    fontSize: 16,
    padding: 5
  },
  h1: {
    fontWeight: "bold",
    color: Colors.WHITE,
    fontSize: 16,
    textTransform: "uppercase"
  },
  sections: {},
  setting: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15
  },
  text: {
    maxWidth: "66%"
  },
  sectionTitle: {
    textTransform: "uppercase",
    color: Colors.WHITE,
    fontSize: 18
  },
  sectionDescription: {
    color: Colors.GRAY,
    fontSize: 14
  },
  control: { display: "flex", flexDirection: "row", alignItems: "stretch" },
  controlText: {
    color: Colors.WHITE
  },
  bumper: {
    backgroundColor: Colors.GRAY,
    color: Colors.WHITE,
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  bumper_l: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  bumper_r: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  input: {
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.WHITE,
    color: Colors.BLACK
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
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgb(39, 155, 78)"
  }

});

export { ModalOptions };

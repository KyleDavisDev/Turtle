import React from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { Colors } from "../../../Settings";

export interface IModalProps {
  onGameModeSelect: (mode: string) => void;
  onLengthChange: (e: number) => void;
  wordLength: number;
  onClose: () => void;
  shouldDisplay: boolean | null;
}

const ModalOptions = (params: IModalProps) => {
  const { onGameModeSelect, onClose, shouldDisplay, wordLength, onLengthChange } = params;

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
            <View>
              <Text style={styles.sectionTitle}>Word Length</Text>
              <Text style={styles.sectionDescription}>Adjust how long the word is to guess.</Text>
            </View>
            <View style={styles.control}>
              <Pressable onPress={() => onLengthChange(wordLength - 1)}><Text>-</Text></Pressable>
              <Text style={styles.input}>{wordLength}</Text>
              <Pressable onPress={() => onLengthChange(wordLength + 1)}><Text>+</Text></Pressable>
            </View>
          </View>
          <View style={styles.setting}>
            <View>
              <Text style={styles.sectionTitle}>Guess Amount</Text>
              <Text style={styles.sectionDescription}>Adjust how many attempts you have to guess the word.</Text>
            </View>
            <View style={styles.control}>
              <Text>sample</Text>
            </View>
          </View>

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

          <View style={styles.setting}>
            <View>
              <Text style={styles.sectionTitle}>Feedback</Text>
            </View>
            <View style={styles.control}>
              <a
                href="mailto:nytgames@nytimes.com?subject=Wordle%20Feedback&amp;body=%0D%0A%0D%0A%0A--%0ADevice%20summary%3A%0APage%3A%20%2Fgames%2Fwordle%0APlatform%3A%20Web%20(Desktop)%20%0ABrowser%3A%20Firefox%0AScreen%20Resolution%3A%201728%20x%201117%0AViewport%20Size%3A%201728%20x%20595%0ATimezone%3A%20UTC-5%0ABuild%3A%20e17c80f8%0A%20%20"
                title="nytgames@nytimes.com">Email</a>
            </View>
          </View>
          <View style={styles.setting}>
            <View>
              <Text style={styles.sectionTitle}>Community</Text>
            </View>
            <View style={styles.control}>
              <a href="https://twitter.com/NYTGames" target="blank" title="@NYTGames">Twitter</a>
            </View>
          </View>
          <View style={styles.setting}>
            <View>
              <Text style={styles.sectionTitle}>Questions?</Text>
            </View>
            <View style={styles.control}>
              <a
                href="https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles#h_01FVGCB2Z00ZQMDMCYWBPWJNXB"
                target="blank">FAQ</a>
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
    padding: "10px",
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
  sectionTitle: {
    textTransform: "uppercase",
    color: Colors.WHITE,
    fontSize: 18
  },
  sectionDescription: {
    color: Colors.GRAY,
    fontSize: 14
  },
  control: {},

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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});

export { ModalOptions };

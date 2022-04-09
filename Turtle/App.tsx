import { GameFactory } from "./src/BLL/GameFactory/GameFactory";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/Header/Header";
import { Game } from "./src/components/Game/Game";
import { ModalWinner } from "./src/components/Modals/ModalWinner/ModalWinner";
import { useState } from "react";
import { ModalInstructions } from "./src/components/Modals/ModalInstructions/ModalInstructions";

export default function App() {
  const factory = new GameFactory();
  const gameBLL = factory.standardGame();

  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [pauseGame, setPauseGame] = useState<boolean>(false);

  const onWinner = () => {
    setIsWinner(true);
    setPauseGame(true);

    console.log("am i here?");
  };

  const onNewGameModeSelect = (mode: string): void => {
    console.log(mode);
  };

  return (
    <View style={styles.container}>
      <ModalInstructions />
      {isWinner && <ModalWinner onGameModeSelect={onNewGameModeSelect} />}
      <Header />
      <Game gameBLL={gameBLL} onWin={onWinner} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center"
  }
});

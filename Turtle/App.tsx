import { GameFactory } from "./src/BLL/GameFactory/GameFactory";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/Header/Header";
import { Game } from "./src/components/Game/Game";
import { ModalWinner } from "./src/components/Modals/ModalWinner/ModalWinner";
import { useState } from "react";
import { ModalInstructions } from "./src/components/Modals/ModalInstructions/ModalInstructions";
import { IGame } from "./src/BLL/Game/IGame";

const factory = new GameFactory();
const newGame = factory.badWordsMode();
export default function App() {
  const [game, setGame] = useState<IGame>(newGame);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [displayInstructions, setDisplayInstructions] = useState<boolean>(true);
  const [pauseGame, setPauseGame] = useState<boolean>(false);

  const onWinner = () => {
    setIsWinner(true);
    setPauseGame(true);

    console.log("am i here?");
  };

  const onInstructionsClose = () => {
    setDisplayInstructions(false);
    // setGame();
  };

  const onNewGameModeSelect = (mode: string): void => {
    setGame(factory.standardGame());
    setIsWinner(false);
  };

  return (
    <View style={styles.container}>
      {displayInstructions && <ModalInstructions onClose={onInstructionsClose} />}
      {isWinner && <ModalWinner onGameModeSelect={onNewGameModeSelect} />}
      <Header />
      <Game gameBLL={game} onWin={onWinner} />
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

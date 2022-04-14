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
const newGame = factory.spanishMode();
export default function App() {
  const [game, setGame] = useState<IGame>(newGame);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [displayInstructions, setDisplayInstructions] = useState<boolean>(false);
  const [pauseGame, setPauseGame] = useState<boolean>(false);

  const onWinner = () => {
    setIsWinner(true);
    setPauseGame(true);
  };

  const onInstructionsClose = () => {
    setDisplayInstructions(false);
    // setGame();
  };
  const onInstructionsOpen = () => {
    setDisplayInstructions(true);
    // setGame();
  };

  const onNewGameModeSelect = (mode: string): void => {
    setGame(factory.standardGame());
    setIsWinner(false);
  };

  return (
    <View style={styles.container}>
      <Header onInstructionsOpen={onInstructionsOpen} />
      {displayInstructions && <ModalInstructions onClose={onInstructionsClose} shouldDisplay={displayInstructions} />}
      {isWinner && <ModalWinner onGameModeSelect={onNewGameModeSelect} />}
      <Game gameBLL={game} onWin={onWinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center"
    // justifyContent: "center"
  }
});

export enum Colors {
  "TRANSPARENT" = "rgba(0,0,0,1)",
  "GREEN" = "rgb(39, 155, 78)",
  "GRAY" = "rgb(67, 77, 93)",
  "YELLOW" = "rgb(187, 145, 18)"
}

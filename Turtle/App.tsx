import { useState } from "react";
import { GameFactory } from "./src/BLL/GameFactory/GameFactory";
import { StyleSheet, View } from "react-native";
import { Header } from "./src/components/Header/Header";
import { Game } from "./src/components/Game/Game";
import { ModalWinner } from "./src/components/Modals/ModalWinner/ModalWinner";
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
  }
});

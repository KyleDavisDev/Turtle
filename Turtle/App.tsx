import { useState } from "react";
import { GameFactory } from "./src/BLL/GameFactory/GameFactory";
import { StyleSheet, View } from "react-native";
import { Header } from "./src/components/Header/Header";
import { Game } from "./src/components/Game/Game";
import { ModalWinner } from "./src/components/Modals/ModalWinner/ModalWinner";
import { ModalInstructions } from "./src/components/Modals/ModalInstructions/ModalInstructions";
import { IGame } from "./src/BLL/Game/IGame";
import { Colors } from "./src/Settings";
import { ModalOptions } from "./src/components/Modals/ModalOptions/ModalOptions";


const factory = new GameFactory();
const newGame = factory.spanishMode();
export default function App() {
  const [game, setGame] = useState<IGame>(newGame);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [displayInstructions, setDisplayInstructions] = useState<boolean>(true);
  const [displayOptions, setDisplayOptions] = useState<boolean | null>(null);
  const [pauseGame, setPauseGame] = useState<boolean>(false);
  const [resetGame, setResetGame] = useState<boolean | null>(null);

  const onWinner = () => {
    setIsWinner(true);
    setPauseGame(true);
  };

  const onInstructionsClose = () => {
    setDisplayInstructions(false);
    setPauseGame(false);
  };
  const onInstructionsOpen = () => {
    setDisplayInstructions(true);
    setPauseGame(true);
  };
  const onOptionsClose = () => {
    setDisplayOptions(false);
    setPauseGame(false);
  };
  const onOptionsOpen = () => {
    setDisplayOptions(true);
    setPauseGame(true);
  };

  const onNewGameModeSelect = (mode: string): void => {
    // TODO: Adapter here?
    switch (mode.toLowerCase()) {
      case "scrabble": {
        setGame(factory.standardGame());
        break;
      }
      case "spanish": {
        setGame(factory.spanishMode());
        break;
      }
      case "vanderbilt": {
        setGame(factory.vanderbiltMode());
        break;
      }
    }

    setIsWinner(false);
    setPauseGame(false);
    setResetGame(!resetGame);
  };

  return (
    <View style={styles.container}>
      <Header onInstructionsOpen={onInstructionsOpen} />
      <ModalInstructions onClose={onInstructionsClose} shouldDisplay={displayInstructions} />
      {displayOptions &&
        <ModalOptions onGameModeSelect={onNewGameModeSelect} onClose={onOptionsClose} shouldDisplay={displayOptions} />}
      {isWinner && <ModalWinner onGameModeSelect={onNewGameModeSelect} />}
      <Game gameBLL={game} onWin={onWinner} pauseGame={pauseGame} resetGame={resetGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    alignItems: "center"
  }
});

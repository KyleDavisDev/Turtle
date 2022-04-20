import { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import { GameFactory } from "./src/BLL/GameFactory/GameFactory";
import { IGame } from "./src/BLL/Game/IGame";
import { Colors } from "./src/Settings";
import { Header } from "./src/components/Header/Header";
import { Game } from "./src/components/Game/Game";
import { ModalWinner } from "./src/components/Modals/ModalWinner/ModalWinner";
import { ModalInstructions } from "./src/components/Modals/ModalInstructions/ModalInstructions";
import { ModalOptions } from "./src/components/Modals/ModalOptions/ModalOptions";

const factory = new GameFactory();
const newGame = factory.standardGame();
export default function App() {
  
  const [game, setGame] = useState<IGame>(newGame);
  const [wordLength, setWordLength] = useState<number>(newGame.getWordLength());
  const [guessLength, setGuessLength] = useState<number>(5);
  const [displayWinner, setDisplayWinner] = useState<boolean>(false);
  const [winnerText, setWinnerText] = useState<string>("");
  const [displayInstructions, setDisplayInstructions] = useState<boolean>(true);
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [pauseGame, setPauseGame] = useState<boolean>(false);
  const [resetGame, setResetGame] = useState<boolean | null>(null);

  const onWinner = () => {
    setDisplayWinner(true);
    setWinnerText("Winner");
    setPauseGame(true);
  };
  const onLoss = () => {
    setDisplayWinner(true);
    setWinnerText("Darn!");
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

    setWordLength(game.getWordLength());
    setDisplayOptions(false);
    setDisplayInstructions(false);
    setDisplayWinner(false);
    setPauseGame(false);
    setResetGame(!resetGame);
  };
  const onLengthChange = (e: number): void => {
    if (e < 1 || e > 9) return;

    setWordLength(e);
    factory.setWordLength(e);
  };
  const onGuessLength = (e: number): void => {
    if (e < 1 || e > 9) return;

    setGuessLength(e);
    factory.setGuessLength(e);
  };

  return (
    <SafeAreaView style={[styles.container]}>


      <Header onInstructionsOpen={onInstructionsOpen} onOptionsOpen={onOptionsOpen} />
      <ModalInstructions onClose={onInstructionsClose} shouldDisplay={displayInstructions} />
      {displayOptions ?
        <ModalOptions onGameModeSelect={onNewGameModeSelect}
                      wordLength={wordLength}
                      onLengthChange={onLengthChange}
                      onGuessLength={onGuessLength}
                      guessLength={guessLength}
                      onClose={onOptionsClose}
                      shouldDisplay={displayOptions} /> : null}
      {displayWinner ?
        <ModalWinner onGameModeSelect={onNewGameModeSelect}
                     tiles={game.getBoardState()}
                     title={winnerText} /> : null}
      <Game gameBLL={game} onWin={onWinner} onLoss={onLoss} pauseGame={pauseGame} resetGame={resetGame} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    alignItems: "center"
  }
});

import { GameFactory } from "./src/BLL/GameFactory/GameFactory";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/Header/Header";
import { Game } from "./src/components/Game/Game";

export default function App() {
  const factory = new GameFactory();
  const gameBLL = factory.badWordsMode();

  return (
    <View style={styles.container}>
      <Header />
      <Game gameBLL={gameBLL} />
      <Text>Open up App.tsx to start working on your app!testasdf</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

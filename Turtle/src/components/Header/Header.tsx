import { Pressable, StyleSheet, Text, View } from "react-native";
import { HelpIcon } from "./components/HelpIcon/HelpIcon";
import { CogIcon } from "./components/CogIcon/CogIcon";

interface IHeader {
  onInstructionsOpen: () => void;
}

const Header = (params: IHeader) => {
  const { onInstructionsOpen } = params

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.section}>
          <Pressable onPress={() => onInstructionsOpen()}>
            <HelpIcon />
          </Pressable>
        </View>
        <View style={styles.section}>
          <Pressable>
            <CogIcon />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    width: "100%",
    borderBottomColor: "#222",
    borderBottomWidth: 2,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  row: {
    width: "100%",
    maxWidth: "1300px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  section: {
    display: "flex",
    flexDirection: "row"
  }
});

export { Header };

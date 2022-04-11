import { Pressable, StyleSheet, Text, View } from "react-native";
import { HelpIcon } from "./components/HelpIcon/HelpIcon";
import { CogIcon } from "./components/CogIcon/CogIcon";

interface IHeader {
  onInstructionsOpen: () => void;
}

const Header = (params: IHeader) => {
  const { onInstructionsOpen } = params;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.section}>
          <Pressable onPress={() => onInstructionsOpen()}>
            <Text>Howdy</Text>
            {/*<HelpIcon />*/}
          </Pressable>
        </View>
        <View style={styles.section}>
          <Pressable>
            <Text>Howdy</Text>
            {/*<CogIcon />*/}
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
    maxWidth: 1300,
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

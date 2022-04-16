import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../Settings";
import { useFonts } from "expo-font";

interface IHeader {
  onInstructionsOpen: () => void;
  onOptionsOpen: () => void;
}

const Header = (params: IHeader) => {
  const { onInstructionsOpen, onOptionsOpen } = params;
  const [loaded] = useFonts({
    Title: require("../../../assets/fonts/karnakcondensed-700.woff2")
  });

  if (!loaded) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.section}>
          <Pressable onPress={() => onInstructionsOpen()}>
            <FontAwesome name="question-circle-o" size={24} color={Colors.WHITE} />
          </Pressable>
        </View>
        <View style={styles.section}>
          <Text style={[styles.title, { fontFamily: "Title" }]}>
            Turtle
          </Text>
          <Text style={[styles.subTitle, { fontFamily: "Title" }]}> (...a Wordle clone)</Text>
        </View>
        <View style={styles.section}>
          <Pressable onPress={() => onOptionsOpen()}>
            <FontAwesome name="cog" size={24} color={Colors.WHITE} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: Colors.DARKGREY,
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
    flexDirection: "row",
    alignItems: "baseline"
  },
  title: {
    fontSize: 40,
    color: Colors.WHITE
  },
  subTitle: {
    fontSize: 15,
    color: Colors.WHITE
  }
});

export { Header };

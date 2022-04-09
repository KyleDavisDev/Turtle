import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Modal = () => {
  return <View style={styles.banner}>test</View>;
};

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export { Modal };

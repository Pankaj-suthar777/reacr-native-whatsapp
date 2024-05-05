import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const PageTitle = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    color: colors.textColor,
    letterSpacing: 0.3,
    fontFamily: "bold",
    fontSize: 28,
  },
});

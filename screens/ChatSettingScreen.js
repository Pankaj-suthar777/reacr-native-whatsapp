import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ChatSettingScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>ChatSettingScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ChatSettingScreen;

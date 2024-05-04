import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

const ChatListScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>ChatListScreen</Text>
      <Button
        title="Go to chats"
        onPress={() => props.navigation.navigate("ChatScreen")}
      ></Button>
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
export default ChatListScreen;

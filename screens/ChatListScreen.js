import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
const ChatListScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="New chat"
              iconName="create-outline"
              onPress={() => {
                props.navigation.navigate("NewChat");
              }}
            />
          </HeaderButtons>
        );
      },
    });
  }, []);
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

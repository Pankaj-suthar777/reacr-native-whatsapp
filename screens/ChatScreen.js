import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";

const ChatScreen = (props) => {
  const [messageText, setMessageText] = useState("");

  const sendMessage = useCallback(() => {
    setMessageText("");
  }, [messageText]);

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
      <ImageBackground
        source={require("../assets/images/droplet.jpeg")}
        style={styles.backgroundImage}
      ></ImageBackground>
      {/* <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      > */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
          <Feather name="plus" size={24} color={colors.blue} />
        </TouchableOpacity>
        <TextInput
          style={styles.textbox}
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
          onSubmitEditing={sendMessage}
        />

        {messageText === "" && (
          <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
            <Feather name="camera" size={24} color={colors.blue} />
          </TouchableOpacity>
        )}

        {messageText !== "" && (
          <TouchableOpacity
            style={{ ...styles.mediaButton, ...styles.sendButton }}
            onPress={sendMessage}
          >
            <Feather name="send" size={20} color={"white"} />
          </TouchableOpacity>
        )}
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  textbox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lightgray,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  sendButton: {
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 8,
    paddingLeft: 6,
    width: 35,
  },
});
export default ChatScreen;

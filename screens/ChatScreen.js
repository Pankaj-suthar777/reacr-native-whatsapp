import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";

const ChatScreen = (props) => {
  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
      <ImageBackground
        source={require("../assets/images/droplet.jpeg")}
        style={styles.backgroundImage}
      ></ImageBackground>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
          <Feather name="plus" size={24} color={colors.blue} />
        </TouchableOpacity>
        <TextInput style={styles.textbox} />
        <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
          <Feather name="camera" size={24} color={colors.blue} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
});
export default ChatScreen;

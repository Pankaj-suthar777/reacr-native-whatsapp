import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const Submitbutton = (props) => {
  const enableBgColor = props.color || colors.primary;
  const disabledBgColor = colors.lightgray;
  const bgColor = props.disabled ? disabledBgColor : enableBgColor;
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...props.style,
        ...{ backgroundColor: bgColor },
      }}
      onPress={props.disabled ? () => {} : props.onPress}
      activeOpacity={props.disabled ? 1 : 0.5}
    >
      <Text style={{ color: props.disabled ? colors.gray : "white" }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Submitbutton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

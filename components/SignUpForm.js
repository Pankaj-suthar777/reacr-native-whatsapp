import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Submitbutton from "../components/Submitbutton";
import Input from "../components/Input";

const SignUpForm = () => {
  return (
    <>
      <Input label="First name" icon="user-o" iconPack={FontAwesome} />
      <Input label="Last name" icon="user-o" iconPack={FontAwesome} />
      <Input label="Email" icon="mail" iconPack={Feather} />
      <Input label="Password" icon="lock" iconPack={Feather} />
      <Submitbutton
        title="Sign up"
        onPress={() => {}}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({});

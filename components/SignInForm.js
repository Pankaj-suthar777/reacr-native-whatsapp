import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Submitbutton from "../components/Submitbutton";
import Input from "../components/Input";

const SignInForm = () => {
  return (
    <>
      <Input label="Email" icon="mail" iconPack={Feather} />
      <Input label="Password" icon="lock" iconPack={Feather} />
      <Submitbutton
        title="Sign in"
        onPress={() => {}}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({});

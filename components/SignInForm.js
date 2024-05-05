import { StyleSheet } from "react-native";
import React, { useCallback, useReducer } from "react";
import { Feather } from "@expo/vector-icons";
import Submitbutton from "../components/Submitbutton";
import Input from "../components/Input";
import { validateInput } from "../utils/actions/formAction";
import { reducer } from "../utils/reducers/formReducer";

const initialState = {
  inputValues: {
    email: false,
    password: false,
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignInForm = () => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangeHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({
      inputId,
      validationResult: result,
      inputValue,
    });
  });

  const authHandler = () => {};

  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        autCapitalize="none"
        inputChangeHandler={inputChangeHandler}
        keyboardType="email-address"
        errorText={formState.inputValidities["email"]}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        inputChangeHandler={inputChangeHandler}
        autCapitalize="none"
        errorText={formState.inputValidities["password"]}
      />
      <Submitbutton
        title="Sign in"
        onPress={authHandler}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({});

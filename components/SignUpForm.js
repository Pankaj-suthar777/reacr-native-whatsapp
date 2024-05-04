import { StyleSheet } from "react-native";
import React, { useCallback, useReducer } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Submitbutton from "../components/Submitbutton";
import Input from "../components/Input";

import { validateInput } from "../utils/actions/formAction";
import { reducer } from "../utils/reducers/formReducer";

const initialState = {
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};
const SignUpForm = () => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangeHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({
      inputId,
      validationResult: result,
    });
  });
  return (
    <>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        iconPack={FontAwesome}
        inputChangeHandler={inputChangeHandler}
        autCapitalize="none"
        errorText={formState.inputValidities["firstName"]}
      />
      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        iconPack={FontAwesome}
        inputChangeHandler={inputChangeHandler}
        autCapitalize="none"
        errorText={formState.inputValidities["lastName"]}
      />
      <Input
        id="email"
        label="Email"
        icon="mail"
        keyboardType="email-address"
        iconPack={Feather}
        inputChangeHandler={inputChangeHandler}
        autCapitalize="none"
        errorText={formState.inputValidities["email"]}
      />
      <Input
        secureTextEntry
        autCapitalize="none"
        id="Password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        inputChangeHandler={inputChangeHandler}
        errorText={formState.inputValidities["password"]}
      />
      <Submitbutton
        title="Sign up"
        onPress={() => {}}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({});

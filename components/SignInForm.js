import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Feather } from "@expo/vector-icons";
import Submitbutton from "../components/Submitbutton";
import Input from "../components/Input";
import { validateInput } from "../utils/actions/formAction";
import { reducer } from "../utils/reducers/formReducer";
import { signIn } from "../utils/actions/authActions";
import { useDispatch } from "react-redux";
import colors from "../constants/colors";

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
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangeHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({
      inputId,
      validationResult: result,
      inputValue,
    });
  });

  const authHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError(null);
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "okay" }]);
    }
  }, [error]);

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
        initialValue={formState.inputValues.email}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        inputChangeHandler={inputChangeHandler}
        autCapitalize="none"
        initialValue={formState.inputValues.password}
        errorText={formState.inputValidities["password"]}
      />
      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <Submitbutton
          title="Sign in"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({});

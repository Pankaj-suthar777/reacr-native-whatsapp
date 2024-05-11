import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import ProfileImage from "../components/ProfileImage";
import Input from "../components/Input";
import { reducer } from "../utils/reducers/formReducer";
import { validateLength } from "../utils/validationConstraints";
import { updateChatData } from "../utils/actions/chatActions";
import colors from "../constants/colors";
import Submitbutton from "../components/Submitbutton";

const ChatSettingScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const chatId = props.route.params.chatId;
  const chatData = useSelector((state) => state.chats.chatsData[chatId]);
  const userData = useSelector((state) => state.auth.userData);

  const initialState = {
    inputValues: { chatName: chatData.chatName },
    inputValidities: { chatName: undefined },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateLength(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState]
  );

  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues;
    try {
      setIsLoading(true);
      await updateChatData(chatId, userData.userId, updatedValues);

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;
    return currentValues.chatName != chatData.chatName;
  };

  return (
    <PageContainer>
      <PageTitle title="Chat Setting" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProfileImage
          showEditButton={true}
          size={80}
          chatId={chatId}
          userId={userData.userId}
          uri={chatData.chatImage}
        />
        <Input
          id="chatName"
          label="Chat name"
          autoCapitalize="none"
          initialValue={chatData.chatName}
          allowEmpty={false}
          onInputChange={inputChangeHandler}
        />
        {isLoading ? (
          <ActivityIndicator size={"small"} color={colors.primary} />
        ) : (
          <Submitbutton title="Save changes" color={colors.primary} />
        )}
      </ScrollView>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ChatSettingScreen;

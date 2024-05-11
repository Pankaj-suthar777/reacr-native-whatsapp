import {
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import {
  launchImagePicker,
  uploadImageAsync,
} from "../utils/imagePickerHelper";
import { updateSignedInUserData } from "../utils/actions/authActions";
import { useDispatch } from "react-redux";
import { updateLoggedInData } from "../store/authSlice";
import { updateChatData } from "../utils/actions/chatActions";
const userImage = require("../assets/images/10.1 userImage.jpeg");

const ProfileImage = (props) => {
  const dispatch = useDispatch();
  const source = props.uri ? { uri: props.uri } : userImage;
  const [image, setImage] = useState(source);
  const [isLoading, setIsLoading] = useState(false);

  const showEditButton = props.showEditButton && props.showEditButton === true;
  const showRemoveButton =
    props.showRemoveButton && props.showRemoveButton === true;

  const userId = props.userId;
  const chatId = props.chatId;

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();
      if (!tempUri) return;
      setIsLoading(true);
      const uploadUri = await uploadImageAsync(tempUri, chatId !== undefined);
      setIsLoading(false);
      if (!uploadUri) {
        throw new Error("Could not upload image");
      }

      if (chatId) {
        await updateChatData(chatId, userId, { chatImage: uploadUri });
      } else {
        const newData = { profilePicture: uploadUri };

        await updateSignedInUserData(userId, newData);
        dispatch(updateLoggedInData({ newData }));
      }

      setImage({ uri: uploadUri });
    } catch (error) {
      setIsLoading(false);
    }
  };
  const Conatiner = props.onPress || showEditButton ? TouchableOpacity : View;
  return (
    <Conatiner style={props.style} onPress={props.onPress || pickImage}>
      {isLoading ? (
        <View
          height={props.size}
          width={props.size}
          style={styles.loadingContainer}
        >
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      ) : (
        <Image
          style={{
            ...styles.image,
            ...{ width: props.size, height: props.size },
          }}
          source={image}
        />
      )}
      {showEditButton && !isLoading && (
        <View style={styles.editIconContainer}>
          <FontAwesome name="pencil" size={15} color={"black"} />
        </View>
      )}

      {showRemoveButton && !isLoading && (
        <View style={styles.removeIconContainer}>
          <FontAwesome name="close" size={15} color={"black"} />
        </View>
      )}
    </Conatiner>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: colors.gray,
    borderWidth: 1,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.lightgray,
    borderRadius: 20,
    padding: 8,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  removeIconContainer: {
    position: "absolute",
    bottom: -3,
    right: -3,
    backgroundColor: colors.lightgray,
    borderRadius: 20,
    padding: 3,
  },
});

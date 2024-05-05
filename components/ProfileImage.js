import { Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  launchImagePicker,
  uploadImageAsync,
} from "../utils/imagePickerHelper";
import { updateSignedInUserData } from "../utils/actions/authActions";
const userImage = require("../assets/images/10.1 userImage.jpeg");

const ProfileImage = (props) => {
  const source = props.uri ? { uri: props.uri } : userImage;
  const [image, setImage] = useState(source);
  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();
      if (!tempUri) return;

      const uploadUri = await uploadImageAsync(tempUri);
      if (!uploadUri) {
        throw new Error("Could not upload image");
      }
      console.log(uploadUri);
      const userId = props.userId;
      await updateSignedInUserData(userId, { profilePicture: uploadUri });

      setImage({ uri: uploadUri });
    } catch (error) {}
  };
  return (
    <TouchableOpacity onPress={pickImage}>
      <Image
        style={{
          ...styles.image,
          ...{ width: props.size, height: props.size },
        }}
        source={image}
      />
      <View style={styles.editIconContainer}>
        <FontAwesome name="pencil" size={15} color={"black"} />
      </View>
    </TouchableOpacity>
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
});

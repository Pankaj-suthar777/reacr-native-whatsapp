import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import colors from "../constants/colors";
import logo from "../assets/images/logo.png";

const AuthScreen = (props) => {
  const [isSignUp, setIsSignup] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.image} resizeMode="contain" />
            </View>
            {isSignUp ? <SignUpForm /> : <SignInForm />}

            <TouchableOpacity
              onPress={() => setIsSignup((prev) => !prev)}
              style={styles.linkContainer}
            >
              <Text style={styles.link}>{`Switch to ${
                isSignUp ? "sign in" : "sign up"
              }`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },

  link: {
    color: colors.blue,
    fontFamily: "medium",
    letterSpacing: 0.3,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
  },
});
export default AuthScreen;

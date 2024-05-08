import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MenuProvider } from "react-native-popup-menu";

const fonts = {
  black: require("./assets/fonts//Roboto-Black.ttf"),
  blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
  bold: require("./assets/fonts/Roboto-Bold.ttf"),
  boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
  italic: require("./assets/fonts/Roboto-Italic.ttf"),
  light: require("./assets/fonts/Roboto-Light.ttf"),
  lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
  medium: require("./assets/fonts/Roboto-Medium.ttf"),
  mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
  regular: require("./assets/fonts/Roboto-Regular.ttf"),
  thin: require("./assets/fonts/Roboto-Thin.ttf"),
  thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(fonts);
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsLoaded(true);
      }
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayout} style={styles.container}>
        <MenuProvider>
          <AppNavigator />
        </MenuProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

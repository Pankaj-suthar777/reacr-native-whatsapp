import React, { useEffect, useState } from "react";

import ChatListScreen from "../screens/ChatListScreen";
import ChatSettingScreen from "../screens/ChatSettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import ChatScreen from "../screens/ChatScreen";
import NewChatScreen from "../screens/NewChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { getFirebaseApp } from "../utils/firbaseHelper";
import { child, getDatabase, off, onValue, ref } from "firebase/database";
import { setChatsData } from "../store/chatSlice";
import { ActivityIndicator, View } from "react-native";
import colors from "../constants/colors";
import { commonStyle } from "../constants/commonStyle";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerTitle: "", headerShadowVisible: false }}
    >
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: (props) => (
            <Ionicons
              name="chatbubble-outline"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: (props) => (
            <Ionicons
              name="settings-outline"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatSettings"
          component={ChatSettingScreen}
          options={{
            headerTitle: "Settings",
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "containedModal" }}>
        <Stack.Screen name="NewChat" component={NewChatScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const MainNavigator = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const storedUsers = useSelector((state) => state.users.storedUsers);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const usersChatsRef = child(dbRef, `userChats/${userData.userId}`);
    const refs = [usersChatsRef];
    onValue(usersChatsRef, (quarySnapshot) => {
      const chatsIDsData = quarySnapshot.val() || {};
      const chatsIds = Object.values(chatsIDsData);

      let chatsData = {};
      let chatsFoundCount = 0;

      for (let i = 0; i < chatsIds.length; i++) {
        const chatId = chatsIds[i];
        const chatRef = child(dbRef, `chats/${chatId}`);
        refs.push(chatRef);

        onValue(chatRef, (chatSnapShots) => {
          chatsFoundCount++;
          let data = chatSnapShots.val();

          if (data) {
            data.key = chatSnapShots.key;
            chatsData[chatSnapShots.key] = data;
          }

          console.log(data);

          if (chatsFoundCount >= chatsIds.length) {
            dispatch(setChatsData({ chatsData }));
            setIsLoading(false);
          }
        });

        if (chatsFoundCount == 0) {
          setIsLoading(false);
        }
      }
    });

    return () => {
      refs.forEach((ref) => {
        off(ref);
      });
    };
  }, []);

  if (isLoading) {
    return (
      <View style={commonStyle.center}>
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }
  return <StackNavigator />;
};

export default MainNavigator;

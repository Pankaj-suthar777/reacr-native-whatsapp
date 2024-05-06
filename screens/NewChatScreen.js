import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import PageContainer from "../components/PageContainer";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../constants/colors";
import { commonStyle } from "../constants/commonStyle";
import { searchUser } from "../utils/actions/userActions";
import DataItem from "../components/DataItem,";
import { useDispatch, useSelector } from "react-redux";
import { setStoredUsers } from "../store/userSlice";
const NewChatScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [noResultFound, setNoResultFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Close" onPress={() => props.navigation.goBack()} />
          </HeaderButtons>
        );
      },
      headerTitle: "New chat",
    });
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchTerm || searchTerm === "") {
        setUsers();
        setNoResultFound(false);
        return;
      }
      setIsLoading(true);
      const userResult = await searchUser(searchTerm);
      delete userResult[userData.userId];
      setUsers(userResult);

      if (Object.keys(userResult).length === 0) {
        setNoResultFound(true);
      } else {
        setNoResultFound(false);
        dispatch(setStoredUsers({ newUsers: userResult }));
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const userPressed = (userId) => {
    props.navigation.navigate("ChatList", {
      selectedUserId: userId,
    });
  };
  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={15} color={colors.lightgray} />
        <TextInput
          placeholder="Search"
          style={styles.searchBox}
          onChangeText={(text) => {
            setSearchTerm(text);
          }}
        />
      </View>
      {isLoading && (
        <View style={commonStyle.center}>
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      )}

      {!isLoading && !noResultFound && users && (
        <FlatList
          data={Object.keys(users)}
          renderItem={(itemData) => {
            const userId = itemData.item;
            const userData = users[userId];
            return (
              <DataItem
                title={`${userData.firstName} ${userData.lastName}`}
                subTitle={userData?.about}
                image={userData.profilePicture}
                onPress={() => userPressed(userId)}
              />
            );
          }}
        />
      )}

      {!isLoading && noResultFound && (
        <View style={commonStyle.center}>
          <FontAwesome
            name="question"
            size={55}
            color={colors.lightgray}
            style={styles.noResultIcon}
          />
          <Text style={styles.noResultText}>No uesrs found!</Text>
        </View>
      )}
      {!isLoading && !users && (
        <View style={commonStyle.center}>
          <FontAwesome
            name="users"
            size={55}
            color={colors.lightgray}
            style={styles.noResultIcon}
          />
          <Text style={styles.noResultText}>
            Enter a name to search for a user!
          </Text>
        </View>
      )}
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.extraLightGray,
    height: 30,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 15,
    width: "100%",
  },
  noResultIcon: {
    marginBottom: 20,
  },
  noResultText: {
    color: colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});
export default NewChatScreen;

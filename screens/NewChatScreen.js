import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import ProfileImage from "../components/ProfileImage";
const NewChatScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [noResultFound, setNoResultFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const storedUsers = useSelector((state) => state.users.storedUsers);

  const selectedUsersFlatList = useRef();

  const isGroupChat = props.route.params && props.route.params.isGroupChat;
  const isGroupChatDisabled = selectedUsers.length === 0 || chatName === "";

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Close" onPress={() => props.navigation.goBack()} />
          </HeaderButtons>
        );
      },
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            {isGroupChat && (
              <Item
                title="Create"
                onPress={() => {
                  props.navigation.navigate("ChatList", {
                    selectedUsers,
                    chatName,
                  });
                }}
                disabled={isGroupChatDisabled}
                color={isGroupChatDisabled ? colors.lightgray : undefined}
              />
            )}
          </HeaderButtons>
        );
      },
      headerTitle: isGroupChat ? "Add Participants" : "New chat",
    });
  }, [chatName]);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchTerm || searchTerm === "") {
        setUsers();
        setNoResultFound(false);
        return;
      }
      setIsLoading(true);
      const usersResult = await searchUser(searchTerm);
      delete usersResult[userData.userId];
      setUsers(usersResult);
      if (Object.keys(usersResult).length === 0) {
        setNoResultFound(true);
      } else {
        setNoResultFound(false);
        dispatch(setStoredUsers({ newUsers: usersResult }));
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, selectedUsers]);

  const userPressed = (userId) => {
    if (isGroupChat) {
      const newSelectedUsers = selectedUsers.includes(userId)
        ? selectedUsers.filter((id) => id !== userId)
        : selectedUsers.concat(userId);
      // concat will create new array can't use push because we can't modifie state
      setSelectedUsers(newSelectedUsers);
    } else {
      props.navigation.navigate("ChatList", {
        selectedUsersId: userId,
      });
    }
  };
  return (
    <PageContainer>
      {isGroupChat && (
        <>
          <View style={styles.chatNameContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textBox}
                placeholder="Enter a name for your chat"
                onChangeText={(text) => setChatName(text)}
              />
            </View>
          </View>
          <View style={styles.selectedUsersContainer}>
            <FlatList
              ref={(ref) => (selectedUsersFlatList.current = ref)}
              onContentSizeChange={() =>
                selectedUsersFlatList.current.scrollToEnd()
              }
              style={styles.selectedUsersList}
              data={selectedUsers}
              horizontal={true}
              contentContainerStyle={{ alignItems: "center", height: 50 }}
              keyExtractor={(item) => item}
              renderItem={(itemData) => {
                const userId = itemData.item;
                const userData = storedUsers[userId];
                return (
                  <ProfileImage
                    style={styles.selectedUsersStyle}
                    size={40}
                    uri={userData.profilePicture}
                    onPress={() => {
                      userPressed(userId);
                    }}
                    showRemoveButton={true}
                  />
                );
              }}
            />
          </View>
        </>
      )}
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
                type={isGroupChat ? "checkbox" : ""}
                isChecked={selectedUsers.includes(userId)}
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
  chatNameContainer: {
    paddingVertical: 10,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: colors.nearlyWhite,
    flexDirection: "row",
    borderRadius: 2,
  },
  textBox: {
    color: colors.textColor,
    width: "100%",
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  selectedUsersContainer: {
    height: 50,
    justifyContent: "center",
  },
  selectedUsersList: {
    height: "100%",
    paddingTop: 10,
  },
  selectedUsersStyle: {
    marginRight: 10,
    marginBottom: 10,
  },
});
export default NewChatScreen;

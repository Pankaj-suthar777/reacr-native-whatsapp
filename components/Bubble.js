import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef } from "react";
import colors from "../constants/colors";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import uuid from "react-native-uuid";
import * as Clipboard from "expo-clipboard";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { starMessage } from "../utils/actions/chatActions";
import { useSelector } from "react-redux";
const MenuItem = (props) => {
  const Icon = props.iconPack ?? Feather;
  return (
    <MenuOption onSelect={props.onSelect}>
      <View style={styles.menuItemContainer}>
        <Text style={styles.menuText}>{props.text}</Text>
        <Icon name={props.icon} size={18} />
      </View>
    </MenuOption>
  );
};

function formatAmPm(dateString) {
  let date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return (strTime = hours + ":" + minutes + " " + ampm);
}

const Bubble = (props) => {
  const {
    text,
    type,
    messageId,
    chatId,
    userId,
    date,
    setReplyingTo,
    replyingTo,
    name,
  } = props;

  const storedUsers = useSelector((state) => state.users.storedUsers);

  const starredMessages = useSelector(
    (state) => state.messages.starredMessages[chatId] ?? {}
  );

  const bubbleStyle = { ...styles.container };
  const textStyle = { ...styles.text };
  const wrapperStyle = { ...styles.wrapperStyle };

  const menuRef = useRef(null);
  const id = useRef(uuid.v4());

  let Container = View;

  let isUserMessage = false;

  const dateString = date && formatAmPm(date);

  switch (type) {
    case "system":
      textStyle.color = "#65644A";
      bubbleStyle.backgroundColor = colors.beige;
      bubbleStyle.alignItems = "center";
      bubbleStyle.marginTop = 10;
      break;
    case "error":
      bubbleStyle.backgroundColor = colors.red;
      textStyle.color = "#fff";
      bubbleStyle.marginTop = 10;
      break;
    case "myMessage":
      wrapperStyle.justifyContent = "flex-end";
      bubbleStyle.backgroundColor = "#E7FED6";
      bubbleStyle.maxWidth = "90%";
      Container = TouchableWithoutFeedback;
      isUserMessage = true;
      break;
    case "theirMessage":
      wrapperStyle.justifyContent = "flex-start";
      bubbleStyle.maxWidth = "90%";
      Container = TouchableWithoutFeedback;
      isUserMessage = true;
      break;
    case "replay":
      wrapperStyle.justifyContent = "flex-start";
      bubbleStyle.backgroundColor = "#F2F2F2";
      Container = TouchableWithoutFeedback;
      isUserMessage = true;
      break;
    default:
      break;
  }

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  const isStarred = isUserMessage && starredMessages[messageId] !== undefined;

  const replyingToUser = replyingTo && storedUsers[replyingTo.sentBy];

  return (
    <View style={wrapperStyle}>
      {name && <Text style={styles.name}>{name}</Text>}
      {replyingToUser && (
        <Bubble
          type="reply"
          text={replyingTo.text}
          name={`${replyingTo.firstName} ${replyingTo.lastName}`}
        />
      )}
      <Container
        onLongPress={() =>
          menuRef.current.props.ctx.menuActions.openMenu(id.current)
        }
        style={{ width: "100%" }}
      >
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>
          {dateString && (
            <View style={styles.timeContainer}>
              {isStarred && (
                <FontAwesome
                  name="star"
                  size={14}
                  color={colors.textColor}
                  style={{ marginRight: 5 }}
                />
              )}
              <Text style={styles.time}>{dateString}</Text>
            </View>
          )}
          <Menu name={id.current} ref={menuRef}>
            <MenuTrigger />

            <MenuOptions>
              <MenuItem
                text="Copy to clipboard"
                onSelect={() => copyToClipboard(text)}
                icon="copy"
              />
              <MenuItem
                text={`${isStarred ? "Unstar" : "Star"} message`}
                onSelect={() => starMessage(messageId, chatId, userId)}
                name="copy"
                iconPack={FontAwesome}
                icon={isStarred ? "star" : "star-o"}
              />

              <MenuItem
                text={"Reply"}
                name="copy"
                iconPack={Feather}
                icon={"arrow-left-circle"}
                onSelect={setReplyingTo}
              />
            </MenuOptions>
          </Menu>
        </View>
      </Container>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  wrapperStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 5,
    marginBottom: 10,
    borderColor: "#F2DACC",
    borderWidth: 1,
  },
  text: {
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  menuItemContainer: {
    flexDirection: "row",
    padding: 5,
  },
  menuText: {
    flex: 1,
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  time: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    color: colors.gray,
    fontSize: 12,
  },
  name: { fontFamily: "medium", letterSpacing: 0.3 },
});

import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { getFirebaseApp } from "../firbaseHelper";

export const createChat = async (loggedInUserId, chatData) => {
  const newChatData = {
    ...chatData,
    createdBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const newChat = await push(child(dbRef, "chats"), newChatData);

  const chatUsers = newChatData.users;
  for (let i = 0; i < chatUsers.length; i++) {
    const userId = chatUsers[i];
    await push(child(dbRef, `userChats/${userId}`), newChat.key);
  }

  return newChat.key;
};

export const sendTextMessage = async (
  chatId,
  senderId,
  messageText,
  replyingTo
) => {
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const messageRef = child(dbRef, `messages/${chatId}`);

  const messageData = {
    sentBy: senderId,
    sentAt: new Date().toISOString(),
    text: messageText,
  };
  if (replyingTo) {
    messageData.replyingTo = replyingTo;
  }
  await push(messageRef, messageData);

  const chatRef = child(dbRef, `chats/${chatId}`);
  await update(chatRef, {
    updatedAt: new Date().toISOString(),
    updatedBy: senderId,
    latestMessageText: messageText,
  });
};

export const starMessage = async (messageId, chatId, userId) => {
  // console.log(messageId, chatId, userId);
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const childRef = child(
      dbRef,
      `userStarredMessages/${userId}/${chatId}/${messageId}`
    );

    const snapshort = await get(childRef);
    if (snapshort.exists()) {
      await remove(childRef);
    } else {
      const starredMessagesData = {
        messageId,
        chatId,
        starredAt: new Date().toISOString(),
      };
      await set(childRef, starredMessagesData);
    }
  } catch (error) {
    console.log(error);
  }
};

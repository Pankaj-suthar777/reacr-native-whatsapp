import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messagesData: {},
    starredMessages: {},
  },
  reducers: {
    setChatMessages: (state, action) => {
      const existingMessages = state.messagesData;

      const { chatId, messagesData } = action.payload;

      existingMessages[chatId] = messagesData;

      state.messagesData = existingMessages;
    },

    addStarMessages: (state, action) => {
      const { starredMessageData } = action.payload;
      state.starredMessages[starredMessageData.messageId] = starredMessageData;
    },
    removeStarMessages: (state, action) => {
      const { messageId } = action.payload;
      delete state.starredMessages[messageId];
    },
    setStarMessages: (state, action) => {
      const { starredMessages } = action.payload;
      state.starredMessages = { ...starredMessages };
    },
  },
});
export const {
  setChatMessages,
  addStarMessages,
  removeStarMessages,
  setStarMessages,
} = messagesSlice.actions;
export default messagesSlice.reducer;

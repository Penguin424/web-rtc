import { createSlice } from "@reduxjs/toolkit";

import { IGlobalState } from "../reducers/@types";

const initialState: IGlobalState = {
  localStream: null,
  activeUsers: [],
  userName: "",
  callStates: "CALL_AVAILABLE",
  callingDialogVisible: false,
  callerUsername: "",
  callRejected: {
    rejected: false,
    reason: "",
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addUserName: (state, action) => {
      state.userName = action.payload;
    },
    addActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    addLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
  },
});

export const { addUserName, addActiveUsers, addLocalStream } =
  globalSlice.actions;

export default globalSlice.reducer;

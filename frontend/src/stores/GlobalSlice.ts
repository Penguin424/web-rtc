import { createSlice } from "@reduxjs/toolkit";

import { IGlobalState } from "../reducers/@types";

const initialState: IGlobalState = {
  localStream: null,
  remoteStream: null,
  activeUsers: [],
  userName: "",
  callStates: "CALL_AVAILABLE",
  callingDialogVisible: false,
  callerUsername: "",
  callRejected: {
    rejected: false,
    reason: "",
  },
  connectedUserSocketId: "",
  peerConnection: null,
  configuration: {
    iceServers: [{ urls: "stun:stun.l.google.com:13902" }],
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
    addRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    addCallState: (state, action) => {
      state.callStates = action.payload;
    },
    addCallingDialogVisible: (state, action) => {
      state.callingDialogVisible = action.payload;
    },
    addCallerUsername: (state, action) => {
      state.callerUsername = action.payload;
    },
    addCallRejected: (state, action) => {
      state.callRejected = action.payload;
    },
    addConnectedUserSocketId: (state, action) => {
      sessionStorage.setItem("socketid", action.payload);

      state.connectedUserSocketId = action.payload;
    },
    addPeerConnection: (state, action) => {
      state.peerConnection = action.payload;
    },
  },
});

export const {
  addUserName,
  addActiveUsers,
  addLocalStream,
  addRemoteStream,
  addCallState,
  addCallingDialogVisible,
  addCallerUsername,
  addCallRejected,
  addConnectedUserSocketId,
  addPeerConnection,
} = globalSlice.actions;

export default globalSlice.reducer;

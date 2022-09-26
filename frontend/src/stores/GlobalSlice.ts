import { createSlice } from "@reduxjs/toolkit";

import { IGlobalState } from "../reducers/@types";

const initialState: IGlobalState = {
  localStream: null,
  remoteStream: null,
  screenStream: null,
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
  enableVideo: true,
  enableAudio: true,
  isSharingScreen: false,
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
    addEnableVideo: (state, action) => {
      state.enableVideo = action.payload;
    },
    addEnableAudio: (state, action) => {
      state.enableAudio = action.payload;
    },
    addIsSharingScreen: (state, action) => {
      state.isSharingScreen = action.payload;
    },
    addScreenStream: (state, action) => {
      state.screenStream = action.payload;
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
  addEnableVideo,
  addEnableAudio,
  addIsSharingScreen,
  addScreenStream,
} = globalSlice.actions;

export default globalSlice.reducer;

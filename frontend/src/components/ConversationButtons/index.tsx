import React, { useContext } from "react";
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdVideoLabel,
  MdVideoCall,
  //   MdCamera,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GlobalProviderContext } from "../../providers/GlobalProvider";
import { IGlobalState } from "../../reducers/@types";
import {
  addCallingDialogVisible,
  addCallState,
  addConnectedUserSocketId,
  addEnableAudio,
  addEnableVideo,
  addIsSharingScreen,
  addLocalStream,
  addPeerConnection,
  addRemoteStream,
  addScreenStream,
} from "../../stores/GlobalSlice";
import ConversationButton from "./ConversationButton";

const ConversationButtons = () => {
  const { socketIo } = useContext(GlobalProviderContext);
  const globalState: IGlobalState = useSelector((state: any) => state.global);
  const dispatch = useDispatch();

  const handleClickVideoButton = async () => {
    if (globalState.localStream) {
      globalState.localStream.getVideoTracks()[0].enabled =
        !globalState.enableVideo;

      dispatch(addEnableVideo(!globalState.enableVideo));
    }
  };

  const handleClickAudioButton = async () => {
    if (globalState.localStream) {
      globalState.localStream.getAudioTracks()[0].enabled =
        !globalState.enableAudio;

      dispatch(addEnableAudio(!globalState.enableAudio));
    }
  };

  const handleClickSharingScreenButton = async () => {
    if (
      !globalState.isSharingScreen &&
      globalState.peerConnection &&
      globalState.localStream
    ) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

        console.log("globalState.screenStream", globalState.screenStream);

        const senders = globalState.peerConnection.getSenders();
        const sender = senders.find((sender) => {
          return sender.track!.kind === screenStream.getVideoTracks()[0].kind;
        });

        sender!.replaceTrack(screenStream.getVideoTracks()[0]);

        dispatch(addScreenStream(screenStream));
        dispatch(addIsSharingScreen(true));
      } catch (error) {}
    } else {
      if (
        globalState.screenStream &&
        globalState.peerConnection &&
        globalState.localStream
      ) {
        const localStream = globalState.localStream;
        const senders = globalState.peerConnection.getSenders();
        const sender = senders.find((sender) => {
          return (
            sender.track!.kind ===
            globalState.localStream?.getVideoTracks()[0].kind
          );
        });
        sender?.replaceTrack(localStream.getVideoTracks()[0]);
        dispatch(addIsSharingScreen(false));

        globalState.screenStream.getTracks().forEach((track) => track.stop());
        dispatch(addScreenStream(null));
      }
    }
  };

  const handleEndCall = () => {
    socketIo?.emit("user-hanged-up", {
      socket: globalState.connectedUserSocketId,
    });

    resetCallDataAfterCallEnd();
  };

  const resetCallDataAfterCallEnd = () => {
    globalState.peerConnection?.close();

    if (globalState.isSharingScreen) {
      globalState.screenStream?.getTracks().forEach((track) => track.stop());
    }

    dispatch(addEnableAudio(true));
    dispatch(addEnableVideo(true));
    dispatch(addIsSharingScreen(false));
    dispatch(addScreenStream(null));
    dispatch(addRemoteStream(null));
    dispatch(addPeerConnection(null));

    resetCallData();
  };

  const resetCallData = () => {
    dispatch(addCallState("CALL_AVAILABLE"));
    dispatch(addCallingDialogVisible(false));
    dispatch(addConnectedUserSocketId(""));
  };

  const styles: React.CSSProperties | undefined = {
    width: "25px",
    height: "25px",
    fill: "#e6e5e8",
  };

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        bottom: "22%",
        left: "35%",
      }}
    >
      <ConversationButton handleClick={handleClickAudioButton}>
        {globalState.enableAudio ? (
          <MdMic style={styles} />
        ) : (
          <MdMicOff style={styles} />
        )}
      </ConversationButton>
      <ConversationButton
        handleClick={async () => {
          handleEndCall();
        }}
      >
        <MdCallEnd style={styles} />
      </ConversationButton>
      <ConversationButton handleClick={handleClickVideoButton}>
        {globalState.enableVideo ? (
          <MdVideocam style={styles} />
        ) : (
          <MdVideocamOff style={styles} />
        )}
      </ConversationButton>
      <ConversationButton handleClick={handleClickSharingScreenButton}>
        {globalState.isSharingScreen ? (
          <MdVideoLabel style={styles} />
        ) : (
          <MdVideoCall style={styles} />
        )}
      </ConversationButton>
    </div>
  );
};

export default ConversationButtons;

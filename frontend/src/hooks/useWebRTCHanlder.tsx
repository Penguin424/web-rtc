import {
  IActiveUSers,
  IGlobalState,
  preOfferAnswers,
} from "../reducers/@types";
import { IPreAnswerDataOn, IPreOfferDataOn } from "../@types";
import { Dispatch, useContext, useEffect } from "react";
import { GlobalProviderContext } from "../providers/GlobalProvider";

import {
  addCallerUsername,
  addCallingDialogVisible,
  addCallRejected,
  addCallState,
  addConnectedUserSocketId,
  addPeerConnection,
} from "../stores/GlobalSlice";
import { AnyAction } from "redux";

interface IPropsUseWebRTCHandler {
  globalState: IGlobalState;
  dispatch: Dispatch<AnyAction>;
}

const useWebRTCHandler = ({
  globalState,
  dispatch,
}: IPropsUseWebRTCHandler) => {
  const { socketIo } = useContext(GlobalProviderContext);

  // const globalState: IGlobalState = useSelector((state: any) => state.global);

  // let connectedUserSocketId: string;

  const getLocalStream = async (): Promise<MediaStream | undefined> => {
    try {
      const stream = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      return stream;
    } catch (error) {
      return undefined;
    }
  };

  const createPeerConnection = () => {
    dispatch(
      addPeerConnection(new RTCPeerConnection(globalState.configuration))
    );

    const localStream = globalState.localStream;

    if (localStream) {
      for (const track of localStream?.getTracks()) {
        globalState.peerConnection?.addTrack(track, localStream);
      }
    }

    if (globalState.peerConnection) {
      globalState.peerConnection.ontrack = ({ streams: [stream] }) => {};

      globalState.peerConnection.onicecandidate = (event) => {
        console.log("onicecandidate", event);

        if (event.candidate) {
          const data = {
            candidate: event.candidate,
            socket: globalState.connectedUserSocketId,
          };

          socketIo?.emit("webRTC-candidate", data);
        }
      };
    }
  };

  const callToOtherUser = (caleeDetails: IActiveUSers) => {
    if (socketIo) {
      // dispatch({
      //   type: "CALL.SET_CALL_STATE",
      //   payload: "CALL_IN_PROGRESS",
      // });

      // dispatch({
      //   type: "CALL.SET_DIALOG_VISIBLE",
      //   payload: true,
      // });

      dispatch(addCallState("CALL_IN_PROGRESS"));
      dispatch(addCallingDialogVisible(true));

      let dataPreOffer = {
        calee: caleeDetails,
        caller: {
          username: globalState.userName,
        },
      };

      socketIo.emit("pre-offer", dataPreOffer);
    }
  };

  const handlePreOffer = async (
    caleeDetails: IPreOfferDataOn
    // dispatch: React.Dispatch<ActonType>
  ) => {
    dispatch(addCallerUsername(caleeDetails.callerUsername));

    if (checkIfCallIsPossible()) {
      console.log("call is possible", caleeDetails);

      dispatch(addConnectedUserSocketId(caleeDetails.callerSocket));

      // dispatch!({
      //   type: "CALL.SET_CALLER_USERNAME",
      //   payload: caleeDetails.callerUsername,
      // });

      // dispatch!({
      //   type: "CALL.SET_CALL_STATE",
      //   payload: "CALL_REQUESTED",
      // });

      dispatch(addCallerUsername(caleeDetails.callerUsername));
      dispatch(addCallState("CALL_REQUESTED"));
    } else {
      socketIo?.emit("pre-offer-answer", {
        callerSocket: caleeDetails.callerSocket,
        answer: preOfferAnswers.CALL_NOT_AVAILABLE,
      });
    }
  };

  const acceptIncomingCallRequest = (connectedUserSocketId: string) => {
    console.log("accept button pressed", connectedUserSocketId);

    socketIo?.emit("pre-offer-answer", {
      callerSocket: connectedUserSocketId,
      answer: preOfferAnswers.CALL_ACCEPTED,
    });
  };

  const rejectIncomingCallRequest = (connectedUserSocketId: string) => {
    console.log("rejectIncomingCallRequest", connectedUserSocketId);

    socketIo?.emit("pre-offer-answer", {
      callerSocket: connectedUserSocketId,
      answer: preOfferAnswers.CALL_REJECTED,
    });

    resetCallData();
  };

  const checkIfCallIsPossible = () => {
    // dispatch!({
    //   type: "DASHBOARD.SET_USERNAME",
    //   payload: globalstate?.userName,
    // });

    if (
      globalState.localStream === null ||
      globalState.callStates !== "CALL_AVAILABLE"
    ) {
      return false;
    } else {
      return true;
    }
  };

  const resetCallData = () => {
    // dispatch!({
    //   type: "CALL.SET_CALL_STATE",
    //   payload: "CALL_AVAILABLE",
    // });

    // dispatch!({
    //   type: "CALL.SET_DIALOG_VISIBLE",
    //   payload: false,
    // });

    dispatch(addCallState("CALL_AVAILABLE"));
    dispatch(addCallingDialogVisible(false));
    dispatch(addConnectedUserSocketId(""));
  };

  const handlePreOfferAnswer = (data: { socket: string; answer: string }) => {
    if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
      sendOffer(data);
    } else {
      let rejectionReason = "";

      if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
        rejectionReason = "User is not available for call";
      } else {
        rejectionReason = "User rejected your call";
      }

      // dispatch!({
      //   type: "CALL.SET_CALL_REJECTED",
      //   payload: {
      //     rejected: true,
      //     reason: rejectionReason,
      //   },
      // });

      dispatch(addCallRejected({ rejected: true, reason: rejectionReason }));

      resetCallData();
    }
  };

  const sendOffer = async (data: { socket: string; answer: string }) => {
    const offer = await globalState.peerConnection?.createOffer();
    await globalState.peerConnection?.setLocalDescription(offer);

    console.log("asdasdg", data);

    socketIo?.emit("webRTC-offer", {
      calleeSocket: data.socket,
      offer,
    });
  };

  const handleOffer = async (data: IPreOfferDataOn) => {
    await globalState.peerConnection?.setRemoteDescription(data.offer);
    const answer = await globalState.peerConnection?.createAnswer();
    await globalState.peerConnection?.setLocalDescription(answer);

    console.log("handleOffer", data.callerSocket);

    socketIo?.emit("webRTC-answer", {
      calleeSocket: data.callerSocket,
      answer,
    });
  };

  const handleAnswer = async (data: IPreAnswerDataOn) => {
    await globalState.peerConnection?.setRemoteDescription(data.answer);

    console.log("handleAnswer", globalState);
  };

  return {
    getLocalStream,
    callToOtherUser,
    handlePreOffer,
    acceptIncomingCallRequest,
    rejectIncomingCallRequest,
    handlePreOfferAnswer,
    createPeerConnection,
    handleOffer,
    handleAnswer,
  };
};

export default useWebRTCHandler;

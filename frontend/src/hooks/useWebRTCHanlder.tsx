import { Socket } from "socket.io-client";
import { ActonType } from "../reducers/GlobalReducer";
import { IActiveUSers, preOfferAnswers } from "../reducers/@types";
import { IPreOfferDataOn } from "../@types";
import { useContext, useEffect } from "react";
import { GlobalProviderContext } from "../providers/GlobalProvider";

const useWebRTCHandler = () => {
  const { socketIo, globalstate, dispatch } = useContext(GlobalProviderContext);

  useEffect(() => {}, [globalstate]);

  let connectedUserSocketId: string;

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

  const callToOtherUser = (
    caleeDetails: IActiveUSers
    // dispatch: React.Dispatch<ActonType>,
    // socket: Socket,
    // username: string
  ) => {
    if (socketIo && dispatch && globalstate) {
      dispatch({
        type: "CALL.SET_CALL_STATE",
        payload: "CALL_IN_PROGRESS",
      });

      dispatch({
        type: "CALL.SET_DIALOG_VISIBLE",
        payload: true,
      });

      let dataPreOffer = {
        calee: caleeDetails,
        caller: {
          username: globalstate.userName,
        },
      };

      socketIo.emit("pre-offer", dataPreOffer);
    }
  };

  const handlePreOffer = async (
    caleeDetails: IPreOfferDataOn
    // dispatch: React.Dispatch<ActonType>
  ) => {
    if (dispatch) {
      dispatch!({
        type: "CALL.SET_CALLER_USERNAME",
        payload: caleeDetails.callerUsername,
      });
    }

    if (checkIfCallIsPossible()) {
      connectedUserSocketId = caleeDetails.callerSocket;

      dispatch!({
        type: "CALL.SET_CALLER_USERNAME",
        payload: caleeDetails.callerUsername,
      });

      dispatch!({
        type: "CALL.SET_CALL_STATE",
        payload: "CALL_REQUESTED",
      });
    } else {
      socketIo?.emit("pre-offer-answer", {
        callerSocket: caleeDetails.callerSocket,
        answer: preOfferAnswers.CALL_NOT_AVAILABLE,
      });
    }
  };

  const acceptIncomingCallRequest = () => {
    socketIo?.emit("pre-offer-answer", {
      callerSocket: connectedUserSocketId,
      answer: preOfferAnswers.CALL_ACCEPTED,
    });
  };

  const rejectIncomingCallRequest = () => {
    socketIo?.emit("pre-offer-answer", {
      callerSocket: connectedUserSocketId,
      answer: preOfferAnswers.CALL_REJECTED,
    });

    resetCallData();
  };

  const checkIfCallIsPossible = () => {
    dispatch!({
      type: "DASHBOARD.SET_USERNAME",
      payload: globalstate?.userName,
    });

    if (
      globalstate!.localStream === null ||
      globalstate!.callStates !== "CALL_AVAILABLE"
    ) {
      return false;
    } else {
      return true;
    }
  };

  const resetCallData = () => {
    connectedUserSocketId = "";

    dispatch!({
      type: "CALL.SET_CALL_STATE",
      payload: "CALL_AVAILABLE",
    });

    dispatch!({
      type: "CALL.SET_DIALOG_VISIBLE",
      payload: false,
    });
  };

  const handlePreOfferAnswer = (data: { answer: string }) => {
    if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    } else {
      let rejectionReason = "";

      if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
        rejectionReason = "User is not available for call";
      } else {
        rejectionReason = "User rejected your call";
      }

      dispatch!({
        type: "CALL.SET_CALL_REJECTED",
        payload: {
          rejected: true,
          reason: rejectionReason,
        },
      });

      resetCallData();
    }
  };

  return {
    getLocalStream,
    callToOtherUser,
    handlePreOffer,
    acceptIncomingCallRequest,
    rejectIncomingCallRequest,
    handlePreOfferAnswer,
  };
};

export default useWebRTCHandler;

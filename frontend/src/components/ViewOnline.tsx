/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IPreAnswerDataOn,
  IPreCandidateDataOn,
  IPreOfferDataOn,
} from "../@types";

import {
  brodcastEvents,
  GlobalProviderContext,
} from "../providers/GlobalProvider";
import { IGlobalState, preOfferAnswers } from "../reducers/@types";
import {
  addActiveUsers,
  addCallerUsername,
  addCallingDialogVisible,
  addCallRejected,
  addCallState,
  addConnectedUserSocketId,
} from "../stores/GlobalSlice";

interface IDataBoradcast {
  event: string;
  data: any;
}

const ViewOnline = () => {
  const dispatch = useDispatch();
  const { socketIo, online } = useContext(GlobalProviderContext);
  const globalState: IGlobalState = useSelector((state: any) => state.global);

  useEffect(() => {
    socketIo?.on("broadcast", (data: IDataBoradcast) => {
      switch (data.event) {
        case brodcastEvents.ACTIVE_USERS:
          dispatch(addActiveUsers(data.data));
          break;

        default:
          break;
      }
    });

    socketIo?.on("pre-offer", (data: IPreOfferDataOn) => {
      console.log("pre-offer", globalState);

      dispatch(addCallerUsername(data.callerUsername));

      if (checkIfCallIsPossible()) {
        console.log("call is possible", data);

        dispatch(addConnectedUserSocketId(data.callerSocket));

        dispatch(addCallerUsername(data.callerUsername));
        dispatch(addCallState("CALL_REQUESTED"));
      } else {
        socketIo?.emit("pre-offer-answer", {
          callerSocket: globalState.connectedUserSocketId,
          answer: preOfferAnswers.CALL_NOT_AVAILABLE,
        });
      }
    });

    socketIo?.on(
      "pre-offer-answer",
      (data: { socket: string; answer: string }) => {
        dispatch(addCallingDialogVisible(false));

        if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
          sendOffer(data);
        } else {
          let rejectionReason = "";

          if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
            rejectionReason = "User is not available for call";
          } else {
            rejectionReason = "User rejected your call";
          }

          dispatch(
            addCallRejected({ rejected: true, reason: rejectionReason })
          );

          resetCallData();
        }
      }
    );

    socketIo?.on("webRTC-offer", async (data: IPreOfferDataOn) => {
      console.log("webRTC-offer", data);

      // handleOffer(data);

      await globalState.peerConnection?.setRemoteDescription(data.offer);
      const answer = await globalState.peerConnection?.createAnswer();
      await globalState.peerConnection?.setLocalDescription(answer);

      console.log("handleOffer", data.callerSocket);

      socketIo?.emit("webRTC-answer", {
        calleeSocket: globalState.connectedUserSocketId,
        answer,
      });
    });

    socketIo?.on("webRTC-answer", async (data: IPreAnswerDataOn) => {
      console.log("webRTC-answer", data);

      // handleAnswer(data);

      await globalState.peerConnection?.setRemoteDescription(data.answer);

      console.log("handleAnswer", globalState);
    });

    socketIo?.on("webRTC-candidate", async (data: IPreCandidateDataOn) => {
      try {
        await globalState.peerConnection?.addIceCandidate(data.candidate);

        console.log("adding Ice candidate", globalState);
      } catch (error) {
        console.error("Error adding received ice candidate", error);
      }
    });

    socketIo?.on("user-hanged-up", () => {});

    return () => {
      socketIo?.off("broadcast");
      socketIo?.off("pre-offer");
      socketIo?.off("pre-offer-answer");
      socketIo?.off("webRTC-offer");
      socketIo?.off("webRTC-answer");
      socketIo?.off("webRTC-candidate");
      socketIo?.off("user-hanged-up");
    };
  }, [globalState, socketIo, dispatch]);

  const resetCallData = () => {
    dispatch(addCallState("CALL_AVAILABLE"));
    dispatch(addCallingDialogVisible(false));
    dispatch(addConnectedUserSocketId(""));
  };

  const checkIfCallIsPossible = () => {
    if (
      globalState.localStream === null ||
      globalState.callStates !== "CALL_AVAILABLE"
    ) {
      return false;
    } else {
      return true;
    }
  };

  const sendOffer = async (data: { socket: string; answer: string }) => {
    const offer = await globalState.peerConnection?.createOffer();
    await globalState.peerConnection?.setLocalDescription(offer);

    console.log("asdasdg", data);

    socketIo?.emit("webRTC-offer", {
      calleeSocket: globalState.connectedUserSocketId,
      offer,
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <h1>{online ? socketIo?.id : "Offline"}</h1>
    </div>
  );
};

export default ViewOnline;

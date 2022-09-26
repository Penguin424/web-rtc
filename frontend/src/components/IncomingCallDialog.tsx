import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalProviderContext } from "../providers/GlobalProvider";
import { IGlobalState, preOfferAnswers } from "../reducers/@types";
import {
  addCallingDialogVisible,
  addCallState,
  addConnectedUserSocketId,
} from "../stores/GlobalSlice";

interface IPropsIncomingCallDialog {
  callerUsername: string;
}

const IncomingCallDialog = ({ callerUsername }: IPropsIncomingCallDialog) => {
  const { socketIo } = useContext(GlobalProviderContext);
  const dispatch = useDispatch();
  const globalState: IGlobalState = useSelector((state: any) => state.global);

  const handleAcceptButtonPress = () => {
    socketIo?.emit("pre-offer-answer", {
      callerSocket: globalState.connectedUserSocketId,
      answer: preOfferAnswers.CALL_ACCEPTED,
    });

    dispatch(addCallState("CALL_IN_PROGRESS"));
  };

  const handleRejectButtonPress = () => {
    socketIo?.emit("pre-offer-answer", {
      callerSocket: globalState.connectedUserSocketId,
      answer: preOfferAnswers.CALL_REJECTED,
    });

    resetCallData();
  };

  const resetCallData = () => {
    dispatch(addCallState("CALL_AVAILABLE"));
    dispatch(addCallingDialogVisible(false));
    dispatch(addConnectedUserSocketId(""));
  };

  return (
    <div className="direct_call_dialog background_secondary_color">
      <span className="direct_call_dialog_caller_name">{callerUsername}</span>

      <div className="direct_call_dialog_button_container">
        <button
          onClick={handleAcceptButtonPress}
          className="direct_call_dialog_accept_button"
        >
          Accept
        </button>
        <button
          onClick={handleRejectButtonPress}
          className="direct_call_dialog_reject_button"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default IncomingCallDialog;

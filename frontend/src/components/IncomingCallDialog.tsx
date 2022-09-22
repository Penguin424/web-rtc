import useWebRTCHandler from "../hooks/useWebRTCHanlder";

interface IPropsIncomingCallDialog {
  callerUsername: string;
}

const IncomingCallDialog = ({ callerUsername }: IPropsIncomingCallDialog) => {
  const { rejectIncomingCallRequest } = useWebRTCHandler();

  const handleAcceptButtonPress = () => {};

  const handleRejectButtonPress = () => {
    rejectIncomingCallRequest();
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

import { useSelector } from "react-redux";

import { IGlobalState } from "../reducers/@types";
import CallingDialogComponent from "./CallingDialogComponent";
import CallRejectedDialog from "./CallRejectedDialog";
import IncomingCallDialog from "./IncomingCallDialog";
import LocalVideoViewComponent from "./LocalVideoViewComponent";
import RemoteVideoViewComponent from "./RemoteVideoViewComponent";

const DirectCall = () => {
  const globalState: IGlobalState = useSelector((state: any) => state.global);

  return (
    <>
      <LocalVideoViewComponent />
      {globalState.remoteStream && (
        <RemoteVideoViewComponent remoteStream={globalState.remoteStream} />
      )}
      {globalState?.callRejected.rejected && <CallRejectedDialog />}
      {globalState?.callStates === "CALL_REQUESTED" && (
        <IncomingCallDialog callerUsername={globalState?.callerUsername} />
      )}
      {globalState?.callingDialogVisible && <CallingDialogComponent />}
    </>
  );
};

export default DirectCall;

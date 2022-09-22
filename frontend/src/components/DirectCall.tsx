import React, { useContext } from "react";
import { GlobalProviderContext } from "../providers/GlobalProvider";
import CallingDialogComponent from "./CallingDialogComponent";
import CallRejectedDialog from "./CallRejectedDialog";
import IncomingCallDialog from "./IncomingCallDialog";
import LocalVideoViewComponent from "./LocalVideoViewComponent";
import RemoteVideoViewComponent from "./RemoteVideoViewComponent";

interface IPropsDirectCall {
  remoteStream?: MediaStream;
}

const DirectCall = ({ remoteStream }: IPropsDirectCall) => {
  const { globalstate } = useContext(GlobalProviderContext);

  return (
    <>
      <LocalVideoViewComponent />
      {remoteStream && <RemoteVideoViewComponent remoteStream={remoteStream} />}
      {globalstate?.callRejected.rejected && <CallRejectedDialog />}
      {globalstate?.callStates === "CALL_REQUESTED" && (
        <IncomingCallDialog callerUsername={globalstate?.callerUsername} />
      )}
      {globalstate?.callingDialogVisible && <CallingDialogComponent />}
    </>
  );
};

export default DirectCall;

export interface IActiveUSers {
  socket: string;
  username: string;
}

export interface IGlobalState {
  userName: string;
  activeUsers: IActiveUSers[];
  localStream: MediaStream | null;
  callStates:
    | "CALL_UNAVAILABLE"
    | "CALL_AVAILABLE"
    | "CALL_REQUESTED"
    | "CALL_IN_PROGRESS";
  callingDialogVisible: boolean;
  callerUsername: string;
  callRejected: {
    rejected: boolean;
    reason: string;
  };
}

export const preOfferAnswers = {
  CALL_NOT_AVAILABLE: "CALL_NOT_AVAILABLE",
  CALL_ACCEPTED: "CALL_ACCEPTED",
  CALL_REJECTED: "CALL_REJECTED",
};

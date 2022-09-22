export interface IPeerNewUser {
  username: string;
  socket: string;
}

export const brodcastEvents = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

export interface IPreofferData {
  calee: IPeerNewUser;
  caller: {
    username: string;
  };
}

export interface IPreofferAnswerData {
  callerSocket: string;
  answer: string;
}

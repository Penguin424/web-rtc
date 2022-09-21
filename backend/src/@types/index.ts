export interface IPeerNewUser {
  username: string;
  socket: string;
}

export const brodcastEvents = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

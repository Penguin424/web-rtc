export interface IActiveUSers {
  socket: string;
  username: string;
}

export interface IGlobalState {
  userName: string;
  activeUsers: IActiveUSers[];
  localStream: MediaStream | null;
}

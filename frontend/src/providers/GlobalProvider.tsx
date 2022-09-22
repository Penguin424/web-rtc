/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";
import { IGlobalState } from "../reducers/@types";
import {
  ActonType,
  GlobalReducer,
  GlobalState,
} from "../reducers/GlobalReducer";

export const brodcastEvents = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

export interface IGlobalContextData {
  online: boolean | undefined;
  socketIo: Socket | null;
  globalstate: IGlobalState | null;
  dispatch: React.Dispatch<ActonType> | null;
}

export const GlobalProviderContext = createContext<IGlobalContextData>({
  online: false,
  socketIo: null,
  dispatch: null,
  globalstate: {
    localStream: null,
    activeUsers: [],
    userName: "",
    callStates: "CALL_AVAILABLE",
    callingDialogVisible: false,
    callerUsername: "",
    callRejected: {
      rejected: false,
      reason: "",
    },
  },
});

// const endpointserver = "http://localhost:3001";
const GlobalProvider = ({ children }: any) => {
  const { socketIo, online } = useSocket("http://localhost:3001");
  const [globalstate, dispatch] = useReducer(GlobalReducer, GlobalState);

  useEffect(() => {
    console.log("GlobalProvider useEffect", globalstate);
  }, [globalstate]);

  return (
    <GlobalProviderContext.Provider
      value={{
        online,
        socketIo,
        globalstate,
        dispatch,
      }}
    >
      {children}
    </GlobalProviderContext.Provider>
  );
};

export default GlobalProvider;

/* eslint-disable react-hooks/exhaustive-deps */
import { createContext } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";

export const brodcastEvents = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

export interface IGlobalContextData {
  online: boolean | undefined;
  socketIo: Socket | null;
}

export const GlobalProviderContext = createContext<IGlobalContextData>({
  online: false,
  socketIo: null,
});

// const endpointserver = "http://localhost:3001";
const GlobalProvider = ({ children }: any) => {
  const { socketIo, online } = useSocket("localhost:3001");
  // const [globalstate, dispatch] = useReducer(GlobalReducer, GlobalState);

  // useEffect(() => {
  //   console.log("GlobalProvider useEffect", globalstate);
  // }, [globalstate]);

  return (
    <GlobalProviderContext.Provider
      value={{
        online,
        socketIo,
      }}
    >
      {children}
    </GlobalProviderContext.Provider>
  );
};

export default GlobalProvider;

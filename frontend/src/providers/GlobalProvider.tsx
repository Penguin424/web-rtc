import { createContext, useReducer } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";
import {
  ActonType,
  GlobalReducer,
  GlobalState,
} from "../reducers/GlobalReducer";

export interface IGlobalContextData {
  online: boolean | undefined;
  socketIo: Socket | null;
  globalstate: any | null;
  dispatch: React.Dispatch<ActonType> | null;
}

export const GlobalProviderContext = createContext<IGlobalContextData>({
  online: false,
  socketIo: null,
  dispatch: null,
  globalstate: {},
});

const GlobalProvider = ({ children }: any) => {
  const endpointserver = "http://localhost:3001";
  const { socketIo, online } = useSocket(endpointserver);
  const [globalstate, dispatch] = useReducer(GlobalReducer, GlobalState);

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

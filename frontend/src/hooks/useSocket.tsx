import { useMemo, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export interface IDataReturnSocket {
  socketIo: Socket;
  online?: boolean;
}

export const useSocket = (serverPath: string): IDataReturnSocket => {
  const socketIo: Socket = useMemo(() => {
    return io(serverPath, {
      transports: ["websocket"],
    });
  }, [serverPath]);
  const [online, setOnline] = useState<boolean>(false);

  useEffect(() => {
    setOnline(socketIo.connected);
    console.log(socketIo);
  }, [socketIo]);

  useEffect(() => {
    socketIo.on("connect", () => {
      setOnline(true);
    });
  }, [socketIo]);

  useEffect(() => {
    socketIo.on("disconnect", () => {
      setOnline(false);
    });
  }, [socketIo]);

  return {
    socketIo,
    online,
  };
};

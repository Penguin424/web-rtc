import { Socket } from "socket.io-client";
import { brodcastEvents } from "../providers/GlobalProvider";
import { ActonType } from "../reducers/GlobalReducer";

interface IDataBoradcast {
  event: string;
  data: any;
}

export const handleStateEventsSockets = async (
  socket: Socket,
  dispatch: React.Dispatch<ActonType>
) => {
  socket.on("broadcast", (data: IDataBoradcast) => {
    switch (data.event) {
      case brodcastEvents.ACTIVE_USERS:
        dispatch({
          type: "DASHBOARD.SET_ACTIVE_USERS",
          payload: data.data,
        });
        break;

      default:
        break;
    }
  });
};

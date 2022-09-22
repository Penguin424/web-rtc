/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IPreOfferDataOn } from "../@types";
import useWebRTCHandler from "../hooks/useWebRTCHanlder";
import {
  brodcastEvents,
  GlobalProviderContext,
} from "../providers/GlobalProvider";
import { addActiveUsers } from "../stores/GlobalSlice";

interface IDataBoradcast {
  event: string;
  data: any;
}

const ViewOnline = () => {
  const { socketIo, globalstate, online } = useContext(GlobalProviderContext);

  const dispatch = useDispatch();

  const { handlePreOffer, handlePreOfferAnswer } = useWebRTCHandler();

  useEffect(() => {
    if (socketIo) {
      socketIo.on("broadcast", (data: IDataBoradcast) => {
        switch (data.event) {
          case brodcastEvents.ACTIVE_USERS:
            dispatch(addActiveUsers(data.data));
            break;

          default:
            break;
        }
      });

      socketIo.on("pre-offer", (data: IPreOfferDataOn) => {
        console.log("pre-offer", globalstate);

        // handlePreOffer(data);
      });
      socketIo.on("pre-offer", (data: IPreOfferDataOn) => {
        console.log("pre-offer", globalstate);

        // handlePreOffer(data);
      });

      socketIo.on("pre-offer-answer", (data: { answer: string }) => {
        // handlePreOfferAnswer(data);
      });
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <h1>{online ? "Online" : "Offline"}</h1>
    </div>
  );
};

export default ViewOnline;

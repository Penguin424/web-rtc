import React, { useContext } from "react";

import { IActiveUSers, IGlobalState } from "../reducers/@types";
import { useDispatch, useSelector } from "react-redux";
import { GlobalProviderContext } from "../providers/GlobalProvider";
import {
  addCallingDialogVisible,
  addCallState,
  addConnectedUserSocketId,
} from "../stores/GlobalSlice";

interface IPropsActiveUserItemComponent {
  activeUser: IActiveUSers;
}

const ActiveUserItemComponent = ({
  activeUser,
}: IPropsActiveUserItemComponent) => {
  const { socketIo } = useContext(GlobalProviderContext);
  const dispatch = useDispatch();
  const globalState: IGlobalState = useSelector((state: any) => state.global);

  const handleListItemPressed = () => {
    // callToOtherUser(
    //   activeUser
    //   // dispatch,
    //   // socketIo,
    //   // globalstate?.userName!
    // );

    if (socketIo) {
      // dispatch({
      //   type: "CALL.SET_CALL_STATE",
      //   payload: "CALL_IN_PROGRESS",
      // });

      // dispatch({
      //   type: "CALL.SET_DIALOG_VISIBLE",
      //   payload: true,
      // });

      dispatch(addCallState("CALL_IN_PROGRESS"));
      dispatch(addCallingDialogVisible(true));
      dispatch(addConnectedUserSocketId(activeUser.socket));

      let dataPreOffer = {
        calee: activeUser,
        caller: {
          username: globalState.userName,
        },
      };

      socketIo.emit("pre-offer", dataPreOffer);
    }
  };

  return (
    <div className="active_user_list_item" onClick={handleListItemPressed}>
      <div className="active_user_list_image_container">
        <img
          className="active_user_list_image"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
          alt="user"
        />
      </div>
      <span className="active_user_list_text">{activeUser.username}</span>
    </div>
  );
};

export default ActiveUserItemComponent;

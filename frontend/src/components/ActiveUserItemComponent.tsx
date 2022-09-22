import React, { useContext } from "react";
import { GlobalProviderContext } from "../providers/GlobalProvider";
import { IActiveUSers } from "../reducers/@types";
import useWebRTCHandler from "../hooks/useWebRTCHanlder";

interface IPropsActiveUserItemComponent {
  activeUser: IActiveUSers;
}

const ActiveUserItemComponent = ({
  activeUser,
}: IPropsActiveUserItemComponent) => {
  const { socketIo, dispatch, globalstate } = useContext(GlobalProviderContext);
  const { callToOtherUser } = useWebRTCHandler();

  const handleListItemPressed = () => {
    if (dispatch && socketIo)
      callToOtherUser(
        activeUser
        // dispatch,
        // socketIo,
        // globalstate?.userName!
      );
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

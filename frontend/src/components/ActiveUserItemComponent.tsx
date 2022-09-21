import React from "react";
import { IActiveUSers } from "../reducers/@types";

interface IPropsActiveUserItemComponent {
  activeUser: IActiveUSers;
}

const ActiveUserItemComponent = ({
  activeUser,
}: IPropsActiveUserItemComponent) => {
  return (
    <div className="active_user_list_item">
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

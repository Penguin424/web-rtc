import React, { useContext } from "react";
import { GlobalProviderContext } from "../providers/GlobalProvider";
import ActiveUserItemComponent from "./ActiveUserItemComponent";

const ActiveUserListComponent = () => {
  const { globalstate, socketIo } = useContext(GlobalProviderContext);

  return (
    <div className="active_user_list_container">
      {globalstate?.activeUsers
        .filter((user) => user.socket !== socketIo?.id)
        .map((user) => {
          return (
            <ActiveUserItemComponent key={user.socket} activeUser={user} />
          );
        })}
    </div>
  );
};

export default ActiveUserListComponent;

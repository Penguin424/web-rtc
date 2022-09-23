import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { GlobalProviderContext } from "../providers/GlobalProvider";
import { IGlobalState } from "../reducers/@types";
import ActiveUserItemComponent from "./ActiveUserItemComponent";

const ActiveUserListComponent = () => {
  const { socketIo } = useContext(GlobalProviderContext);
  const globalState: IGlobalState = useSelector((state: any) => state.global);

  return (
    <div className="active_user_list_container">
      {globalState?.activeUsers
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

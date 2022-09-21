/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import logo from "../assets/images/logo.png";
import ActiveUserListComponent from "../components/ActiveUserListComponent";
import { GlobalProviderContext } from "../providers/GlobalProvider";
import WebRTCHandler from "../utils/webrtc/WebRTCHanlder";

const DashBoardPage = () => {
  const { dispatch } = useContext(GlobalProviderContext);

  useEffect(() => {
    handleInitStream();
  }, []);

  const handleInitStream = async () => {
    const stream = await WebRTCHandler.getLocalStream();

    if (dispatch)
      dispatch({
        type: "DASHBOARD.SET_LOCAL_STREAM",
        payload: stream,
      });
  };

  return (
    <div className="dashboard_container background_main_color">
      <div className="dashboard_left_section">
        <div className="dashboard_content_container">content</div>
        <div className="dashboard_rooms_container background_secondary_color">
          rooms
        </div>
      </div>
      <div className="dashboard_right_section background_secondary_color">
        <div className="dashboard_active_users_list">
          <ActiveUserListComponent />
        </div>
        <div className="dashboard_logo_container">
          <img className="dashboard_logo_image" alt="logo" src={logo} />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;

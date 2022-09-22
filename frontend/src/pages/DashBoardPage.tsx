/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import logo from "../assets/images/logo.png";
import ActiveUserListComponent from "../components/ActiveUserListComponent";
import DirectCall from "../components/DirectCall";
import useWebRTCHandler from "../hooks/useWebRTCHanlder";
import ViewOnline from "../components/ViewOnline";
import { useDispatch } from "react-redux";
import { addLocalStream } from "../stores/GlobalSlice";

const DashBoardPage = () => {
  const { getLocalStream } = useWebRTCHandler();
  const dispatch = useDispatch();

  useEffect(() => {
    handleInitStream();
  }, []);

  const handleInitStream = async () => {
    const stream = await getLocalStream();

    dispatch(addLocalStream(stream));
  };

  return (
    <>
      <ViewOnline />
      <div className="dashboard_container background_main_color">
        <div className="dashboard_left_section">
          <div className="dashboard_content_container">
            <DirectCall />
          </div>
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
    </>
  );
};

export default DashBoardPage;

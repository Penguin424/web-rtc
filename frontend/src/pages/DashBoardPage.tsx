/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import logo from "../assets/images/logo.png";
import ActiveUserListComponent from "../components/ActiveUserListComponent";
import DirectCall from "../components/DirectCall";
import ViewOnline from "../components/ViewOnline";
import { useDispatch, useSelector } from "react-redux";
import { addLocalStream, addPeerConnection } from "../stores/GlobalSlice";
import { IGlobalState } from "../reducers/@types";
import { GlobalProviderContext } from "../providers/GlobalProvider";

const DashBoardPage = () => {
  const { socketIo } = useContext(GlobalProviderContext);

  const globalState: IGlobalState = useSelector((state: any) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    handleInitStream();

    console.log("globalStatedasd", globalState);
  }, [globalState]);

  const handleInitStream = async () => {
    // const stream = await getLocalStream();

    try {
      if (globalState.localStream === null) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        dispatch(addLocalStream(stream));
        // createPeerConnection();

        dispatch(
          addPeerConnection(new RTCPeerConnection(globalState.configuration))
        );
      }

      const localStream = globalState.localStream;

      if (localStream) {
        for (const track of localStream?.getTracks()) {
          globalState.peerConnection?.addTrack(track, localStream);
        }
      }

      if (globalState.peerConnection) {
        console.log("peerConnecion", globalState.peerConnection);

        globalState.peerConnection.ontrack = ({ streams: [stream] }) => {};

        globalState.peerConnection.onicecandidate = (event) => {
          console.log("onicecandidate", globalState);

          if (event.candidate) {
            const data = {
              candidate: event.candidate,
              socket: globalState.connectedUserSocketId,
            };

            socketIo?.emit("webRTC-candidate", globalState);
          }
        };

        globalState.peerConnection.oniceconnectionstatechange = (event) => {
          if (globalState.peerConnection?.connectionState === "connected") {
            console.log("connected");
          }
        };
      }
    } catch (error) {}
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

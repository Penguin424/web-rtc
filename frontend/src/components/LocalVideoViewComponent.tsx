import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IGlobalState } from "../reducers/@types";

const LocalVideoViewComponent = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const globalState: IGlobalState = useSelector((state: any) => state.global);

  useEffect(() => {
    const localVideo = localVideoRef.current;
    if (localVideo !== null) {
      localVideo.srcObject = globalState.localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [globalState]);

  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        borderRadius: "8px",
        position: "absolute",
        top: "5%",
        right: "23%",
      }}
      className="background_secondary_color"
    >
      <video
        style={{
          width: "100%",
          height: "100%",
        }}
        muted={true}
        ref={localVideoRef}
      ></video>
    </div>
  );
};

export default LocalVideoViewComponent;

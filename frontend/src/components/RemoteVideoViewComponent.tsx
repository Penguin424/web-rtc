import { useEffect, useRef } from "react";

interface IPropsRemoteVideoViewComponent {
  remoteStream: MediaStream;
}

const RemoteVideoViewComponent = ({
  remoteStream,
}: IPropsRemoteVideoViewComponent) => {
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    alert("remoteStream changed");
    const remoteVideo = remoteVideoRef.current;
    if (remoteVideo !== null) {
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      className="background_primary_color"
    >
      <video
        style={{
          width: "100%",
          height: "100%",
        }}
        ref={remoteVideoRef}
        autoPlay
      />
    </div>
  );
};

export default RemoteVideoViewComponent;

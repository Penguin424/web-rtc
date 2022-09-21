import { useContext, useEffect, useRef } from "react";
import { GlobalProviderContext } from "../providers/GlobalProvider";

const LocalVideoViewComponent = () => {
  const { globalstate } = useContext(GlobalProviderContext);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (globalstate?.localStream) {
      const localVideo = localVideoRef.current;
      if (localVideo) {
        localVideo?.srcObject = globalstate.localStream;
      }
    }
  }, [globalstate?.localStream]);

  return (
    <div>
      <video ref={localVideoRef}></video>
    </div>
  );
};

export default LocalVideoViewComponent;

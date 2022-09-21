class WebRTCHandler {
  static getLocalStream = async (): Promise<MediaStream | undefined> => {
    try {
      const stream = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      return stream;
    } catch (error) {
      return undefined;
    }
  };
}

export default WebRTCHandler;

import { Server, Socket } from "socket.io";
import {
  brodcastEvents,
  IPeerNewUser,
  IPreofferAnswerData,
  IPreofferData,
  IWebRTCCandidateData,
  IWebRTCOfferData,
} from "../@types";

class Sockets {
  io: Server;
  peers: IPeerNewUser[] = [];

  constructor(io: Server) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket: Socket) => {
      socket.on("disconnect", () => {
        this.peers = this.peers.filter((peer) => peer.socket !== socket.id);
        this.io.emit("broadcast", {
          event: brodcastEvents.ACTIVE_USERS,
          data: this.peers,
        });
      });

      socket.on("register-new-user", (data: any) => {
        this.peers.push({
          username: data.username,
          socket: data.socketId,
        });

        this.io.emit("broadcast", {
          event: brodcastEvents.ACTIVE_USERS,
          data: this.peers,
        });
      });

      socket.on("pre-offer", (data: IPreofferData) => {
        console.log("pre-offer", data);

        this.io.to(data.calee.socket).emit("pre-offer", {
          callerUsername: data.caller.username,
          callerSocket: socket.id,
        });
      });

      socket.on("pre-offer-answer", (data: IPreofferAnswerData) => {
        this.io.to(data.callerSocket).emit("pre-offer-answer", {
          answer: data.answer,
        });
      });

      socket.on("webRTC-offer", (data: IWebRTCOfferData) => {
        console.log("webRTC-offer", data);
        this.io.to(data.calleeSocket).emit("webRTC-offer", {
          callerSocket: socket.id,
          offer: data.offer,
        });
      });

      socket.on("webRTC-answer", (data: any) => {
        console.log("webRTC-answer", data);
        this.io.to(data.calleeSocket).emit("webRTC-answer", {
          answer: data.answer,
        });
      });

      socket.on("webRTC-candidate", (data: IWebRTCCandidateData) => {
        console.log("webRTC-candidate", data);

        this.io.to(data.socket).emit("webRTC-candidate", {
          candidate: data.candidate,
        });
      });
    });
  }
}

export default Sockets;

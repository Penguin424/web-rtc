import { Server, Socket } from "socket.io";
import { brodcastEvents, IPeerNewUser } from "../@types";

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

        console.log(this.peers);
      });

      console.log("Client connected", socket.id);
    });
  }
}

export default Sockets;

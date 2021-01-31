class SocketBuilder {
  constructor({ socketUrl }) {
    this.socketUrl = socketUrl;
    this.onUserConnected = () => {};
    this.onUserDisConnected = () => {};
  };

  setOnUserConnected(fn) {
    this.onUserConnected = fn;

    return this;
  };

  setOnUserDisConnected(fn) {
    this.onUserDisConnected = fn;

    return this;
  };
  
  build() {
    const socket = io.connect(this.socketUrl, {
      withCredentials = false,
    });

    socket.on("user-connected", this.onUserConnected);
    socket.on("user-disconnected", this.onUserDisConnected);

    return socket;
  };
}
class Business {
  constructor({ room, media, view, socketBuilder }) {
    this.room = room;
    this.media = media;
    this.view = view;
    this.socketBuilder = socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .build();
    this.socketBuilder.emit("join-room", this.room, "teste01");
    this.currentStream = {};
  };
  
  static initialize(deps) {
    const instance  = new Business(deps);
    
    return instance._init();
  };

  async _init() {
    this.currentStream = await this.media.getCamera();
    
    this.addVideoStream("user01");
  };

  addVideoStream(userId, stream = this.currentStream) {
    const isCurrentId = false;

    this.view.renderVideo({
      userId,
      stream,
      isCurrentId,
    });
  };

  onUserConnected = () => userId => {
      console.log("user connected!", userId);
    };
}
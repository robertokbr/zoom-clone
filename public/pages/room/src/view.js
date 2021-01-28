class View {
  constructor(){}

  createVideoElement({ muted = true, src, srcObject }) {
    const video = document.createElement('video');
    video.muted = muted;
    video.src = src;
    video.srcObject = srcObject;

    if(src) {
      video.controls = true;
      video.loop;
      
      Util.sleep(200).then(_=> video.play());
    }

    return video;
  }
}
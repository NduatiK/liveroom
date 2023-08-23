export const JoinCallHook = {
  mounted() {
    void this.initStream();
  },

  async initStream() {
    // webcam
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      width: "1280",
    });

    this.el.srcObject = stream;
  },
};

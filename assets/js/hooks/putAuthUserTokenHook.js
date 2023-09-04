export const PutAuthUserTokenHook = {
  mounted() {
    const userToken = this.el.dataset.usertoken;

    chrome.runtime.sendMessage(
      this.el.dataset.extensionid,
      { type: "setAuthUserToken", userToken }
      // function (response) {
      //   if (chrome.runtime.lastError) {
      //     // handle error - the extension is probably not installed/found
      //   } else {
      //     // success! handle response (if necessary)
      //   }
      // }
    );
  },
};

export const SendExtensionVersionHook = {
  mounted() {
    const version = localStorage.getItem("liveroom-extension-version");
    version && this.pushEvent("update_version_extension", { version });
  },
};

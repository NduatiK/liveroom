export const SendExtensionVersionHook = {
  mounted() {
    const version =
      localStorage.getItem("liveroom-extension-version") || "noversion";
    version && this.pushEvent("update_version_extension", { version });
  },
};

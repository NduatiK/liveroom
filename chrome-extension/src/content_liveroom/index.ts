import packageJson from "../../package.json";

const VERSION = import.meta.env.PROD
  ? `${packageJson["version"]}`
  : `${packageJson["version"]}.dev`;

localStorage.setItem("liveroom-extension-version", VERSION);

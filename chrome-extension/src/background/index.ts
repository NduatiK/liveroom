/*
 * NOTE: This service worker is NOT used in the manifest.json file.
 */

import packageJson from "../../package.json";

const VERSION = import.meta.env.PROD
  ? packageJson["version"]
  : `${packageJson["version"]}.dev`;

chrome.runtime.onInstalled.addListener(() => {
  console.log(
    `[Liveroom Extension] Extension has been installed (v${VERSION})`,
  );
});

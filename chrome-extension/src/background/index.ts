/*
 * NOTE: This service worker is NOT used in the manifest.json file.
 */

import packageJson from "../../package.json";

const VERSION = packageJson["version"];

chrome.runtime.onInstalled.addListener(() => {
  console.log(
    `[Liveroom Extension] Extension has been installed (v${VERSION})`,
  );
});

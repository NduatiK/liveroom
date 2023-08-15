/*
 * NOTE: This service worker is NOT used in the manifest.json file.
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log("[Liveroom] Extension has been installed");
});

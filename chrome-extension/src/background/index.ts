import packageJson from "../../package.json";

const VERSION = import.meta.env.PROD
  ? packageJson["version"]
  : `${packageJson["version"]}.dev`;

let userToken: string | null = null;

chrome.storage.local.get("liveroom-auth-user-token", (result) => {
  userToken = result["liveroom-auth-user-token"];
});

chrome.runtime.onInstalled.addListener(() => {
  console.log(
    `[Liveroom Extension] Extension has been installed (v${VERSION})`,
  );
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "getAuthUserToken":
      sendResponse({ userToken });
      break;
  }
});

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    switch (request.type) {
      case "setAuthUserToken":
        userToken = request.userToken;
        chrome.storage.local.set({ "liveroom-auth-user-token": userToken });
        sendResponse({ status: "success" });
        break;
    }
  },
);

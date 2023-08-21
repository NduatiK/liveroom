// STATE

let room_id: string | undefined;
let element: HTMLElement | undefined;
let script: HTMLScriptElement | null = null;

// MAIN

maybeInjectElement();
listenForQueryParam();

// CONSTANTS

const ELEMENT_TAG = "liveroom-client-element";

// HELPERS

async function maybeInjectElement() {
  const params = new URLSearchParams(window.location.search);
  const room_id_from_query_param = params.get("_liveroom");

  script =
    // prod
    document.querySelector("script[src*='/liveroom-client-element']") ||
    // local dev
    document.querySelector("script[src*='/client/dist/main.js']") ||
    document.querySelector("script[src='/src/main.ts']");

  const url_from_attr =
    script?.getAttribute("data-url") || "wss://liveroom.app/client_socket";
  const room_id_from_attr = script?.getAttribute("data-roomid") || null;

  const new_room_id = room_id_from_query_param || room_id_from_attr;

  // if room_id changes
  if (new_room_id && new_room_id != room_id) {
    room_id = new_room_id;

    // delete element if present
    if (element) {
      element.remove();
      element = undefined;
    }

    // inject element
    await injectElement(url_from_attr, room_id);
  }
}

function listenForQueryParam() {
  // Listen for query param "_liveroom" change in current url
  window.addEventListener("popstate", maybeInjectElement);
}

async function injectElement(url: string, room_id?: string) {
  if (!room_id) return false;

  // import client element sources
  await import(
    script
      ?.getAttribute("src")
      ?.startsWith(
        "https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.15",
      )
      ? "https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.15/dist/liveroom-client-element.min.js"
      : "./LiveroomClientElement.svelte"
  );
  console.log("[Liveroom] Installed successfully");

  const body = document.getElementsByTagName("body")[0];

  // create new client element
  element = document.createElement(ELEMENT_TAG);
  element.setAttribute("url", url);
  room_id && element.setAttribute("room_id", room_id);

  // append the element at the end of the body
  body.appendChild(element);
  console.log("[Liveroom] Injected successfully");

  return true;
}

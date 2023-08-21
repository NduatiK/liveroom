// STATE

let room_id: string | undefined;
let element: HTMLElement | undefined;

// MAIN

maybeInjectElement();
listenForQueryParam();

// CONSTANTS

const ELEMENT_TAG = "liveroom-client-element";

// HELPERS

async function maybeInjectElement() {
  const params = new URLSearchParams(window.location.search);
  const room_id_from_query_param = params.get("_liveroom");

  const script =
    // prod
    document.querySelector("script[src*='liveroom-client-element.js']") ||
    // local dev
    document.querySelector("script[src*='client/dist/main.js']");

  const room_id_from_attr = script?.getAttribute("data-roomid");

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
    await injectElement(room_id);
  }
}

function listenForQueryParam() {
  // Listen for query param "_liveroom" change in current url
  window.addEventListener("popstate", maybeInjectElement);
}

async function injectElement(room_id?: string) {
  if (!room_id) return false;

  // import client element sources
  await import("./LiveroomClientElement.svelte");

  console.log("[Liveroom] Installed successfully");

  const body = document.getElementsByTagName("body")[0];

  // create new client element
  element = document.createElement(ELEMENT_TAG);
  element.setAttribute("url", "ws://localhost:4000/client_socket");
  element.setAttribute("room_id", room_id);

  // append the element at the end of the body
  body.appendChild(element);
  console.log("[Liveroom] Injected successfully");

  return true;
}

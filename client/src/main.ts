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
  const liveroomParam = params.get("_liveroom");

  // if room_id changes
  if (liveroomParam && liveroomParam != room_id) {
    room_id = liveroomParam;
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
  console.log("[Liveroom] Element was injected successfully");

  return true;
}

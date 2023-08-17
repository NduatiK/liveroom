<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { LiveState } from "phx-live-state";
  import PoweredByLiveroom from "./PoweredByLiveroom.svelte";
  import CopyInstallationCodeButton from "./CopyInstallationCodeButton.svelte";
  import UserName from "./UserName.svelte";
  import UsersCursors from "./UsersCursors.svelte";
  import type { User } from "src/types/User";

  export let open = true;
  export let started = false;

  const dispatch = createEventDispatcher();

  let pointerEventsOnVideoElStyle = document.createElement("style");
  pointerEventsOnVideoElStyle.textContent = `
    *[data-isliveroomscreensharing="true"] video {
      /* NOTE: Make sure the video element is hoverable & clickable (it is set to pointer-events: none on Google Meet) */
      pointer-events: auto !important;
    }
    *[data-isliveroomscreensharing="true"] *[jsaction^="mousedown:"]  {
      /* NOTE: Deactivate the menu displayed when hovering, else it clashes with our mouse move listener on the video element */
      pointer-events: none !important;
    }
  `;

  let selectVideoElStyle = document.createElement("style");
  selectVideoElStyle.textContent = `
    #liveroom-overlay, #liveroom-overlay * {
      visibility: visible !important;
    }
    video {
      visibility: visible !important;
      /* NOTE: Make sure the video element is hoverable & clickable (it is set to pointer-events: none on Google Meet) */
      pointer-events: auto !important;
      cursor: pointer;
    }
    /* NOTE: Unfortunately, we can't add a pseudo-element to the video element itself, so we add it to its parent */
    *:has(> video) {
      position: relative;
    }
    *:has(> video)::before {
      visibility: visible !important;
      z-index: 9999;
      opacity: 0;
      content: "";
      position: absolute;
      inset: 0;
      /* Tailwind indigo-600 */
      outline: 2px solid #4f46e5;
      background-color: #4f46e5;
      transition: opacity 0.15s ease-out;
    }
    *:has(> video:hover)::before {
      opacity: 0.8;
    }
    /* NOTE: Deactivate the menu displayed when hovering, else it clashes with our video element hover */
    [jsaction] {
    /* [jsaction*="mousedown"] { */
      pointer-events: none !important;
    }
    body *:not(video) {
      visibility: hidden !important;
    }
    body {
      /* NOTE: Default dark background on Google Meet */
      background-color: #202124 !important;
    }
  `;

  let resizeObserver: ResizeObserver;

  let screensharingVideoEl: HTMLVideoElement;
  let screensharingVideoElWidth: number;
  let screensharingVideoElHeight: number;

  let mouseX: string; // string because we round it to 2 decimals using `toFixed(2)`
  let mouseY: string; // string because we round it to 2 decimals using `toFixed(2)`

  let roomId: string;
  let me: User<"admin">;
  let users: { [key: User["id"]]: User };
  let liveState: LiveState;

  // Start selecting the screensharing video (screensharingVideoEl)
  $: if (started && !screensharingVideoEl) {
    const videoEls = Array.from(document.querySelectorAll("video"));

    function handleVideoClick(e) {
      screensharingVideoEl = e.target;
      document.head.removeChild(selectVideoElStyle);
      // clean all click event listeners
      videoEls.forEach((videoEl) => {
        videoEl.removeEventListener("click", handleVideoClick);
      });
    }

    videoEls.forEach((videoEl) => {
      videoEl.addEventListener("click", handleVideoClick);
    });

    document.head.appendChild(selectVideoElStyle);
  }

  // Observe the screensharing video element dimensions
  $: if (screensharingVideoEl) {
    // Set up screensharing video element dimensions
    screensharingVideoElHeight = Math.round(
      screensharingVideoEl.getBoundingClientRect().height
    );
    screensharingVideoElWidth = Math.round(
      screensharingVideoEl.getBoundingClientRect().width
    );

    // Set up resize observer
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          screensharingVideoElWidth = Math.round(width);
          screensharingVideoElHeight = Math.round(height);
        }
      });
      resizeObserver.observe(screensharingVideoEl);
    }
  } else {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = undefined;
    }
  }
  // If screensharing video size is 0, then it has been removed from DOM
  $: if (screensharingVideoElWidth === 0 && screensharingVideoElHeight === 0) {
    screensharingVideoEl = undefined;
    screensharingVideoElWidth = undefined;
    screensharingVideoElHeight = undefined;
    started = false;
  }

  // Set up listeners on the screensharing video element
  $: if (screensharingVideoEl) {
    // NOTE: We set a special data attribute on the 'top' parent container element,
    //       so we can better target it in the stylesheet overload 'pointerEventsOnVideoElStyle'.
    screensharingVideoEl
      .closest("[data-participant-id]")
      .setAttribute("data-isliveroomscreensharing", "true");
    document.head.appendChild(pointerEventsOnVideoElStyle);

    screensharingVideoEl.addEventListener("mousemove", handleMouseMove);
    screensharingVideoEl.addEventListener("mousedown", handleMouseDown);
    screensharingVideoEl.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  } else {
    endSession();
    cleanStyles();
  }

  // Connect LiveState socket
  $: if (screensharingVideoEl && !liveState) {
    startSession();
  }

  // LIFECYCLE

  onDestroy(() => {
    endSession();
    cleanStyles();
  });

  // HELPERS

  function startSession() {
    const parts = window.location.pathname.split("/");
    roomId = parts.pop() || parts.pop(); // handle potential trailing slash
    console.log(`[Liveroom] Connecting to room '${roomId}'...`);

    liveState = new LiveState({
      url:
        process.env.NODE_ENV === "production"
          ? "wss://liveroom.app/client_socket"
          : "ws://localhost:4000/client_socket",
      topic: `liveroom-livestate:${roomId}`,
      params: {
        room_id: roomId,
        current_url: null,
        inner_width: null,
        inner_height: null,
      },
    });

    liveState.connect();
    liveState.addEventListener("livestate-change", ({ detail: { state } }) => {
      roomId = state.room_id;
      me = state.me;
      users = state.users;
    });
    dispatch("session_started");
  }

  function endSession() {
    if (liveState) {
      liveState.disconnect();
      liveState = undefined;
      dispatch("session_ended");
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = undefined;
    }
    screensharingVideoEl?.removeEventListener("mousemove", handleMouseMove);
    screensharingVideoEl?.removeEventListener("mousedown", handleMouseDown);
    screensharingVideoEl?.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  }

  function cleanStyles() {
    if (document.head.contains(selectVideoElStyle)) {
      document.head.removeChild(selectVideoElStyle);
    }
    if (document.head.contains(pointerEventsOnVideoElStyle)) {
      document.head.removeChild(pointerEventsOnVideoElStyle);
    }
  }

  function handleMouseMove(e) {
    // const xRatio = e.layerX / screensharingVideoEl.offsetWidth;
    const xRatio = e.layerX / screensharingVideoElWidth;
    mouseX = Number(xRatio * 100).toFixed(2); // in %

    // const yRatio = e.layerY / screensharingVideoEl.offsetHeight;
    const yRatio = e.layerY / screensharingVideoElHeight;
    mouseY = Number(yRatio * 100).toFixed(2); // in %

    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_move", {
          detail: { user_id: me.id, x: mouseX, y: mouseY },
        })
      );
    }
  }

  function handleMouseDown(e: MouseEvent) {
    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_down", { detail: { user_id: me.id } })
      );
    }
  }
  function handleMouseUp(e: MouseEvent) {
    if (liveState && me?.id) {
      liveState.dispatchEvent(
        new CustomEvent("mouse_up", { detail: { user_id: me.id } })
      );
    }
  }
  const INTERESTING_KEYS = ["Shift"];
  function handleKeyDown(e: KeyboardEvent) {
    // NOTE: To avoid sending multiple keydown events when a key is held down.
    const firstTimeKeyIsPressed = !e.repeat;

    if (
      liveState &&
      me?.id &&
      firstTimeKeyIsPressed &&
      INTERESTING_KEYS.includes(e.key)
    ) {
      liveState.dispatchEvent(
        new CustomEvent("key_down", { detail: { user_id: me.id, key: e.key } })
      );
    }
  }
  function handleKeyUp(e: KeyboardEvent) {
    if (liveState && me?.id && INTERESTING_KEYS.includes(e.key)) {
      liveState.dispatchEvent(
        new CustomEvent("key_up", { detail: { user_id: me.id, key: e.key } })
      );
    }
  }
</script>

<div
  id="liveroom-overlay"
  data-open={open}
  data-started={started}
  data-hasvideoel={!!screensharingVideoEl}
>
  <div class="body">
    {#if !started}
      <button on:click={() => (started = true)}> Start session </button>
    {:else if !screensharingVideoEl}
      <p class="instructions">Click on the screensharing video</p>
    {:else}
      {#if users}
        <div class="users-names-list">
          {#each Object.values(users) as user (user.id)}
            <UserName user_name={user.name} style="--color={user.color}" />
          {/each}
        </div>
      {/if}

      <div class="separator" />

      <div class="buttons-container">
        <CopyInstallationCodeButton url={liveState.config.url} {roomId} />

        <button
          class="end-session-button"
          on:click={() => {
            started = false;
            screensharingVideoEl = undefined;
          }}
        >
          End session
        </button>
      </div>
    {/if}
  </div>

  <div class="footer">
    <PoweredByLiveroom />
  </div>
</div>

{#if screensharingVideoEl && me && users}
  <UsersCursors
    me_id={me.id}
    {users}
    {screensharingVideoEl}
    {screensharingVideoElWidth}
    {screensharingVideoElHeight}
  />
{/if}

<style>
  /* reset */
  p {
    margin: unset;
  }

  #liveroom-overlay {
    z-index: 100;
    position: absolute;
    bottom: 3.2rem;
    left: 0;
    min-width: 17rem;
    max-width: 50rem;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid rgb(82, 82, 82, 0.2); /* Tailwind neutral-600 */
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Tailwind shadow-md */
    resize: horizontal;
    overflow: auto;
  }
  #liveroom-overlay[data-open="false"] {
    display: none;
  }
  #liveroom-overlay[data-open="true"] {
    display: flex;
  }
  #liveroom-overlay[data-open="true"][data-started="true"][data-hasvideoel="false"] {
    /* Move the popup down so that it doesn't get it the way of selecting the video element */
    transform: translateY(4rem);
  }

  #liveroom-overlay button {
    padding: 0.5rem 2rem;
    border-radius: 4px;
    border: 1px solid rgb(82, 82, 82); /* Tailwind neutral-600 */
    background-color: #262626; /* Tailwind neutral-800 */
    color: white;
    font-weight: 700;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Tailwind shadow-md */
    cursor: pointer;
    transition: border-color 0.15s ease-out, background-color 0.15s ease-out;
  }
  #liveroom-overlay button:hover {
    border-color: black;
    background-color: black;
  }

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
  }

  .footer {
    display: flex;
    justify-content: center;
    padding: 0.3rem;
  }

  .instructions {
    margin: auto;
    padding: 0rem 1rem;
    color: #525252; /* Tailwind neutral-600 */
    font-size: 1.1em;
    font-weight: 600;
    text-align: center;
  }

  .users-names-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .separator {
    height: 1px;
    width: 50%;
    margin: 1.5rem auto;
    border-radius: 100%;
    background-color: rgb(229, 229, 229, 0.6); /* Tailwind neutral-200 */
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 0 1rem;
  }
</style>
